# Weru TV Website — Implementation Plan
**Last updated: May 2025 · Incorporates WeruTV_Implementation_Guide_v2.md**

---

## 1. Current Technology Stack

| Layer | Current | Target |
|-------|---------|--------|
| Framework | Next.js 15 (App Router) | No change |
| UI | React 19 + TypeScript | No change |
| Styling | Tailwind CSS v4 (`@theme inline`) | No change |
| Font | Outfit via `<link>` in `layout.tsx` | Space Grotesk + DM Serif Display via `next/font` |
| Animation | Framer Motion | No change (named imports only) |
| Deployment | Netlify + `@netlify/plugin-nextjs` | Add Brotli + cache headers |

---

## 2. Site Map

### Live Pages

| Route | File | Status |
|-------|------|--------|
| `/` | `src/app/page.tsx` | Live |
| `/tv` | `src/app/tv/page.tsx` | Live |
| `/radio` | `src/app/radio/page.tsx` | Live |
| `/blog` | `src/app/blog/page.tsx` | Live — hardcoded data |

### Coming Soon Stubs

| Route | File | Content Needed |
|-------|------|----------------|
| `/politics` | `src/app/politics/page.tsx` | Parliament, elections, governance |
| `/sports` | `src/app/sports/page.tsx` | Scores, fixtures, athlete interviews |
| `/technology` | `src/app/technology/page.tsx` | Tech ecosystem, startup stories |
| `/agriculture` | `src/app/agriculture/page.tsx` | Farming, market prices, weather |
| `/weather` | `src/app/weather/page.tsx` | County forecasts |
| `/bots` | `src/app/bots/page.tsx` | AI alert and reminder bots |

---

## 3. Homepage Section Order

```
Navbar (fixed, glass-strong)
├── HeroSection          — Live TV player (left) + Rich headline carousel (right)
├── HeadlineTicker       — Scrolling news ticker → triggers ViewerCaptureModal
├── VideoGrid            — Latest video clips
├── TVProgramLineup      — 4-row windowed schedule preview
├── RadioSection         — Live radio player + 2-program preview
├── AdvertiseSection     — Stats + platform cards + running-ads strip
├── NewsGrid             — 6 article cards
├── ReviewsCarousel      — 3D orb reviews
├── PartnersCarousel     — 10 partner logo strip
├── RateCardForm         — Full enquiry form
└── Footer
```

---

## 4. Component Inventory

### Layout

**`Navbar.tsx`** — Fixed, scroll-hide on down/reveal on up. Links: Home, TV, Radio, Politics, Sports, Technology, Agriculture, Weather. Right CTAs: Live Radio, Live TV, Advertise. Mobile hamburger drawer.

**`Footer.tsx`** — Dark red (`#7A1010`). Brand + Rate Card CTA | Nav links | Contact | Social icons. Copyright bar with Privacy Policy + Terms.

### UI Overlays

**`FloatingCTA.tsx`** — Appears after 400px scroll. Fixed bottom-right → `#rate-card`.

**`ViewerCaptureModal.tsx`** — Fires once per session (`localStorage: weru_viewer_seen`). Triggered when `#headlines` enters viewport. Fields: name\*, phone\*, interests. POSTs to `/api/viewer`.

**`AdvertisingModal.tsx`** — Reusable, title prop-driven. Fields: name\*, company, phone\*, email\*, adType\*, budget, message. POSTs to `/api/rate-card`. Success screen with WhatsApp CTA.

### Page Sections

| Component | Pages | Key Behaviour |
|-----------|-------|---------------|
| `HeroSection` | Home | 50/50 split — YouTube live left, 8-headline carousel right, 4s interval |
| `HeadlineTicker` | Home | Infinite scroll, `id="headlines"` |
| `VideoGrid` | Home, TV | 8 hardcoded cards, links to YouTube channel |
| `LiveStream` | TV | YouTube iFrame, props: `youtubeChannelId`, `youtubeVideoId` |
| `ShowsCarousel` | TV | Full-viewport 5-show carousel, 5s auto-advance |
| `TVProgramLineup` | Home | Windowed 4-row schedule, time-aware, localStorage bells |
| `TVScheduleSection` | TV | Full 7-day card grid, on-air glow, past dimming |
| `RadioSection` | Home, Radio | Audio player + 2-program preview (current + next), pill tabs |
| `RadioScheduleSection` | Radio | Full 7-day 2-col card grid |
| `AdvertiseSection` | Home | Stats + 3-platform grid + embedded running-ads strip |
| `NewsGrid` | Home | 6 hardcoded articles → `/blog` |
| `ReviewsCarousel` | Home | 3D orb, `perspective: 1100px`, `rotateY` per offset |
| `PartnersCarousel` | Home | Infinite scroll, 10 partners, 65s loop |
| `RateCardForm` | Home, TV, Radio | Full-page enquiry form |

