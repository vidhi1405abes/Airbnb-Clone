# Production-Scale Vacation Rental Marketplace Architecture

## 1. Executive Summary & Scaling Targets

This document outlines the end-to-end system architecture for a global vacation-rental marketplace (e.g. Airbnb) capable of supporting **100+ million active listings**, **150,000 search queries per second (QPS)**, and **tens of millions of concurrent bookings** worldwide with a target availability of **99.999%** and P99 latency below **85ms**.

The accompanying high-resolution visual diagram is located at [`architecture-diagram.svg`](architecture-diagram.svg).

---

## 2. High-Level Architectural Tiers

```
[Web & Mobile Clients]
        │
        ▼
[Cloudflare Global Anycast CDN / WAF]
        │
        ▼
[Next.js Edge Runtime / Dynamic Image Transcoding]
        │
        ▼
[Envoy API Gateway & Service Mesh]
 ┌──────┼──────────────┬──────────────┬──────────────┐
 ▼      ▼              ▼              ▼              ▼
[Listing] [Availability] [Search Engine] [Pricing]   [Reviews & Trust]
 Service   Engine (Locks) Service (H3)    Engine      Service
 │      │              │              │              │
 └──────┴──────────────┼──────────────┴──────────────┘
                       ▼
    [Apache Kafka Event Streaming Backbone]
 ┌─────────────────────┼─────────────────────────────┐
 ▼                     ▼                             ▼
[Sharded PostgreSQL] [Redis Cluster]           [OpenSearch Cluster]
(Citus / Aurora)     (Distributed Redlocks)    (Geo-Radius Index)
```

---

## 3. Tier-by-Tier Architectural Strategy

### Tier 1: Client Layer & Global Anycast Edge
* **Anycast Routing & DDoS Protection:** Traffic enters through Cloudflare Anycast edge PoPs (300+ locations globally). Edge DDoS protection, WAF inspection, and TLS 1.3 termination occur within 10ms of the user.
* **Edge SSR & Incremental Static Regeneration (ISR):** Listing details pages (such as `candolim-mirashya-ug10`) utilize Next.js ISR. Pages are statically rendered at build time and revalidated at the edge when listing data mutations occur via webhook.
* **Image Transcoding CDN:** Images uploaded in 4K resolution are automatically converted into WebP and AVIF formats, dynamically resized to match device viewports (e.g., hero bento grid vs. thumbnail gallery vs. full-screen lightbox), and served directly from edge caches.

### Tier 2: API Gateway & Microservices Domain
The backend is split into independently scalable, containerized microservices managed via Kubernetes (EKS/GKE):

1. **Listing & Specs Service:**
   * Manages listing metadata, room configurations, photo associations, house rules, and amenities.
   * Backed by sharded PostgreSQL with read replicas.
2. **Booking & Availability Engine:**
   * Guarantees zero double-booking through distributed locking (`Redlock` algorithm in Redis) and two-phase reservation commits.
   * Maintains calendar bitmasks for lightning-fast date availability checks.
3. **Search & Discovery Engine:**
   * Powered by an OpenSearch cluster utilizing Uber H3 hexagonal geospatial indexing.
   * Handles multi-facet filtering (Jacuzzi, dedicated workspace, price ranges, dates) with sub-45ms P99 latency.
4. **Pricing & Dynamic Quote Service:**
   * Dynamically calculates base night rates, cleaning fees, platform service commissions, and local occupancy taxes based on stay duration and seasonal demand.
5. **Reviews & Trust Service:**
   * Maintains 6-category rating metrics (Cleanliness, Accuracy, Communication, Location, Check-in, Value) and guest verification badges.
6. **Payment & Escrow Service:**
   * Integrated with Stripe / regional payment providers. Funds are held in escrow and disbursed to hosts automatically 24 hours after verified check-in.

### Tier 3: Polyglot Storage & Caching Strategy
* **Primary Relational Store (PostgreSQL with Citus / AWS Aurora):**
   * Sharded by geographic region (`AP-South`, `EU-West`, `US-East`) and Listing ID.
   * Enforces strict ACID transactional integrity for user accounts, billing, reservations, and compliance.
* **In-Memory Cache (Redis Enterprise Cluster):**
   * Serves as an L2 cache for listing metadata (TTL = 1 hour with active invalidation).
   * Executes atomic distributed lock acquisitions (`SET key uuid NX PX 10000`) during checkout checkout flows.
* **Search Engine (OpenSearch Cluster):**
   * Geo-point and geo-shape indexing allowing bounding-box and radius queries.
* **Object Storage (AWS S3 + CloudFront CDN):**
   * Multi-region replicated storage for user avatars, verification IDs, and high-resolution photo assets.

### Tier 4: Asynchronous Event Streaming & CDC
* **Apache Kafka Backbone:**
   * High-throughput event topics: `booking-initiated`, `booking-confirmed`, `availability-invalidated`, `listing-updated`, `review-submitted`.
* **Change Data Capture (Debezium):**
   * Watches PostgreSQL Write-Ahead Logs (WAL) and streams database modifications directly to Kafka.
   * Downstream consumers automatically update OpenSearch indices and invalidate Redis caches without dual-write race conditions.

---

## 4. Concurrency Control: Zero Overbooking Guarantee

```
User A (Clicks Reserve)                User B (Clicks Reserve)
       │                                      │
       ▼                                      ▼
[Redis Redlock: Try Acquire Lock (Listing ID + Dates, TTL=10s)]
       │                                      │
       ├─────────────── Lock Granted ─────────┤ (Lock Rejected -> Return Busy)
       ▼                                      ▼
[PostgreSQL: Check Overlapping Dates]    [Return "Dates No Longer Available"]
       │
[Begin Transaction]
• Insert Reservation (Status = PENDING)
• Hold Calendar Slot
[Commit Transaction]
       │
[Release Redis Lock]
       │
[Stripe Payment Authorized]
       │
[Publish 'booking-confirmed' to Kafka]
```

1. **Distributed Lock:** When a guest initiates checkout, an atomic Redis lock is requested for `listing_id + check_in + check_out`.
2. **Optimistic Concurrency:** PostgreSQL verifies no existing `CONFIRMED` reservation exists with overlapping date ranges using `TSTZRANGE` overlap exclusion constraints (`&&`).
3. **Graceful Timeout:** If payment is not completed within 15 minutes, the pending lock is released, and the slot returns to the open inventory.

---

## 5. Multi-Region Active-Active Deployment & CI/CD
* **Active-Active Traffic Routing:** Latency-based DNS routing via Route 53 sends users to the nearest regional cloud datacenter.
* **GitOps Continuous Deployment:** ArgoCD automatically reconciles Kubernetes manifests from Git.
* **Zero-Downtime Rollouts:** Blue/Green and Canary releases with automated automated rollbacks triggered by elevated HTTP 5xx or latency thresholds.
* **Observability:** OpenTelemetry traces distributed spans from browser fetch -> API Gateway -> Microservice -> Database query -> Response.
