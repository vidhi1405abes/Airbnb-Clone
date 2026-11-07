# Claude Code Standards & Behavioral Rules

## 1. Frontend Standards
* **Framework:** React 18 with TypeScript functional components and hooks (`useState`, `useEffect`, `useRef`).
* **Styling:** Tailwind CSS utility classes following Airbnb's Design Language System (DLS). Avoid arbitrary hex values in components where standard brand tokens exist (`airbnb-brand`, `airbnb-charcoal`, `airbnb-muted`, `airbnb-border`).
* **Icons:** `lucide-react` for standard UI iconography; inline SVG for brand-specific symbols (Airbnb bélo logo, Guest Favorite laurels).
* **Keyboard Accessibility:** Modals must trap or handle `Escape` dismissal; lightboxes must listen to `ArrowLeft` and `ArrowRight`.

## 2. Backend Standards
* **Server Framework:** Express.js with TypeScript (`tsx` for live reloading).
* **Deterministic Calculations:** Reservation quotes must round accurately and compute subtotal, cleaning fee, 14% platform commission, and 12% occupancy taxes without floating-point inaccuracies.
* **REST Routing:** Routes must be partitioned by domain (`listing.ts`, `reservations.ts`, `reviews.ts`).

## 3. Preservation & Documentation
* Maintain existing docstrings and TypeScript interfaces.
* Do not introduce dependencies unless required by the core feature set.
