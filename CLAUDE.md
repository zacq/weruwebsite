# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working Guidelines

Derived from `andrej-karpathy-skills-main/skills/karpathy-guidelines/SKILL.md`:

**Think before coding.** State assumptions explicitly. If multiple interpretations exist, surface them — don't pick silently. Push back when a simpler path exists.

**Simplicity first.** Minimum code that solves the problem. No speculative features, no abstractions for single-use code, no error handling for impossible scenarios.

**Surgical changes.** Touch only what's required by the request. Don't refactor adjacent code. Don't remove pre-existing dead code unless asked. Every changed line must trace to the user's request.

**Goal-driven execution.** For multi-step tasks, state a brief plan with verifiable checkpoints before starting.

## Design Principles

All design work follows `redesign-skill/SKILL.md`. Priority order when improving UI:
1. Font — swap to a premium typeface (currently `Outfit` via `next/font/google`)
2. Color — one accent, tinted shadows, no pure-black on non-black backgrounds
3. Hover/active states — scale, translate, or color shift on all interactive elements
4. Layout — break 3-equal-column patterns; use asymmetry, featured cards, or zig-zag
5. Typography — sentence case headers, tight tracking on large display text, `tabular-nums` on data
6. Legal completeness — Privacy Policy and Terms links in footer

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint via Next.js
npm run start    # Serve production build locally
```

No test suite is configured.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — config is done via `@theme inline` in `globals.css`, not `tailwind.config.*`
- **Framer Motion** — used for all scroll-triggered and interactive animations
- **Netlify** — deployed via `@netlify/plugin-nextjs` (see `netlify.toml`)

## Architecture

### Routing

Three routes, all page-level compositions of shared section components:

| Route | File |
|-------|------|
| `/` | `src/app/page.tsx` |
| `/tv` | `src/app/tv/page.tsx` |
| `/tv/about` | `src/app/tv/about/page.tsx` |
| `/radio` | `src/app/radio/page.tsx` |
| `/radio/about` | `src/app/radio/about/page.tsx` |
| `/blog` | `src/app/blog/page.tsx` |

### Component layout

```
src/components/
  layout/       # Navbar, Footer — rendered in root layout
  sections/     # Full-width page sections (one per homepage block)
  ui/           # FloatingCTA, ViewerCaptureModal — global overlays in root layout
```

`FloatingCTA` and `ViewerCaptureModal` are mounted once in `src/app/layout.tsx` and render on every page. `ViewerCaptureModal` fires once per session (keyed by `localStorage.weru_viewer_seen`) when the `#headlines` element scrolls into view.

### API routes

```
src/app/api/
  rate-card/route.ts   # POST — advertising enquiry form
  viewer/route.ts      # POST — viewer lead capture modal
  quiz/route.ts        # POST — quiz lead capture (Airtable stub)
  news-feed/route.ts   # GET  — live Kenyan headlines from RSS (10-min cache)
  youtube-live/route.ts# GET  — resolves stream source (HLS → embed → YouTube cascade, 30-min cache)
```

`rate-card`, `viewer`, and `quiz` currently `console.log` submissions. Supabase, Resend, and Airtable integrations are stubbed in comments — uncomment and add env vars when ready.

### Live news feed (RSS integration)

**Single source of truth:** `src/lib/getNewsFeed.ts`

All news data for the site flows through one function: `getNewsFeed()`. It fetches two free Kenyan RSS feeds in sequence, parses them with `rss-parser`, and returns up to 10 `Headline` objects. **Never fetch RSS anywhere else — always import from this lib.**

**Feeds (in priority order):**
1. `https://www.kbc.co.ke/feed/` — primary (public broadcaster, reliable)
2. `https://nation.africa/kenya/rss.xml` — secondary fallback

**`Headline` type** (add fields here, not inline in components):
```ts
type Headline = {
  category: string;   // mapped label e.g. "POLITICS", "SPORTS", "NEWS"
  color: string;      // hex for that category
  text: string;       // article title
  pubDate?: string;   // raw RSS pubDate string
  link?: string;      // URL to source article (opens in new tab)
  excerpt?: string;   // contentSnippet, trimmed to 160 chars
  image?: string;     // thumbnail URL extracted from media:thumbnail or media:group
}
```

