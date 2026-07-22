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

// https://vite.dev/config/
export default defineConfig({
  // User/organization GitHub Pages site is served from the domain root.
  base: '/',
  plugins: [vue(), tailwindcss(), htmlIdentity()],
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
