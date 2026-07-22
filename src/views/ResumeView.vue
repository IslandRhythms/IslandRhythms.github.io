<script setup>
/**
 * A one-page résumé rendered from the same content files as the landing page,
 * laid out for A4/Letter. `@media print` in main.css strips the chrome, so
 * "Save as PDF" produces a clean document with no extra tooling.
 */
import { onMounted } from 'vue'
import { site } from '@/content/site'
import { education, experience, openSource } from '@/content/experience'
import { skillGroups } from '@/content/skills'
import { projects } from '@/content/projects'
import AppIcon from '@/components/AppIcon.vue'

/**
 * Featured plus anything currently live: the ones worth a recruiter's time.
 * `resume: false` opts a project out — used where the work is already described
 * under a role, so the page doesn't say the same thing twice.
 */
const highlights = projects
  .filter((p) => p.resume !== false && (p.featured || p.status === 'live'))
  .slice(0, 5)

onMounted(() => window.scrollTo(0, 0))

function printPage() {
  window.print()
}

/**
 * Profile URLs shown in the masthead. Steam's is long enough to force the
 * header into a stacked layout, so keep host plus one path segment and fall
 * back to the bare host when even that runs long.
 */
function shortUrl(href) {
  const bare = href.replace(/^https?:\/\//, '').replace(/\/$/, '')
  const [host, first] = bare.split('/')
  const withSegment = first ? `${host}/${first}` : host
  return withSegment.length > 32 ? host : withSegment
}
</script>

<template>
  <article class="resume">
    <div class="toolbar no-print">
      <RouterLink to="/" class="back">
        <AppIcon name="arrow" :size="15" class="flip" />
        Back to site
      </RouterLink>
      <button type="button" class="btn btn-primary print-btn" @click="printPage">
        <AppIcon name="print" :size="16" />
        Print / Save as PDF
      </button>
    </div>

    <div class="sheet">
      <!-- Masthead -->
      <header class="masthead">
        <div>
          <h1>{{ site.name }}</h1>
          <p class="role">{{ site.role }}</p>
        </div>
        <ul class="contact">
          <li>{{ site.location }}</li>
          <li>
            <RouterLink to="/#contact">islandrhythms.github.io/#contact</RouterLink>
          </li>
          <li v-for="social in site.socials" :key="social.label">
            <a :href="social.href" target="_blank" rel="noopener noreferrer">
              {{ shortUrl(social.href) }}
            </a>
          </li>
        </ul>
      </header>

      <p class="summary">{{ site.bio[0] }}</p>

      <!-- Experience -->
      <section class="block">
        <h2>Experience</h2>
        <div v-for="role in experience" :key="role.org" class="item">
          <div class="item-head">
            <h3>
              {{ role.title }} · <span class="org">{{ role.org }}</span>
            </h3>
            <span class="period">{{ role.period }}</span>
          </div>
          <ul class="bullets">
            <li v-for="point in role.highlights" :key="point">{{ point }}</li>
          </ul>
        </div>
      </section>

      <!-- Open source -->
      <section class="block">
        <h2>Open Source</h2>
        <div v-for="entry in openSource" :key="entry.org" class="item">
          <div class="item-head">
            <h3>
              {{ entry.title }} · <span class="org">{{ entry.org }}</span>
            </h3>
            <span class="period">{{ entry.period }}</span>
          </div>
          <ul class="bullets">
            <li v-for="point in entry.highlights" :key="point">{{ point }}</li>
          </ul>
          <p v-if="entry.links" class="prs">
            <a
              v-for="link in entry.links"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ link.label }}
            </a>
          </p>
        </div>
      </section>

      <!-- Projects -->
      <section class="block">
        <h2>Selected Projects</h2>
        <div v-for="project in highlights" :key="project.slug" class="item compact">
          <div class="item-head">
            <h3>
              {{ project.title }}
              <span class="stack">{{ project.tech.slice(0, 4).join(' · ') }}</span>
            </h3>
            <span class="period">{{ project.year }}</span>
          </div>
          <p class="line">{{ project.blurb }}</p>
        </div>
      </section>

      <!-- Education -->
      <section class="block">
        <h2>Education</h2>
        <div v-for="entry in education" :key="entry.org" class="item compact">
          <div class="item-head">
            <h3>
              {{ entry.title }} · <span class="org">{{ entry.org }}</span>
            </h3>
            <span class="period">{{ entry.period }}</span>
          </div>
          <p v-if="entry.skills" class="line">{{ entry.skills.join(' · ') }}</p>
        </div>
      </section>

      <!-- Skills -->
      <section class="block">
        <h2>Technical Skills</h2>
        <dl class="skills">
          <div v-for="group in skillGroups" :key="group.id">
            <dt>{{ group.label }}</dt>
            <dd>{{ group.items.join(' · ') }}</dd>
          </div>
        </dl>
      </section>
    </div>
  </article>
