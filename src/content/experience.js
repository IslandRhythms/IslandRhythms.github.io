/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CAREER: work history and education, rendered as the About timeline and the
 * printable résumé at /resume.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * @typedef  {object}   Role
 * @property {string}   title     Job or degree title.
 * @property {string}   org       Company or school.
 * @property {string}   [url]     Link on the org name.
 * @property {string}   period    e.g. 'Since January 2021'.
 * @property {string}   [logo]    Path in /public.
 * @property {string}   [summary] One-line framing sentence.
 * @property {string[]} [highlights] Bullet points.
 * @property {string[]} [skills]  Chips shown under the entry.
 * @property {{label: string, href: string}[]} [links] Evidence links, e.g. PRs.
 */

/**
 * Newest first. The two MeanIT entries are deliberately separate rather than one
 * "Since January 2021" block: the promotion from Junior Developer is the shape
 * of the career, and flattening it hides five years of progression.
 *
 * @type {Role[]}
 */
export const experience = [
  {
    title: 'Software Engineer',
    org: 'MeanIT Software',
    url: 'https://meanitsoftware.com',
    period: 'Since August 2021',
    logo: '/MeanIT.png',
    summary: 'Full-stack client work across the JavaScript stack, plus internal developer tooling.',
    highlights: [
      'Built and maintained production web applications for three client teams using Node.js, Express, Vue.js and MongoDB.',
      'Designed and shipped REST APIs and MongoDB schemas, integrating Stripe for payments, Twilio for messaging and Cloudinary for media.',
      'Contributed features to Mongoose Studio, internal developer tooling that improved debugging, data inspection and local development workflows for client and engineering teams.',
      "Developed and maintained features in a client's internal tool built on Nuxt, Vue's server-side rendering framework.",
      'Partnered with stakeholders to translate evolving requirements into maintainable, scalable technical solutions.',
      'Drove production quality through code reviews, issue triage and release preparation.',
    ],
    skills: [
      'JavaScript',
      'Vue.js',
      'Nuxt',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose.js',
      'REST APIs',
      'Tailwind CSS',
      'Bootstrap',
      'Stripe',
      'Twilio',
      'Cloudinary',
      'Persona',
      'Netlify',
      'Postman',
      'JIRA',
      'Git',
    ],
  },
  {
    title: 'Junior Developer',
    org: 'MeanIT Software',
    url: 'https://meanitsoftware.com',
    period: 'January 2021 to August 2021',
    logo: '/MeanIT.png',
    summary: 'Technical writing and full-stack maintenance work under senior guidance.',
    highlights: [
      'Authored two technical articles a week for masteringjs.io, teaching JavaScript and Node.js concepts to a large developer audience.',
      'Diagnosed and resolved bugs across multiple projects, improving application stability and user experience.',
      'Implemented features, fixes and maintenance updates across front end and back end under senior guidance.',
    ],
    skills: ['JavaScript', 'Node.js', 'Technical Writing', 'Mocha.js', 'Git'],
  },
]

/**
 * Open-source work, kept out of the employment history on purpose: it spans both
 * roles, and it's the single strongest credential here, so it earns its own
 * heading on the résumé instead of sitting as a bullet under a job title.
 *
 * @type {Role[]}
 */
export const openSource = [
  {
    title: 'Contributor',
    org: 'Mongoose.js',
    url: 'https://github.com/Automattic/mongoose',
    period: 'Since 2021',
    summary: 'MongoDB object modelling for Node.js, downloaded more than a million times a week.',
    highlights: [
      'Developed and released new features alongside the lead maintainer, supporting a library with over 1 million weekly downloads.',
      'Investigated and resolved over 1,000 bug reports, measurably improving library reliability.',
    ],
    links: [
      { label: 'PR #11814', href: 'https://github.com/Automattic/mongoose/pull/11814' },
      { label: 'PR #11786', href: 'https://github.com/Automattic/mongoose/pull/11786' },
      { label: 'PR #13663', href: 'https://github.com/Automattic/mongoose/pull/13663' },
    ],
  },
]

/** @type {Role[]} */
export const education = [
  {
    title: 'B.S. in Computer Science',
    org: 'University of Miami',
    url: 'https://welcome.miami.edu',
    period: 'August 2016 to May 2020',
    logo: '/University-Of-Miami-Symbol.png',
    summary:
      'Computer science fundamentals across algorithms, systems and graphics, alongside game programming coursework.',
    skills: ['Java', 'C', 'C#', 'Unity', 'Python', 'SQL', 'Linux'],
  },
]

export default { experience, openSource, education }
