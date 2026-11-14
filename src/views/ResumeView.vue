<script setup>
/**
 * The résumé, rendered from the same content files as the landing page and laid
 * out for A4/Letter. `@media print` in main.css strips the chrome, so "Save as
 * PDF" produces a clean document with no extra tooling.
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
const highlights = projects.filter((p) => p.resume !== false && (p.featured || p.status === 'live'))

/**
 * A URL as it reads on paper: no protocol, no www, no trailing slash. Shown in
 * place of a bare "GitHub" label, which is a dead end once printed.
 */
function displayUrl(href) {
  return href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}

/** Where to ask for the one-page PDF, which isn't published on the site. */
const linkedIn = site.socials.find((social) => social.icon === 'linkedin')

onMounted(() => window.scrollTo(0, 0))

function printPage() {
  window.print()
}
</script>

<template>
  <article class="resume">
    <div class="toolbar no-print">
      <RouterLink to="/" class="back">
        <AppIcon name="arrow" :size="15" class="flip" />
        Back to site
      </RouterLink>
      <div class="toolbar-actions">
        <a
          v-if="linkedIn"
          :href="linkedIn.href"
          class="btn btn-ghost"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AppIcon name="linkedin" :size="16" />
          Message me on LinkedIn for a one-page PDF
        </a>
        <button type="button" class="btn btn-primary print-btn" @click="printPage">
          <AppIcon name="print" :size="16" />
          Print / Save as PDF
        </button>
      </div>
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
            <a
              :href="social.href"
              :data-url="displayUrl(social.href)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AppIcon :name="social.icon" :size="13" />
              {{ social.label }}
            </a>
          </li>
        </ul>
      </header>

      <!-- Experience -->
      <section class="block">
        <h2>Experience</h2>
        <div v-for="role in experience" :key="role.title" class="item">
          <div class="item-head">
            <h3>
              {{ role.title }} ·
              <a :href="role.url" class="org" target="_blank" rel="noopener noreferrer">
                {{ role.org }}
              </a>
            </h3>
            <span class="period">{{ role.period }}</span>
          </div>
          <p v-if="role.summary" class="line">{{ role.summary }}</p>
          <ul class="bullets">
            <li v-for="point in role.highlights" :key="point">{{ point }}</li>
          </ul>
          <ul v-if="role.skills" class="tags">
            <li v-for="skill in role.skills" :key="skill" class="chip">{{ skill }}</li>
          </ul>
        </div>
      </section>

      <!-- Open source -->
      <section class="block">
        <h2>Open Source</h2>
        <div v-for="entry in openSource" :key="entry.org" class="item">
          <div class="item-head">
            <h3>
              {{ entry.title }} ·
              <a :href="entry.url" class="org" target="_blank" rel="noopener noreferrer">
                {{ entry.org }}
              </a>
            </h3>
            <span class="period">{{ entry.period }}</span>
          </div>
          <p v-if="entry.summary" class="line">{{ entry.summary }}</p>
          <ul class="bullets">
            <li v-for="point in entry.highlights" :key="point">{{ point }}</li>
          </ul>
          <p v-if="entry.links" class="refs">
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
        <h2>Projects</h2>
        <div v-for="project in highlights" :key="project.slug" class="item">
          <div class="item-head">
            <h3>{{ project.title }}</h3>
            <span class="period">{{ project.year }}</span>
          </div>
          <p class="line">{{ project.description }}</p>
          <ul class="tags">
            <li v-for="item in project.tech" :key="item" class="chip">{{ item }}</li>
          </ul>
          <p v-if="project.links.length" class="refs">
            <a
              v-for="link in project.links"
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

      <!-- Education -->
      <section class="block">
        <h2>Education</h2>
        <div v-for="entry in education" :key="entry.org" class="item">
          <div class="item-head">
            <h3>
              {{ entry.title }} ·
              <a :href="entry.url" class="org" target="_blank" rel="noopener noreferrer">
                {{ entry.org }}
              </a>
            </h3>
            <span class="period">{{ entry.period }}</span>
          </div>
          <p v-if="entry.summary" class="line">{{ entry.summary }}</p>
          <ul v-if="entry.skills" class="tags">
            <li v-for="skill in entry.skills" :key="skill" class="chip">{{ skill }}</li>
          </ul>
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

.toolbar-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
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
/* Name on the left, contact column on the right. Stacks on narrow screens, with
   the contact column dropping under the name and aligning left with it. */
.masthead {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.25rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid var(--line-strong);
}

@media (min-width: 640px), print {
  .masthead {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: start;
  }
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.125rem;
  min-width: 0;
  list-style: none;
  font-size: 0.8125rem;
  line-height: 1.7;
  color: var(--text-muted);
}

@media (min-width: 640px), print {
  .contact {
    align-items: flex-end;
    text-align: right;
  }
}

.contact a {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  transition: color 0.25s ease;
}

.contact a:hover {
  color: var(--accent);
}

/* On paper a bare "GitHub" is a dead end, so print the short URL after it.
   Allowed to wrap, so a long one breaks onto a second line instead of running
   off the page. */
@media print {
  .contact a::after {
    content: ' · ' attr(data-url);
    overflow-wrap: anywhere;
  }
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
  transition: color 0.25s ease;
}

a.org:hover {
  color: var(--accent);
}

/* Technologies for an entry, as the same chips the project cards use. */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3125rem;
  margin-top: 0.625rem;
  list-style: none;
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

/* Links under an entry: PRs, live sites, store pages, source. Monospace so the
   row reads as references rather than prose. */
.refs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1rem;
  margin-top: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.refs a {
  color: var(--accent);
}

/* On paper a bare "PR #11814" or "Source" is a dead end, so print the URL
   after it. */
@media print {
  .refs a::after {
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

  .bullets li,
  .line,
  .org,
  .skills dd,
  .contact {
    color: #333 !important;
  }

  /* Outlined only: a tinted fill wastes ink and can drop out entirely. */
  .tags .chip {
    background: none !important;
    border-color: #bbb !important;
    color: #333 !important;
  }
}
</style>
