# Weru TV Website — Implementation Plan

A complete record of what is built, what is stubbed, and what needs to be activated to go fully live.

---

## Current Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 + TypeScript |
| Styling | Tailwind CSS v4 (`@theme inline` in `globals.css`) |
| Animation | Framer Motion |
| Font | Outfit (Google Fonts, loaded via `<link>` in `layout.tsx`) |
| Deployment | Netlify (`@netlify/plugin-nextjs`, `netlify.toml`) |

---

## Site Map

### Live Pages

| Route | File | Status |
|-------|------|--------|
| `/` | `src/app/page.tsx` | Live |
| `/tv` | `src/app/tv/page.tsx` | Live |
| `/radio` | `src/app/radio/page.tsx` | Live |
| `/blog` | `src/app/blog/page.tsx` | Live (hardcoded data) |

### Coming Soon Pages

| Route | File | Content Needed |
|-------|------|---------------|
| `/politics` | `src/app/politics/page.tsx` | Parliament, elections, governance articles |
| `/sports` | `src/app/sports/page.tsx` | Scores, match coverage, athlete interviews |
| `/technology` | `src/app/technology/page.tsx` | Tech ecosystem, startup stories |
| `/agriculture` | `src/app/agriculture/page.tsx` | Farming tips, market prices, weather |
| `/weather` | `src/app/weather/page.tsx` | County-by-county forecasts |
| `/bots` | `src/app/bots/page.tsx` | AI alert and reminder bots |

---

## Homepage Section Order

```
Navbar (fixed)
└── HeroSection          — Live TV player + rotating headline carousel
└── HeadlineTicker       — Scrolling news ticker (triggers ViewerCaptureModal)
└── VideoGrid            — Latest video clips grid
└── TVProgramLineup      — 4-row windowed TV schedule preview
└── RadioSection         — Live radio player + 2-program preview
└── AdvertiseSection     — Stats + platform cards + booking CTAs
└── NewsGrid             — 6 article cards
└── ReviewsCarousel      — 3D orb reviews (8 Google reviews)
└── PartnersCarousel     — 10 partner logos
└── RateCardForm         — Full enquiry form
└── Footer
```

---

## Component Inventory

### Layout

**`src/components/layout/Navbar.tsx`**
- Scroll-hide on down, reveal on up
- Links: Home, TV, Radio, Politics, Sports, Technology, Agriculture, Weather
- Right CTAs: Live Radio (pulse dot), Live TV, Advertise (orange)
- Mobile hamburger with full nav
- Active route highlighting

**`src/components/layout/Footer.tsx`**
- Background: `#7A1010`
- Brand + tagline + Rate Card CTA
- Nav links column, Contact column, Social icons column
- Bottom bar: copyright, Privacy Policy, Terms of Service

### UI Overlays

**`src/components/ui/FloatingCTA.tsx`**
- Appears after 400px scroll
- Fixed bottom-right, links to `#rate-card`

**`src/components/ui/ViewerCaptureModal.tsx`**
- Fires once per session (localStorage: `weru_viewer_seen`)
- Triggered when `#headlines` enters viewport
- Fields: name*, phone*, interests (checkboxes)
- POSTs to `/api/viewer`

**`src/components/ui/AdvertisingModal.tsx`**
- Reusable modal, title via prop
- Fields: name*, company, phone*, email*, ad type*, budget, message
- POSTs to `/api/rate-card`
- Success screen with WhatsApp CTA

### Page Sections

| Component | Location | Key Behaviour |
|-----------|----------|---------------|
| `HeroSection` | Home | 50/50 split — YouTube live left, headline carousel right (8 headlines, 4s interval) |
| `HeadlineTicker` | Home | Infinite horizontal scroll, id="headlines" |
| `VideoGrid` | Home + TV | 8 hardcoded video cards, links to YouTube channel |
| `LiveStream` | TV page | YouTube iFrame, accepts `youtubeChannelId` + `youtubeVideoId` props |
| `TVProgramLineup` | Home | Windowed 4-row schedule, time-aware, localStorage notifications |
| `TVScheduleSection` | TV page | Full 7-day card grid, on-air glow, past-program dimming |
| `RadioSection` | Home + Radio | Audio player + 2-program preview (current + next), pill tabs |
| `RadioScheduleSection` | Radio page | Full 7-day 2-col card grid |
| `ShowsCarousel` | TV page | Full-viewport 5-show carousel, 5s auto-advance |
| `AdvertiseSection` | Home | Stats + 3-platform grid + embedded running-ads strip |
| `NewsGrid` | Home | 6 hardcoded articles, links to `/blog` |
| `ReviewsCarousel` | Home | 3D orb carousel, `perspective: 1100px`, `rotateY` per offset |
| `PartnersCarousel` | Home | Infinite scroll, 10 partners, 65s loop |
| `RateCardForm` | Home + TV + Radio | Full-page enquiry form, light inputs |

