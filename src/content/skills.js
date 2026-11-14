/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SKILLS: grouped capability list for the About section and the résumé page.
 * Add a group or an item; the layout adapts on its own. Groups follow the same
 * order and headings as the PDF résumé.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** @type {{ id: string, label: string, items: string[] }[]} */
export const skillGroups = [
  {
    id: 'languages',
    label: 'Languages',
    items: ['JavaScript', 'TypeScript', 'SQL', 'Python', 'Java', 'C#', 'C', 'UnrealScript'],
  },
  {
    id: 'backend',
    label: 'Back End',
    items: ['Node.js', 'Express.js', 'NestJS', 'Mongoose.js', 'REST API design'],
  },
  {
    id: 'frontend',
    label: 'Front End',
    items: [
      'Vue.js',
      'Nuxt',
      'React',
      'React Native',
      'Vite',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Bootstrap',
      'Canvas 2D',
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    items: ['MongoDB', 'PostgreSQL', 'MySQL'],
  },
  {
    id: 'tooling',
    label: 'Testing & Tooling',
    items: [
      'Mocha.js',
      'Webpack',
      'Docker',
      'Git',
      'GitHub Actions',
      'Postman',
      'npm',
      'JIRA',
      'Linux',
      'Raspberry Pi',
    ],
  },
  {
    id: 'services',
    label: 'Integrations & Cloud Services',
    items: [
      'Google Cloud Platform',
      'AWS',
      'Supabase',
      'Stripe',
      'Twilio',
      'Cloudinary',
      'Persona',
      'Netlify',
      'Spotify API',
      'Discord API',
    ],
  },
  {
    id: 'ai',
    label: 'AI Development Tools',
    items: ['Cursor', 'GitHub Copilot', 'Claude'],
  },
]

export default skillGroups
