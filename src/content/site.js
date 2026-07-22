/**
 * Site-wide identity and metadata.
 * Everything the site says about *you* lives here. Edit this file, not components.
 *
 * Note: there is deliberately no email address or phone number anywhere in this
 * file. All contact goes through the form in the Contact section, which posts to
 * the Formspree endpoint below. Keeping an address out of the markup also keeps
 * it away from the scrapers that trawl portfolio sites.
 */

/** First year of professional work. Drives the "years shipping" figure. */
const CAREER_START_YEAR = 2021

/**
 * Years of experience, recalculated in the visitor's browser on every page load,
 * so it ticks over on 1 January without anyone having to remember to edit it.
 */
export const yearsShipping = new Date().getFullYear() - CAREER_START_YEAR

export const site = {
  name: 'Daniel Christian Diaz',
  shortName: 'Daniel Diaz',
  initials: 'DD',
  role: 'Software Engineer',
  location: 'Miami, FL',
  url: 'https://islandrhythms.github.io',
  /** Where the contact form posts. The only contact channel on the site. */
  formspree: 'https://formspree.io/f/xannvqvp',
  avatar: '/WebsiteProfilePic.png',
  /**
   * Brand tagline from the original DCD logo. Rendered under the wordmark in
   * both the header and the footer. (The longer pitch paragraph is `heroLead`.)
   */
  motto: 'Design · Code · Deliver',
  /** Social share card. Swap for a 1200×630 PNG if you make a custom one. */
  ogImage: '/WebsiteProfilePic.png',

  /**
   * The big paragraph under your name in the hero. `highlight` must appear
   * verbatim inside `text`; that phrase gets the aqua to gold gradient.
   */
  heroLead: {
    text: 'I build fast, resilient web software, from open-source libraries downloaded a million times a week to interfaces people actually enjoy using.',
    highlight: 'fast, resilient',
  },

  bio: [
    `I'm a software engineer with ${yearsShipping} years of experience shipping production web applications. Most of that time has been spent close to open source, partnering with the lead maintainer of Mongoose.js to build features for a library that gets downloaded over a million times a week, and writing twice-weekly tutorials that teach the JavaScript ecosystem to thousands of developers.`,
    'My day to day covers the whole stack. Vue and modern CSS on the front end, Node, Express and MongoDB behind it, with a bias toward clean, well-tested code and interfaces that feel effortless to use.',
  ],

  /** Headline numbers in the hero. The grid reflows for any count from 2 to 4. */
  stats: [
    { value: '1M+', label: 'Weekly downloads', detail: 'Mongoose.js, co-maintained' },
    { value: '1,000+', label: 'Bugs resolved', detail: 'Open-source issue triage' },
    { value: `${yearsShipping}+`, label: 'Years shipping', detail: 'Production web software' },
  ],

  /** Profile links. `icon` maps to a key in components/AppIcon.vue. */
  socials: [
    { label: 'GitHub', href: 'https://github.com/IslandRhythms', icon: 'github' },
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
