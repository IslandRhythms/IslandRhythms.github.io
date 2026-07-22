<script setup>
/**
 * FeaturedProject — one showcase card, one category.
 *
 * Every card is identical in size, type scale and content: there is no lead or
 * hero variant. Six cards at equal weight would normally read as a spreadsheet,
 * so the thing that separates them is colour — each takes its category's accent
 * (see `categories` in projects.js) and drives its edge, numeral, glow and
 * hover state from it via the `--cat` custom property.
 *
 * Deliberately a separate component from ProjectCard: this is an editorial
 * panel with a watermark numeral and no expand/collapse, while ProjectCard is a
 * compact grid tile with expandable detail.
 */
import { computed, ref } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  project: { type: Object, required: true },
  /** Category label shown as the eyebrow, e.g. "Open Source". */
  category: { type: String, default: '' },
  /** Category accent colour. Falls back to the site accent if unset. */
  accent: { type: String, default: '' },
  /** 1-based position, rendered as the watermark numeral. */
  index: { type: Number, default: 1 },
})

const card = ref(null)

/**
 * Cursor tracking for the spotlight: two style writes on a passive listener,
 * no reactivity and no rAF, so it costs nothing per frame.
 */
function onPointerMove(event) {
  const el = card.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
  el.style.setProperty('--my', `${event.clientY - rect.top}px`)
}

const LINK_ICON = {
  code: 'github',
  live: 'external',
  store: 'external',
}

/** The card's own accent, exposed to CSS. */
const style = computed(() => ({ '--cat': props.accent || 'var(--accent)' }))
</script>

<template>
  <article
    :id="`project-${project.slug}`"
    ref="card"
    v-reveal="{ delay: (index % 3) * 90 }"
    class="feature panel"
    :style="style"
    @pointermove="onPointerMove"
  >
    <span class="edge" aria-hidden="true" />
    <span class="watermark" aria-hidden="true">{{ String(index).padStart(2, '0') }}</span>
    <span class="spotlight" aria-hidden="true" />

    <p class="eyebrow">
      <i class="dot" aria-hidden="true" />
      {{ category }}
    </p>

    <h3 class="title">{{ project.title }}</h3>

    <p class="meta">
      <span>{{ project.year }}</span>
      <span v-if="project.status === 'live'" class="live"><i aria-hidden="true" />Live</span>
      <span v-else-if="project.status === 'archived'" class="archived">Archived</span>
    </p>

    <p class="blurb">{{ project.blurb }}</p>

    <ul class="tech">
      <li v-for="item in project.tech" :key="item" class="chip">{{ item }}</li>
    </ul>

    <footer class="foot">
      <a
        v-for="(link, i) in project.links"
        :key="link.href"
        :href="link.href"
        class="link"
        :class="{ 'is-primary': i === 0 }"
        target="_blank"
        rel="noopener noreferrer"
      >
        <AppIcon :name="LINK_ICON[link.kind] || 'external'" :size="14" />
        {{ link.label }}
        <AppIcon v-if="i === 0" name="arrow" :size="14" class="go" />
      </a>
    </footer>
  </article>
</template>

<style scoped>
.feature {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 1.75rem;
  padding-top: 2rem;
  border-radius: 1.25rem;
  overflow: hidden;
  isolation: isolate;
  transition:
    transform 0.5s var(--ease-out-expo),
    border-color 0.4s ease,
    box-shadow 0.4s ease;
}

.feature:hover {
  transform: translateY(-6px);
  border-color: color-mix(in srgb, var(--cat) 55%, transparent);
  box-shadow:
    var(--shadow-card),
    0 28px 60px -34px color-mix(in srgb, var(--cat) 60%, transparent);
}

/* ── Category colour signals ─────────────────────────────────────────────── */

/* Full-width edge along the top. The one element that's pure category colour,
   so a row of cards reads as a set of distinct things at a glance. */
.edge {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--cat), color-mix(in srgb, var(--cat) 20%, transparent));
  transition: background 0.45s ease;
}

.feature:hover .edge {
  background: var(--cat);
}

.spotlight {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.45s ease;
  background: radial-gradient(
    22rem circle at var(--mx, 50%) var(--my, 0%),
    color-mix(in srgb, var(--cat) 16%, transparent),
    transparent 66%
  );
}

.feature:hover .spotlight {
  opacity: 1;
}

/* Oversized numeral bleeding off the top-right corner, clipped by the card. */
.watermark {
  position: absolute;
  top: -0.3em;
  right: 0.04em;
  z-index: -1;
  pointer-events: none;
  font-family: var(--font-display);
  font-size: 7.5rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.05em;
  background: linear-gradient(165deg, var(--cat), transparent 70%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  opacity: 0.2;
  transition:
    opacity 0.5s ease,
    transform 0.6s var(--ease-out-expo);
}

.feature:hover .watermark {
  opacity: 0.36;
  transform: translateY(4px);
}

/* ── Eyebrow ─────────────────────────────────────────────────────────────── */
.eyebrow {
  display: flex;
  align-items: center;
  gap: 0.4375rem;
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--cat);
}

/* On the near-white light surface the raw hues fail contrast as text — sand at
   11px measures 3.09:1 against white, well under the 4.5:1 AA needs. Mixing
   halfway to the ink keeps the hue recognisable and puts the worst case at
   4.95:1; going any lighter than 50% drops Mobile, Open Source and Desktop back
   under. The non-text uses of --cat above are unaffected, being decoration. */
[data-theme='light'] .eyebrow {
  color: color-mix(in srgb, var(--cat) 50%, #08131f);
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--cat);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--cat) 20%, transparent);
}

/* ── Copy ────────────────────────────────────────────────────────────────── */
.title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2.2vw, 1.875rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.08;
  color: var(--text-strong);
}

.meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-faint);
}

.live,
.archived {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  color: var(--text-muted);
}

.live i {
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 22%, transparent);
}

.blurb {
  margin-top: 0.25rem;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--text-muted);
}

/* Pushed to the bottom so the chips and footer line up across the row however
   long each blurb runs. */
.tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: auto;
  padding-top: 1.25rem;
  list-style: none;
}

/* ── Links ───────────────────────────────────────────────────────────────── */
.foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid var(--line);
}

.link {
  display: inline-flex;
  align-items: center;
  gap: 0.4375rem;
  font-size: 0.8125rem;
  color: var(--text-muted);
  transition: color 0.25s ease;
}

.link:hover {
  color: var(--text-strong);
}

.link.is-primary {
  color: var(--cat);
  font-weight: 550;
}

[data-theme='light'] .link.is-primary {
  color: color-mix(in srgb, var(--cat) 50%, #08131f);
}

.go {
  transition: transform 0.45s var(--ease-out-expo);
}

.link.is-primary:hover .go {
  transform: translateX(4px);
}

@media (prefers-reduced-motion: reduce) {
  .feature,
  .edge,
  .watermark,
  .spotlight,
  .go {
    transition: none;
  }

  .feature:hover {
    transform: none;
  }
}
</style>