---

## 5. Data Layer

### `src/data/tvSchedule.ts`

```ts
type ProgramTag = "News" | "Morning" | "Health" | "Business" | "Entertainment"
               | "Music" | "Sports" | "Culture" | "Kids" | "Documentary" | "Magazine"

type Program = {
  id: string        // "mon-1"
  time: string      // "7:00 PM"
  name: string
  description: string
  presenter: string
  tag: ProgramTag
}
```
7 days × ~11 programs = **77 programs**. Range: 5:00 AM – 10:30 PM.

### `src/data/radioSchedule.ts`

```ts
type RadioProgram = {
  id: string        // "rmon-1"
  name: string
  host: string
  time: string      // "4:00 AM – 8:00 AM"
  description: string
}
```
7 days × 8 programs = **56 programs**. Range: 4:00 AM – midnight.

---

## 6. API Routes

### `POST /api/rate-card`
Body: `{ name, company, phone, email, adType, budget, message }`  
Validates: name, phone, email (regex), adType required.  
**Current:** `console.log` only. **To activate:** uncomment Supabase + Resend blocks.

### `POST /api/viewer`
Body: `{ name, phone, interests[] }`  
Validates: name, phone required.  
**Current:** `console.log` only. **To activate:** uncomment Supabase block.

---

## 7. Design System

### Brand Tokens (`globals.css @theme inline`)

| Token | Value | Use |
|-------|-------|-----|
| `--color-weru-orange` | `#f97d00` | CTAs, active states, progress bars |
| `--color-weru-red` | `#C8102E` | LIVE badges, BREAKING labels |
| `--color-weru-dark-red` | `#7A1010` | Footer only |
| `--color-weru-gold` | `#FACC15` | Stars, logo accent |
| `--color-weru-black` | `#0A0A0A` | Page backgrounds |

### Target Glass System (v2 spec)

| Class | Background | Blur | Applied to |
|-------|-----------|------|-----------|
| `.glass` | `rgba(255,255,255,0.06)` | 16px | Cards: video, news, schedule rows, reviews |
| `.glass-sm` | `rgba(255,255,255,0.04)` | 8px | Chips, pills, tags, partner logos, compact rows |
| `.glass-strong` | `rgba(10,10,10,0.55)` | 24px | Navbar, modals, show overlay, mobile drawer |
| `.glass-light` | `rgba(255,255,255,0.92)` | 16px | Forms, rate card, light sections |
| `.glass-orange` | `rgba(249,125,0,0.12)` | 16px | Platform cards, floating CTA, play button |
| `.glass-red` | `rgba(200,16,46,0.15)` | 12px | LIVE badge, BREAKING badge |

All classes require an `@supports not (backdrop-filter)` fallback for older Android devices.

### LocalStorage Keys

| Key | Purpose |
|-----|---------|
| `weru_viewer_seen` | Prevent ViewerCaptureModal firing twice |
| `tv_notifications` | JSON array of subscribed TV program IDs |
| `radio_notifications` | JSON array of subscribed radio program IDs |

---

## 8. Execution Plan

Changes from `WeruTV_Implementation_Guide_v2.md` are split into 6 phases ordered by impact and dependency. Each phase can be deployed independently.

---

### Phase 0 — Foundation (globals.css + fonts)
**Impact: Highest. Every other phase depends on this. Do this first.**

#### 0-A · `src/app/globals.css` — Expand glass system

Add `.glass-orange`, `.glass-red` classes. Replace existing `.glass`, `.glass-sm`, `.glass-strong`, `.glass-light` with v2 exact values. Add `@supports not (backdrop-filter)` fallback block. Add `.skeleton` sweep animation. Add `.hero-progress` + `.hero-progress-fill` classes. Add `input, select, textarea { font-size: 16px }` to prevent iOS Safari auto-zoom.

