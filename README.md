# islandrhythms.github.io

My portfolio. Vue 3 + Vite, deployed to GitHub Pages. Live at
https://islandrhythms.github.io/

Notes to myself for when I come back to this after six months and remember none of it.

---

## Deploying — read this first

**`production` is what's live. `master` is where work lands. Nothing deploys from
`master`.**

```bash
git checkout production
git merge --ff-only master
git push origin production     # <- this is the deploy
git checkout master
```

Two things I will forget:

1. **GitHub runs the workflow file from the branch being pushed**, not from the default
   branch. So `deploy.yml` has to be identical on `master` and `production`. If I ever
   change the trigger again and only merge it one way, I'll end up with two branches both
   publishing, or neither.
2. **Settings → Pages → Source must be "GitHub Actions"**, not a branch. The old
   `gh-pages` branch is still sitting on the remote doing nothing. If the site ever goes
   stale for no reason, check this first.

Both workflows run the same gate — `lint:check`, `format:check`, `build`. `ci.yml` fires on
PRs into `master` **and** `production`, so the release PR gets checked too.

Re-deploy without a commit: Actions tab → Deploy to GitHub Pages → Run workflow
(`workflow_dispatch` is enabled).

---

## Where to edit things

Everything I'd actually want to change lives in [`src/content/`](src/content/). **I should
never need to open a component to update the site.**

| File | Drives |
| --- | --- |
| [`site.js`](src/content/site.js) | Name, role, bio, stats, socials, section list, SEO copy |
| [`projects.js`](src/content/projects.js) | Categories, the Work section, the Demos section |
| [`experience.js`](src/content/experience.js) | About timeline, résumé experience + open source |
| [`skills.js`](src/content/skills.js) | Toolkit grid, résumé skills block |

### The project flags, because I always forget which does what

```js
featured: true    // into the Work showcase — ONE per category, extras silently fall
                  // through to the grid below
demo: true        // out of Work entirely, into the Demos section
resume: false     // off the résumé's Selected Projects
embed: 'https://itch.io/embed/637364'   // iframe, renders inside the Demos frame
status: 'live'    // 'live' | 'archived'. There is no 'ongoing' any more.
```

Adding a category needs an `accent` colour or the showcase card renders without its
identity:

```js
{ id: 'mobile', label: 'Mobile', accent: '#f7c977' }
```

---

## Traps I've already hit



That plugin **must** stay at `order: 'pre'`. Vite percent-decodes `href` attributes, and
`%SITE_URL%` looks like a broken escape — at default order the build dies with "URI
malformed".

**`sitemap.xml` and `robots.txt` are generated, not files.** They're emitted at build from
`site.url` by the `seo-files` plugin in [`vite.config.js`](vite.config.js), and served in dev
by the same plugin. Don't put copies back in `public/` — Vite copies that directory through
untouched, and I'd be maintaining the domain in two more places. Adding a route means adding
it to `SITEMAP_ROUTES`.

**Tailwind is only a token layer.** `@theme` for the palette, `@custom-variant` for light
mode, and that's it. Every component is hand-written scoped CSS against custom properties.
There is exactly one utility class in the whole codebase (`mt-8`). Don't start sprinkling
`flex gap-4` — it won't match anything else.

**Accent colours as text need mixing in light mode.** The raw category hues fail WCAG AA at
11px on the near-white surface — sand measures 3.09:1. They're mixed 50% toward the ink,
which puts the worst case at 4.95:1. Anything lighter than 50% drops Mobile, Open Source and
Desktop back under. Decoration (edges, dots, glows) uses the raw hue and is fine.

**The reading progress bar is a sibling of `<header>`, not a child.** The header slides
itself out of view on scroll-down, and a transformed ancestor drags its descendants with it

**`LandingView.vue` must have a single root element.** `App.vue` wraps `<RouterView>` in a
`<Transition mode="out-in">`, and a fragment root makes the transition bail — navigating to
it from another route mounts nothing at all.

**Section eyebrow numbers are hardcoded** (`index="01"` etc. in each section). Adding a
section means renumbering the ones after it by hand. The Résumé nav number is derived from
`site.sections.length`, so that one takes care of itself.

**In `DemoFrame.vue`, the `:slotted()` rule deliberately doesn't set `display`.** It ties on
specificity with `DemoSection`'s own `.launch` rule, so whichever style block loads last
would win, and the launch card's centring would break at random.

---

## Commands

```bash
npm run dev          # HMR. Restart it after touching vite.config.js.
npm run build        # -> dist/
npm run preview      # serve the build

npm run lint         # eslint --fix
npm run format       # prettier --write   <- CI fails without this
```

CI uses Node 22. Anything ≥ 20 works locally.

---

## The hero, if I ever want to tune it

[`WaveField.vue`](src/components/WaveField.vue) + [`waveform.js`](src/lib/waveform.js).
**Canvas 2D — not WebGL, no shader, no library.** 48 phase-shifted copies of one wave,
stacked in perspective and composited additively.

Knobs are all in `waveform.js`: `BREATH_PERIOD` (11s cycle), `CYCLES`, `LINES` (48),
`HARMONICS`.

The reason it's cheap: the wave is periodic in x, so one pass of 512 samples per frame feeds
all 48 lines instead of 11,520 trig evaluations.

**`BLOOM_FROM` in `WaveField.vue` is the perf knob.** Shadowed strokes are one of the
slowest canvas ops, and this canvas is thousands of pixels wide. At `0.8` only the leading
10 lines bloom; it used to be `0.45`, which was 26. If the hero ever feels janky on a weak
machine, raise this before touching anything else.

It already pauses via `IntersectionObserver` and `visibilitychange`, caps DPR at 2, renders
one static frame under `prefers-reduced-motion`, and falls back to a CSS gradient with no 2D
context.

---

## Architecture, briefly

```
src/
├─ content/       # ← everything I actually edit
├─ sections/      # Hero, Work, Demos, About, Contact
├─ components/    # WaveField, FeaturedProject, DemoFrame, ProjectCard, header, palette…
├─ composables/   # theme, scroll-spy, command palette
├─ lib/           # the wavetable
├─ directives/    # v-reveal (one shared IntersectionObserver)
├─ views/         # landing, résumé, 404
└─ assets/main.css  # design tokens + primitives
```

Three routes: `/`, `/resume`, and a catch-all 404. `public/404.html` stashes the requested
path in `sessionStorage` and bounces to `/`, which is what makes deep links like `/resume`
survive GitHub Pages.

`DemoFrame.vue` skins each demo by category — arcade cabinet for games, browser for web,
handset for mobile, app window for desktop, terminal for software, repo header for open
source. Unknown categories get a plain frame, so adding one never breaks the section.

The ⌘K palette derives its commands from the content files, so new projects and sections
show up in search on their own.


