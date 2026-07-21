<script setup>
import AppIcon from '@/components/AppIcon.vue'
import { useCommandPalette } from '@/composables/useCommandPalette'

const { show } = useCommandPalette()
</script>

<template>
  <section class="notfound">
    <div class="shell inner">
      <p class="eyebrow">Error 404</p>
      <h1 class="code">404</h1>
      <p class="lead">This page drifted off somewhere. The rest of the site is still here.</p>
      <div class="ctas">
        <RouterLink to="/" class="btn btn-primary">
          Back to the start
          <AppIcon name="arrow" :size="16" />
        </RouterLink>
        <button type="button" class="btn btn-ghost" @click="show">
          <AppIcon name="search" :size="16" />
          Search the site
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.notfound {
  min-height: 76vh;
  display: grid;
  place-items: center;
  padding: 8rem 0 4rem;
}

.inner {
  text-align: center;
}

.code {
  margin-top: 1rem;
  font-size: clamp(5rem, 22vw, 12rem);
  font-weight: 600;
  line-height: 0.85;
  letter-spacing: -0.06em;
  background: linear-gradient(140deg, var(--accent-soft), var(--gold));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.lead {
  margin-top: 1.5rem;
  font-size: 1.0625rem;
  color: var(--text-muted);
}

.ctas {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.875rem;
  margin-top: 2.25rem;
}
</style>