```css
/* ADD — .glass-orange */
.glass-orange {
  background: rgba(249, 125, 0, 0.12);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(249, 125, 0, 0.25);
  border-radius: 16px;
}

/* ADD — .glass-red */
.glass-red {
  background: rgba(200, 16, 46, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(200, 16, 46, 0.30);
  border-radius: 8px;
}

/* ADD — @supports fallback */
@supports not (backdrop-filter: blur(1px)) {
  .glass        { background: rgba(30, 30, 30, 0.92); }
  .glass-sm     { background: rgba(30, 30, 30, 0.88); }
  .glass-strong { background: rgba(10, 10, 10, 0.95); }
  .glass-light  { background: rgba(255, 255, 255, 0.98); }
  .glass-orange { background: rgba(40, 20, 0, 0.92); }
  .glass-red    { background: rgba(60, 0, 10, 0.92); }
}

/* ADD — skeleton loader */
.skeleton {
  background: linear-gradient(90deg,
    rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 100%);
  background-size: 200% 100%;
  animation: skeleton-sweep 1.5s ease-in-out infinite;
  border-radius: 8px;
}
@keyframes skeleton-sweep {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ADD — hero progress bar */
.hero-progress      { height: 3px; background: rgba(255,255,255,0.15); border-radius: 2px; }
.hero-progress-fill { height: 100%; background: #f97d00; border-radius: 2px; transition: width 40ms linear; }

/* ADD — prevent iOS zoom on focus */
input, select, textarea { font-size: 16px; }
```

#### 0-B · `src/app/layout.tsx` — Switch to `next/font`

Replace the `<link rel="stylesheet">` Google Fonts tag with `next/font/google`. This serves fonts from the same domain, eliminating the external DNS lookup (saves 200–600ms on mobile).

```typescript
import { Space_Grotesk, DM_Serif_Display } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})
const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-dm-serif',
  display: 'swap',
})
// Apply both variables to <html>
```

Then in `globals.css`:
```css
body        { font-family: var(--font-space-grotesk), sans-serif; }
.font-headline { font-family: var(--font-dm-serif), serif; }
```

#### 0-C · Create utility hooks

**`src/hooks/useMediaQuery.ts`** — Used by ReviewsCarousel to disable 3D on mobile.  
**`src/hooks/usePrefersReducedMotion.ts`** — Used across all Framer Motion components.

---

### Phase 1 — Hero Section
**Impact: High — above-the-fold, first impression.**

#### 1-A · `HeroSection.tsx` — YouTube poster + click-to-load pattern

Replace the always-loaded `<iframe>` with a thumbnail image + play button. On click, swap to the iframe with `autoplay=1`. This is the single highest-impact performance fix — saves 3–5 seconds of Time to Interactive on mobile.

```typescript
const [isPlaying, setIsPlaying] = useState(false)
// Render: thumbnail → <img> poster, click → setIsPlaying(true) → render <iframe autoplay=1>
```

The poster uses `.glass-orange` for the play button circle, `.glass-red` for the LIVE badge.

#### 1-B · `HeroSection.tsx` — Enrich Headline data model

```typescript
type Headline = {
  id:            string
  category:      string
  categoryColor: string    // hex
  isBreaking:    boolean
  headline:      string
  author:        string    // e.g. "James Mwangi"
  timeAgo:       string    // e.g. "3 min ago"
  imageUrl?:     string    // optional thumbnail
  link:          string
}
```

#### 1-C · `HeroSection.tsx` — Rich News Card with progress bar

Replace plain `<h2>` + category badge with a `.glass` card containing:
- Optional thumbnail with dark gradient overlay
- `.glass-red` BREAKING badge (conditional on `isBreaking`)
- `.glass-sm` category pill
- `font-headline` (DM Serif) for the featured headline
- Author avatar (initials circle) + name + timeAgo
- Orange progress bar at bottom (40ms interval, 100 ticks = 4s)
- 3 compact `.glass-sm` headline pills below the main card

Progress state: `const [progress, setProgress] = useState(0)`. Pause on hover/touch.

#### 1-D · `HeroSection.tsx` — Mobile layout

Change outer flex from `flex-row` to `flex-col md:flex-row`. On mobile: video on top, headline card full-width below. Apply `pt-20 md:pt-28` to the section for navbar clearance. Cap headline to `text-2xl md:text-4xl` with `line-clamp-2 md:line-clamp-none`.

---

### Phase 2 — Glassmorphism Rollout
**Apply glass classes across all components. Do all in one pass.**

