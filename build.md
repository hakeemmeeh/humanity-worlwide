# CURSOR BUILD PROMPT — Humanity Worldwide (HWW) Premium Website Overhaul

## Role & Mandate

You are the lead engineer and designer rebuilding **humanity-worldwide.org** from scratch. This is not a refresh — it is a full rebuild of the digital experience for an international humanitarian NGO, to the quality bar of leading international NGO websites (charitywater.org, mercycorps.org, theoceancleanup.com). The result must feel like a custom-designed digital platform, never a modified charity template. No CMS for now — all content is hardcoded from the content inventory below (structure it in a single `data/content.ts` so a CMS can be bolted on later).

**Quality target:** every page reinforces trust, transparency, and measurable impact. Premium, minimal, editorial, human-centered, story-driven, accessible, mobile-first.

---

## Tech Stack

- **Next.js 14 (App Router), TypeScript** — strict mode on (`"strict": true` in `tsconfig.json`); all components `.tsx`, shared domain types in `types/index.ts` (`Program`, `Article`, `Campaign`, `Stat`, `Pillar`, `Story`, `Partner`, `Region`)
- **Tailwind CSS** — all design tokens in `tailwind.config.ts`
- **Framer Motion** — all animation (subtle only)
- **lucide-react** — icons (use sparingly; this design is photography- and typography-led, not icon-led)
- No CMS, no database. All content lives in a typed `data/content.ts` (typed against `types/index.ts`) so a CMS can replace it later without touching components. Forms are client-side with success states; leave clearly-marked `// TODO: wire to email/API` hooks
- **Multi-page architecture is mandatory** — this is NOT a single-page/one-scroll site. Every route in the Information Architecture below is a real page under `app/` with its own `page.tsx`, its own `metadata` export, and its own URL. No hash-link sections pretending to be pages; no client-side tab switching in place of routes
- Static export compatible (`next build` must pass clean with zero TypeScript errors)

---

## Brand & Design Tokens

The org has an existing identity: a teal "hands forming a star" logo mark, navy serif wordmark, tagline "for a better world". Preserve and elevate it — do not invent a new logo. Recreate the hands-star mark as an inline SVG component (`<HandsMark />`) so it can be reused as a watermark motif.

### Colors (Tailwind config)
```js
navy:  { DEFAULT: "#12304F", deep: "#0C2238", soft: "#1B3A5C" }  // headings, dark sections, footer
teal:  { DEFAULT: "#2CADA3", soft: "#E4F4F2" }                    // brand accent (from logo), links, highlights
coral: { DEFAULT: "#E1723C", dark: "#C85F2D", soft: "#FBEDE4" }   // ONLY for Donate/primary CTAs — scarcity gives it power
sand:  { DEFAULT: "#F7F3EC", deep: "#EFE8DC" }                    // warm alternating section backgrounds (never sterile gray)
ink:   "#1E252B"                                                   // body text
```
Rule: coral appears only on donation/action moments. Teal is the everyday accent. Navy carries authority. Sand keeps the page warm and editorial.

### Typography
- **Display:** Fraunces (400/500/600/700) — warm editorial serif for all H1–H3, stat numerals, pull quotes
- **Body:** Inter (400/500/600) — 16–18px body, relaxed leading
- Scale: H1 clamp(2.75rem, 6vw, 4.5rem); H2 ~2.25rem; eyebrow labels 12px, 0.18em letterspacing, uppercase, teal, preceded by a 32px teal rule
- Strong hierarchy contrast: huge serif display against quiet sans body is the core typographic identity

### Layout
- Max content width 1200px; section padding 80–96px desktop / 56px mobile; generous whitespace everywhere
- Cards: `rounded-2xl`, soft shadow `0 2px 24px rgba(18,48,79,0.08)`, white on sand or sand on white
- Buttons: pill-shaped (fully rounded), 14px semibold; coral primary, outlined navy secondary, ghost white on dark
- Photography: full-bleed cinematic documentary imagery of real people and field work (Unsplash placeholders for now, marked `// REPLACE with HWW field photos`); dark navy gradient overlays for text legibility; never icon-grid clutter

### Signature element (the one memorable device)
The `<HandsMark />` logo motif rendered at 400px+ as a low-opacity (5–7%) watermark bleeding off the corners of the navy Impact Statistics stripe, echoed subtly in the footer. This ties every dark section back to the brand without decoration for its own sake.

---

## Information Architecture (user goals, not org chart)

Primary nav: **Home · About · Our Work · Where We Work · Campaigns · Success Stories · News · Get Involved · Resources · Contact**

