/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CAREER — work history and education, rendered as the About timeline and the
 * printable résumé at /resume.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * @typedef  {object}   Role
 * @property {string}   title     Job or degree title.
 * @property {string}   org       Company or school.
 * @property {string}   [url]     Link on the org name.
 * @property {string}   period    e.g. 'Jan 2021 — Present'.
 * @property {string}   [logo]    Path in /public.
 * @property {string}   [summary] One-line framing sentence.
 * @property {string[]} [highlights] Bullet points.
 * @property {string[]} [skills]  Chips shown under the entry.
 */

/** @type {Role[]} */
export const experience = [
  {
    title: 'Software Engineer',
    org: 'MeanIT Software',
    url: 'https://meanitsoftware.com',
    period: 'Jan 2021 — Present',
    logo: '/MeanIT.png',
    summary:
      'Open-source maintenance, technical writing and client consulting across the JavaScript stack.',
    highlights: [
      'Partnered with the lead maintainer of Mongoose.js to develop new features and release enhancements, supporting a library with over 1 million weekly downloads.',
      'Investigated and resolved over 1,000 bug reports for Mongoose.js, measurably improving library reliability.',
      'Authored two articles weekly teaching new subjects on masteringjs.io, contributing to community knowledge and engagement.',
      'Consulted with clients to deliver tailored solutions on the V.E.N.M. stack (Vue.js, Express.js, Node.js, MongoDB), aligning technology choices with business needs.',
    ],
    skills: [
      'JavaScript',
      'Vue.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose.js',
      'Mocha.js',
      'HTML',
      'CSS',
      'TailwindCSS',
      'Bootstrap',
      'Stripe',
      'Twilio',
      'Cloudinary',
      'Persona',
      'Webpack',
      'Netlify',
      'Postman',
      'Git',
    ],
  },
]

/** @type {Role[]} */
export const education = [
  {
    title: 'B.S. in Computer Science',
    org: 'University of Miami',
    url: 'https://welcome.miami.edu',
    period: 'Aug 2016 — May 2020',
    logo: '/University-Of-Miami-Symbol.png',
    summary:
      'Computer science fundamentals — algorithms, systems and graphics — alongside game programming coursework.',
    skills: ['Java', 'C', 'C#', 'Unity', 'Python', 'SQL', 'Linux'],
  },
]

export default { experience, education }
