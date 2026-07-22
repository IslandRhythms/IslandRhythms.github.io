<script setup>
import { site } from '@/content/site'
import { education, experience } from '@/content/experience'
import { skillGroups } from '@/content/skills'
import SectionHeading from '@/components/SectionHeading.vue'
import AppIcon from '@/components/AppIcon.vue'

/** Work history then education, in one continuous timeline. */
const timeline = [
  ...experience.map((role) => ({ ...role, kind: 'Experience' })),
  ...education.map((role) => ({ ...role, kind: 'Education' })),
]
</script>

<template>
  <section id="about" class="section">
    <div class="shell">
      <SectionHeading index="03" eyebrow="About" title="I like knowing how things actually work." />

      <!-- Portrait + bio -->
      <div class="intro">
        <div v-reveal="'left'" class="portrait-wrap">
          <div class="portrait">
            <img
              :src="site.avatar"
              :alt="`Portrait of ${site.name}`"
              width="420"
              height="420"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="portrait-glow" aria-hidden="true" />
          <p class="portrait-caption">
            <AppIcon name="pin" :size="13" />
            {{ site.location }}
          </p>
        </div>

        <div class="bio">
          <p
            v-for="(paragraph, i) in site.bio"
            :key="i"
            v-reveal="{ delay: 100 + i * 90 }"
            class="bio-text"
          >
            {{ paragraph }}
          </p>

          <div v-reveal="{ delay: 300 }" class="socials">
            <a
              v-for="social in site.socials"
              :key="social.label"
              :href="social.href"
              class="social"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AppIcon :name="social.icon" :size="16" />
              <span>{{ social.label }}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Timeline -->
      <div class="timeline">
        <article
          v-for="(entry, i) in timeline"
          :key="entry.org + entry.title"
          v-reveal="{ delay: i * 100 }"
          class="entry"
        >
          <div class="marker" aria-hidden="true">
            <span class="dot" />
          </div>

          <div class="entry-body panel">
            <div class="entry-head">
              <img
                v-if="entry.logo"
                :src="entry.logo"
                :alt="`${entry.org} logo`"
                class="logo"
                width="48"
                height="48"
                loading="lazy"
                decoding="async"
              />
              <div>
                <p class="kind">{{ entry.kind }}</p>
                <h3 class="entry-title">{{ entry.title }}</h3>
                <p class="org">
                  <a
                    v-if="entry.url"
                    :href="entry.url"
                    class="link-underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ entry.org }}
                  </a>
                  <span v-else>{{ entry.org }}</span>
                  <span class="period">{{ entry.period }}</span>
                </p>
              </div>
            </div>

            <p v-if="entry.summary" class="summary">{{ entry.summary }}</p>

            <ul v-if="entry.highlights" class="highlights">
              <li v-for="point in entry.highlights" :key="point">
                <AppIcon name="corner" :size="13" />
                <span>{{ point }}</span>
              </li>
            </ul>

            <ul v-if="entry.skills" class="skill-chips">
              <li v-for="skill in entry.skills" :key="skill" class="chip">{{ skill }}</li>
            </ul>
          </div>
        </article>
      </div>

      <!-- Capability grid -->
      <div class="capabilities">
        <h3 v-reveal class="cap-title">Toolkit</h3>
        <div class="cap-grid">
          <div
            v-for="(group, i) in skillGroups"
            :key="group.id"
            v-reveal="{ delay: i * 80 }"
            class="cap-group"
          >
            <p class="cap-label">{{ group.label }}</p>
            <ul>
              <li v-for="item in group.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {
  position: relative;
  padding: clamp(5rem, 12vw, 9rem) 0;
}

/* Soft field of colour behind the whole about block. */
.section::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(60% 50% at 88% 8%, var(--glow-accent), transparent 70%),
    radial-gradient(50% 40% at 4% 70%, var(--glow-gold), transparent 70%);
  opacity: 0.5;
}

.shell {
  position: relative;
}

/* ── Intro ───────────────────────────────────────────────────────────────── */
.intro {
  display: grid;
  gap: clamp(2rem, 5vw, 3.5rem);
  align-items: start;
}