---

## Data Layer

### `src/data/tvSchedule.ts`

```ts
type ProgramTag = "News" | "Morning" | "Health" | "Business" | "Entertainment"
               | "Music" | "Sports" | "Culture" | "Kids" | "Documentary" | "Magazine"

type Program = {
  id: string        // e.g. "mon-1"
  time: string      // e.g. "7:00 PM"
  name: string
  description: string
  presenter: string
  tag: ProgramTag
}

type DaySchedule = {
  day: "Monday" | ... | "Sunday"
  programs: Program[]
}
```

- 7 days × ~11 programs = **77 programs total**
- Time range: 5:00 AM – 10:00 PM (weekdays), 7:00 AM – 10:30 PM (weekends)

### `src/data/radioSchedule.ts`

```ts
type RadioProgram = {
  id: string        // e.g. "rmon-1"
  name: string
  host: string
  time: string      // range, e.g. "4:00 AM – 8:00 AM"
  description: string
}
```

- 7 days × 8 programs = **56 programs total**
- Time range: 4:00 AM – 12:00 AM (midnight)

---

## API Routes

### `POST /api/rate-card`

**Request body:**
```json
{ "name": "", "company": "", "phone": "", "email": "", "adType": "", "budget": "", "message": "" }
```

**Validation:** name, phone, email (regex), adType — all required  
**Current behaviour:** `console.log` only  
**To activate:** uncomment Supabase insert + Resend email in the route file

### `POST /api/viewer`

**Request body:**
```json
{ "name": "", "phone": "", "interests": [] }
```

**Validation:** name, phone required  
**Current behaviour:** `console.log` only  
**To activate:** uncomment Supabase insert in the route file

---

## Design Tokens (`src/app/globals.css`)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-weru-orange` | `#f97d00` | Primary brand, CTAs, accents |
| `--color-weru-red` | `#C8102E` | Live badges, breaking news, danger |
| `--color-weru-dark-red` | `#7A1010` | Footer background |
| `--color-weru-gold` | `#FACC15` | Stars, logo accent, highlights |
| `--color-weru-black` | `#0A0A0A` | Page backgrounds |

### Utility Classes

| Class | Purpose |
|-------|---------|
| `.glass` | Glassmorphism card (40% black, 16px blur) |
| `.glass-sm` | Lighter glass variant |
| `.glass-strong` | Heavy glass (55% opacity, 24px blur) |
| `.glass-light` | White-tinted glass |
| `.glow-orange / red / gold` | Box-shadow glow effects |
| `.form-input` | Dark input field |
| `.form-input-light` | Light input field (white sections) |
| `.live-dot` | Pulsing live indicator dot |
| `.eq-bar` | Animated equalizer bar |
| `.ticker-track / scroll-left / scroll-slow` | Scroll animations |
| `.no-scrollbar` | Hide scrollbar cross-browser |

---

## LocalStorage Keys

| Key | Type | Purpose |
|-----|------|---------|
| `weru_viewer_seen` | `"1"` | Prevents ViewerCaptureModal from firing twice |
| `tv_notifications` | `string[]` | Array of TV program IDs user subscribed to |
| `radio_notifications` | `string[]` | Array of radio program IDs user subscribed to |

---

## External Integrations

### YouTube

| Item | Current State | Action Required |
|------|--------------|-----------------|
| Live stream channel ID | `UCxxxxxxxxxxxxxxxxxxxxxx` (placeholder) | Replace in `HeroSection.tsx` and `LiveStream.tsx` |
| Video grid | 8 hardcoded cards | Fetch from YouTube Data API v3 |
| "View All" button | `https://youtube.com/@werutv` | Confirm handle is correct |

### Radio Stream

| Item | Current State |
|------|--------------|
| Stream URL | `https://stream.werudigital.co.ke/radio` (hardcoded in `RadioSection.tsx`) |
| Player | HTML5 `<audio>` created on first play |
| Status | Ready — activate when DNS/stream server is live |

### Supabase

