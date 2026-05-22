# Abloom

A modern Next.js landing page for `Abloom`, a nature-centric residential project near Nashik. The site is built with a polished, responsive UI and showcases the project's hero section, overview, amenities, infrastructure, gallery, plans, and contact section.

## Key Features

- Fully responsive landing page built with Next.js 16 and TypeScript
- Hero section with background imagery and strong brand messaging
- Overview section powered by project content data
- Amenities / features and unit infrastructure sections
- Image gallery and master plan presentation
- Contact form with local form handling
- Custom UI components using Tailwind CSS and Radix UI primitives
- Built-in Vercel Analytics support for production

## Tech Stack

- `next` 16
- `react` 19
- `typescript`
- `tailwindcss` 4
- `@radix-ui/react` components
- `@vercel/analytics`
- `lucide-react`
- `react-hook-form` (available dependency)
- `zod` for data validation (available dependency)
- `npm` package manager

## Getting Started

### Prerequisites

- Node.js 20+ (recommended)
- `npm` included with Node.js

### Install dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

Open `http://localhost:3000` in your browser to view the project.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

- `app/` - Next.js app routes and root metadata
- `src/components/` - Reusable UI components and section layouts
- `src/data/` - Static page data for Abloom and contact details
- `public/images/` - Static image assets used by the landing page
- `styles/` - Global stylesheet defaults

## Notes

- The contact form currently uses a local `alert()` and console log, with no backend submission.
- Images referenced in the app are served from `public/images/`.
- The project is set up as a private application in `package.json`.

## Deployment

This project is ready to deploy on Vercel or any compatible platform that supports Next.js.

For Vercel, deploy the repository and ensure the `NODE_ENV` is set to `production` for analytics.