@media (min-width: 860px) {
  .intro {
    grid-template-columns: minmax(0, 20rem) minmax(0, 1fr);
  }
}

.portrait-wrap {
  position: relative;
  max-width: 20rem;
}

.portrait {
  position: relative;
  z-index: 1;
  border-radius: 1.5rem;
  overflow: hidden;
  border: 1px solid var(--line-strong);
  /* Slight cool grade so the photo sits inside the palette rather than on it. */
  filter: saturate(0.92) contrast(1.04);
}

.portrait img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  transition: transform 0.8s var(--ease-out-expo);
}

.portrait-wrap:hover .portrait img {
  transform: scale(1.04);
}

.portrait-glow {
  position: absolute;
  inset: -12% -12% 8%;
  border-radius: 2rem;
  background: linear-gradient(140deg, var(--accent), var(--gold));
  opacity: 0.18;
  filter: blur(38px);
}

.portrait-caption {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  margin-top: 1rem;
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-faint);
}

.bio-text {
  /* Cap the measure — the grid column is wide enough to run past 100
     characters a line otherwise, which is uncomfortable to read. */
  max-width: 62ch;
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  line-height: 1.75;
  color: var(--text-muted);
}

.bio-text + .bio-text {
  margin-top: 1.25rem;
}

.socials {
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  margin-top: 2rem;
}

.social {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.9375rem;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--surface);
  font-size: 0.8125rem;
  color: var(--text-muted);
  transition:
    color 0.3s ease,
    border-color 0.3s ease,
    transform 0.4s var(--ease-out-expo);
}

.social:hover {
  color: var(--text-strong);
  border-color: var(--accent);
  transform: translateY(-2px);
}

/* ── Timeline ────────────────────────────────────────────────────────────── */
.timeline {
  margin-top: clamp(3.5rem, 8vw, 6rem);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.entry {
  display: grid;
  grid-template-columns: 1.5rem minmax(0, 1fr);
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .entry {
    grid-template-columns: 2.5rem minmax(0, 1fr);
  }
}

.marker {
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 2rem;
}

/* The connecting line, drawn per-entry so it stretches with content. */
.marker::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: -1.25rem;
  width: 1px;
  background: linear-gradient(to bottom, var(--line-strong), transparent);
}

.entry:last-child .marker::before {
  bottom: 50%;
}

.dot {
  position: relative;
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: var(--accent);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent);
}

.entry-body {
  padding: clamp(1.25rem, 3vw, 2rem);
  border-radius: 1.25rem;
}

.entry-head {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.logo {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  object-fit: contain;
  background: #fff;
  padding: 0.375rem;
  flex-shrink: 0;
}

.kind {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
}

.entry-title {
  margin-top: 0.3125rem;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.org {
  margin-top: 0.25rem;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.625rem;
  font-size: 0.9375rem;
  color: var(--text-muted);
}

.period {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.06em;
  color: var(--text-faint);
}

.summary {
  margin-top: 1rem;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--text-muted);
}

.highlights {
  margin-top: 1.125rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  list-style: none;
}

.highlights li {
  display: flex;
  gap: 0.625rem;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--text-muted);
}

.highlights svg {
  margin-top: 0.3125rem;
  color: var(--accent);
  flex-shrink: 0;
}

.skill-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 1.375rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--line);
  list-style: none;
}

/* ── Capabilities ────────────────────────────────────────────────────────── */
.capabilities {
  margin-top: clamp(3.5rem, 8vw, 5.5rem);
}

.cap-title {
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin-bottom: 1.5rem;
}

.cap-grid {
  display: grid;
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: 1.25rem;
  overflow: hidden;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
}

.cap-group {
  background: var(--bg);
  padding: 1.5rem 1.375rem;
}

.cap-label {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1rem;
}

.cap-group ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;
}

.cap-group li {
  font-size: 0.875rem;
  color: var(--text-muted);
  transition: color 0.25s ease;
}

.cap-group li:hover {
  color: var(--text-strong);
}
</style>
