---
name: system-design-generator
description: Procedures and standards for generating high-availability production system architecture blueprints for vacation-rental platforms.
---

# Skill: Production System Design Generator

## 1. Domain Requirements for Vacation Rental Marketplaces
- **High Concurrency & Low Latency:** Sub-100ms P99 latency on search across 100M+ listings.
- **Strict Anti-Double Booking:** No two guests may book the same property for overlapping dates under any concurrent load.
- **Geospatial Radius Queries:** Fast boundary box search using hexagonal spatial indexing (Uber H3 / OpenSearch).
- **Polyglot Persistence:**
  - Relational (PostgreSQL) for financial ledgers, reservations, users.
  - In-Memory (Redis) for distributed locks and L2 cache.
  - Search Index (OpenSearch) for geospatial & full-text searches.
  - Object Store (S3 + CDN) for multi-resolution images.