| File | Change |
|------|--------|
| `Navbar.tsx` | `<nav>` → `glass-strong`. Mobile drawer → `glass-strong fixed inset-0`. Remove any `bg-black` / `bg-[#0A0A0A]` from nav element. |
| `VideoGrid.tsx` | Each card `<div>` → `glass overflow-hidden`. Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`. |
| `TVProgramLineup.tsx` | Each row → `glass-sm`. On-air row → `glass-orange`. |
| `TVScheduleSection.tsx` | Each program card → `glass`. Past programs → `glass-sm opacity-40`. |
| `RadioSection.tsx` | Player container → `glass`. Preview program cards → `glass-sm`. |
| `RadioScheduleSection.tsx` | Each program card → `glass`. Past cards → `glass-sm opacity-40`. |
| `ShowsCarousel.tsx` | Text overlay panel → `glass-strong absolute bottom-0 left-0 right-0`. |
| `AdvertiseSection.tsx` | Platform cards (TV, Radio, Digital) → `glass-orange`. Stats cards → `glass`. |
| `NewsGrid.tsx` | Each `<article>` → `glass overflow-hidden`. |
| `ReviewsCarousel.tsx` | Each review card → `glass`. |
| `RateCardForm.tsx` | Form wrapper → `glass-light`. |
| `FloatingCTA.tsx` | Button → `glass-orange`. |
| `ViewerCaptureModal.tsx` | Modal panel → `glass-strong`. Backdrop: `bg-black/60 backdrop-blur-sm`. |
| `AdvertisingModal.tsx` | Same as ViewerCaptureModal. |
| `PartnersCarousel.tsx` | Each logo slot → `glass-sm`. |
| `HeadlineTicker.tsx` | LIVE / category badges → `glass-red` / `glass-sm`. |

---

### Phase 3 — Mobile-First Refinements
**Per-component mobile fixes. All touch targets must be minimum 48×48px.**

#### `Navbar.tsx`
- Mobile drawer nav links: `py-3 text-lg`, min 48px height per link
- Ensure hamburger button is `w-12 h-12`

#### `ShowsCarousel.tsx`
- Disable auto-advance on mobile; enable swipe gestures:
  ```typescript
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd   = (e) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (delta > 50) goNext(); if (delta < -50) goPrev()
  }
  ```
- Reduce height to `h-[60vh]` on mobile (currently full viewport)

#### `TVProgramLineup.tsx`
- Show 3 rows on mobile (not 4)
- Bell button: `w-11 h-11 flex items-center justify-center` minimum

#### `RadioSection.tsx`
- Play/pause: `w-14 h-14 md:w-12 md:h-12`
- Replace volume slider with mute toggle on mobile:
  ```tsx
  <button className="md:hidden w-11 h-11 ...">mute icon</button>
  <input type="range" className="hidden md:block w-24" />
  ```
- Audio: `audio.preload = 'none'` — do not preload on mobile

#### `ReviewsCarousel.tsx`
- On mobile (`useMediaQuery('(max-width: 768px)')`): hide non-active cards, disable `rotateY`, show single card only with swipe navigation

#### `AdvertiseSection.tsx`
- Stats grid: `grid-cols-2 md:grid-cols-4`
- Platform cards: `grid-cols-1 md:grid-cols-3` (currently `sm:grid-cols-5` asymmetric)

#### `NewsGrid.tsx`
- `grid-cols-1 md:grid-cols-3`

#### `ViewerCaptureModal.tsx` + `AdvertisingModal.tsx`
- Full-screen on mobile: `fixed inset-0 md:inset-auto md:max-w-md md:rounded-[20px]`
- Close button: `w-11 h-11` minimum

#### `FloatingCTA.tsx`
- Position: `bottom-6 md:bottom-8 right-4 md:right-8`

#### `Footer.tsx`
- Columns: `grid-cols-1 md:grid-cols-3`
- Social icons: `w-11 h-11` minimum touch target

#### `RateCardForm.tsx`
- Submit button: `w-full md:w-auto`

---

### Phase 4 — Performance Optimizations

#### 4-A · Dynamic imports for below-fold heavy components (`src/app/page.tsx`)

```typescript
import dynamic from 'next/dynamic'

const ReviewsCarousel = dynamic(
  () => import('@/components/sections/ReviewsCarousel'),
  { ssr: false, loading: () => <div className="glass h-64 animate-pulse" /> }
)
const PartnersCarousel = dynamic(
  () => import('@/components/sections/PartnersCarousel'),
  { ssr: false, loading: () => <div className="glass h-24 animate-pulse" /> }
)
```

#### 4-B · `next/image` with `sizes` prop (all components using `<Image>`)

```tsx
// Full-width mobile, half desktop
sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"