Header: slim navy utility bar (location, email, phone) → sticky white nav bar with logo, links, and a persistent coral **Donate Now** pill. Mobile: clean slide-down menu, Donate always visible.

Routes (each is a standalone page — own `page.tsx` + `metadata`):
```
/                      Homepage
/about                 Mission, pillars, team placeholder, history timeline
/our-work              Program overview grid
/our-work/education    Dedicated program landing page
/our-work/wash         Dedicated program landing page
/our-work/livelihoods  Dedicated program landing page
/where-we-work         Country/state presence (South Sudan, Somalia, Sudan) with simple SVG map or region cards
/campaigns             Featured emergency campaign(s) — lead with Jonglei flood response
/stories               Success stories (photo-led story cards + pull quotes)
/news                  Article grid
/get-involved          Donate widget + volunteer form
/resources             Reports/downloads placeholder grid (annual report, program briefs)
/contact               Contact info cards + form
```

---

## CONTENT INVENTORY (real content — use verbatim where marked, adapt tone elsewhere)

### Organization
- **Name:** Humanity Worldwide (HWW) — tagline "for a better world"
- **Mission (verbatim):** "An international civil society organization dedicated to delivering integrated humanitarian and development solutions for crisis-affected and marginalized populations across South Sudan, Somalia and Sudan."
- **Contact:** Kansas City, MO 64124, USA · cd@humanity-worldwide.org · +1 (816) 208-2270

### Four Pillars (About + homepage feature block)
1. **Protection & Rights** — Comprehensive humanitarian programs ensuring the safety, security, and rights of vulnerable populations in accordance with international standards.
2. **Integrated Services** — Holistic support programs including education, WASH, protection, livelihoods, shelter, and nutrition services across multiple sectors.
3. **Community Voice** — Community-driven development initiatives championing the rights of marginalized populations and ensuring their voices are heard at all levels.
4. **Evidence & Accountability** — Evidence-based programming with strong accountability mechanisms to promote sustainable human development and lasting positive change.

### Hero (homepage)
- Headline: **"Building Futures Through Education"** (design so headline is swappable/rotatable later)
- Sub: "Quality education and teacher training for crisis-affected communities"
- CTAs: **Donate Now** (coral) + **Explore Our Work** (ghost)
- Eyebrow: "South Sudan · Somalia · Sudan"

### Programs (each gets its own landing page)
**Education — "Building Futures"**
Quality education, teacher training, school construction, infrastructure development. UNICEF-supported projects in Kapoeta South, Kapoeta North, Torit and Magwi (South Sudan).
Stats: 12 Classrooms Built · 28 Teachers Trained · 92% Student Retention

**WASH & Environment — "Clean Water, Healthy Communities"**
Clean water, sanitation facilities, hygiene education; multiple water points rehabilitated.
Stats: 85% Reduction in waterborne diseases · 10,000 people reached · 8 states covered

**Livelihoods — "Economic Independence"**
Vocational training, microfinance, agricultural support, economic development for sustainable self-reliance.
Stats: 78% Income improvement rate · 6,000+ lives impacted · 7 regional offices

### Impact statistics (animated counters)
- 12 Classrooms Built — Creating safe learning spaces for hundreds of children
- 28 Teachers Trained — Enhancing education quality through professional development
- 140 Shelters Built — Providing safe homes for displaced families
- 6,000+ Lives Impacted — Transforming communities across South Sudan
- 92% Student retention rate
- 85% Reduction in waterborne diseases
- 78% Income improvement rate
- 7 Regional Offices · 6,000+ People Reached (About quick stats)

### Campaigns (featured emergency)
**Emergency Response in Jonglei State** — response efforts reached 2,000 families following devastating floods. Build this as the featured campaign page with a progress-bar donation banner.

### News articles
1. "Completion of UNICEF Education Projects in Kapoeta South, Kapoeta North, Torit and Magwi in South Sudan" — Jan 15, 2024 — Gift Michael Bernado — "A new education initiative brings hope to children in Kapoeta with comprehensive learning programs and teacher training."
2. "Emergency Response in Jonglei State" — Jan 10, 2024 — Michael Chen — "Emergency response efforts reach 2,000 families in Jonglei State following devastating floods."
3. "WASH Program Reaches 10,000 People" — Jan 1, 2024 — John Smith — "WASH program milestone: 10,000 people now have access to clean water across 8 states."

### Footer CTA (verbatim)
- Headline: "Join Us in Making a Difference"
- Sub: "Your support can transform lives and build sustainable communities. Every contribution helps us reach more people in need and create lasting positive change."
- CTAs: Donate Now (primary) · Become a Volunteer (secondary)

