# Airbnb Listing Clone — "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10"

A pixel-perfect, desktop-optimized clone of a real Airbnb listing page featuring **"Romantic Jacuzzi 1BHK Candolim | Mirashya UG10"** in Candolim, Goa, India.

Built with **React 18 (Vite + TypeScript + Tailwind CSS + Framer Motion)** on the frontend and **Node.js (Express + TypeScript)** on the backend. Includes complete behavioral parity across the three core views, full keyboard accessibility, interactive reservation calculation, and a comprehensive production-scale system architecture blueprint.

---

## 🌟 Core Views & Features

### 1. Main Listing Page
- **Sticky Airbnb Navigation:** Header with signature rose logo (`#FF385C`), compact search pill ("Anywhere · Any week · Add guests"), and user menu dropdown.
- **Listing Title & Action Bar:** Title, Share button with clipboard copy toast, and Wishlist / Save button with state persistence in `localStorage`.
- **5-Photo Bento Hero Grid:** 1 dominant left image + 4 right images (2x2) with smooth hover brightness transitions, rounded corner geometry, and floating "Show all photos" button.
- **Property Specs & Highlights:** 2 guests · 1 bedroom · 1 bed · 1 bath, Guest Favorite ribbon badge with 4.92 ★ rating, Dedicated workspace, Self check-in with keypad, and Free cancellation.
- **Description & Amenities:** Collapsible description with "Show more" modal dialog; top amenities grid + categorized "Show all 25+ amenities" modal.
- **Interactive Calendar:** 2-month calendar grid with date range selection (check-in/checkout), hover highlights, and "Clear dates" action.
- **Sticky Reservation Card:** Dynamic price breakdown calculating (Nights × ₹5,499) + Cleaning fee (₹1,200) + Service fee (14%) = Total before taxes. Guest counter stepper popover enforcing max capacity (2 guests). "Reserve" action triggers booking confirmation modal.
- **Rating Breakdown & Reviews:** Overall rating banner with 6 category progress bars (Cleanliness 4.9, Accuracy 5.0, Communication 4.9, Location 4.8, Check-in 5.0, Value 4.8) and 6 verified guest review cards.
- **Location & Map:** Styled map visualization of Candolim, Goa, distance highlights (Candolim Beach, Aguada Fort), and neighborhood description.
- **Meet Your Host:** Host profile card (Mirashya Stays), Superhost badge, response rate (100%), and "Contact Host" interaction.
- **Things to Know & Footer:** House rules, safety & property, cancellation policy, and Airbnb global footer.

### 2. Full-Screen Photo Tour Overlay
- Opened by clicking **"Show all photos"** or any photo in the hero grid.
- Top navigation bar with Back button (`←`), category filter tabs (All photos, Living room, Private Jacuzzi, Master Bedroom, Bathroom, Kitchen & Dining, Resort Exterior & Pool), and Share/Save actions.
- Categorized photo sections with high-res photos and room labels.
- Clicking any photo opens the single-photo **Lightbox** viewer.

### 3. Single-Photo Lightbox Viewer
- Full-screen modal viewer with large centered image and responsive aspect ratio.
- Previous (`<`) and Next (`>`) navigation arrows.
- **Full Keyboard Navigation:**
  - `←` (Left Arrow): Previous photo
  - `→` (Right Arrow): Next photo
  - `Escape`: Exit lightbox
- Photo counter (`X / 15`), room category, and descriptive captions.
- Smooth Framer Motion entrance and exit animations.

### 4. Production System Architecture Blueprint
- Located in `architecture/`:
  - `architecture-diagram.svg`: High-resolution diagram illustrating scaling strategy for frontend, edge CDN, API gateway, microservices, databases, OpenSearch geospatial indexing, Redis caching, and Kafka event streaming.
  - `ARCHITECTURE.md`: Technical whitepaper detailing architecture design decisions, scaling calculations (100M+ listings, 150k QPS search), and concurrency control (Redlock + optimistic locking for zero overbooking).

---

## 🚀 Getting Started

### Prerequisites
- Node.js version 18+ (tested on Node v20/v24)
- npm version 9+

### Installation
From the `code/` directory, install dependencies for the server and client:

```bash
# 1. Install server dependencies
cd server
npm install

# 2. Install client dependencies
cd ../client
npm install
```

### Running the Full Application
You can run both the Backend API and the React Frontend simultaneously:

#### Option A: Run Server & Client in separate terminals
```bash
# Terminal 1: Start Backend API (Port 5000)
cd server
npm run dev

# Terminal 2: Start Frontend (Port 5173)
cd client
npm run dev
```

#### Option B: Run Concurrently from the root `code/` folder
```bash
cd code
npm run dev
```

- **Frontend URL:** `http://localhost:5173`
- **Backend API URL:** `http://localhost:5000` (`http://localhost:5000/api/health`)

---

## 📂 Project Directory Structure

```
code/
├── package.json                 # Monorepo launch & build scripts
├── README.md                    # Project documentation
├── architecture/
│   ├── architecture-diagram.svg # Production system architecture diagram
│   └── ARCHITECTURE.md          # Architectural whitepaper & scaling strategy
├── ai-workflow/
│   ├── subagents/               # AI subagent configurations
│   ├── skills/                  # Specialized AI skills
│   └── prompt-sequence.md       # AI prompt sequence log
├── server/                      # Node.js + Express backend
│   ├── src/
│   │   ├── index.ts             # Express server entry point
│   │   ├── routes/              # Modular REST routes (listing, reservations, reviews)
│   │   ├── data/                # Data seed (Candolim 1BHK listing, photos, reviews)
│   │   └── types.ts             # TypeScript interfaces
│   ├── package.json
│   └── tsconfig.json
└── client/                      # React 18 + Vite frontend
    ├── src/
    │   ├── App.tsx              # Root application & state coordination
    │   ├── main.tsx             # React DOM entry
    │   ├── components/          # 15+ modular UI components & modals
    │   ├── services/            # API client with fallback capability
    │   └── types/               # TypeScript interfaces
    ├── tailwind.config.js       # Airbnb design tokens configuration
    ├── package.json
    └── vite.config.ts
```

---

## ♿ Accessibility & Keyboard Support
- **Lightbox Navigation:** Press `ArrowLeft` and `ArrowRight` to cycle photos.
- **Dialog Escape:** Press `Escape` on keyboard to close Lightbox, Photo Tour, Amenities modal, Description modal, or Reservation modal.
- **ARIA Semantics:** Dialog roles (`role="dialog"`, `aria-modal="true"`), descriptive `aria-label` attributes, and keyboard focus management.
