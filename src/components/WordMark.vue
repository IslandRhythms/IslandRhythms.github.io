<script setup>
/**
 * The DCD monogram, rebuilt as inline SVG so it inherits the theme instead of
 * being a black-on-white raster that only works in light mode.
 * The middle "C" is drawn as an open arc that fills on hover.
 */
import { site } from '@/content/site'

defineProps({
  /** Smaller mark, for the header bar. */
  compact: { type: Boolean, default: false },
  /** Show the "Design · Code · Deliver" line beneath the mark. */
  motto: { type: Boolean, default: true },
})
</script>

<template>
  <span class="wordmark" :class="{ 'is-compact': compact }">
    <svg viewBox="0 0 92 32" class="mark" role="img" aria-label="DCD — Design, Code, Deliver">
      <!-- D -->
      <path
        d="M6 5h8a11 11 0 0 1 0 22H6z"
        fill="none"
        stroke="currentColor"
        stroke-width="2.6"
        stroke-linejoin="round"
      />
      <!-- C: open arc, animated on hover -->
      <path
        class="arc"
        d="M55 9.5a11 11 0 1 0 0 13"
        fill="none"
        stroke="currentColor"
        stroke-width="2.6"
        stroke-linecap="round"
      />
      <!-- D -->
      <path
        d="M67 5h8a11 11 0 0 1 0 22h-8z"
        fill="none"
        stroke="currentColor"
        stroke-width="2.6"
        stroke-linejoin="round"
      />
      <circle class="dot" cx="46" cy="16" r="2.4" fill="currentColor" />
    </svg>
    <span v-if="motto" class="motto">{{ site.motto }}</span>
  </span>
</template>

<style scoped>
.wordmark {
  display: inline-flex;
  flex-direction: column;
  gap: 0.25rem;
  color: var(--text-strong);
  transition: color 0.3s ease;
}

.mark {
  width: 5.75rem;
  height: 2rem;
  overflow: visible;
}

.is-compact .mark {
  width: 4.25rem;
  height: 1.5rem;
}

.arc {
  /* Path length of the arc; dasharray lets us "draw" it on hover. */
  stroke-dasharray: 56;
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 0.7s var(--ease-out-expo);
}

.dot {
  transform-origin: 46px 16px;
  transition:
    transform 0.5s var(--ease-spring),
    fill 0.3s ease;
}

.wordmark:hover .arc {
  stroke-dashoffset: 56;
}

.wordmark:hover .dot {
  transform: scale(2.4);
  fill: var(--accent);
}

.motto {
  font-family: var(--font-mono);
  font-size: 0.5625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-faint);
  white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
  .arc,
  .dot {
    transition: none;
  }
}
</style>
