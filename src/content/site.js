/**
 * Site-wide identity, contact details and metadata.
 * Everything the site says about *you* lives here — edit this file, not components.
 */
export const site = {
  name: 'Daniel Christian Diaz',
  shortName: 'Daniel Diaz',
  initials: 'DD',
  role: 'Software Engineer',
  location: 'Miami, FL',
  url: 'https://islandrhythms.github.io',
  email: 'daniel@meanitsoftware.com',
  /** Formspree endpoint powering the contact form. */
  formspree: 'https://formspree.io/f/xannvqvp',
  avatar: '/WebsiteProfilePic.png',
  /**
   * Brand tagline from the original DCD logo. Rendered under the wordmark in
   * both the header and the footer — this is the site's tagline. (The longer
   * pitch paragraph is `heroLead` below.)
   */
  motto: 'Design · Code · Deliver',
  /** Social share card. Swap for a 1200×630 PNG if you make a custom one. */
  ogImage: '/WebsiteProfilePic.png',

  /**
   * The big paragraph under your name in the hero. `highlight` must appear
   * verbatim inside `text` — that phrase gets the aqua→gold gradient treatment.
   */
  heroLead: {
    text: 'I build fast, resilient web software — from open-source libraries downloaded a million times a week to interfaces people actually enjoy using.',
    highlight: 'fast, resilient',
  },
  bio: [
    'I’m a software engineer with 4+ years of experience shipping production web applications. Most of that time has been spent close to open source: partnering with the lead maintainer of Mongoose.js to build features for a library downloaded over a million times a week, and writing twice-weekly tutorials that teach the JavaScript ecosystem to thousands of developers.',
    'My day-to-day spans the whole stack — Vue and modern CSS on the front end, Node, Express and MongoDB behind it — with a bias toward clean, well-tested code and interfaces that feel effortless to use.',
  ],

  /** Headline numbers rendered in the hero. Keep to 3–4 for layout balance. */
  stats: [
    { value: '1M+', label: 'Weekly downloads', detail: 'Mongoose.js, co-maintained' },
    { value: '1,000+', label: 'Bugs resolved', detail: 'Open-source issue triage' },
    { value: '200+', label: 'Articles published', detail: 'masteringjs.io' },
    { value: '4+', label: 'Years shipping', detail: 'Production web software' },
  ],

  /** Social / profile links. `icon` maps to a key in components/BrandIcon.vue. */
  socials: [
    { label: 'GitHub', href: 'https://github.com/IslandRhythms', icon: 'github' },
    { label: 'Email', href: 'mailto:daniel@meanitsoftware.com', icon: 'mail' },
    {
      label: 'Steam',
      href: 'https://steamcommunity.com/profiles/76561198216752133/myworkshopfiles/',
      icon: 'steam',
    },
    { label: 'itch.io', href: 'https://theislandrhythm.itch.io', icon: 'itch' },
  ],

  /** In-page sections, in scroll order. Drives the nav, scroll-spy and ⌘K palette. */
  sections: [
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ],
}

export default site