// Video grid: 1-col mobile, 2-col tablet, 4-col desktop
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
```

#### 4-C · Static generation for data pages

Add to `blog/page.tsx`, `tv/page.tsx`, `radio/page.tsx`:
```typescript
export const dynamic    = 'force-static'
export const revalidate = 3600
```

#### 4-D · Framer Motion — audit all imports

Change any `import * as motion` to named imports:
```typescript
import { motion, AnimatePresence, useInView } from 'framer-motion'
```

#### 4-E · `usePrefersReducedMotion` in animated components

Wrap all `initial`/`animate` props:
```typescript
const reduced = usePrefersReducedMotion()
<motion.div animate={reduced ? {} : { opacity: 1, y: 0 }} initial={reduced ? {} : { opacity: 0, y: 20 }}>
```

#### 4-F · `netlify.toml` — Cache + compression headers

```toml
[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/fonts/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=86400"

[[headers]]
  for = "/*"
  [headers.values]
    Content-Encoding = "br"
```

#### 4-G · Skeleton loading states

Use `.skeleton` class for all loading placeholders — keeps the dark aesthetic consistent.

---

### Phase 5 — Backend Activation

#### 5-A · Config (no code changes)
- [ ] Replace YouTube channel ID (`UCxxxxxxxxxxxxxxxxxxxxxx`) in `HeroSection.tsx` + `LiveStream.tsx`
- [ ] Replace WhatsApp number (`254700000000`) in `Footer.tsx`, `AdvertisingModal.tsx`, `RateCardForm.tsx`
- [ ] Confirm radio stream is live at `https://stream.werudigital.co.ke/radio`
- [ ] Set Netlify env vars: `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `RESEND_API_KEY`

#### 5-B · Supabase
- [ ] `npm install @supabase/supabase-js`
- [ ] Create table `rate_card_enquiries` — columns: `id uuid, name text, company text, phone text, email text, ad_type text, budget text, message text, created_at timestamptz`
- [ ] Create table `viewer_leads` — columns: `id uuid, name text, phone text, interests text, created_at timestamptz`
- [ ] Uncomment Supabase inserts in `/api/rate-card/route.ts` and `/api/viewer/route.ts`

#### 5-C · Resend
- [ ] Uncomment Resend email dispatch in `/api/rate-card/route.ts`
- [ ] Confirm recipient address `sales@werudigital.co.ke`

#### 5-D · Test
- [ ] Submit Rate Card form → check Supabase row + email received
- [ ] Submit Viewer Capture modal → check Supabase row

---

### Phase 6 — Content & Features

#### 6-A · Content pages (currently "Coming Soon")
- [ ] `/politics` — article grid, category filter, live parliament feed
- [ ] `/sports` — scores widget, fixtures, articles
- [ ] `/technology` — article grid
- [ ] `/agriculture` — market prices table, weather widget
- [ ] `/weather` — county-by-county forecast component
- [ ] `/bots` — notification subscription UI, wire to OneSignal or Firebase

#### 6-B · Dynamic data
- [ ] YouTube Data API v3 — replace hardcoded `VideoGrid` cards
- [ ] Replace 8 hardcoded reviews with Google Places API or manual CMS entry
- [ ] Replace 10 hardcoded partner logos with real assets
- [ ] Replace hardcoded blog articles with CMS (Sanity / Contentful / Notion API)

#### 6-C · Notifications (Bots)
- [ ] Replace `localStorage` notification state with server-side subscriptions
- [ ] Wire TV/radio bells to OneSignal or Firebase push
- [ ] Build `/bots` page as the notification management hub

---

## 9. External Integrations Reference

### YouTube
| Item | State | Required action |
|------|-------|-----------------|
| Live stream channel ID | Placeholder `UCxxxxxxxxxxxxxxxxxxxxxx` | Replace in `HeroSection.tsx`, `LiveStream.tsx` |
| Video grid | 8 hardcoded cards | YouTube Data API v3 |
| "View All" link | `youtube.com/@werutv` | Confirm handle |

### Radio Stream
| Item | State |
|------|-------|
| URL | `https://stream.werudigital.co.ke/radio` |
| Player | HTML5 `<audio>`, created on first tap |
| Note | `preload="none"` must be set (Phase 3) |

### Supabase — not yet installed
Tables needed: `rate_card_enquiries`, `viewer_leads`

### Resend — not yet configured
Recipient: `sales@werudigital.co.ke`. Env var: `RESEND_API_KEY`.

### WhatsApp
All `wa.me/254700000000` links are placeholders. Replace with real number.

---

## 10. File Structure Reference

```
src/
├── app/
│   ├── layout.tsx              ← Phase 0-B: next/font
│   ├── globals.css             ← Phase 0-A: glass system + skeleton + progress bar
│   ├── page.tsx                ← Phase 4-A: dynamic imports
│   ├── tv/page.tsx             ← Phase 4-C: force-static
│   ├── radio/page.tsx          ← Phase 4-C: force-static
│   ├── blog/page.tsx           ← Phase 4-C: force-static
│   ├── politics/ sports/ technology/ agriculture/ weather/ bots/   ← Phase 6-A
│   └── api/
│       ├── rate-card/route.ts  ← Phase 5-B/C
│       └── viewer/route.ts     ← Phase 5-B
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          ← Phase 2, 3
│   │   └── Footer.tsx          ← Phase 2, 3
│   ├── sections/
│   │   ├── HeroSection.tsx     ← Phase 1 (highest priority)
│   │   ├── HeadlineTicker.tsx  ← Phase 2
│   │   ├── VideoGrid.tsx       ← Phase 2, 3
│   │   ├── LiveStream.tsx      ← Phase 5-A (channel ID)
│   │   ├── ShowsCarousel.tsx   ← Phase 2, 3
│   │   ├── TVProgramLineup.tsx ← Phase 2, 3
│   │   ├── TVScheduleSection.tsx ← Phase 2
│   │   ├── RadioSection.tsx    ← Phase 2, 3
│   │   ├── RadioScheduleSection.tsx ← Phase 2
│   │   ├── AdvertiseSection.tsx ← Phase 2, 3
│   │   ├── NewsGrid.tsx        ← Phase 2, 3
│   │   ├── ReviewsCarousel.tsx ← Phase 2, 3
│   │   ├── PartnersCarousel.tsx ← Phase 2
│   │   └── RateCardForm.tsx    ← Phase 2, 3
│   └── ui/
│       ├── FloatingCTA.tsx     ← Phase 2, 3
│       ├── ViewerCaptureModal.tsx ← Phase 2, 3
│       └── AdvertisingModal.tsx   ← Phase 2, 3
├── hooks/                      ← Phase 0-C (create folder + 2 hooks)
│   ├── useMediaQuery.ts
│   └── usePrefersReducedMotion.ts
└── data/
    ├── tvSchedule.ts           ← 77 programs, all days
    └── radioSchedule.ts        ← 56 programs, all days
```

---

## 11. Prioritised Execution Order

| # | Phase | File(s) | Why first |
|---|-------|---------|-----------|
| 1 | 0-A | `globals.css` | All glass classes must exist before any component uses them |
| 2 | 0-B | `layout.tsx` | Font switch — affects every page, do before visual review |
| 3 | 0-C | `src/hooks/` | Hooks needed by Phase 1 + 3 |
| 4 | 1-A | `HeroSection.tsx` | Biggest performance gain (YouTube poster pattern) |
| 5 | 1-B/C | `HeroSection.tsx` | Rich card + progress bar |
| 6 | 1-D | `HeroSection.tsx` | Mobile stacked layout |
| 7 | 2 | All components | Glassmorphism pass — do all in one commit |
| 8 | 3 | All components | Mobile fixes — one commit per component |
| 9 | 4-A | `page.tsx` | Dynamic imports — easy win |
| 10 | 4-B | All `<Image>` | Add `sizes` prop |
| 11 | 4-C/D/E | Various | Static generation + motion + reduced-motion |
| 12 | 4-F | `netlify.toml` | Cache headers — deploy and done |
| 13 | 5 | API routes + env | Backend activation |
| 14 | 6 | New pages + CMS | Content |

---

## 12. Commands

```bash
npm run dev      # Dev server — http://localhost:3000
npm run build    # Production build (also catches TypeScript errors)
npm run lint     # ESLint
npm run start    # Serve production build locally
```

> **Cache issue:** If `npm run dev` fails with `Cannot find module './xxx.js'`, delete `.next/` and restart.

---

*Weru TV · Implementation Plan · May 2025*
*Sources: codebase survey + WeruTV_Implementation_Guide_v2.md*
