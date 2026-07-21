/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PROJECTS — the single source of truth for the Work section.
 * ─────────────────────────────────────────────────────────────────────────────
 * To add a project, copy the template below, drop it anywhere in the `projects`
 * array, and you're done — filters, counts, cards, the ⌘K palette and the résumé
 * page all pick it up automatically.
 *
 * @typedef  {object}  Project
 * @property {string}  slug        Unique, URL-safe id.
 * @property {string}  title       Display name.
 * @property {string}  category    One of the `categories` keys below.
 * @property {string}  [year]      e.g. '2024' or '2021 — present'.
 * @property {string}  blurb       One punchy sentence for the card face.
 * @property {string}  description Fuller detail, shown when the card expands.
 * @property {string[]} tech       Technologies; rendered as chips.
 * @property {Link[]}  links       Call-to-action links. First one is primary.
 * @property {'live'|'archived'|'ongoing'} [status] Adds a status pill.
 * @property {boolean} [featured]  Featured projects render at double width.
 * @property {string}  [embed]     Optional iframe URL (e.g. an itch.io widget).
 *
 * @typedef  {object}  Link
 * @property {string}  label
 * @property {string}  href
 * @property {'code'|'live'|'store'} [kind] Picks the icon.
 *
 * TEMPLATE — copy me:
 * {
 *   slug: 'my-project',
 *   title: 'My Project',
 *   category: 'web',
 *   year: '2026',
 *   blurb: 'One sentence on what it does and why it mattered.',
 *   description: 'A paragraph or two with the detail a reader wants next.',
 *   tech: ['Vue', 'Node.js'],
 *   links: [{ label: 'Source', href: 'https://github.com/...', kind: 'code' }],
 *   status: 'live',
 *   featured: false,
 * }
 */

/** Category definitions — order here is the order of the filter bar. */
export const categories = [
  { id: 'all', label: 'All Work' },
  { id: 'web', label: 'Web' },
  { id: 'software', label: 'Software' },
  { id: 'games', label: 'Games' },
]

