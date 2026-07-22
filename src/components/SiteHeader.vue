<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { site } from '@/content/site'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { useCommandPalette } from '@/composables/useCommandPalette'
import AppIcon from './AppIcon.vue'
import ThemeToggle from './ThemeToggle.vue'
import WordMark from './WordMark.vue'

const route = useRoute()
const { show: openPalette } = useCommandPalette()
const { active } = useScrollSpy(site.sections.map((s) => s.id))

const scrolled = ref(false)
const hidden = ref(false)
const menuOpen = ref(false)
const progress = ref(0)
const isMac = ref(false)

let lastY = 0

function onScroll() {
  const y = window.scrollY
  scrolled.value = y > 24

  // Hide the header on the way down, bring it straight back on the way up.
  // The 400px floor stops it disappearing over the hero.
  hidden.value = y > 400 && y > lastY && !menuOpen.value
  lastY = y

  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(1, y / max) : 0
}

onMounted(() => {
  isMac.value = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)
  lastY = window.scrollY
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

// Never leave the mobile menu hanging open across a navigation.
watch(
  () => route.fullPath,
  () => (menuOpen.value = false),
)

// Lock body scroll while the mobile sheet is open.
watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})
onBeforeUnmount(() => (document.body.style.overflow = ''))

const onLanding = computed(() => route.name === 'home')
const shortcut = computed(() => (isMac.value ? '⌘K' : 'Ctrl K'))

/** Résumé sits after the in-page sections, so its number follows from them
 *  rather than being written down twice and drifting when a section is added. */
const resumeIndex = computed(() => String(site.sections.length + 1).padStart(2, '0'))

function linkTo(id) {
  return { path: '/', hash: `#${id}` }
}
</script>

<template>
  <!-- Reading progress. Deliberately a sibling of <header>, not a child: the
       header slides itself out of view on the way down, and a transformed
       ancestor drags its descendants with it — so nesting the bar here meant it
       vanished exactly when you were reading far enough to want it. -->
  <div class="progress-rail no-print" aria-hidden="true">
    <div class="progress" :style="{ transform: `scaleX(${progress})` }" />
  </div>

  <header class="site-header no-print" :class="{ 'is-scrolled': scrolled, 'is-hidden': hidden }">
    <div class="shell bar">
      <!-- Full DCD lockup: mark plus the "Design · Code · Deliver" tagline.
           The tagline hides on narrow screens where the nav needs the room. -->
      <RouterLink to="/" class="brand" aria-label="Home">
        <WordMark compact />
      </RouterLink>

      <nav class="nav" aria-label="Primary">
        <RouterLink
          v-for="section in site.sections"
          :key="section.id"
          :to="linkTo(section.id)"
          class="nav-link"
          :class="{ 'is-active': onLanding && active === section.id }"
        >
          <span class="nav-index">{{
            String(site.sections.indexOf(section) + 1).padStart(2, '0')
          }}</span>
          {{ section.label }}
        </RouterLink>
        <RouterLink to="/resume" class="nav-link" :class="{ 'is-active': route.name === 'resume' }">
          <span class="nav-index">{{ resumeIndex }}</span>
          Résumé
        </RouterLink>
      </nav>

      <div class="actions">
        <button type="button" class="cmd" @click="openPalette">
          <AppIcon name="search" :size="14" />
          <span class="cmd-label">Search</span>
          <kbd>{{ shortcut }}</kbd>
        </button>

        <ThemeToggle />

        <button
          type="button"
          class="burger"
          :aria-expanded="menuOpen"
          aria-label="Toggle menu"
          @click="menuOpen = !menuOpen"
        >
          <span :class="{ 'is-open': menuOpen }" />
        </button>
      </div>
    </div>

    <!-- Mobile sheet -->
    <Transition name="sheet">
      <div v-if="menuOpen" class="sheet panel">
        <RouterLink
          v-for="(section, i) in site.sections"
          :key="section.id"
          :to="linkTo(section.id)"
          class="sheet-link"
          :style="{ '--i': i }"
        >
          <span class="nav-index">{{ String(i + 1).padStart(2, '0') }}</span>
          {{ section.label }}
          <AppIcon name="arrow" :size="16" />
        </RouterLink>
        <RouterLink to="/resume" class="sheet-link" :style="{ '--i': site.sections.length }">
          <span class="nav-index">{{ resumeIndex }}</span>
          Résumé
          <AppIcon name="arrow" :size="16" />
        </RouterLink>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 60;
  transition:
    transform 0.5s var(--ease-out-expo),
    background-color 0.4s ease,
    border-color 0.4s ease,
    backdrop-filter 0.4s ease;
  border-bottom: 1px solid transparent;
}

