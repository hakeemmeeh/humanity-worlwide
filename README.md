# Humanity Worldwide (HWW)

Premium marketing website for [Humanity Worldwide](https://humanity-worldwide.org) — an international humanitarian NGO serving crisis-affected communities across South Sudan, Somalia, and Sudan.

Built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion and Supabase. It needs a Node/serverless host (Vercel recommended) — it is **no longer a static export** because it includes an admin area and API routes.

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

Produces a standard Next.js server build (`.next`). Deploy on Vercel or any Node host.

### Lint

```bash
npm run lint
```

## Project Structure

```
app/                  # Pages and routes (App Router)
components/           # Reusable UI components
  home/               # Homepage sections
data/content.ts       # Built-in site content + fallback for CMS-managed types
lib/published-content.ts  # Public readers: database first, built-in fallback
lib/admin/            # Session signing, content type config, admin queries
app/admin/            # Admin UI (inbox + content managers)
app/api/              # contact, volunteer, content CRUD, media upload, import
supabase/schema.sql   # Database schema + RLS + storage bucket
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

Add the environment variables from `.env.example` in the Vercel project settings.

## License

Private — © Humanity Worldwide (HWW). All rights reserved.
