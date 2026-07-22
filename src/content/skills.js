/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SKILLS: grouped capability list for the About section.
 * Add a group or an item; the layout adapts on its own.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** @type {{ id: string, label: string, items: string[] }[]} */
export const skillGroups = [
  {
    id: 'frontend',
    label: 'Front End',
    items: [
      'JavaScript',
      'Vue.js',
      'Nuxt',
      'React',
      'React Native',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Bootstrap',
      'Canvas 2D',
      'Vite',
    ],
  },
  {
    id: 'backend',
    label: 'Back End',
    items: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose.js', 'REST APIs', 'SQL', 'MySQL'],
  },
  {
    id: 'languages',
    label: 'Languages',
    items: ['JavaScript', 'Java', 'C#', 'C', 'Python', 'UnrealScript'],
  },
  {
    id: 'tooling',
    label: 'Tooling & Platforms',
    items: [
      'Git',
      'GitHub Actions',
      'Mocha.js',
      'Webpack',
      'Postman',
      'JIRA',
      'Netlify',
      'Linux',
      'Raspberry Pi',
    ],
  },
  {
    id: 'services',
    label: 'Integrations',
    items: ['Stripe', 'Twilio', 'Cloudinary', 'Persona', 'Spotify API', 'Discord API'],
  },
]

export default skillGroups