### Partnerships strip
UNICEF · local/state authorities · community organizations. Text: "Are you interested in working with us? Let's get started now."

---

## Homepage Structure (build in this exact order)

1. **Full-screen hero** — full-bleed documentary image, navy gradient overlay, eyebrow + huge Fraunces headline + sub + dual CTAs. Staggered fade-up on load.
2. **Ways to Give / donation widget** — Savior-style card overlapping the hero bottom (-mt): preset amounts $10 / $25 / $50 / $100 / $250 + custom input + coral "Donate $X Now" button. Beside it, the four pillars in a wide card (2×2, small teal icon chips, quiet).
3. **Animated impact statistics** — the navy stripe with HandsMark watermark, Fraunces counters animating on scroll, teal left-border stat blocks.
4. **Featured humanitarian programs** — 3 photo cards (Education / WASH / Livelihoods), image zoom on hover, tag chip, link to program landing pages.
5. **Interactive global impact section** — "Where We Work": South Sudan / Somalia / Sudan region cards (or simple SVG map with teal markers), each with presence stats; links to /where-we-work.
6. **Featured emergency campaign** — full-width Jonglei flood banner: image left, campaign copy + progress indicator + Donate CTA right.
7. **Success stories** — 2–3 story cards with portrait photography and a Fraunces pull quote; link to /stories.
8. **Latest news** — 3 article cards (date · author, headline, excerpt).
9. **Partners strip** — logo/name row on sand, "Let's get started now" CTA.
10. **CTA stripe** — coral band with "Join Us in Making a Difference" + dual CTAs.
11. **Rich footer** — navy-deep, 4 columns: brand + mission + socials · Explore links · Contact · Newsletter signup. Bottom bar: © Humanity Worldwide (HWW) · "Site by Xpeedium".

---

## Component Library (build as reusable, consistent, premium)

`Header` (utility bar + sticky nav + mobile menu) · `Footer` · `HandsMark` (SVG logo motif) · `PageHero` (eyebrow/title/sub/image variant for inner pages) · `Button` variants · `Card` · `StatBlock` + `Counter` (rAF count-up, eased, triggers once in view) · `ProgramCard` · `StoryCard` (photo + pull quote) · `NewsCard` · `Timeline` (About history) · `TeamProfile` (placeholder data) · `Gallery` · `Testimonial` · `DonationBanner` (campaign progress bar) · `FAQAccordion` (Get Involved + Resources) · `Forms` (contact, volunteer, newsletter — accessible labels, focus states, success states) · `CTAStripe` · `Reveal` (shared Framer fade-up-on-scroll wrapper, once, ~0.7s, custom ease `[0.22,1,0.36,1]`, staggered delays).

## Animation Rules
Subtle only: fade-in on scroll, number counters, image reveals (scale 1.05→1 or clip), card hover lift + shadow, smooth page transitions, campaign progress indicators. Respect `prefers-reduced-motion` globally. Nothing autoplays aggressively; no parallax soup.

## Accessibility (WCAG 2.1 AA)
Semantic landmarks (header/nav/main/footer), one h1 per page, logical heading order, visible focus rings (teal, 2px offset), keyboard-navigable menu and accordion, descriptive alt text on every image, form labels + aria on all inputs, color contrast ≥ 4.5:1 (check teal-on-white for text — darken to #1F8C84 where used as text on light backgrounds).

## Performance
next/image everywhere with responsive sizes, lazy loading below the fold, modern formats, minimal client JS (only interactive components marked "use client"), font display swap, no layout shift on counter/hero load. Target green Core Web Vitals.

## SEO
Per-page metadata via App Router `metadata` (template "%s | Humanity Worldwide"), Open Graph + Twitter cards, canonical URLs, clean semantic URLs as routed above, JSON-LD `Organization` + `NGO` schema in root layout with name/logo/contact, `sitemap.js` + `robots.js`, descriptive heading hierarchy.

---

## Build Order
1. `tsconfig.json` (strict) + types/index.ts + tokens + fonts + globals + Header/Footer/HandsMark
2. Shared components (Reveal, Counter, cards, buttons, forms)
3. Homepage top-to-bottom per structure above
4. Inner pages: About → Our Work + 3 program pages → Where We Work → Campaigns → Stories → News → Get Involved → Resources → Contact
5. SEO layer (metadata, schema, sitemap)
6. Accessibility + reduced-motion + mobile QA pass
7. `next build` must pass with zero errors and zero TypeScript errors — every IA route must resolve as its own page

At every step, self-critique against one question: *would this be mistaken for a charity template?* If yes, simplify, enlarge the typography, add whitespace, and let the photography breathe.