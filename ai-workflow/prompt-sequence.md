# AI Prompt Engineering History & Development Logs (PROMPT_LOGS.md)

This log documents the sequential prompt engineering workflow used to build the **Airbnb-Clone Full-Stack Application** and its **Production Architecture Blueprint**. 

---

## Prompting Methodology & Philosophy
* **Role & Context Framing:** Setting precise personas (Lead Architect, Frontend Specialist, Distributed Systems Engineer, QA Lead).
* **Negative Constraints:** Explicitly prohibiting unwanted patterns (e.g. "Do not push to public GitHub", "No mobile layout required—focus 100% on desktop pixel parity", "Never hardcode dates or pricing").
* **Acceptance-Criteria Driven:** Providing clear `Given / When / Then` expectations for interactive features.
* **Surgical Debugging:** Structuring bug-fix prompts with **Observed Behavior vs. Expected Behavior** rather than vague complaints.

---

## Phase 1: Project Scoping & Requirements Deconstruction

### Prompt 1.1 — Reference Analysis & Tech Stack Selection
```text
Act as a Principal Frontend Architect. I need to build a pixel-perfect desktop clone of the Airbnb listing page based on the Playpower Labs assignment specification ("Romantic Jacuzzi 1BHK Candolim | Mirashya UG10").

Requirements:
1. Three core views:
   - Primary Listing Page: 5-photo bento grid, sticky reservation card, 2-month calendar, reviews, host specs.
   - Full-Screen Photo Tour: Categorized room photos with a top thumbnail strip.
   - Lightbox Viewer: Single-photo viewer with smooth transitions, arrow navigation, and Escape dismissal.
2. Technology constraints: Use React 18 with TypeScript and Tailwind CSS on the frontend. Use Node.js with Express on the backend.
3. Desktop-only focus: Prioritize desktop pixel-perfection over responsive mobile adaptation.

Please analyze the reference requirements, establish our component hierarchy, and generate projectdesc.md defining our acceptance criteria for every feature.
```

---

## Phase 2: Technical Task Planning & Architecture Blueprint

### Prompt 2.1 — Granular Development Task Matrix
```text
Act as a Senior Technical Lead. Based on the approved projectdesc.md, generate dev-plan.md containing a complete breakdown of technical tasks.

Rules:
- Break features into granular subtasks (Scaffolding, Bento Grid, Modals, Sticky Widget, Calendar, API routes).
- Every acceptance criterion must map to at least one actionable task row.
- Define the planned access points (Frontend: http://localhost:5173, Backend: http://localhost:5000).
- Present this in a clean status-tracking Markdown table.
```

### Prompt 2.2 — High-Level Distributed Architecture Design
```text
Act as a Principal Distributed Systems Architect. Design a production-scale vacation rental marketplace architecture capable of handling 100M+ active listings, 150K search QPS, and zero double-booking concurrency under high load.

Requirements:
1. Cover 4 clear tiers:
   - Client Tier: Desktop Web, Mobile Browser (React 18 SSR/CDN).
   - Edge & Gateway Tier: Cloudflare Edge, Image Transcoding, API Gateway with rate limiting & mTLS.
   - Core Microservices: Listing Service, Booking Engine, Search Service, Dynamic Pricing Quote Service.
   - Storage Tier: PostgreSQL (Citus sharding), Redis (Redlock distributed locks), OpenSearch (geospatial), Kafka (CDC event stream).
2. Generate both a comprehensive technical whitepaper (ARCHITECTURE.md) and clean visual diagram files (PDF, PNG, SVG) with a readable 4-tier flow.
```

---

## Phase 3: Core Implementation & UI Parity

### Prompt 3.1 — 5-Photo Bento Grid & 3-Tier Image Hierarchy
```text
Build the photo viewing experience matching Airbnb's exact 3-tier hierarchy:
1. HeroGrid.tsx: A 5-photo asymmetrical bento grid (1 large 50% left image with rounded-l-2xl, and 4 2x2 grid images on the right with rounded-r-2xl). Implement hover brightness dimming (brightness-95) and a floating "Show all photos" button with a grid icon.
2. PhotoTourModal.tsx: Full-screen modal opened when clicking any hero image or the floating button. Includes sticky room tabs, a top thumbnail carousel strip, room category headers, and photo count indicators.
3. LightboxModal.tsx: Single-photo modal opened when clicking any photo from the tour. Supports keyboard navigation (ArrowLeft, ArrowRight), Escape key dismissal, and backdrop click closure.

Important: Manage document.body.style.overflow = 'hidden' to prevent background page scroll leakage while modals are open.
```

### Prompt 3.2 — Sticky Reservation Card & Reactive Pricing Engine
```text
Implement the StickyReservationCard component and the backend calculation endpoint /api/reservations/calculate.

Specifications:
- Layout: Sticky widget on the right column (col-span-5) that sticks smoothly below the navbar.
- Inputs: Interactive check-in / check-out date picker and guest stepper dropdown (Adults + Children, max 4 guests).
- Real-time reactivity: When dates change, automatically calculate:
  * Base nightly cost: (perNight * numberOfNights)
  * Cleaning fee: Fixed rate
  * Service fee: 14% platform commission
  * Taxes: 12% occupancy tax
  * Total price displayed dynamically without page reloads.
- Include a "Reserve" CTA that triggers a confirmation modal with booking ID generation.
```

---

## Phase 4: Automated Testing & Verification

