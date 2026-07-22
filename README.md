# islandrhythms.github.io

Personal portfolio for **Daniel Christian Diaz** — a Vue 3 site with a Canvas 2D hero
visual, a command palette, dual themes and a printable résumé.

**Live:** https://islandrhythms.github.io/

---

## Adding content

All content lives in [`src/content/`](src/content/). **You should never need to touch a
component to update the site.**

| File | What it drives |
| --- | --- |
| [`site.js`](src/content/site.js) | Name, role, bio, location, hero stats, social links, section list |
| [`projects.js`](src/content/projects.js) | Categories, the Work section and the Demos section |
| [`experience.js`](src/content/experience.js) | The About timeline and the résumé |
| [`skills.js`](src/content/skills.js) | The Toolkit grid and the résumé's skills block |

> There is deliberately **no email address or phone number** anywhere in `src/`. All contact
> routes through the Formspree form in the Contact section, which keeps an address out of the
> markup and away from scrapers. Please keep it that way.

### Adding a project

Open [`src/content/projects.js`](src/content/projects.js) and append an object to the
`projects` array:

```js
{
  slug: 'my-project',            // unique, URL-safe — becomes the #project-my-project anchor
  title: 'My Project',
  category: 'web',               // must match an id in `categories` (see below)
  year: '2026',
  blurb: 'One punchy sentence for the card face.',
  description: 'The fuller story, revealed when someone hits "Details".',
  tech: ['Vue', 'Node.js'],      // rendered as chips
  links: [
    { label: 'Source', href: 'https://github.com/…', kind: 'code' },   // 'code' | 'live' | 'store'
  ],
  status: 'live',                // 'live' | 'archived' — optional status pill
  featured: true,                // optional: promotes it into the Work showcase
  demo: false,                   // optional: moves it out of Work and into Demos
  resume: true,                  // optional: set false to keep it off the résumé
  embed: 'https://itch.io/embed/637364',  // optional iframe, rendered in the Demos section
}
```

That single object automatically produces:

- a card in the Work grid, in whichever filter tab matches its `category`
- an updated count on the filter buttons
- a searchable entry in the ⌘K command palette
- an entry on `/resume`, if it's `featured` or `live` and not `resume: false`

### The three flags

**`featured`** promotes a project into the showcase at the top of Work — **one per
category**, taken in the order `categories` declares them. Flagging a second project in the
same category doesn't create another slot; the extra falls back to the grid below.

**`demo`** moves a project out of Work entirely and into the Demos section, so nothing
appears on the page twice. A demo renders its `embed` inline when it has one and a "try it"
launch card when it doesn't.

**`resume`** set to `false` keeps a project out of Selected Projects on `/resume` — used
where the work is already described under a role, so the page doesn't say it twice.

### Adding a category

Add one entry to the `categories` array in the same file:

```js
{ id: 'mobile', label: 'Mobile', accent: '#f7c977' }
```

`accent` is required for the showcase — it drives that card's top edge, watermark numeral,
glow and hover colour, and its matching skin in the Demos section. Filters with no projects
behind them hide themselves automatically.

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
├─ sections/      # the five landing-page sections
├─ components/    # reusable UI: hero canvas, header, palette, cards, frames, icons
├─ composables/   # theme, scroll-spy, command palette state
├─ lib/           # the wavetable behind the hero visual
├─ directives/    # v-reveal scroll animation
├─ views/         # routed pages: landing, résumé, 404
└─ assets/main.css  # design tokens + base + component primitives
```

Three routes, not one page: `/` (landing), `/resume` (printable) and a catch-all 404.

### Notable pieces

**`components/WaveField.vue`** + **`lib/waveform.js`** — the hero visual, drawn to a
**Canvas 2D** context. No WebGL, no shader, no animation library. Forty-eight phase-shifted
copies of one wave are stacked in perspective and composited additively, so overlapping
strokes accumulate into a surface rather than reading as separate lines. The whole field
breathes on an eleven-second cycle while the wave shape itself morphs over tens of seconds.

The trick that makes it cheap is the wavetable: the wave is periodic in x, so one pass of
512 samples per frame feeds all 48 lines instead of 11,520 evaluations of a four-term sum.
It pauses via `IntersectionObserver` when scrolled past and on `visibilitychange`, caps DPR
at 2, and renders one static frame with no animation loop under `prefers-reduced-motion`.
Below 1080px it drops to 50% opacity so it never competes with the type; with no 2D context
at all it falls back to a CSS gradient.

Tuning lives in [`src/lib/waveform.js`](src/lib/waveform.js): `BREATH_PERIOD` sets the pace,
`CYCLES` how many waves span the field, `LINES` how dense the surface is, and `HARMONICS`
the character of the wave.

**`components/FeaturedProject.vue`** — the Work showcase card. Every card is identical in
size and treatment; what separates them is colour, taken from the category's `accent`. Text
uses of that colour are mixed 50% toward the ink in light mode, which is the most hue that
still clears WCAG AA at 11px.

**`components/DemoFrame.vue`** — category-specific chrome for the Demos section: an arcade
cabinet for games, a browser window for web, a handset for mobile, an app window for
desktop, a terminal for software, a repo header for open source. Unknown categories fall
through to a plain frame, so adding a category never breaks the section.

**`assets/main.css`** — the design system. Raw palette ramps and motion easings live in
Tailwind's `@theme`; semantic tokens (`--bg`, `--accent`, `--line`, …) are redefined per
theme under `[data-theme]` and re-exposed to Tailwind via `@theme inline`. Themes switch by
swapping one attribute on `<html>`, set by an inline script in `index.html` before first
paint so there's no flash on load. Tailwind is used **only** as this token layer — every
component is hand-written scoped CSS.

**`directives/reveal.js`** — `v-reveal` scroll animations sharing one IntersectionObserver
across the whole page. Supports variants and stagger:
`v-reveal="{ variant: 'left', delay: 120 }"`.

**`components/CommandPalette.vue`** — ⌘K / Ctrl+K / `/` opens fuzzy search over every
section, project, link and action. Commands are derived from the content files, so it never
needs updating separately.

### Accessibility & performance

- Every animation respects `prefers-reduced-motion`.
- Skip link, focus-visible rings, labelled controls, and a `<noscript>` fallback linking to
  GitHub.
- ~59 KB gzipped JS on first load (21 KB app + 38 KB vendor), plus ~14 KB gzipped CSS. The
  résumé and 404 routes are lazy chunks and don't load with the landing page.
- Fonts are self-hosted variable subsets — no CDN. The only third-party request at runtime
  is the itch.io demo embed, which is `loading="lazy"` and never fetched unless the Demos
  section is reached.
- `404.html` restores deep links (`/resume`) that GitHub Pages would otherwise drop.

---

## Housekeeping

- The `<noscript>` block in `index.html` hard-codes the role string ("Software Engineer")
  rather than reading `site.role`, so it needs updating by hand if the title changes.
- The social share image is currently the profile photo. To use a proper card, drop a
  1200×630 PNG in `public/` and point `ogImage` in `site.js` plus the `og:image` tags in
  `index.html` at it.
- `sitemap.xml` and the JSON-LD block in `index.html` hard-code the production URL; update
  both if the domain ever changes.
