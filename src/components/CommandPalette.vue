<script setup>
/**
 * ⌘K command palette — keyboard navigation over every section, project, link
 * and action on the site. Commands are derived from the content files, so a new
 * project becomes searchable the moment it's added to projects.js.
 */
import { computed, nextTick, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { site } from '@/content/site'
import { projects } from '@/content/projects'
import { useCommandPalette } from '@/composables/useCommandPalette'
import { useTheme } from '@/composables/useTheme'
import AppIcon from './AppIcon.vue'

const router = useRouter()
const { open, hide } = useCommandPalette()
const { theme, toggle: toggleTheme } = useTheme()

const query = ref('')
const cursor = ref(0)
const input = ref(null)
const listEl = ref(null)

const commands = computed(() => {
  const list = []

  for (const section of site.sections) {
    list.push({
      id: `nav-${section.id}`,
      group: 'Navigate',
      label: section.label,
      hint: `Jump to the ${section.label.toLowerCase()} section`,
      icon: 'arrow',
      run: () => router.push({ path: '/', hash: `#${section.id}` }),
    })
  }

  list.push({
    id: 'nav-resume',
    group: 'Navigate',
    label: 'Résumé',
    hint: 'Printable one-page résumé',
    icon: 'print',
    run: () => router.push('/resume'),
  })

  for (const project of projects) {
    list.push({
      id: `project-${project.slug}`,
      group: 'Projects',
      label: project.title,
      hint: project.blurb,
      keywords: project.tech.join(' '),
      icon: 'code',
      run: () => router.push({ path: '/', hash: `#project-${project.slug}` }),
    })
  }

  for (const social of site.socials) {
    list.push({
      id: `link-${social.label}`,
      group: 'Links',
      label: social.label,
      hint: social.href.replace(/^https?:\/\//, ''),
      icon: social.icon,
      external: true,
      run: () => window.open(social.href, '_blank', 'noopener'),
    })
  }

  list.push(
    {
      id: 'action-theme',
      group: 'Actions',
      label: `Switch to ${theme.value === 'dark' ? 'light' : 'dark'} theme`,
      hint: 'Toggle appearance',
      icon: theme.value === 'dark' ? 'sun' : 'moon',
      keepOpen: true,
      run: toggleTheme,
    },
    {
      id: 'action-print',
      group: 'Actions',
      label: 'Print / save résumé as PDF',
      hint: 'Opens the print dialog',
      icon: 'download',
      run: async () => {
        await router.push('/resume')
        await nextTick()
        window.print()
      },
    },
  )

  return list
})

/**
 * Subsequence match — "vjs" finds "Vue.js", the way a real palette should.
 * Score rewards a prefix hit, then a word-boundary hit, then anything.
 */
function score(command, q) {
  if (!q) return 1
  const haystack = `${command.label} ${command.hint || ''} ${command.keywords || ''}`.toLowerCase()
  const label = command.label.toLowerCase()

  if (label.startsWith(q)) return 1000
  if (label.includes(q)) return 800
  if (haystack.includes(q)) return 500

  let i = 0
  for (const char of haystack) {
    if (char === q[i]) i++
    if (i === q.length) return 200
  }
  return 0
}

const results = computed(() => {
  const q = query.value.trim().toLowerCase()
  return commands.value
    .map((command) => ({ command, s: score(command, q) }))
    .filter((entry) => entry.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((entry) => entry.command)
})

/** Results regrouped for display, preserving relevance order between groups. */
const grouped = computed(() => {
  const groups = []
  for (const command of results.value) {
    let group = groups.find((g) => g.name === command.group)
    if (!group) groups.push((group = { name: command.group, items: [] }))
    group.items.push(command)
  }
  return groups
})

function indexOf(command) {
  return results.value.indexOf(command)
}

function move(delta) {
  const count = results.value.length
  if (!count) return
  cursor.value = (cursor.value + delta + count) % count
  nextTick(() => {
    listEl.value?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' })
  })
}

function execute(command) {
  if (!command) return
  command.run()
  if (!command.keepOpen) hide()
}

function onKeydown(event) {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      move(1)
      break
    case 'ArrowUp':
      event.preventDefault()
      move(-1)
      break
    case 'Enter':
      event.preventDefault()
      execute(results.value[cursor.value])
      break
    case 'Escape':
      event.preventDefault()
      hide()
      break
  }
}

watch(query, () => (cursor.value = 0))

watch(open, async (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
  if (isOpen) {
    query.value = ''
    cursor.value = 0
    await nextTick()
    input.value?.focus()
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="palette">
      <div
        v-if="open"
        class="overlay no-print"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        @click.self="hide"
      >
        <div class="palette panel">
          <div class="field">
            <AppIcon name="search" :size="17" />
            <input
              ref="input"
              v-model="query"
              type="text"
              placeholder="Search projects, sections and actions…"
              autocomplete="off"
              spellcheck="false"
              aria-label="Search"
              @keydown="onKeydown"
            />
            <kbd>Esc</kbd>
          </div>

          <div ref="listEl" class="results" role="listbox">
            <p v-if="!results.length" class="empty">No matches for “{{ query }}”.</p>

            <div v-for="group in grouped" :key="group.name" class="group">
              <p class="group-name">{{ group.name }}</p>
              <button
                v-for="command in group.items"
                :key="command.id"
                type="button"
                role="option"
                class="row"
                :aria-selected="indexOf(command) === cursor"
                :data-active="indexOf(command) === cursor"
                @mousemove="cursor = indexOf(command)"
                @click="execute(command)"
              >
                <span class="row-icon"><AppIcon :name="command.icon" :size="15" /></span>
                <span class="row-text">
                  <span class="row-label">{{ command.label }}</span>
                  <span v-if="command.hint" class="row-hint">{{ command.hint }}</span>
                </span>
                <AppIcon v-if="command.external" name="external" :size="13" class="row-ext" />
              </button>
            </div>
          </div>

          <div class="foot">
            <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
            <span><kbd>↵</kbd> select</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  padding: clamp(3rem, 12vh, 8rem) 1rem 2rem;
  background: color-mix(in srgb, var(--color-abyss-950) 62%, transparent);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.palette {
  width: min(38rem, 100%);
  max-height: min(32rem, 75vh);
  display: flex;
  flex-direction: column;
  border-radius: 1.125rem;
  overflow: hidden;
}

.field {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.125rem;
  border-bottom: 1px solid var(--line);
  color: var(--text-faint);
}

.field input {
  flex: 1;
  background: none;
  border: 0;
  outline: none;
  color: var(--text-strong);
  font-size: 0.9375rem;
  min-width: 0;
}

.field input::placeholder {
  color: var(--text-faint);
}

.results {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
  scrollbar-width: thin;
}

.empty {
  padding: 2rem 1rem;
  text-align: center;
  color: var(--text-faint);
  font-size: 0.875rem;
}

.group + .group {
  margin-top: 0.375rem;
}

.group-name {
  padding: 0.5rem 0.75rem 0.25rem;
  font-family: var(--font-mono);
  font-size: 0.625rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-faint);
}

.row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.5625rem 0.75rem;
  border-radius: 0.625rem;
  border: 0;
  background: none;
  text-align: left;
  cursor: pointer;
  color: var(--text);
}

.row[data-active='true'] {
  background: color-mix(in srgb, var(--accent) 12%, transparent);
}

.row-icon {
  display: grid;
  place-items: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--line);
  color: var(--accent);
  flex-shrink: 0;
}

.row-text {
  display: flex;
  flex-direction: column;
  gap: 0.0625rem;
  min-width: 0;
}

.row-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-strong);
}

.row-hint {
  font-size: 0.75rem;
  color: var(--text-faint);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.row-ext {
  margin-left: auto;
  color: var(--text-faint);
  flex-shrink: 0;
}

.foot {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.625rem 1.125rem;
  border-top: 1px solid var(--line);
  font-size: 0.6875rem;
  color: var(--text-faint);
}

.foot kbd {
  margin-right: 0.1875rem;
}

kbd {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  padding: 0.125rem 0.3125rem;
  border-radius: 4px;
  border: 1px solid var(--line-strong);
  color: var(--text-faint);
}

/* Transition */
.palette-enter-active,
.palette-leave-active {
  transition: opacity 0.2s ease;
}

.palette-enter-active .palette,
.palette-leave-active .palette {
  transition:
    transform 0.42s var(--ease-out-expo),
    opacity 0.3s ease;
}

.palette-enter-from,
.palette-leave-to {
  opacity: 0;
}

.palette-enter-from .palette,
.palette-leave-to .palette {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}
</style>
