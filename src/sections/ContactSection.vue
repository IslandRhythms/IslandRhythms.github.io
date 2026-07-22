<script setup>
import { ref } from 'vue'
import { site } from '@/content/site'
import SectionHeading from '@/components/SectionHeading.vue'
import AppIcon from '@/components/AppIcon.vue'

const form = ref({ name: '', email: '', message: '', _gotcha: '' })
/** 'idle' | 'sending' | 'sent' | 'error' */
const state = ref('idle')
const error = ref('')

async function submit() {
  if (state.value === 'sending') return

  // Honeypot: bots fill hidden fields, humans never see this one.
  if (form.value._gotcha) {
    state.value = 'sent'
    return
  }

  state.value = 'sending'
  error.value = ''

  try {
    const response = await fetch(site.formspree, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: form.value.name,
        email: form.value.email,
        message: form.value.message,
      }),
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(data.errors?.[0]?.message || 'That didn’t go through. Please try again.')
    }

    state.value = 'sent'
    form.value = { name: '', email: '', message: '', _gotcha: '' }
  } catch (err) {
    state.value = 'error'
    error.value = err.message || 'Something went wrong on the way out. Mind trying again?'
  }
}
</script>

<template>
  <section id="contact" class="section">
    <div class="shell">
      <SectionHeading
        index="04"
        eyebrow="Contact"
        title="Let's build something."
        lead="Have a project, a role, or just a question about something on this page? I read everything that comes through here."
      />

      <div class="layout">
        <!-- The form is the only contact channel; these are profile links. -->
        <aside v-reveal="'left'" class="aside">
          <div class="note panel">
            <p class="note-label">
              <AppIcon name="spark" :size="15" />
              How this works
            </p>
            <p class="note-body">
              Send the form and it lands in my inbox. I usually reply within a day or two. No
              address to copy, no mailing list, no follow-up you didn't ask for.
            </p>
          </div>

          <p class="channels-label">Find me elsewhere</p>
          <ul class="channels">
            <li v-for="social in site.socials" :key="social.label">
              <a :href="social.href" target="_blank" rel="noopener noreferrer" class="channel">
                <AppIcon :name="social.icon" :size="16" />
                <span>{{ social.label }}</span>
                <AppIcon name="arrow" :size="14" class="channel-arrow" />
              </a>
            </li>
          </ul>
        </aside>

        <!-- Form -->
        <form v-reveal="'right'" class="form panel" novalidate @submit.prevent="submit">
          <div class="row">
            <label class="field">
              <span class="label">Name</span>
              <input
                v-model="form.name"
                type="text"
                name="name"
                autocomplete="name"
                required
                :disabled="state === 'sending'"
              />
            </label>

            <label class="field">
              <span class="label">Email</span>
              <input
                v-model="form.email"
                type="email"
                name="email"
                autocomplete="email"
                required
                :disabled="state === 'sending'"
              />
            </label>
          </div>

          <label class="field">
            <span class="label">Message</span>
            <textarea
              v-model="form.message"
              name="message"
              rows="6"
              required
              :disabled="state === 'sending'"
            />
          </label>

          <!-- Honeypot: hidden from humans and screen readers alike -->
          <input
            v-model="form._gotcha"
            type="text"
            name="_gotcha"
            tabindex="-1"
            autocomplete="off"
            aria-hidden="true"
            class="honeypot"
          />

          <div class="form-foot">
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="state === 'sending' || state === 'sent'"
            >
              <template v-if="state === 'sending'">Sending…</template>
              <template v-else-if="state === 'sent'">Message sent</template>
              <template v-else>
                Send message
                <AppIcon name="arrow" :size="16" />
              </template>
            </button>

            <p class="status" role="status" aria-live="polite">
              <span v-if="state === 'sent'" class="ok">
                Thanks, that came through. I'll get back to you shortly.
              </span>
              <span v-else-if="state === 'error'" class="bad">{{ error }}</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {
  position: relative;
  padding: clamp(5rem, 12vw, 9rem) 0 clamp(4rem, 8vw, 6rem);
}

.layout {
  display: grid;
  gap: 1.25rem;
  align-items: start;
}

@media (min-width: 900px) {
  .layout {
    grid-template-columns: minmax(0, 22rem) minmax(0, 1fr);
  }
}

/* ── Aside ───────────────────────────────────────────────────────────────── */
.aside {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.note {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 1.5rem;
  border-radius: 1.25rem;
}

.note-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.625rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
}

.note-body {
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--text-muted);
}

.channels-label {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-faint);
  margin-bottom: -0.5rem;
}

.channels {
  display: flex;
  flex-direction: column;
  list-style: none;
  border: 1px solid var(--line);
  border-radius: 1.25rem;
  overflow: hidden;
}

.channels li + li {
  border-top: 1px solid var(--line);
}

.channel {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9375rem 1.25rem;
  font-size: 0.9375rem;
  color: var(--text-muted);
  transition:
    color 0.25s ease,
    background-color 0.25s ease;
}

.channel:hover {
  color: var(--text-strong);
  background: var(--surface-hover);
}

.channel-arrow {
  margin-left: auto;
  opacity: 0;
  transform: translate(-4px, 4px);
  transition:
    opacity 0.3s ease,
    transform 0.4s var(--ease-out-expo);
}

.channel:hover .channel-arrow {
  opacity: 1;
  transform: none;
}

/* ── Form ────────────────────────────────────────────────────────────────── */
.form {
  padding: clamp(1.5rem, 3vw, 2.25rem);
  border-radius: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
}

.row {
  display: grid;
  gap: 1.125rem;
}

@media (min-width: 560px) {
  .row {
    grid-template-columns: 1fr 1fr;
  }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.label {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-faint);
}

input,
textarea {
  width: 100%;
  padding: 0.8125rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid var(--line-strong);
  background: color-mix(in srgb, var(--bg) 55%, transparent);
  color: var(--text-strong);
  font-family: inherit;
  font-size: 0.9375rem;
  outline: none;
  resize: vertical;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

input:focus,
textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 16%, transparent);
}

input:disabled,
textarea:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.form-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  margin-top: 0.25rem;
}

.btn:disabled {
  opacity: 0.7;
  cursor: default;
  transform: none;
}

.status {
  font-size: 0.875rem;
}

.ok {
  color: var(--accent);
}

.bad {
  color: var(--gold);
}
</style>