### Prompt 4.1 — Authoring the SDLC Automated Test Suite
```text
Act as a QA Test Lead. Create test-cases.md and an automated Node.js test script (run-tests.js) containing at least 25 test cases covering:
1. Functional: Fee calculation formulas, date ranges, guest capacity boundaries.
2. UI & Accessibility: Keyboard arrow listeners, Escape dismissal, sticky positioning, modal transitions.
3. Data Integrity: Multi-destination datasets (Candolim, Calangute, Anjuna, Panaji).
4. Build Sanity: Production Vite bundle compilation, TypeScript strict mode compliance, index.html metadata.

Output pass rate as (Passed / Total) * 100 and generate a formal test report in reports/test-report-round-1.md.
```

---

## Phase 5: Debugging, Defect Identification & Refinement (Actual Iterations)

### Prompt 5.1 — Bug Fix: Dynamic Location Search & Browser Tab Title Desync
```text
[BUG REPORT - LOCATION SWITCHING & TITLE DESYNC]
Observed Behavior:
When I click the search pill and select "Panaji, Goa", the header search pill updates, but:
1. The property data on the page still displays Candolim information.
2. The browser tab title (document.title) remains static as "Romantic Jacuzzi 1BHK Candolim".

Expected Behavior:
1. Selecting "Panaji, Goa", "Calangute, Goa", or "Anjuna, Goa" must immediately trigger fetchListing(cityKey) and re-render the photos, subtitle, sleeping arrangements, and pricing.
2. document.title must synchronously update to:
   `${newListing.title} - Serviced apartments for Rent in ${newListing.location.city}, ${newListing.location.state}, India - Airbnb`
3. In SearchModal.tsx, wrap the input in a form so pressing Enter or clicking Search automatically selects the matched destination.
```

### Prompt 5.2 — Bug Fix: Static Greeting in Messages Modal & Family Taglines
```text
[BUG REPORT - CHAT MODAL GREETING & AUDIENCE COPY]
Observed Behavior:
1. Opening the MessagesModal after switching to Panaji still shows:
   "Hello! I'm Mirashya Stays. Thank you for your interest in Romantic Jacuzzi 1BHK Candolim! The jacuzzi is pre-heated and ready for guests..."
2. The copy still refers to couples/romantic getaways instead of families.

Expected Behavior:
1. Pass listingTitle={listing.title} and locationCity={listing.location.city} down into MessagesModal.
2. Reset the host greeting state whenever listingTitle changes so it dynamically says:
   "Hello! I'm ${host.name}. Thank you for your interest in ${listingTitle}! This family-friendly property in ${locationCity} is fully furnished, verified, and ready for you and your family..."
3. Update subtitles and descriptions across listingData.ts to emphasize family amenities (2 beds, high-speed Wi-Fi, baby cot, board games, shallow pool area).
```

### Prompt 5.3 — Bug Fix: Unclickable Reviews & Ratings in Specs and Sticky Card
```text
[BUG REPORT - REVIEWS & RATING CLICK HANDLERS]
Observed Behavior:
Clicking on "4.94 ★ Overall rating" or "42 Reviews" in the Guest Favorite badge, or "★ 4.94 · 42 reviews" in the sticky card, does nothing. They have cursor-pointer and underlines, but no onClick handlers.

Expected Behavior:
1. Connect onClick={onOpenReviews} to both blocks in SpecsBanner.tsx and to the reviews element in StickyReservationCard.tsx.
2. Smoothly scroll the window down to the reviews section:
   document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' });
3. Create a dedicated ReviewsModal.tsx dialog showing:
   - Overall rating and total reviews count.
   - 6 category rating progress bars (Cleanliness, Accuracy, Communication, Location, Check-in, Value).
   - Search filter to search through reviews.
   - Scrollable list of verified guest reviews.
4. Add a "Show all {reviewsCount} reviews" button at the bottom of ReviewsSection.tsx that opens this modal.
```

### Prompt 5.4 — Architecture Diagram Simplification
```text
[REFINEMENT - DIAGRAM SIMPLIFICATION]
The current architecture diagram has too much text and dense technical bullet points. 
Please simplify the diagram into a clean, modern, 4-tier visual flow:
1. Tier 1: Clients (Desktop Web, Mobile Web & Apps)
2. Tier 2: Global CDN (Cloudflare WebP) & API Gateway (Auth & Routing)
3. Tier 3: Core Services (Listing, Availability/Booking, Search/Location, Pricing/Reviews)
4. Tier 4: Data & Storage (PostgreSQL, Redis Cache & Redlock, OpenSearch & Kafka)

Regenerate the SVG, vector PDF, and high-resolution PNG using a clean light theme with Airbnb brand colors (#FF385C).
```

---

## Phase 6: Delivery Packaging & Git Verification

### Prompt 6.1 — Submission Bundle & Clean Git Configuration
```text
Prepare the final submission package matching the assignment requirements:
1. Generate airbnb-clone-submission.zip containing:
   - Full React + Node.js code (strictly excluding node_modules and .git)
   - Architecture diagrams (architecture-diagram.pdf, .png, .svg)
   - AI config files (AGENTS.md, CLAUDE.md, .claude/)
   - Prompt sequence logs (PROMPT_LOGS.md)
2. Ensure .gitignore excludes node_modules, build caches, and environment files.
3. Commit all changes to the local git repository on branch main and provide the exact commands to push to https://github.com/vidhi1405abes/Airbnb-Clone.git.
```