.site-header.is-scrolled {
  background: color-mix(in srgb, var(--bg) 72%, transparent);
  backdrop-filter: blur(18px) saturate(150%);
  -webkit-backdrop-filter: blur(18px) saturate(150%);
  border-bottom-color: var(--line);
}

.site-header.is-hidden {
  transform: translateY(-100%);
}

/* Pinned to the very top of the viewport and stacked above the header, so it
   stays put whether the header is showing or tucked away. */
.progress-rail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 70;
  pointer-events: none;
}

.progress {
  height: 100%;
  width: 100%;
  transform-origin: left;
  background: linear-gradient(90deg, var(--accent), var(--gold));
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  height: 4.5rem;
}

.brand {
  display: inline-flex;
  align-items: center;
}

/* Below 640px the nav actions need the width more than the tagline does. */
.brand :deep(.motto) {
  display: none;
}

@media (min-width: 640px) {
  .brand :deep(.motto) {
    display: block;
  }
}

/* ── Desktop nav ─────────────────────────────────────────────────────────── */
.nav {
  display: none;
  align-items: center;
  gap: 0.25rem;
}

@media (min-width: 900px) {
  .nav {
    display: flex;
  }
}

.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.875rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-muted);
  transition:
    color 0.3s ease,
    background-color 0.3s ease;
}

.nav-link:hover {
  color: var(--text-strong);
  background: var(--surface-hover);
}

.nav-link.is-active {
  color: var(--text-strong);
}

.nav-link.is-active::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 999px;
  border: 1px solid var(--line-strong);
  background: color-mix(in srgb, var(--accent) 9%, transparent);
}

.nav-index {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  color: var(--accent);
  opacity: 0.75;
}

/* ── Actions ─────────────────────────────────────────────────────────────── */
.actions {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.cmd {
  display: none;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4375rem 0.75rem;
  border-radius: 999px;
  border: 1px solid var(--line-strong);
  background: var(--surface);
  color: var(--text-muted);
  font-size: 0.8125rem;
  cursor: pointer;
  transition:
    color 0.3s ease,
    border-color 0.3s ease;
}

.cmd:hover {
  color: var(--text-strong);
  border-color: var(--accent);
}

@media (min-width: 640px) {
  .cmd {
    display: inline-flex;
  }
}

kbd {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  padding: 0.125rem 0.3125rem;
  border-radius: 4px;
  border: 1px solid var(--line-strong);
  color: var(--text-faint);
}

/* ── Burger ──────────────────────────────────────────────────────────────── */
.burger {
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  display: grid;
  place-items: center;
  border-radius: 999px;
  border: 1px solid var(--line-strong);
  background: var(--surface);
  cursor: pointer;
}

@media (min-width: 900px) {
  .burger {
    display: none;
  }
}

.burger span,
.burger span::before,
.burger span::after {
  position: absolute;
  height: 1.5px;
  width: 1rem;
  background: var(--text);
  transition:
    transform 0.4s var(--ease-out-expo),
    opacity 0.2s ease;
}

.burger span::before,
.burger span::after {
  content: '';
  left: 0;
}

.burger span::before {
  transform: translateY(-5px);
}

.burger span::after {
  transform: translateY(5px);
}

.burger span.is-open {
  background: transparent;
}

.burger span.is-open::before {
  transform: rotate(45deg);
}

.burger span.is-open::after {
  transform: rotate(-45deg);
}

/* ── Mobile sheet ────────────────────────────────────────────────────────── */
.sheet {
  margin: 0 clamp(1.25rem, 5vw, 3.5rem) 1rem;
  padding: 0.5rem;
  border-radius: 1.25rem;
  display: flex;
  flex-direction: column;
}

@media (min-width: 900px) {
  .sheet {
    display: none;
  }
}

.sheet-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9375rem 1rem;
  border-radius: 0.875rem;
  font-family: var(--font-display);
  font-size: 1.125rem;
  color: var(--text);
  transition: background-color 0.25s ease;
}

.sheet-link :last-child {
  margin-left: auto;
  color: var(--text-faint);
}

.sheet-link:hover {
  background: var(--surface-hover);
}

.sheet-enter-active,
.sheet-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.45s var(--ease-out-expo);
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
