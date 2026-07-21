<script setup>
defineProps({
  index: { type: String, default: '' },
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  lead: { type: String, default: '' },
})
</script>

<template>
  <header class="heading">
    <p v-reveal class="eyebrow">
      <span v-if="index" class="index">{{ index }}</span>
      {{ eyebrow }}
    </p>
    <h2 v-reveal="{ delay: 80 }" class="title">{{ title }}</h2>
    <p v-if="lead" v-reveal="{ delay: 160 }" class="lead">{{ lead }}</p>
    <div v-reveal="{ delay: 220 }" class="rule mt-8" />
  </header>
</template>

<style scoped>
.heading {
  margin-bottom: clamp(2.5rem, 6vw, 4.5rem);
}

.index {
  color: var(--text-faint);
  margin-right: 0.5rem;
}

.title {
  margin-top: 0.875rem;
  font-size: var(--text-headline);
  line-height: 1.02;
  letter-spacing: -0.03em;
  font-weight: 600;
}

.lead {
  margin-top: 1.25rem;
  max-width: 46rem;
  font-size: clamp(1rem, 1.6vw, 1.125rem);
  line-height: 1.65;
  color: var(--text-muted);
}
</style>