**Image extraction:** Both feeds use Media RSS (`xmlns:media`). The parser is configured with `customFields: { item: ['media:thumbnail', 'media:group'] }`. KBC uses `<media:thumbnail url="..."/>`, Nation.Africa uses `<media:group><media:content url="..."/></media:group>`. The `extractImage()` helper handles both structures.

**Category → color mapping** is defined in the `CATEGORY_MAP` constant. To add a new category, add a keyword entry there — it applies everywhere automatically.

**Fallback:** If both feeds fail, `FALLBACK_HEADLINES` (static array in the same file) is returned. Components always receive valid data.

**How `page.tsx` consumes the feed** (this pattern must be followed for all homepage sections that show news):
```ts
// In the async server component:
const feed = await getNewsFeed();

// Ticker strip — pass feed directly
<HeadlineTicker headlines={feed} />

// Hero card carousel — transform to HeroSection shape
<HeroSection heroHeadlines={toHeroHeadlines(feed)} />

// Latest Headlines grid — transform to Article shape, first 6 items
<NewsGrid articles={toNewsArticles(feed)} />
```

**Adding a new section that shows news:** add a transformer function in `page.tsx` (like `toHeroHeadlines` or `toNewsArticles`) and pass the result as a prop. Do not add a second `getNewsFeed()` call — the single call at the top of `HomePage` serves all sections.

**Cache:** `news-feed` API route uses `export const revalidate = 600` (10 minutes). The server component page re-fetches on each Netlify ISR cycle. No client-side fetching of news — all data is baked into the HTML at render time.

**Article cards must be clickable:** `ArticleCard` in `NewsGrid.tsx` renders as `<a href={article.link} target="_blank">` when `link` is present. Always pass `link` from the feed data. Never hardcode article URLs.

### Design system

All brand tokens live in `src/app/globals.css` under `@theme inline`:

| Token | Value |
|-------|-------|
| `weru-orange` | `#f97d00` (primary brand, page background) |
| `weru-red` | `#C8102E` |
| `weru-dark-red` | `#7A1010` |
| `weru-gold` | `#FACC15` |
| `weru-black` | `#0A0A0A` |

Utility classes also defined in `globals.css`:
- `.glass`, `.glass-sm`, `.glass-strong`, `.glass-light` — glassmorphism variants
- `.glow-orange`, `.glow-red`, `.glow-gold` — box-shadow glows
- `.form-input` / `.form-input-light` — styled form fields (dark and light backgrounds respectively)
- `.ticker-track`, `.scroll-left`, `.scroll-slow`, `.live-dot`, `.eq-bar` — animation classes

### Navbar — adding new top-level items or dropdowns

**Rule: never remove an entry from `navLinks` to replace it with a component rendered outside the `.map()` loop.**

The `navLinks` array in `src/components/layout/Navbar.tsx` is the single source of truth for menu order. Appending a replacement component after the loop silently pushes it to the end of the bar.

The correct pattern when a link needs a dropdown:

1. Keep the entry in `navLinks` at the correct position, add `dropdown: true`.
2. Inside the `.map()`, detect the flag and render the dropdown component in-place:
   ```tsx
   if (link.dropdown) return <MyDropdown key={link.href} pathname={pathname} />;
   ```
3. For the mobile hamburger, `.filter((l) => !l.dropdown)` before mapping plain links — the dropdown's accordion is rendered separately but still in the correct visual slot.

This ensures menu order is always controlled by the array, not by JSX position.

### Image domains

`next.config.ts` whitelists `img.youtube.com` and `i.ytimg.com` for `next/image`. Add other domains there as needed.

### Live stream — architecture

**Component:** `src/components/sections/LiveStream.tsx` (`"use client"`)
**API route:** `src/app/api/youtube-live/route.ts` (GET, `revalidate = 1800`)

The player resolves its source by calling `/api/youtube-live` on mount. The API checks three env vars in priority order and returns the first available:

```
STREAM_HLS_URL set?   → { type: "hls",    url: string }         # .m3u8 — native video element + hls.js
STREAM_EMBED_URL set? → { type: "embed",  url: string }         # iframe — OK.ru, Castr, Restream, etc.
YOUTUBE_API_KEY set?  → { type: "youtube", videoId, isLive }    # YouTube API fallback
none                  → { type: "none" }                        # "Watch on YouTube" button
```

**Switching stream sources requires only an env var change on Netlify — no code deploy.**

#### Current production setup (as of June 2026)

| Layer | Detail |
|---|---|
| Encoder | OBS Studio → **Restream.io** (native service, not custom RTMP) |
| Multistream hub | Restream relays to OK.ru CDN and any other configured destinations |
| OK.ru account | **WERU TV Kenya** — `ok.ru/profile/910505749103` |
| OK.ru RTMP ingest | Server: `rtmp://vsu.okcdn.ru:1935/input/` · Key: `14785780981359_15794534812` |
| Embed URL | `https://ok.ru/videoembed/14785780981359?autoplay=1` |
| Env var | `STREAM_EMBED_URL=https://ok.ru/videoembed/14785780981359?autoplay=1` |

The OK.ru live stream page: `https://ok.ru/video/14785780981359`

**The original OK.ru group (`330582007485`) was banned by OK.ru for regulation violations.** The new account (`910505749103`) is a fresh personal profile. Do not attempt to use or restore the old stream key `330582007485_304991767229_ur374rzkym`.

#### HLS player (hls.js — already installed)

`hls.js` is installed. If the station ever provides an `.m3u8` URL (from Castr, Mux, or a CDN), set `STREAM_HLS_URL` on Netlify and clear `STREAM_EMBED_URL`. The player in `LiveStream.tsx` handles native Safari HLS and hls.js for all other browsers automatically.

#### Restream setup

OBS → Restream is configured in **OBS Settings → Stream → Service: Restream.io**. Restream's channel list includes the WERU Digital output pointing at OK.ru CDN. Restream stream key: `re_5682877_eventca127021fd54405aa90afb5e3a34090a` (ingest credential — never embed in client code).

#### Platforms evaluated and ruled out

| Platform | Reason ruled out |
|---|---|
| Restream video player | Requires $199/mo Business plan — embed token is chat-only on current plan |
| Dailymotion | No permanent channel embed URL; new video ID per broadcast; paid plan required |
| YouTube channel embed | Station doesn't always stream to YouTube — not permanent |
| Livepeer free tier | 30 concurrent viewer cap — too small for live TV |

#### Updating the stream URL

When the stream source changes (new OK.ru broadcast, switch to Castr/Mux, etc.):
1. Update `STREAM_EMBED_URL` or `STREAM_HLS_URL` in Netlify environment variables
2. Trigger a redeploy (or wait for next deploy)
3. No code change needed

If the OK.ru broadcast ID changes (e.g. new live stream created on the account):
- Go to `ok.ru/profile/910505749103` → find the live stream → copy the URL
- The video ID is the number in `ok.ru/video/XXXXXXXXXX`
- Update `STREAM_EMBED_URL` to `https://ok.ru/videoembed/XXXXXXXXXX?autoplay=1`

---

## New Page Development Workflow

This sequence must be followed every time a new page is added to the site. It was established and validated during the build of the Presenters section (commit `58d486b`).

### Step 1 — Plan before coding

State a checklist of deliverables with verifiable checkpoints before touching any file. Identify which existing files will be modified (Navbar, routing table in this CLAUDE.md, globals.css) and which will be created.

### Step 2 — Data first

Create `src/data/<entity>.ts` before building any UI. Define the TypeScript interface and export the data array. This file is the single source of truth — pages and components import from it, never hardcode content inline.

### Step 3 — Routing

Add the new route to the routing table in this file under `### Routing`. Current routes:

| Route | File |
|-------|------|
| `/` | `src/app/page.tsx` |
| `/tv` | `src/app/tv/page.tsx` |
| `/tv/about` | `src/app/tv/about/page.tsx` |
| `/radio` | `src/app/radio/page.tsx` |
| `/radio/about` | `src/app/radio/about/page.tsx` |
| `/blog` | `src/app/blog/page.tsx` |
| `/presenters` | `src/app/presenters/page.tsx` |
| `/presenters/[slug]` | `src/app/presenters/[slug]/page.tsx` |
| `/podcast` | `src/app/podcast/page.tsx` |

### Step 4 — Navbar update (follow the dropdown rule)

**The navbar menu-order bug:** When the Presenters section was added, the TV nav item was removed from `navLinks` and a `<TVDropdown>` component was appended after the `.map()` loop. This caused TV to silently shift to the last position in the bar — a hard-to-spot regression.

**The fix and permanent rule** (see `### Navbar — adding new top-level items or dropdowns` above):
- Never remove an item from `navLinks` to replace it with a standalone component.
- Add `dropdown: true` to the item in `navLinks`, then render the dropdown in-place inside the `.map()` using `if (link.dropdown) return <MyDropdown />`.
- Mobile hamburger: `.filter((l) => !l.dropdown)` for plain links; dropdown accordion rendered separately in the correct visual slot.

### Step 5 — Build the page as a server component (SSG)

Every new page must be a pure server component unless it genuinely requires browser state. Add these exports at the top:

```ts
export const dynamic    = "force-static";
export const revalidate = 3600;
```

For dynamic routes, also export `generateStaticParams` and `generateMetadata`. This converts the route from `ƒ Dynamic` to `● SSG` at build time — pre-rendered HTML, minimal JS shipped to the client.

If the page needs a form or interactive widget, isolate it into a separate `"use client"` component (e.g. `LeadCaptureForm.tsx`) and import it as a leaf. The page file itself stays a server component.

### Step 6 — Apply the redesign skill

After the page works, run `redesign-skill/SKILL.md` on it. Priority order:
1. Font — use the existing `Space Grotesk` / `DM Serif Display` tokens, not a new import.
2. Color — one accent (`#f97d00`), tinted shadows, no pure black on non-black backgrounds.
3. Hover/active — add CSS-only classes to `globals.css` (`.social-link`, `.explore-card`, etc.) rather than JS `onMouseEnter` handlers. This keeps pages server-renderable.
4. Layout — avoid 3-equal-column grids; use asymmetry or featured cards.
5. Typography — sentence case, tight tracking on large display text, `tabular-nums` on stats.
6. Glassmorphism — use existing `.glass`, `.glass-sm`, `.glass-strong` utility classes. For custom cards, follow the pattern: `rgba(255,255,255,0.04)` bg + `backdrop-filter: blur()` + `inset 0 1px 0 rgba(255,255,255,0.14)` inner highlight + colored outer shadow.
7. Mobile — test all breakpoints; portrait images use `3/4` aspect ratio, not `1/1`.

### Step 7 — Apply the SEO skill

After design is complete, run `/seo` checks against the page. Key checklist:
- `<title>` and `<meta description>` set via `generateMetadata` — never hardcoded in the HTML.
- `openGraph` block included in metadata.
- All `<Image>` components have descriptive `alt` text.
- Above-fold images: `priority` + `loading="eager"`. Below-fold: `loading="lazy"`.
- Contextual internal links to related pages at the bottom of every page (improves crawl graph and dwell time).
- CSS-only hover states — no unnecessary JS that would inflate the client bundle.

### Step 8 — Verify the production build

Always run a clean production build before pushing:

```bash
npm run build
```

Watch for:
- Routes marked `ƒ Dynamic` that should be `● SSG` — add `force-static` and `generateStaticParams`.
- TypeScript errors — fix before committing, never suppress with `any`.
- `Cannot find module for page` errors — usually caused by a corrupt `.next` folder from running build while dev server is running. Fix: kill all Node processes, delete `.next`, re-run build.

### Step 9 — Push to GitHub

Commit with a clear message and push. Netlify auto-deploys on push to `master`.

```bash
git add <specific files>
git commit -m "..."
git push origin master
```

Do not use `git add -A` — stage files by name to avoid accidentally committing `.env` or large binaries.
