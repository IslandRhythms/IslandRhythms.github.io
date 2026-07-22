<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { site } from '@/content/site'
import { useTheme } from '@/composables/useTheme'
import WaveField from '@/components/WaveField.vue'
import AppIcon from '@/components/AppIcon.vue'

const { theme } = useTheme()

/** Split the name so each word can animate in on its own delay. */
const words = computed(() => site.name.split(' '))

/**
 * Split the hero lead around its highlight phrase so the middle can carry the
 * gradient. Falls back to plain text if the phrase isn't found, so a typo in
 * site.js degrades to "no highlight" rather than an empty paragraph.
 */
const lead = computed(() => {
  const { text, highlight } = site.heroLead
  const at = highlight ? text.indexOf(highlight) : -1
  if (at === -1) return { before: text, highlight: '', after: '' }
  return {
    before: text.slice(0, at),
    highlight,
    after: text.slice(at + highlight.length),
  }
})

/** Parallax: the hero content drifts up slightly slower than the scroll. */
const offset = ref(0)
let ticking = false

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    offset.value = Math.min(window.scrollY, 700)
    ticking = false
  })
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <section class="hero grain" aria-label="Introduction">
    <WaveField :theme="theme" />
    <div class="veil" aria-hidden="true" />

    <div
      class="shell content"
      :style="{
        transform: `translate3d(0, ${offset * 0.22}px, 0)`,
        opacity: 1 - Math.min(offset / 620, 0.85),
      }"
    >
      <p class="available">
        <i aria-hidden="true" />
        {{ site.role }} · {{ site.location }}
      </p>

      <h1 class="name">
        <span v-for="(word, i) in words" :key="word" class="line">
          <span class="word" :style="{ '--d': `${140 + i * 110}ms` }">{{ word }}</span>
        </span>
      </h1>

      <p class="tagline">
        {{ lead.before
        }}<span v-if="lead.highlight" class="text-gradient">{{ lead.highlight }}</span
        >{{ lead.after }}
      </p>

      <div class="ctas">
        <a href="#work" class="btn btn-primary">
          View selected work
          <AppIcon name="arrow" :size="16" />
        </a>
        <a href="#contact" class="btn btn-ghost">Get in touch</a>
      </div>

      <!-- Headline numbers -->
      <dl class="stats">
        <div
          v-for="(stat, i) in site.stats"
          :key="stat.label"
          class="stat"
          :style="{ '--d': `${700 + i * 90}ms` }"
        >
          <dt class="stat-value">{{ stat.value }}</dt>
          <dd class="stat-label">
            {{ stat.label }}
            <span>{{ stat.detail }}</span>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 7rem 0 5rem;
  overflow: hidden;
}

/* Fades the shader into the page background so there's no hard seam. */
.veil {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    color-mix(in srgb, var(--bg) 55%, transparent) 0%,
    transparent 28%,
    transparent 62%,
    var(--bg) 100%
  );
}

.content {
  position: relative;
  z-index: 1;
}

/* ── Availability pill ───────────────────────────────────────────────────── */
.available {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4375rem 0.9375rem;
  border-radius: 999px;
  border: 1px solid var(--line-strong);
  background: color-mix(in srgb, var(--bg) 55%, transparent);
  backdrop-filter: blur(10px);
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-muted);
  animation: rise 0.9s var(--ease-out-expo) both;
}

.available i {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: var(--accent);
  animation: pulse-ring 2.6s ease-out infinite;
}

/* ── Name ────────────────────────────────────────────────────────────────── */
.name {
  margin-top: 1.75rem;
  font-size: var(--text-display);
  line-height: 0.92;
  letter-spacing: -0.045em;
  font-weight: 600;
}

.line {
  display: block;
  overflow: hidden;
  padding-bottom: 0.04em;
}

/* Words rise out of a clipping mask — a mask-reveal, not a fade. */
.word {
  display: inline-block;
  transform: translateY(110%);
  animation: word-in 1.1s var(--ease-out-expo) var(--d) forwards;
}

@keyframes word-in {
  to {
    transform: translateY(0);
  }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
}

.tagline {
  margin-top: 1.75rem;
  max-width: 40rem;
  font-size: clamp(1.0625rem, 1.9vw, 1.375rem);
  line-height: 1.6;
  color: var(--text-muted);
  animation: rise 1s var(--ease-out-expo) 480ms both;
}

.ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.875rem;
  margin-top: 2.25rem;
  animation: rise 1s var(--ease-out-expo) 600ms both;
}

/* ── Stats ───────────────────────────────────────────────────────────────── */
.stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem 1rem;
  margin-top: clamp(2.25rem, 5vw, 3.5rem);
  padding-top: 1.75rem;
  border-top: 1px solid var(--line);
  max-width: 54rem;
}

/* auto-fit rather than a fixed count, so adding or removing a stat in site.js
   reflows the row instead of leaving a hole in it. */
@media (min-width: 780px) {
  .stats {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 11rem), 1fr));
  }
}

.stat {
  animation: rise 0.9s var(--ease-out-expo) var(--d) both;
}

.stat-value {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3.2vw, 2.5rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--text-strong);
  line-height: 1;
}

.stat-label {
  margin-top: 0.5rem;
  font-size: 0.8125rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.stat-label span {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.625rem;
  letter-spacing: 0.06em;
  color: var(--text-faint);
  margin-top: 0.1875rem;
}

/* ── Scroll cue ──────────────────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .word {
    transform: none;
    animation: none;
  }
}
</style>