/** @type {Project[]} */
export const projects = [
  {
    slug: 'mongoose',
    title: 'Mongoose.js',
    category: 'software',
    year: '2021 — present',
    blurb:
      'Co-developed features and triaged over a thousand issues for the MongoDB ODM that powers a million-plus downloads a week.',
    description:
      'Working alongside the lead maintainer, I shipped new features and release enhancements for Mongoose.js and investigated more than 1,000 bug reports against it. The work spanned reproducing subtle schema and query edge cases, writing regression tests, and keeping a decade-old API stable for an enormous install base.',
    tech: ['Node.js', 'MongoDB', 'Mocha.js', 'Open Source'],
    links: [{ label: 'mongoosejs.com', href: 'https://mongoosejs.com', kind: 'live' }],
    status: 'live',
    featured: true,
  },
  {
    slug: 'masteringjs',
    title: 'Mastering JS',
    category: 'web',
    year: '2021 — present',
    blurb:
      'Authored two tutorials a week teaching JavaScript fundamentals, published to a site read by developers worldwide.',
    description:
      'A twice-weekly writing cadence covering everything from async fundamentals to framework-specific recipes. Each article had to be technically exact, runnable, and short enough to be useful at 2am — a genuinely good discipline for learning to explain hard things simply.',
    tech: ['JavaScript', 'Technical Writing', 'Node.js'],
    links: [{ label: 'masteringjs.io', href: 'https://masteringjs.io', kind: 'live' }],
    status: 'live',
  },
  {
    slug: 'beat-bot',
    title: 'Beat-Bot',
    category: 'software',
    year: '2020 — present',
    blurb:
      'A Discord bot with games, utilities, a music player and MongoDB persistence — self-hosted on a Raspberry Pi.',
    description:
      'Built for my own server and then adopted by friends’ communities. Beat-Bot spans games, utility commands, learning tools and music playback, backed by MongoDB for per-guild state. It runs on a Raspberry Pi in my apartment, which has taught me a lot about writing software that has to survive unattended.',
    tech: ['Node.js', 'MongoDB', 'Discord.js', 'Raspberry Pi'],
    links: [{ label: 'Source', href: 'https://github.com/IslandRhythms/Beat-Bot', kind: 'code' }],
    status: 'ongoing',
    featured: true,
  },
  {
    slug: 'mykeysig',
    title: 'MyKeySig',
    category: 'web',
    year: '2023',
    blurb:
      'Fed a song, album or playlist to the Spotify API and returned the most recurring musical key.',
    description:
      'A tool for musicians: point it at any Spotify track, album or playlist and it surfaces the dominant key signature across it. In late 2024 Spotify revoked developer access to the audio-features endpoints the app depended on, so it no longer functions — a useful lesson in the risk of building on someone else’s platform.',
    tech: ['JavaScript', 'Spotify API', 'Node.js'],
    links: [{ label: 'Source', href: 'https://github.com/IslandRhythms/MyKeySig', kind: 'code' }],
    status: 'archived',
  },
  {
    slug: 'portfolio',
    title: 'This Portfolio',
    category: 'web',
    year: '2026',
    blurb:
      'A single-page Vue site with a hand-written WebGL hero shader, a command palette, and zero UI dependencies.',
    description:
      'Built with Vue 3, Vite and Tailwind v4. The hero is a custom GLSL fragment shader — domain-warped fractal noise rendered on a single quad, roughly four kilobytes and no three.js — that degrades to a static gradient when WebGL is unavailable or the visitor prefers reduced motion. Content is fully data-driven, and every push to master deploys itself through GitHub Actions.',
    tech: ['Vue 3', 'Vite', 'Tailwind CSS', 'WebGL / GLSL', 'GitHub Actions'],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/IslandRhythms/IslandRhythms.github.io',
        kind: 'code',
      },
      { label: 'You’re on it', href: 'https://islandrhythms.github.io/', kind: 'live' },
    ],
    status: 'live',
  },
  {
    slug: 'xcom-2-mods',
    title: 'XCOM 2 Mods',
    category: 'games',
    year: '2021 — present',
    blurb:
      'A published collection of quality-of-life mods for XCOM 2, reverse-engineered from famously thin documentation.',
    description:
      'Modding XCOM 2 means working against a sparsely documented Unreal Engine 3 toolchain, so most of the effort went into reading decompiled game code to figure out where a hook could safely go. Every item in the Steam Workshop list has a matching repository on my GitHub profile.',
    tech: ['UnrealScript', 'Unreal Engine 3', 'Modding'],
    links: [
      {
        label: 'Steam Workshop',
        href: 'https://steamcommunity.com/profiles/76561198216752133/myworkshopfiles/',
        kind: 'store',
      },
      { label: 'Repos', href: 'https://github.com/IslandRhythms?tab=repositories', kind: 'code' },
    ],
    status: 'ongoing',
  },
  {
    slug: 'grim-shredder',
    title: 'The Grim Shredder',
    category: 'games',
    year: '2019',
    blurb:
      'A Unity game built for my introduction to game programming course, published on itch.io.',
    description:
      'My first end-to-end game: design, mechanics, art integration and build pipeline, made in Unity for CSC329 at the University of Miami and shipped publicly on itch.io.',
    tech: ['Unity', 'C#', 'Game Design'],
    links: [
      {
        label: 'Play on itch.io',
        href: 'https://theislandrhythm.itch.io/the-grim-shredder',
        kind: 'store',
      },
      { label: 'Source', href: 'https://github.com/IslandRhythms/CSC329', kind: 'code' },
    ],
    embed: 'https://itch.io/embed/637364',
    status: 'live',
  },
  {
    slug: 'unit-converter',
    title: 'Unit Converter',
    category: 'software',
    year: '2020',
    blurb:
      'An offline Java Swing desktop utility for metric ↔ imperial conversion, built to speed up 3D printing work.',
    description:
      '3D printing involves converting inches to millimetres constantly, and reaching for a search engine every time got old. This is a small, dependency-free Swing app that handles metric-to-metric, imperial-to-imperial and cross-system conversion entirely offline.',
    tech: ['Java', 'Java Swing'],
    links: [
      { label: 'Source', href: 'https://github.com/IslandRhythms/UnitConverter', kind: 'code' },
    ],
    status: 'archived',
  },
  {
    slug: 'udemy-ecommerce',
    title: 'E-Commerce Storefront',
    category: 'web',
    year: '2021',
    blurb:
      'A full storefront — catalogue, cart and checkout — built while working through a course on production web apps.',
    description:
      'A complete e-commerce build covering product catalogue, cart state and checkout flow. It was deployed to Heroku until free dynos were discontinued, so it now lives as source only.',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'JavaScript'],
    links: [
      { label: 'Source', href: 'https://github.com/IslandRhythms/UdemyWebsite', kind: 'code' },
    ],
    status: 'archived',
  },
]

export default projects
