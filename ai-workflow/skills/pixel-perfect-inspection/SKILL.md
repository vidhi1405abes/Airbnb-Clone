---
name: pixel-perfect-inspection
description: Methodologies and checklist for inspecting and replicating real-world UI design systems (Airbnb DLS) with pixel-level precision.
---

# Skill: Pixel-Perfect UI Inspection

## 1. Design Token Checklist
- **Colors:**
  - Airbnb Brand Rose: `#FF385C`
  - Charcoal Primary Text: `#222222`
  - Secondary Muted Text: `#717171`
  - Border Gray: `#DDDDDD` / `#EBEBEB`
  - Surface Background: `#F7F7F7`
- **Typography:**
  - Font Stack: `Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif`
  - Header Sizes: Title `26px font-semibold`, Section Header `22px font-semibold`, Body `15px` / `16px`.
- **Card & Bento Geometry:**
  - Bento Hero Grid: 50% left large photo (`rounded-l-2xl`), 50% right 4-photo grid (`rounded-tr-2xl`, `rounded-br-2xl`).
  - Floating Buttons: `rounded-lg border border-black/80 font-semibold px-4 py-2 shadow-md`.

## 2. Interaction & Motion Rules
- **Hover Transitions:** Smooth brightness transitions (`brightness-90`) on photos without sudden layout jumps.
- **Photo Tour Overlay:** Full-screen modal with sticky top bar, category filters, and categorized room sections.
- **Lightbox Viewer:** Single-photo dark overlay with keyboard arrows (`ArrowLeft`, `ArrowRight`), `Escape` exit, and animated Framer Motion transitions.
