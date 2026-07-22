<script setup>
/**
 * DemoSection — the things you can actually poke at without leaving.
 *
 * Driven entirely by `demo: true` in projects.js. A demo renders its `embed`
 * inline when it has one, and falls back to a "try it" link card when it
 * doesn't, so flagging a project that has no iframe is a valid thing to do
 * rather than a hole in the layout.
 *
 * Demos are pulled out of the Work section, so nothing shows up twice.
 */
import { computed } from 'vue'
import { categories, projects } from '@/content/projects'
import SectionHeading from '@/components/SectionHeading.vue'
import DemoFrame from '@/components/DemoFrame.vue'
import AppIcon from '@/components/AppIcon.vue'

const demos = computed(() => projects.filter((project) => project.demo))

/** Category id → its definition, for the label and accent on each frame. */
const CATEGORY = Object.fromEntries(categories.map((category) => [category.id, category]))

function categoryOf(project) {
  return CATEGORY[project.category] || {}
}

/**
 * Hostname for the browser skin's address bar, from whichever link actually
 * launches the thing. Wrapped because `new URL` throws on a malformed href, and
 * a typo in projects.js shouldn't blank the section.
 */
function hostOf(project) {
  const link = launchLink(project)
  if (!link) return ''
  try {
    return new URL(link.href).host.replace(/^www\./, '')
  } catch {
    return ''
  }
}

const LINK_ICON = {
  code: 'github',
  live: 'external',
  store: 'external',
}

/**
 * The link a "try it" card points at: whatever actually launches the thing,
 * preferring a hosted URL or a store page over a source repo. Falls back to the
 * first link so a demo whose only link is source still renders a button.
 */
function launchLink(project) {
  const links = project.links || []
  return links.find((link) => link.kind === 'live' || link.kind === 'store') || links[0]
}

/** Source and anything else, minus whatever the launch button already shows. */
function otherLinks(project) {
  const launch = launchLink(project)
  return (project.links || []).filter((link) => link !== launch)
}
</script>

<template>
  <section v-if="demos.length" id="demos" class="section">
    <div class="shell">
      <SectionHeading
        index="02"
        eyebrow="Demos"
        title="Things you can try right here."
        lead="A screenshot only tells you so much. Where a project can run in the page, it does — the rest link straight out to somewhere you can use them."
      />

      <div class="demos">
        <article
          v-for="(project, i) in demos"
          :id="`project-${project.slug}`"
          :key="project.slug"
          v-reveal="{ delay: (i % 2) * 110 }"
          class="demo panel"
        >
          <div class="meta">
            <span class="cat" :style="{ '--cat': categoryOf(project).accent }">
              {{ categoryOf(project).label }}
            </span>
            <span class="year">{{ project.year }}</span>
            <span v-if="project.embed" class="tag">Playable</span>
            <span v-else class="tag is-link">Live</span>
          </div>

          <h3 class="title">{{ project.title }}</h3>
          <p class="blurb">{{ project.blurb }}</p>

          <!-- The demo itself, dressed in chrome that matches its category: an
               embed where there is one, a launch card where there isn't. -->
          <div class="stage">
            <DemoFrame
              :variant="project.category"
              :title="project.title"
              :host="hostOf(project)"
              :accent="categoryOf(project).accent"
            >
              <iframe
                v-if="project.embed"
                :src="project.embed"
                :title="`${project.title}, playable embed`"
                height="167"
                loading="lazy"
                frameborder="0"
              />

              <a
                v-else-if="launchLink(project)"
                :href="launchLink(project).href"
                class="launch"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="launch-glow" aria-hidden="true" />
                <AppIcon name="external" :size="20" />
                <span class="launch-label">{{ launchLink(project).label }}</span>
                <span class="launch-hint">Opens in a new tab</span>
              </a>
            </DemoFrame>
          </div>

          <ul class="tech">
            <li v-for="item in project.tech" :key="item" class="chip">{{ item }}</li>
          </ul>

          <footer class="foot">
            <a
              v-for="link in project.embed ? project.links : otherLinks(project)"
              :key="link.href"
              :href="link.href"
              class="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AppIcon :name="LINK_ICON[link.kind] || 'external'" :size="14" />
              {{ link.label }}
            </a>
          </footer>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {
  position: relative;
  padding: clamp(5rem, 12vw, 9rem) 0;
}

.demos {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 26rem), 1fr));
  align-items: stretch;
}

.demo {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  padding: clamp(1.5rem, 3vw, 2.25rem);
  border-radius: 1.5rem;
  transition:
    transform 0.5s var(--ease-out-expo),
    border-color 0.4s ease;
}

.demo:hover {
  transform: translateY(-4px);
  border-color: var(--line-strong);
}

/* ── Meta ────────────────────────────────────────────────────────────────── */
.meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.cat {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-weight: 500;
  color: var(--cat, var(--accent));
}

.cat::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: currentColor;
}

/* Same contrast problem the showcase cards have: the raw hues fail AA as text
   on the near-white light surface, so mix halfway to the ink. */
[data-theme='light'] .cat {
  color: color-mix(in srgb, var(--cat, var(--accent)) 50%, #08131f);
}

.year {
  color: var(--text-faint);
}

.tag {
  margin-left: auto;
  padding: 0.1875rem 0.5rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--accent) 34%, transparent);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  color: var(--accent);
}

.tag.is-link {
  border-color: color-mix(in srgb, var(--gold) 34%, transparent);
  background: color-mix(in srgb, var(--gold) 10%, transparent);
  color: var(--gold-deep);
}

/* The dark theme's gold-deep is too dim against the panel to read as a pill. */
[data-theme='dark'] .tag.is-link {
  color: var(--gold);
}

.title {
  font-family: var(--font-display);
  font-size: clamp(1.375rem, 2.4vw, 1.75rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: var(--text-strong);
}

.blurb {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--text-muted);
}

/* ── The demo slot ───────────────────────────────────────────────────────── */
.stage {
  margin-top: 0.25rem;
}

/* The frame supplies the border and clipping, so the embed just fills it. */
.stage iframe {
  width: 100%;
  display: block;
  border: 0;
}

/* Stand-in for an embed: a target big enough to read as "the demo", not as one
   more link in the footer. Sits inside the frame, so it carries no chrome of
   its own beyond the dashed "nothing to run here" hint. */
.launch {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  min-height: 10.4375rem;
  padding: 1.5rem;
  overflow: hidden;
  color: var(--accent);
  text-align: center;
  transition: color 0.35s ease;
}

.launch::after {
  content: '';
  position: absolute;
  inset: 0.625rem;
  border-radius: 0.5rem;
  border: 1px dashed var(--line-strong);
  transition: border-color 0.35s ease;
}

.launch:hover::after {
  border-color: var(--accent);
  border-style: solid;
}

.launch-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.45s ease;
  background: radial-gradient(60% 70% at 50% 120%, var(--glow-accent), transparent 70%);
}

.launch:hover .launch-glow {
  opacity: 1;
}

.launch-label {
  font-family: var(--font-display);
  font-size: 1.0625rem;
  font-weight: 600;
}

.launch-hint {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-faint);
}

/* ── Tail ────────────────────────────────────────────────────────────────── */
.tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: auto;
  padding-top: 1rem;
  list-style: none;
}

.foot {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--line);
}

.link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  color: var(--text-muted);
  transition: color 0.25s ease;
}

.link:hover {
  color: var(--text-strong);
}

@media (prefers-reduced-motion: reduce) {
  .demo,
  .launch,
  .launch-glow {
    transition: none;
  }

  .demo:hover {
    transform: none;
  }
}
</style>
