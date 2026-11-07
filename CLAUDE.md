# Claude AI Guidelines — Airbnb Clone Full-Stack Project

This file provides context and operational instructions for Claude and other AI coding assistants working in this repository.

---

## 1. Project Overview
A pixel-perfect, desktop-optimized clone of an Airbnb listing page ("Romantic Jacuzzi 1BHK Candolim | Mirashya UG10") built with **React 18 + TypeScript + Vite + Tailwind CSS** on the frontend, and **Node.js + Express + TypeScript** on the backend.

### Key Deliverables:
* **Core Views:**
  1. Main Listing Page (`App.tsx`) with 5-photo bento grid, sticky reservation card, 2-month calendar, and reviews.
  2. Full-Screen Photo Tour modal (`PhotoTourModal.tsx`) with room headers and top thumbnail strip.
  3. Single-Photo Lightbox (`LightboxModal.tsx`) with keyboard navigation (`←`, `→`, `Escape`).
* **Architecture Blueprint:** Production-scale vacation-rental architecture (`architecture/architecture-diagram.pdf`, `.png`, `.svg` and `architecture/ARCHITECTURE.md`).
* **AI Workflow Artifacts:** `AGENTS.md`, `CLAUDE.md`, `.claude/`, `ai-workflow/`.

---

## 2. Common Commands

### Root Workspace
```bash
# Run full-stack application (concurrently starts client on :5173 and server on :5000)
npm run dev

# Install all dependencies
npm run install:all

# Build both client and server for production
npm run build
```

### Client (`/client`)
```bash
cd client
npm run dev       # Start Vite dev server on http://localhost:5173
npm run build     # Typecheck (tsc) and compile production bundle to dist/
npm run preview   # Preview production build locally
```

### Server (`/server`)
```bash
cd server
npm run dev       # Start Express API server with live reloading on http://localhost:5000
npm run build     # Compile TypeScript to dist/
npm start         # Run compiled production server
```

---

## 3. Tech Stack & Directory Structure

```
airbnb-clone/
├── AGENTS.md                  # Multi-agent architecture and role specifications
├── CLAUDE.md                  # Project instructions for Claude AI assistants
├── .claude/                   # Claude configuration, agents, and rules
├── package.json               # Root workspace scripts (npm run dev, npm run build)
├── README.md                  # Setup and architecture documentation
├── architecture/              # Scalable system design artifacts
│   ├── architecture-diagram.pdf   # Vector PDF architecture blueprint
│   ├── architecture-diagram.png   # High-resolution PNG image
│   ├── architecture-diagram.svg   # Scalable vector graphics source
│   └── ARCHITECTURE.md            # Distributed scaling whitepaper (100M+ listings)
├── ai-workflow/               # AI prompts, skills, and subagent configs
│   ├── prompt-sequence.md         # Chronological AI prompts sequence
│   ├── subagents/                 # Specialized subagent JSON configs
│   └── skills/                    # Custom inspection skills
├── client/                    # Frontend React 18 + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/        # Modular UI components (HeroGrid, Calendar, Modals, etc.)
│   │   ├── services/api.ts    # API client and local mock fallbacks
│   │   ├── types/index.ts     # TypeScript interface definitions
│   │   ├── App.tsx            # Main application coordinator
│   │   └── main.tsx           # React DOM root entrypoint
│   └── index.html             # Application HTML shell
└── server/                    # Backend Node.js + Express + TypeScript
    └── src/
        ├── data/listingData.ts    # Multi-location listing dataset (Candolim, Panaji, etc.)
        ├── routes/                # API endpoints (/api/listing, /api/reservations, /api/reviews)
        └── index.ts               # Express server bootstrap
```

---

## 4. Code Standards & Architecture Guidelines

1. **Pixel-Perfect Airbnb DLS Styling:**
   * Primary brand color: `#FF385C` (`bg-airbnb-brand`, `text-airbnb-brand`).
   * Primary text: `#222222` (`text-airbnb-charcoal`).
   * Secondary muted text: `#717171` (`text-airbnb-muted`).
   * Subtle borders: `#DDDDDD` (`border-airbnb-border`) and `#EBEBEB` (`border-airbnb-lightBorder`).
   * Shadows: `shadow-airbnb-card` (`0 6px 16px rgba(0,0,0,0.12)`).

2. **Overlay & Modal Hygiene:**
   * All modal overlays must set `document.body.style.overflow = 'hidden'` on open and restore `'unset'` on close.
   * Provide `Escape` key handling and clicking outside the modal content to close.
   * Lightbox must support keyboard arrow navigation (`ArrowLeft` / `ArrowRight`).

3. **Multi-Location Dynamic Data:**
   * Searching or switching locations (e.g., Candolim, Calangute, Anjuna, Panaji) must dynamically update:
     - Document title (`document.title`)
     - Hero images & room photos
     - Nightly pricing and reservation calculations
     - Family-friendly descriptions and highlights
     - Host message greeting in `MessagesModal`

4. **Zero Overbooking Concurrency Design:**
   * All reservation requests must calculate pricing deterministically.
   * Distributed locking via Redis Redlock must be accounted for in backend service designs.
