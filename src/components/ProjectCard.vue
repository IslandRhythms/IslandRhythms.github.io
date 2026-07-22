<script setup>
import { ref } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  project: { type: Object, required: true },
  index: { type: Number, default: 0 },
})

const expanded = ref(false)
const card = ref(null)

/**
 * Track the cursor within the card and expose it as CSS custom properties so
 * the border highlight can follow the pointer. Cheap: no reactivity, no rAF —
 * just two style writes on a passive listener.
 */
function onPointerMove(event) {
  const el = card.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
  el.style.setProperty('--my', `${event.clientY - rect.top}px`)
}

const STATUS_LABEL = {
  live: 'Live',
  ongoing: 'Ongoing',
  archived: 'Archived',
}

const LINK_ICON = {
  code: 'github',
  live: 'external',
  store: 'external',
}

const bodyId = `project-body-${props.project.slug}`
</script>

<template>
  <article
    :id="`project-${project.slug}`"
    ref="card"
    v-reveal="{ delay: (index % 3) * 90 }"
    class="card panel"
    :class="{ 'is-featured': project.featured, 'is-expanded': expanded }"
    @pointermove="onPointerMove"
  >
    <div class="spotlight" aria-hidden="true" />

    <div class="card-top">
      <span class="year">{{ project.year }}</span>
      <span v-if="project.status" class="status" :data-status="project.status">
        <i aria-hidden="true" />{{ STATUS_LABEL[project.status] }}
      </span>
    </div>

    <h3 class="card-title">{{ project.title }}</h3>
    <p class="blurb">{{ project.blurb }}</p>

    <!-- Expandable detail -->
    <div class="detail" :class="{ 'is-open': expanded }">
      <div class="detail-inner">
        <p :id="bodyId" class="description">{{ project.description }}</p>
        <div v-if="project.embed && expanded" class="embed">
          <iframe
            :src="project.embed"
            :title="`${project.title}, playable embed`"
            height="167"
            loading="lazy"
            frameborder="0"
          />
        </div>
      </div>
    </div>

    <ul class="tech">
      <li v-for="item in project.tech" :key="item" class="chip">{{ item }}</li>
    </ul>

    <footer class="card-foot">
      <button
        type="button"
        class="more"
        :aria-expanded="expanded"
        :aria-controls="bodyId"
        @click="expanded = !expanded"
      >
        {{ expanded ? 'Less' : 'Details' }}
        <AppIcon name="chevron" :size="14" :class="['caret', { 'is-up': expanded }]" />
      </button>

      <div class="links">
        <a
          v-for="link in project.links"
          :key="link.href"
          :href="link.href"
          class="card-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AppIcon :name="LINK_ICON[link.kind] || 'external'" :size="14" />
          {{ link.label }}
        </a>
      </div>
    </footer>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  padding: 1.75rem;
  border-radius: 1.25rem;
  overflow: hidden;
  transition:
    transform 0.5s var(--ease-out-expo),
    border-color 0.4s ease;
}

.card:hover {
  transform: translateY(-4px);
  border-color: var(--line-strong);
}

@media (min-width: 900px) {
  .card.is-featured {
    grid-column: span 2;
  }
}

/* Cursor-tracking highlight */
.spotlight {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.45s ease;
  background: radial-gradient(
    22rem circle at var(--mx, 50%) var(--my, 0%),
    color-mix(in srgb, var(--accent) 14%, transparent),
    transparent 65%
  );
}

.card:hover .spotlight {
  opacity: 1;
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.year {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  color: var(--text-faint);
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-family: var(--font-mono);
  font-size: 0.625rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.status i {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: currentColor;
}

.status[data-status='live'] i {
  background: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 22%, transparent);
}

.status[data-status='ongoing'] i {
  background: var(--gold);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--gold) 22%, transparent);
}

.status[data-status='archived'] i {
  background: var(--text-faint);
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.blurb {
  color: var(--text-muted);
  font-size: 0.9375rem;
  line-height: 1.6;
}

/* Grid-based height animation — animates cleanly without measuring anything. */
.detail {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.55s var(--ease-out-expo);
}

.detail.is-open {
  grid-template-rows: 1fr;
}

.detail-inner {
  overflow: hidden;
}

.description {
  padding-top: 0.25rem;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--text-muted);
}

.embed {
  margin-top: 1rem;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid var(--line);
}

.embed iframe {
  width: 100%;
  display: block;
}

.tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: auto;
  padding-top: 0.5rem;
  list-style: none;
}

.card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--line);
}

.more {
  display: inline-flex;
  align-items: center;
  gap: 0.3125rem;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
}

.caret {
  transition: transform 0.4s var(--ease-out-expo);
}

.caret.is-up {
  transform: rotate(180deg);
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  color: var(--text-muted);
  transition: color 0.25s ease;
}

.card-link:hover {
  color: var(--text-strong);
}
</style>
