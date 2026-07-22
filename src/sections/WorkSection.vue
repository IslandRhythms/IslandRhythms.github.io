<script setup>
import { computed, ref } from 'vue'
import { categories, projects } from '@/content/projects'
import SectionHeading from '@/components/SectionHeading.vue'
import ProjectCard from '@/components/ProjectCard.vue'

const filter = ref('all')

const counts = computed(() => {
  const map = { all: projects.length }
  for (const project of projects) {
    map[project.category] = (map[project.category] || 0) + 1
  }
  return map
})

/** Only show a filter if it actually has projects behind it. */
const visibleCategories = computed(() =>
  categories.filter((category) => counts.value[category.id] > 0),
)

const filtered = computed(() =>
  filter.value === 'all'
    ? projects
    : projects.filter((project) => project.category === filter.value),
)
</script>

<template>
  <section id="work" class="section">
    <div class="shell">
      <SectionHeading
        index="01"
        eyebrow="Selected Work"
        title="Work I can actually show you."
        lead="A lot of what I do professionally sits behind NDAs, so this is the half I can share: open-source maintenance, tools I built because I needed them, and a few things I made purely because they were fun."
      />

      <!-- Filters -->
      <div v-reveal class="filters" role="tablist" aria-label="Filter projects by category">
        <button
          v-for="category in visibleCategories"
          :key="category.id"
          type="button"
          role="tab"
          class="filter"
          :class="{ 'is-active': filter === category.id }"
          :aria-selected="filter === category.id"
          @click="filter = category.id"
        >
          {{ category.label }}
          <span class="count">{{ counts[category.id] }}</span>
        </button>
      </div>

      <TransitionGroup name="grid" tag="div" class="grid">
        <ProjectCard
          v-for="(project, i) in filtered"
          :key="project.slug"
          :project="project"
          :index="i"
        />
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
.section {
  position: relative;
  padding: clamp(5rem, 12vw, 9rem) 0;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}

.filter {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--text-muted);
  font-size: 0.875rem;
  cursor: pointer;
  transition:
    color 0.3s ease,
    border-color 0.3s ease,
    background-color 0.3s ease;
}

.filter:hover {
  color: var(--text-strong);
  border-color: var(--line-strong);
}

.filter.is-active {
  color: var(--color-abyss-950);
  background: linear-gradient(135deg, var(--accent-soft), var(--accent));
  border-color: transparent;
  box-shadow: 0 8px 24px -12px var(--glow-accent);
}

.count {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  opacity: 0.7;
}

.grid {
  /* Anchors the absolutely-positioned cards that are leaving the grid. */
  position: relative;
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
  align-items: stretch;
}

/* Filter transitions */
.grid-move {
  transition: transform 0.5s var(--ease-out-expo);
}

.grid-enter-active {
  transition:
    opacity 0.45s ease,
    transform 0.55s var(--ease-out-expo);
}

.grid-leave-active {
  position: absolute;
  transition:
    opacity 0.25s ease,
    transform 0.3s ease;
}

.grid-enter-from,
.grid-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(12px);
}
</style>
