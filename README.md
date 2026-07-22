# islandrhythms.github.io

Personal portfolio for **Daniel Christian Diaz** — a single-page Vue 3 site with a
hand-written WebGL hero shader, a command palette, dual themes and a printable résumé.

**Live:** https://islandrhythms.github.io/

---

## Adding content

All content lives in [`src/content/`](src/content/). **You should never need to touch a
component to update the site.**

| File | What it drives |
| --- | --- |
| [`site.js`](src/content/site.js) | Name, role, bio, location, email, hero stats, social links, section list |
| [`projects.js`](src/content/projects.js) | Every card in the Work section |
| [`experience.js`](src/content/experience.js) | The About timeline and the résumé |
| [`skills.js`](src/content/skills.js) | The Toolkit grid and the résumé's skills block |

### Adding a project

Open [`src/content/projects.js`](src/content/projects.js) and append an object to the
`projects` array:

```js
{
  slug: 'my-project',            // unique, URL-safe — becomes the #project-my-project anchor
  title: 'My Project',
  category: 'web',               // 'web' | 'software' | 'games' — see `categories`
  year: '2026',
  blurb: 'One punchy sentence for the card face.',
  description: 'The fuller story, revealed when someone hits "Details".',
  tech: ['Vue', 'Node.js'],      // rendered as chips
  links: [
    { label: 'Source', href: 'https://github.com/…', kind: 'code' },   // 'code' | 'live' | 'store'
  ],
  status: 'live',                // 'live' | 'ongoing' | 'archived' — optional status pill
  featured: true,                // optional: card spans two grid columns
  embed: 'https://itch.io/embed/637364',  // optional iframe inside the expanded card
}
```

That single object automatically produces:

- a card in the Work grid, in whichever filter tab matches its `category`
- an updated count on the filter buttons
- a searchable entry in the ⌘K command palette
- an entry on `/resume`, if it's `featured` or `live`

Adding a **new category** means adding one entry to the `categories` array in the same
file — filters with no projects behind them hide themselves automatically.

---

## Development

```bash
npm install
npm run dev          # dev server with HMR
npm run build        # production build to dist/
npm run preview      # serve the built output locally

npm run lint         # eslint --fix
npm run format       # prettier --write
```

Node 22 is what CI uses; anything ≥ 20 should be fine locally.

---

## Deployment

Deployment is automatic. **Pushing to `master` builds and publishes the site** via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Pull requests get a
lint + format + build check from [`ci.yml`](.github/workflows/ci.yml), which also posts a
bundle-size breakdown to the run summary.

> **One-time setup:** in the repository's **Settings → Pages**, set **Source** to
> **GitHub Actions**. The old `gh-pages` branch flow has been removed, and Pages will keep
> serving the stale branch until this is switched over.

There is no `npm run deploy` any more — pushing is the deploy.

---

## Architecture

```
src/
├─ content/       # ← all site copy and data (edit these)
├─ sections/      # the four landing-page sections
├─ components/    # reusable UI: shader, header, palette, cards, icons
├─ composables/   # theme, scroll-spy, command palette state
├─ lib/           # the synth engine behind the hero visual
├─ directives/    # v-reveal scroll animation
├─ views/         # routed pages: landing, résumé, 404
└─ assets/main.css  # design tokens + base + component primitives
```

### Notable pieces

**`components/WaveField.vue`** + **`lib/waveform.js`** — the hero visual. Three stacked
waveform lines that breathe: amplitude swells and recedes on an eight second cycle, staggered
so the layers drift gently through one another, while the wave shape itself morphs over tens
of seconds. No beat, no spectrum, nothing that competes with the type. On screens under
1080px it drops to 42% opacity, and under `prefers-reduced-motion` it renders one static frame
with no animation loop at all.

Tuning lives in [`src/lib/waveform.js`](src/lib/waveform.js): `BREATH_PERIOD` sets the pace,
`CYCLES` how many waves span the field, `LAYERS` how many lines, and `HARMONICS` the character
of the wave.

**`assets/main.css`** — the design system. Raw palette ramps and motion easings live in
Tailwind's `@theme`; semantic tokens (`--bg`, `--accent`, `--line`, …) are redefined per
theme under `[data-theme]` and re-exposed to Tailwind via `@theme inline`. Themes switch by
swapping one attribute on `<html>`, set by an inline script in `index.html` before first
paint so there's no flash on load.

**`directives/reveal.js`** — `v-reveal` scroll animations sharing one IntersectionObserver
across the whole page. Supports variants and stagger:
`v-reveal="{ variant: 'left', delay: 120 }"`.

**`components/CommandPalette.vue`** — ⌘K / Ctrl+K / `/` opens fuzzy search over every
section, project, link and action. Commands are derived from the content files, so it never
needs updating separately.

### Accessibility & performance

- Every animation respects `prefers-reduced-motion`.
- Skip link, focus-visible rings, labelled controls, and a `<noscript>` fallback with
  contact details.
- ~57 KB gzipped JS total; fonts are self-hosted variable subsets, no CDN or third-party
  requests at runtime.
- `404.html` restores deep links (`/resume`) that GitHub Pages would otherwise drop.

---

## Housekeeping

- The social share image is currently the profile photo. To use a proper card, drop a
  1200×630 PNG in `public/` and point `ogImage` in `site.js` plus the `og:image` tags in
  `index.html` at it.
- `sitemap.xml` and the JSON-LD block in `index.html` hard-code the production URL; update
  both if the domain ever changes.
