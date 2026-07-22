import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

import { site } from './src/content/site.js'

/**
 * Identity strings index.html needs before any JavaScript runs.
 *
 * The title, OG/Twitter tags, JSON-LD and <noscript> fallback are all read by
 * crawlers and scrapers that never boot the bundle — and <noscript> only renders
 * when JS is off — so Vue can't fill them in. Substituting at build time keeps
 * site.js the single source of truth while the shipped document stays static and
 * crawlable.
 */
const HTML_TOKENS = {
  NAME: site.name,
  ROLE: site.role,
  URL: site.url,
  DESCRIPTION: site.seo.description,
  SHARE_DESCRIPTION: site.seo.shareDescription,
  SHARE_DESCRIPTION_SHORT: site.seo.shareDescriptionShort,
}

function htmlIdentity() {
  return {
    name: 'html-identity',
    transformIndexHtml: {
      /**
       * Must run before Vite's own HTML pass. That pass percent-decodes href and
       * src attributes, and `%SITE_URL%` reads as a malformed escape sequence —
       * leaving this at the default order fails the build with "URI malformed".
       */
      order: 'pre',
      handler(html) {
        // A double quote would close an HTML attribute early and silently break
        // the ld+json block, where HTML entities aren't decoded. Cheaper to
        // refuse than to ship invalid structured data.
        for (const [key, value] of Object.entries(HTML_TOKENS)) {
          if (typeof value !== 'string' || value.includes('"')) {
            throw new Error(`site.js: ${key} must be a string with no double quotes`)
          }
        }

        return html.replace(/%SITE_([A-Z_]+)%/g, (match, key) => {
          if (!(key in HTML_TOKENS)) {
            throw new Error(`index.html references unknown token ${match}`)
          }
          return HTML_TOKENS[key]
        })
      },
    },
  }
}

/**
 * Routes worth putting in the sitemap. The 404 catch-all is deliberately absent —
 * it isn't a page anyone should be sent to from search.
 */
const SITEMAP_ROUTES = [
  { path: '/', priority: '1.0' },
  { path: '/resume', priority: '0.8' },
]

function buildSitemap(origin) {
  const urls = SITEMAP_ROUTES.map(
    (route) =>
      `  <url>\n` +
      `    <loc>${origin}${route.path}</loc>\n` +
      `    <changefreq>monthly</changefreq>\n` +
      `    <priority>${route.priority}</priority>\n` +
      `  </url>`,
  ).join('\n')

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${urls}\n` +
    `</urlset>\n`
  )
}

function buildRobots(origin) {
  return `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`
}

/**
 * Emits sitemap.xml and robots.txt from `site.url` instead of keeping them in
 * public/, where Vite copies files through untouched and the domain would have
 * to be written down a third and fourth time. Changing site.url now moves every
 * absolute URL the site publishes.
 *
 * Also served in dev, so /sitemap.xml doesn't 404 there and quietly diverge from
 * what actually ships.
 */
function seoFiles() {
  const origin = site.url.replace(/\/$/, '')

  const FILES = {
    '/sitemap.xml': { body: buildSitemap(origin), type: 'application/xml' },
    '/robots.txt': { body: buildRobots(origin), type: 'text/plain' },
  }

  return {
    name: 'seo-files',

    generateBundle() {
      for (const [route, file] of Object.entries(FILES)) {
        this.emitFile({ type: 'asset', fileName: route.slice(1), source: file.body })
      }
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const file = FILES[req.url]
        if (!file) return next()
        res.setHeader('Content-Type', file.type)
        res.end(file.body)
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // User/organization GitHub Pages site is served from the domain root.
  base: '/',
  plugins: [vue(), tailwindcss(), htmlIdentity(), seoFiles()],
  define: {
    // Real deploy date, stamped at build time and shown in the footer.
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    cssTarget: 'chrome100',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
        },
      },
    },
  },
})
