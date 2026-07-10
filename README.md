# Humanity Worldwide (HWW)

Premium marketing website for [Humanity Worldwide](https://humanity-worldwide.org) — an international humanitarian NGO serving crisis-affected communities across South Sudan, Somalia, and Sudan.

Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Static export ready for deployment to any static host (Vercel, Netlify, GitHub Pages, etc.).

## Tech Stack

- **Next.js 14** (App Router) + TypeScript (strict)
- **Tailwind CSS** — brand tokens in `tailwind.config.ts`
- **Framer Motion** — scroll animations and counters
- **lucide-react** — icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

Static output is written to `/out` (configured via `output: "export"` in `next.config.mjs`).

### Lint

```bash
npm run lint
```

## Project Structure

```
app/                  # Pages and routes (App Router)
components/           # Reusable UI components
  home/               # Homepage sections
data/content.ts       # All site content (CMS-ready)
types/index.ts        # Shared TypeScript types
tailwind.config.ts    # Design tokens (navy, teal, coral, sand)
```

## Content

All content lives in `data/content.ts`. To update copy, programs, news, or stats, edit that file — no CMS required. Forms and donations have `// TODO: wire to email/API` hooks for backend integration.

Replace Unsplash placeholder images with HWW field photos (marked in content).

## Routes

| Route | Page |
|---|---|
| `/` | Homepage |
| `/about` | Mission, pillars, timeline, team |
| `/our-work` | Program overview |
| `/our-work/education`, `/wash`, `/livelihoods` | Program landing pages |
| `/where-we-work` | Regional presence |
| `/campaigns` | Emergency campaigns |
| `/stories` | Success stories |
| `/news` | News & updates |
| `/get-involved` | Donate & volunteer |
| `/resources` | Reports & publications |
| `/contact` | Contact form |

## Deployment

### Vercel (recommended)

1. Push this repo to GitHub
2. Import the project at [vercel.com](https://vercel.com)
3. Deploy — no extra config needed

### Static hosting

After `npm run build`, upload the contents of `/out` to any static host.

## License

Private — © Humanity Worldwide (HWW). All rights reserved.
