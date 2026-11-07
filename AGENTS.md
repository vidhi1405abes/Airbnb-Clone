# Multi-Agent Orchestration Architecture (AGENTS.md)

This project was built utilizing an agentic AI software development lifecycle (SDLC) model. Multiple specialized AI subagents collaborated across architecture, frontend development, backend APIs, and pixel-perfect quality assurance.

---

## 1. Subagent Roster & Roles

```
                        ┌────────────────────────┐
                        │   Lead Orchestrator    │
                        │      (Antigravity)     │
                        └───────────┬────────────┘
                                    │
           ┌────────────────────────┼────────────────────────┐
           ▼                        ▼                        ▼
┌────────────────────┐   ┌────────────────────┐   ┌────────────────────┐
│ Frontend Architect │   │    API Engineer    │   │ QA & Accessibility │
│      Subagent      │   │      Subagent      │   │     Specialist     │
└────────────────────┘   └────────────────────┘   └────────────────────┘
```

### Agent 1: Frontend Architect (`frontend-architect`)
* **Role:** Lead UI/UX Engineer & Component Designer
* **Primary Scope:**
  * Replicating the Airbnb Design Language System (DLS): Spacing, typography (`Airbnb Cereal` metrics), colors (`#FF385C`, `#222222`, `#717171`), and subtle shadows (`0 6px 16px rgba(0,0,0,0.12)`).
  * 3-Tier Image Hierarchy:
    1. 5-Photo Bento Grid with 50% primary hero + 2x2 secondary grid and hover dimming (`brightness-95`).
    2. Full-Screen Photo Tour modal with room headers and top thumbnail strip carousel.
    3. Lightbox single-photo viewer with smooth transitions, arrow navigation, and Escape dismissal.
  * Interactive UI components: 2-month range-picker calendar, Guest Favorite laurel banner, Sticky reservation card, Amenities modal, Share modal, Wishlist toggle, and Reviews dialog.

### Agent 2: API Engineer (`api-engineer`)
* **Role:** Backend & Distributed Systems Specialist
* **Primary Scope:**
  * Node.js / Express REST API endpoints (`/api/listing`, `/api/reservations/calculate`, `/api/reviews`).
  * Dynamic pricing quote engine (calculating base night costs, cleaning fees, platform service commissions, and local occupancy taxes).
  * Multi-destination data provider (`candolim`, `calangute`, `anjuna`, `panaji`) with family-focused descriptions and verification policies.
  * Concurrency safety design (zero-overbooking algorithms, calendar bitmasks, and Redis Redlock implementation).

### Agent 3: QA & Accessibility Specialist (`qa-accessibility-specialist`)
* **Role:** Test Engineer & WCAG Parity Auditor
* **Primary Scope:**
  * Authoring and executing the automated SDLC test suite (25/25 automated test cases).
  * Verifying keyboard accessibility: ArrowLeft / ArrowRight navigation, Escape dismissal, and focus traps on all modals.
  * Preventing background body scroll leakage (`document.body.style.overflow = 'hidden'`) during active overlays.
  * Ensuring zero TypeScript compiler warnings and clean production builds.

---

## 2. Agent Configuration Files
Detailed JSON specifications for each agent are maintained under [`ai-workflow/subagents/`](ai-workflow/subagents/):
* [`ai-workflow/subagents/frontend-architect.json`](ai-workflow/subagents/frontend-architect.json)
* [`ai-workflow/subagents/api-engineer.json`](ai-workflow/subagents/api-engineer.json)
* [`ai-workflow/subagents/qa-accessibility-specialist.json`](ai-workflow/subagents/qa-accessibility-specialist.json)

## 3. Custom Skills
Specialized toolkits developed for this project are located in [`ai-workflow/skills/`](ai-workflow/skills/):
* `pixel-perfect-inspection`: Inspects CSS classes, color contrast, and element alignment against Airbnb reference mocks.
* `system-design-generator`: Generates production-scale architecture blueprints and scalability whitepapers.

---

## 4. Prompt Engineering Sequence
The chronological chain of AI instructions and verification checkpoints is logged in [`ai-workflow/prompt-sequence.md`](ai-workflow/prompt-sequence.md).
