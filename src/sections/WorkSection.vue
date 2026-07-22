<script setup>
import { computed, ref } from 'vue'
import { categories, projects } from '@/content/projects'
import SectionHeading from '@/components/SectionHeading.vue'
import FeaturedProject from '@/components/FeaturedProject.vue'
import ProjectCard from '@/components/ProjectCard.vue'

const filter = ref('all')

/** Real categories, i.e. everything except the synthetic "all" filter. */
const realCategories = categories.filter((category) => category.id !== 'all')

/**
 * Everything this section is allowed to show. Demos have their own section, so
 * they're excluded up front rather than in each list below — that way a project
 * flagged both `demo` and `featured` can't leak back in through the showcase.
 */
const workProjects = computed(() => projects.filter((project) => !project.demo))

/**
 * The showcase: one featured project per category, in the order categories are
 * declared. `find` takes the first match, so flagging two projects in the same
 * category doesn't create a second slot — the extra just falls through to the
 * grid below, which is the safe direction for a data mistake to fail in.
 */
const showcase = computed(() =>
  realCategories
    .map((category) => {
      const project = workProjects.value.find((p) => p.category === category.id && p.featured)
      return project && { project, label: category.label, accent: category.accent }
    })
    .filter(Boolean),
)

/** Slugs already on show up top, so the grid below never repeats one. */
const showcased = computed(() => new Set(showcase.value.map((entry) => entry.project.slug)))

/**
 * Everything the showcase didn't take, archived last. Sorted off a copy so the
 * imported array keeps its authored order for the résumé page and the ⌘K
 * palette; the sort is stable, so projects.js still decides the running order
 * within a rank.
 */
const rest = computed(() =>
  [...workProjects.value]
    .filter((project) => !showcased.value.has(project.slug))
    .sort((a, b) => (a.status === 'archived') - (b.status === 'archived')),
)

/** Counts describe the grid below, since that's what the filters act on. */
const counts = computed(() => {
  const map = { all: rest.value.length }
  for (const project of rest.value) {
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
    ? rest.value
    : rest.value.filter((project) => project.category === filter.value),
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

      <!-- Showcase: the one pick from each category, all at equal weight. -->
      <div v-reveal class="zone-head">
        <span class="zone-title">Featured</span>
        <span class="zone-rule" aria-hidden="true" />
        <span class="zone-note">One from each discipline</span>
      </div>

      <div class="showcase">
        <FeaturedProject
          v-for="(entry, i) in showcase"
          :key="entry.project.slug"
          :project="entry.project"
          :category="entry.label"
          :accent="entry.accent"
          :index="i + 1"
        />
      </div>

      <!-- Everything else -->
      <div v-if="rest.length" class="rest">
        <div v-reveal class="zone-head">
          <span class="zone-title">More work</span>
          <span class="zone-rule" aria-hidden="true" />
          <span class="zone-note">{{ rest.length }} projects</span>
        </div>

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
    </div>
  </section>
</template>

<style scoped>
.section {
  position: relative;
  padding: clamp(5rem, 12vw, 9rem) 0;
}

/* ── Zone headers ────────────────────────────────────────────────────────── */
/* Shared by both halves of the section, so "Featured" and "More work" read as
   two labelled bands rather than one undifferentiated wall of cards. */
.zone-head {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.75rem;
}

.zone-title {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text);
}

.zone-rule {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, var(--line-strong), transparent);
}

.zone-note {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-faint);
}

/* ── Showcase ────────────────────────────────────────────────────────────── */
/* Every card identical, three up on a full shell. auto-fit rather than a fixed
   count so adding or removing a category reflows the rows instead of leaving a
   gap, and `stretch` keeps every card in a row the same height. */
.showcase {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
  align-items: stretch;
}

/* ── Everything else ─────────────────────────────────────────────────────── */
.rest {
  margin-top: clamp(4rem, 9vw, 7rem);
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
