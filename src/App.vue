<script setup>
import { useCommandPalette } from '@/composables/useCommandPalette'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import CommandPalette from '@/components/CommandPalette.vue'

// Bind ⌘K / Ctrl+K / "/" once, at the root.
const { registerHotkey } = useCommandPalette()
registerHotkey()
</script>

<template>
  <a href="#main" class="skip-link">Skip to content</a>

  <SiteHeader />

  <main id="main">
    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </main>

  <SiteFooter />
  <CommandPalette />
</template>

<style scoped>
.skip-link {
  position: fixed;
  top: 0.75rem;
  left: 50%;
  translate: -50% -200%;
  z-index: 200;
  padding: 0.75rem 1.25rem;
  border-radius: 999px;
  background: var(--accent);
  color: var(--color-abyss-950);
  font-size: 0.875rem;
  font-weight: 560;
  transition: translate 0.3s var(--ease-out-expo);
}

.skip-link:focus-visible {
  translate: -50% 0;
}

/* Route transitions — a short cross-fade, deliberately understated so it
   doesn't fight the scroll animations on the landing page. */
.page-enter-active {
  transition:
    opacity 0.4s ease,
    transform 0.5s var(--ease-out-expo);
}

.page-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.25s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
