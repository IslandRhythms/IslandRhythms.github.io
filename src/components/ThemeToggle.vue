<script setup>
import { useTheme } from '@/composables/useTheme'
import AppIcon from './AppIcon.vue'

const { theme, toggle } = useTheme()
</script>

<template>
  <button
    type="button"
    class="toggle"
    :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`"
    :title="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`"
    @click="toggle"
  >
    <span class="track">
      <span class="knob" :class="{ 'is-light': theme === 'light' }">
        <AppIcon :name="theme === 'dark' ? 'moon' : 'sun'" :size="13" />
      </span>
    </span>
  </button>
</template>

<style scoped>
.toggle {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  background: none;
  border: 0;
  padding: 0;
}

.track {
  position: relative;
  display: block;
  width: 3.125rem;
  height: 1.75rem;
  border-radius: 999px;
  border: 1px solid var(--line-strong);
  background: var(--surface);
  transition: border-color 0.3s ease;
}

.toggle:hover .track {
  border-color: var(--accent);
}

.knob {
  position: absolute;
  top: 2px;
  left: 2px;
  display: grid;
  place-items: center;
  width: 1.375rem;
  height: 1.375rem;
  border-radius: 999px;
  background: linear-gradient(140deg, var(--accent-soft), var(--accent));
  color: var(--color-abyss-950);
  box-shadow: 0 3px 12px -3px var(--glow-accent);
  transition: transform 0.55s var(--ease-spring);
}

.knob.is-light {
  transform: translateX(1.375rem);
  background: linear-gradient(140deg, var(--gold), var(--gold-deep));
}
</style>