</template>

<style scoped>
.resume {
  padding: 7.5rem 0 5rem;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: min(56rem, 100%);
  margin: 0 auto 1.5rem;
  padding-inline: clamp(1.25rem, 5vw, 2rem);
}

.back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-muted);
  transition: color 0.25s ease;
}

.back:hover {
  color: var(--text-strong);
}

.flip {
  transform: rotate(180deg);
}

.sheet {
  width: min(56rem, 100%);
  margin: 0 auto;
  padding: clamp(1.75rem, 5vw, 3.5rem);
  border-radius: 1.25rem;
  border: 1px solid var(--line);
  background: var(--surface-solid);
}

/* ── Masthead ────────────────────────────────────────────────────────────── */
.masthead {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid var(--line-strong);
}

.masthead h1 {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 600;
  letter-spacing: -0.03em;
}

.role {
  margin-top: 0.25rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
}

.contact {
  list-style: none;
  text-align: right;
  font-size: 0.8125rem;
  line-height: 1.7;
  color: var(--text-muted);
}

.contact a:hover {
  color: var(--accent);
}

.summary {
  margin-top: 1.5rem;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--text-muted);
}

/* ── Blocks ──────────────────────────────────────────────────────────────── */
.block {
  margin-top: 2rem;
  break-inside: avoid;
}

.block h2 {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--line);
}

.item {
  margin-top: 1.125rem;
  break-inside: avoid;
}

.item.compact {
  margin-top: 0.875rem;
}

.item-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
}

.item-head h3 {
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  font-weight: 600;
}

.org {
  font-weight: 400;
  color: var(--text-muted);
}

.stack {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  font-weight: 400;
  color: var(--text-faint);
  margin-top: 0.125rem;
}

.period {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  color: var(--text-faint);
  white-space: nowrap;
}

.bullets {
  margin-top: 0.625rem;
  padding-left: 1.125rem;
  display: flex;
  flex-direction: column;
  gap: 0.4375rem;
}

.bullets li {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--text-muted);
}

.bullets li::marker {
  color: var(--accent);
}

.line {
  margin-top: 0.3125rem;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--text-muted);
}

/* Evidence links under an open-source entry. Monospace so a row of PR numbers
   reads as references rather than prose. */
.prs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1rem;
  margin-top: 0.5rem;
  padding-left: 1.125rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.prs a {
  color: var(--accent);
}

/* On paper a bare "PR #11814" is a dead end, so print the URL after it. */
@media print {
  .prs a::after {
    content: ' ' attr(href);
    color: var(--text-faint);
  }
}

/* ── Skills ──────────────────────────────────────────────────────────────── */
.skills {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.skills dt {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-strong);
}

.skills dd {
  font-size: 0.8125rem;
  line-height: 1.6;
  color: var(--text-muted);
}

/* ── Print ───────────────────────────────────────────────────────────────── */
@media print {
  .resume {
    padding: 0;
  }

  .sheet {
    width: 100%;
    max-width: none;
    padding: 0;
    border: 0;
    background: none;
  }

  .role,
  .block h2,
  .bullets li::marker {
    color: #000 !important;
  }

  .summary,
  .bullets li,
  .line,
  .skills dd,
  .contact {
    color: #333 !important;
  }
}
</style>
