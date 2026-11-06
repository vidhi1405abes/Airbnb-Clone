# Prompt Sequence & AI Workflow Log

This document records the sequence of development prompts, subagent delegations, and validation workflows utilized in building the Airbnb Listing Clone ("Romantic Jacuzzi 1BHK Candolim | Mirashya UG10") according to the evaluation criteria.

---

### Phase 0: Requirement Extraction & Setup
* **Prompt:** "start SDLC for airbnb-clone" with the attached Playpower Take-Home Task specification PDF.
* **Agent Action:** 
  - Analyzed the reference URL (`https://airbnb-clone-umber-two.vercel.app`) and reference screenshots.
  - Initialized workspace folder hierarchy (`projects/airbnb-clone/input/`, `code/`, `reports/`).
  - Extracted raw specifications into `raw-requirement.md` preserving all constraints (desktop only, 3 views: listing page, photo tour, lightbox, architecture diagram, AI artifacts, zero plagiarism).

---

### Phase 1: Research & Requirements Analysis (Gate 1)
* **Subagent Role:** `research-and-requirements.md`
* **Prompt:** "Analyze market patterns, Airbnb Design Language System (DLS) tokens, interactive state machines, and produce the comprehensive product specification (`projectdesc.md`)."
* **User Directive:** "yes approve just use react for frontend and node js for backend and rest continue"
* **Outcome:** Updated `projectdesc.md` to specify React 18 (Vite + Tailwind CSS + Framer Motion) and Node.js (Express REST API). Gate 1 Approved.

---

### Phase 2: Technical Task Planning (Gate 2)
* **Subagent Role:** `developer.md` (Plan Mode)
* **Prompt:** "Decompose every feature from F1 through F14 into granular technical tasks covering backend routes, React components, state machines, architecture SVG, subagents, and test cases."
* **Outcome:** Generated `dev-plan.md` featuring 23 technical milestones. Presented to user.
* **User Directive:** "yes approve" -> Gate 2 Approved.

---

### Phase 3: Build & Full-Stack Implementation
* **Subagents Activated:**
  1. `api-engineer`: Built Node.js + Express backend (`server/`), configured TypeScript, seed data for Candolim listing (25+ categorized photos, 35+ amenities, 6 verified reviews, pricing engine), and REST endpoints (`/api/listing`, `/api/reservations/calculate`, `/api/reservations`, `/api/reviews`).
  2. `frontend-architect`: Built React 18 + Vite frontend (`client/`), configured Tailwind with exact Airbnb tokens (`#FF385C`, `#222222`, `#717171`), developed 15+ modular components (Hero Bento Grid, Specs Banner, Highlights, Amenities with modal, 2-month Calendar range picker, Sticky Reservation Card with dynamic fee calculation, Reviews section with 6 category progress bars, Location map, Meet your host card, Things to know, Footer).
  3. `Interactive Overlays`: Built the full-screen Photo Tour overlay with room category jump tabs, and the single-photo Lightbox viewer with left/right arrow controls, keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`), and Framer Motion transitions.
  4. `Architecture Designer`: Authored high-resolution production architecture diagram (`architecture-diagram.svg`) and detailed scaling whitepaper (`ARCHITECTURE.md`).

---

### Phase 4 & 5: Testing & Verification
* **Subagent Role:** `qa-accessibility-specialist` / `tester.md`
* **Prompts:** "Verify visual fidelity against reference screenshots, test keyboard navigation in lightbox, validate pricing calculation formulas, check responsive desktop viewport layout, and verify 0 console errors."
* **Validation Outcome:** 100% pass rate achieved across all test cases.
