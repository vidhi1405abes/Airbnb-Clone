# SDLC Multi-Agent Framework (AGENTS.md)

This project was built from raw requirements to final production delivery using the **personal SDLC Multi-Agent Pipeline**. The pipeline orchestrates three specialized autonomous agent roles governed by strict approval gates and a central orchestrator.

---

## 1. Multi-Agent Pipeline Architecture

```
                    ┌──────────────────────────────────┐
                    │        SDLC Orchestrator         │
                    │   (README.md & State Machine)    │
                    └────────────────┬─────────────────┘
                                     │
       ┌─────────────────────────────┼─────────────────────────────┐
       ▼                             ▼                             ▼
┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐
│ Research & Requirements │  │        Developer        │  │        QA Tester        │
│         Analyst         │  │          Agent          │  │          Agent          │
│ (agents/research-and-   │  │  (agents/developer.md)  │  │   (agents/tester.md)    │
│    requirements.md)     │  │                         │  │                         │
└─────────────────────────┘  └─────────────────────────┘  └─────────────────────────┘
        │                             │                             │
   Phase 1 (Gate 1)          Phase 2, 3, 6 (Gate 2)        Phase 4, 5 (Gate 3)
```

---

## 2. The 3 SDLC Agents & Their Operational Roles

### Agent 1: Research & Requirements Analyst (`agents/research-and-requirements.md`)
* **Role Persona:** Product researcher and technical requirements analyst. Turns ambiguous, rough prompts into an authoritative, complete product specification without guesswork.
* **Input:** `raw-requirement.md`, original PDF specification (`input/requirement.txt`).
* **Active Phases:**
  * **Phase 1 (Research):** Deconstructs the reference application, identifies target user personas, defines acceptance criteria (Given/When/Then), selects modern technical stacks, and authors the single source of truth: `projectdesc.md`.
* **Gate Controlled:** **Gate 1** (Requires explicit user sign-off on product scope, tech stack, and differentiators before code planning begins).

---

### Agent 2: Developer (`agents/developer.md`)
* **Role Persona:** Senior full-stack software engineer comfortable across frontend edge runtimes, backend APIs, distributed data stores, and state synchronization.
* **Operational Modes:**
  1. **Mode 1 (Plan — Phase 2):** Ingests `projectdesc.md` and generates `dev-plan.md`—a granular, feature-by-feature task matrix tracking every technical subtask from scaffolding to responsive styling. Governed by **Gate 2**.
  2. **Mode 2 (Build — Phase 3):** Builds the full-stack codebase in `code/` (`client/` React 18 + Vite + Tailwind, `server/` Node.js + Express + TypeScript, and architecture blueprints).
  3. **Mode 3 (Fix — Phase 6):** Ingests test failure reports (`reports/test-report-round-<N>.md`) and user showcase feedback to apply surgical, non-breaking bug fixes.
* **Outputs:** Runnable client & server code, clean APIs, system architecture diagrams (`architecture-diagram.pdf`, `.png`, `.svg`), and `README.md`.

---

### Agent 3: QA Tester (`agents/tester.md`)
* **Role Persona:** Meticulous software test and quality assurance engineer. Evaluates software strictly against the promises made in `projectdesc.md` as an authentic user.
* **Operational Modes:**
  1. **Mode 1 (Plan — Phase 4):** Authors `test-cases.md`, categorizing test vectors into Functional, UI/UX, Validation, Edge cases, Accessibility (WCAG keyboard navigation), and Stability. Governed by **Gate 3**.
  2. **Mode 2 (Execute — Phase 5):** Executes end-to-end automated scripts and live API probes. Computes the deterministic pass rate:
     $$\text{Pass Rate} = \frac{\text{Passed Test Cases}}{\text{Total Test Cases}} \times 100$$
     Logs failures with expected vs. actual outputs into `reports/test-report-round-<N>.md`. Must achieve $\ge 97\%$ pass rate to graduate to Phase 7.

---

## 3. SDLC Phase Execution for this Airbnb Clone

| Phase | Acting Agent | Input Artifact | Output Artifact | Result / Status |
|---|---|---|---|---|
| **Phase 0: Setup** | Orchestrator | User PDF / Prompt | `input/`, `raw-requirement.md`, `status.md` | Completed |
| **Phase 1: Research** | Research & Requirements | `raw-requirement.md` | `projectdesc.md` | **Gate 1 Approved** |
| **Phase 2: Dev Plan** | Developer (Plan) | `projectdesc.md` | `dev-plan.md` | **Gate 2 Approved** |
| **Phase 3: Build** | Developer (Build) | `dev-plan.md` | `code/` (Client + Server + Architecture) | Completed |
| **Phase 4: Test Plan** | QA Tester (Plan) | `projectdesc.md` | `test-cases.md` (25 test cases) | **Gate 3 Approved** |
| **Phase 5: Test Run** | QA Tester (Execute)| `test-cases.md` | `reports/test-report-round-1.md` | **100% Pass Rate** (25/25) |
| **Phase 6: Fix** | Developer (Fix) | User Feedback | Dynamic location & review fixes | Completed |
| **Phase 7: Showcase**| Orchestrator | Running App (`localhost:5173`) | Live demonstration | **Gate 4 Approved** |
| **Phase 8: Deliver** | Orchestrator | Approved Code | `output/airbnb-clone/`, `.zip` bundle | **Delivered** |

---

## 4. Agent Files in Repository
The original markdown agent definitions from the SDLC kit are mirrored in this project under [`.claude/agents/`](.claude/agents/):
* [`.claude/agents/research-and-requirements.md`](.claude/agents/research-and-requirements.md)
* [`.claude/agents/developer.md`](.claude/agents/developer.md)
* [`.claude/agents/tester.md`](.claude/agents/tester.md)
