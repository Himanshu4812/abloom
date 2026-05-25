# Abloom

A premium single-page landing website for **Abloom**, an exclusive nature-centric villa community near Nashik, India. Built by **Hiranmayi**, the project showcases a refined retreat where spiritual tranquility meets green luxury — spread over 3 acres with only 10 premium plots.

**Tagline:** *"Awesomely blossom with nature"*

![Abloom Homepage](/images/Homepage.jpg)

---

## Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | **Hero** | Full-screen cinematic scroll animation. 90 pre-rendered frames are played back on a `<canvas>` element synced to scroll position via Framer Motion + Lenis smooth scroll. Three layers of animated typography fade in/out across the scroll sequence, ending with a call-to-action. Respects `prefers-reduced-motion`. |
| 2 | **Overview** | "The Vision" — project description with an interactive fan-out card carousel. Each card displays a volume chapter with imagery and copy. Swipe/tap to cycle through chapters. Key project stats displayed below. |
| 3 | **Amenities** | "Key Highlights" — a two-column grid of project features (river proximity, 3-acre spread, 10 equal plots, ready infrastructure, proximity to Nashik & Trambakeshwar). |
| 4 | **Unit Infrastructure** | Describes the ready infrastructure of each plot and includes a brand blurb about the developer. |
| 5 | **Gallery** | A responsive image gallery with hover-to-enlarge overlays. Clicking opens the image in a new tab. |
| 6 | **Plans** | Master plan display with a "Click to enlarge" overlay that opens the full plan image. |
| 7 | **Get In Touch** | Contact section with phone, address, email, and a contact form (name, email, message). |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 (strict mode) |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS 4 + `tw-animate-css` |
| **Animation** | Framer Motion 12, Lenis (smooth scroll), GSAP |
| **Icons** | Lucide React |
| **Component Library** | shadcn/ui (New York style) + Radix UI primitives |
| **Forms** | react-hook-form + Zod |
| **Analytics** | Vercel Analytics (production only) |
| **Fonts** | Inter (sans-serif), Playfair Display (serif) — loaded via Next.js font system |
| **Image Optimization** | Sharp |
| **Package Manager** | npm / pnpm |

---

## Project Structure

```
abloom/
├── app/
│   ├── globals.css              # Global styles (Tailwind v4 + Abloom nature theme)
│   ├── layout.tsx                # Root layout (fonts, metadata, viewport, Analytics)
│   └── page.tsx                  # Main landing page (assembles all sections)
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── MainLayout.tsx             # Top-level layout wrapper (Header + Footer)
│   │   │   ├── Header.tsx                 # Fixed navigation bar with mobile menu
│   │   │   ├── Footer.tsx                 # 3-column footer
│   │   │   └── SmoothScrollProvider.tsx   # Lenis smooth scroll engine
│   │   ├── sections/
│   │   │   ├── Hero.tsx                   # Hero wrapper → delegates to HeroScrollSequence
│   │   │   ├── HeroScrollSequence.tsx     # Cinematic scroll-driven canvas animation (90 frames)
│   │   │   ├── Overview.tsx               # Vision + interactive card carousel
│   │   │   ├── Features.tsx               # Amenities/Key Highlights grid (exported as Amenities)
│   │   │   ├── UnitInfrastructure.tsx     # Infrastructure description + brand blurb
│   │   │   ├── Gallery.tsx                # Image gallery
│   │   │   ├── PlansSection.tsx           # Master plan with enlarge overlay
│   │   │   └── GetInTouch.tsx             # Contact info + form
│   │   └── ui/
│   │       └── Container.tsx              # Reusable max-width wrapper
│   ├── data/
│   │   ├── abloom.ts                     # All project content (overview, highlights, gallery, etc.)
│   │   └── contact.ts                    # Contact info + company details
│   └── lib/
│       ├── types.ts                      # TypeScript interfaces
│       └── utils.ts                      # cn(), fadeUp, staggerContainer
│
├── components/ui/              # shadcn/ui generated components (~60+ files)
│   ├── button.tsx, card.tsx, dialog.tsx, form.tsx, input.tsx, ...
│   └── ...
├── hooks/
│   ├── use-mobile.ts           # Mobile viewport detection
│   └── use-toast.ts           # Toast notification hook
├── lib/
│   └── utils.ts                # Utility helpers (cn, animation variants)
├── styles/
│   └── globals.css             # Alternative shadcn default theme
├── public/
│   ├── abloom-hero-section/    # 90 sequential frames (frame_002.jpg – frame_091.jpg)
│   ├── images/                 # Gallery images, master plan, hero background
│   ├── placeholder-logo.png
│   └── ...
├── next.config.mjs
├── tsconfig.json
├── package.json
├── components.json             # shadcn/ui configuration
├── postcss.config.mjs
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 20+ (recommended)
- npm or pnpm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

## Hero Scroll Animation

The hero section uses a scroll-driven frame animation technique:

1. **90 sequential frames** (`frame_002.jpg` – `frame_091.jpg`) are preloaded into memory.
2. A `<canvas>` element maps scroll progress to frame index via `useScroll` + `useSpring` from Framer Motion.
3. The sticky canvas fills the viewport for the full **300vh** scroll track.
4. Three typography layers fade in/out at different scroll intervals.
5. **Reduced motion** users see a static background with the CTA.

---

## Contact Form

The contact form currently uses client-side `alert()` and `console.log` — no backend submission is implemented. To integrate a backend, update the form submission handler in `src/components/sections/GetInTouch.tsx`.

---

## Deployment

Ready to deploy on **Vercel** or any platform supporting Next.js.

For Vercel:
1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Ensure `NODE_ENV=production` for analytics to fire.

---

## Configuration Notes

- `next.config.mjs`: TypeScript build errors are ignored (`ignoreBuildErrors: true`), images are unoptimized for static export compatibility.
- `components.json`: shadcn/ui configured with New York style and Lucide icons.
- The project uses **Tailwind CSS v4** with the `@tailwindcss/postcss` plugin.
- Dual global CSS files exist: `app/globals.css` (active — Abloom nature theme) and `styles/globals.css` (default shadcn neutral theme, unused).

---

## License

Private — All rights reserved. Hiranmayi.