| Item | Current State | Action Required |
|------|--------------|-----------------|
| SDK | Not installed | `npm install @supabase/supabase-js` |
| Env vars | Not set | Add `SUPABASE_URL` + `SUPABASE_SERVICE_KEY` to Netlify |
| Table: `rate_card_enquiries` | Not created | Create with columns: id, name, company, phone, email, ad_type, budget, message, created_at |
| Table: `viewer_leads` | Not created | Create with columns: id, name, phone, interests, created_at |
| Integration code | Present, commented out | Uncomment in both API route files |

### Resend (Email)

| Item | Current State | Action Required |
|------|--------------|-----------------|
| Env var | Not set | Add `RESEND_API_KEY` to Netlify |
| Recipient | `sales@werudigital.co.ke` | Confirm address |
| Integration code | Present, commented out | Uncomment in `/api/rate-card/route.ts` |

### WhatsApp

| Item | Current State | Action Required |
|------|--------------|-----------------|
| Links (`wa.me/254700000000`) | Placeholder number | Replace with real Weru contact number in Footer + modals |
| Business API | Commented stub | Optional: implement for automated booking confirmations |

---

## Activation Checklist

### Phase 1 — Data & Config (no code changes)
- [ ] Replace YouTube channel ID in `HeroSection.tsx` + `LiveStream.tsx`
- [ ] Replace WhatsApp number (`254700000000`) in Footer, AdvertisingModal, RateCardForm
- [ ] Confirm radio stream URL is live at `stream.werudigital.co.ke`
- [ ] Set up Netlify environment variables: `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `RESEND_API_KEY`

### Phase 2 — Backend Activation
- [ ] Create Supabase project + `rate_card_enquiries` and `viewer_leads` tables
- [ ] Install Supabase SDK: `npm install @supabase/supabase-js`
- [ ] Uncomment Supabase inserts in `/api/rate-card/route.ts` and `/api/viewer/route.ts`
- [ ] Uncomment Resend email dispatch in `/api/rate-card/route.ts`
- [ ] Test both form flows end-to-end

### Phase 3 — Content Pages
- [ ] Build out `/politics` page (article grid + live feed)
- [ ] Build out `/sports` page (scores, fixtures, articles)
- [ ] Build out `/technology` page
- [ ] Build out `/agriculture` page (market prices, weather widget)
- [ ] Build out `/weather` page (county forecasts)
- [ ] Replace hardcoded blog articles in `/blog` with CMS or API data
- [ ] Replace hardcoded partner logos with real partner assets

### Phase 4 — Dynamic Video
- [ ] Set up YouTube Data API v3 key
- [ ] Replace hardcoded `VideoGrid` cards with live API fetch
- [ ] Optionally replace `ShowsCarousel` show data with CMS

### Phase 5 — Notifications (Bots page)
- [ ] Build `/bots` page
- [ ] Wire TV/radio notification bells to actual push notification service (e.g. OneSignal, Firebase)
- [ ] Replace localStorage-only notification state with server-side subscriptions

---

## File Structure Reference

```
src/
├── app/
│   ├── layout.tsx              # Root layout — Navbar, Footer, overlays, Outfit font
│   ├── globals.css             # Tailwind v4 theme tokens + custom utilities
│   ├── page.tsx                # Homepage composition
│   ├── tv/page.tsx
│   ├── radio/page.tsx
│   ├── blog/page.tsx
│   ├── politics/page.tsx       # Coming soon stub
│   ├── sports/page.tsx         # Coming soon stub
│   ├── technology/page.tsx     # Coming soon stub
│   ├── agriculture/page.tsx    # Coming soon stub
│   ├── weather/page.tsx        # Coming soon stub
│   ├── bots/page.tsx           # Coming soon stub
│   └── api/
│       ├── rate-card/route.ts
│       └── viewer/route.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── HeadlineTicker.tsx
│   │   ├── VideoGrid.tsx
│   │   ├── LiveStream.tsx
│   │   ├── ShowsCarousel.tsx
│   │   ├── TVProgramLineup.tsx
│   │   ├── TVScheduleSection.tsx
│   │   ├── RadioSection.tsx
│   │   ├── RadioScheduleSection.tsx
│   │   ├── AdvertiseSection.tsx
│   │   ├── NewsGrid.tsx
│   │   ├── ReviewsCarousel.tsx
│   │   ├── PartnersCarousel.tsx
│   │   └── RateCardForm.tsx
│   └── ui/
│       ├── FloatingCTA.tsx
│       ├── ViewerCaptureModal.tsx
│       └── AdvertisingModal.tsx
└── data/
    ├── tvSchedule.ts
    └── radioSchedule.ts
```

---

## Commands

```bash
npm run dev      # Dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint
npm run start    # Serve production build locally
```

> If `npm run dev` fails with a module error, delete `.next/` and restart.
