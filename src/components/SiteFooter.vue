<script setup>
import { computed } from 'vue'
import { site } from '@/content/site'
import AppIcon from './AppIcon.vue'
import WordMark from './WordMark.vue'

const year = new Date().getFullYear()

/**
 * Build stamp injected by Vite at compile time (see vite.config.js), so the
 * footer date is always the real deploy date instead of something hand-edited.
 */
const built = computed(() => {
  const stamp = __BUILD_DATE__
  return new Date(stamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

function toTop() {
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  })
}
</script>

<template>
  <footer class="footer no-print">
    <div class="rule" />
    <div class="shell inner">
      <div class="brand">
        <WordMark />
      </div>

      <nav class="links" aria-label="Footer">
        <a
          v-for="social in site.socials"
          :key="social.label"
          :href="social.href"
          class="link link-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AppIcon :name="social.icon" :size="15" />
          {{ social.label }}
        </a>
      </nav>

      <div class="meta">
        <p>© {{ year }} {{ site.name }}</p>
        <p class="built">Last deployed {{ built }}</p>
      </div>

      <button type="button" class="top" aria-label="Back to top" @click="toTop">
        <AppIcon name="arrow" :size="16" />
      </button>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding-bottom: 2.5rem;
}

.inner {
  display: grid;
  gap: 1.75rem;
  padding-top: 2.5rem;
  align-items: center;
}

@media (min-width: 860px) {
  .inner {
    grid-template-columns: auto 1fr auto auto;
    gap: 2.5rem;
  }
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.link {
  display: inline-flex;
  align-items: center;
  gap: 0.4375rem;
  font-size: 0.875rem;
  color: var(--text-muted);
  transition: color 0.25s ease;
}

.link:hover {
  color: var(--text-strong);
}

.meta {
  font-size: 0.8125rem;
  color: var(--text-faint);
  line-height: 1.6;
}

.built {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.04em;
}

.top {
  justify-self: start;
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 999px;
  border: 1px solid var(--line-strong);
  background: var(--surface);
  color: var(--text-muted);
  cursor: pointer;
  transition:
    color 0.3s ease,
    border-color 0.3s ease,
    transform 0.45s var(--ease-out-expo);
}

.top:hover {
  color: var(--text-strong);
  border-color: var(--accent);
  transform: translateY(-3px);
}
</style>
