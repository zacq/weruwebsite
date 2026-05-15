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
| `/radio` | `src/app/radio/page.tsx` |
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
```

Both routes currently `console.log` submissions. Supabase and Resend/WhatsApp integrations are stubbed out in comments inside each route file — uncomment and add env vars when ready.

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

### Image domains

`next.config.ts` whitelists `img.youtube.com` and `i.ytimg.com` for `next/image`. Add other domains there as needed.

### Live stream

`LiveStream` accepts `youtubeChannelId` (default placeholder) and optional `youtubeVideoId` props. Set the real channel ID in the component default or pass it from the page.
