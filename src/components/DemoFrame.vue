<script setup>
/**
 * DemoFrame — category-specific chrome wrapped around a demo.
 *
 * A demo is more legible when it looks like the thing it is: a game sits in an
 * arcade cabinet, a web app in a browser window, a CLI in a terminal. Each
 * variant renders its own chrome around the same `<slot />`, so DemoSection
 * doesn't care which skin it's getting.
 *
 * All chrome is decorative and marked aria-hidden — the real title, links and
 * status live in the card around this, so a screen reader gets the content
 * without a recital of fake window buttons.
 *
 * Unknown categories fall through to a plain bordered frame rather than
 * erroring, so adding a category doesn't require adding a skin first.
 */
import { computed } from 'vue'

const props = defineProps({
  /** Category id: games | web | mobile | desktop | software | open-source. */
  variant: { type: String, default: '' },
  /** Project title, shown in the chrome that has room for one. */
  title: { type: String, default: '' },
  /** Hostname for the browser variant's address bar. */
  host: { type: String, default: '' },
  /** Category accent, drives the per-skin colour. */
  accent: { type: String, default: '' },
})

const SKINS = ['games', 'web', 'mobile', 'desktop', 'software', 'open-source']

/** Falls back to a plain frame for any category without a skin. */
const skin = computed(() => (SKINS.includes(props.variant) ? props.variant : 'plain'))
</script>

<template>
  <div class="frame" :class="`is-${skin}`" :style="{ '--cat': accent || 'var(--accent)' }">
    <!-- Arcade cabinet: marquee, screen, control deck. -->
    <template v-if="skin === 'games'">
      <div class="marquee" aria-hidden="true">
        <span class="marquee-text">{{ title }}</span>
      </div>
      <div class="screen">
        <slot />
        <span class="scanlines" aria-hidden="true" />
      </div>
      <div class="deck" aria-hidden="true">
        <span class="stick" />
        <span class="buttons"> <i /><i /><i /> </span>
      </div>
    </template>

    <!-- Browser window: traffic lights and an address bar. -->
    <template v-else-if="skin === 'web'">
      <div class="bar" aria-hidden="true">
        <span class="lights"><i /><i /><i /></span>
        <span class="omnibox">{{ host || title }}</span>
      </div>
      <div class="screen"><slot /></div>
    </template>

    <!-- Phone: notch and home indicator. -->
    <template v-else-if="skin === 'mobile'">
      <div class="handset">
        <span class="notch" aria-hidden="true" />
        <div class="screen"><slot /></div>
        <span class="home" aria-hidden="true" />
      </div>
    </template>

    <!-- Desktop app window: title bar and window controls. -->
    <template v-else-if="skin === 'desktop'">
      <div class="bar" aria-hidden="true">
        <span class="win-title">{{ title }}</span>
        <span class="win-controls"><i class="min" /><i class="max" /><i class="close" /></span>
      </div>
      <div class="screen"><slot /></div>
    </template>

    <!-- Terminal: tab strip and a prompt. -->
    <template v-else-if="skin === 'software'">
      <div class="bar" aria-hidden="true">
        <span class="lights"><i /><i /><i /></span>
        <span class="tab">{{ title }} — zsh</span>
      </div>
      <div class="screen">
        <span class="prompt" aria-hidden="true">$</span>
        <slot />
      </div>
    </template>

    <!-- Repository header. -->
    <template v-else-if="skin === 'open-source'">
      <div class="bar" aria-hidden="true">
        <span class="repo">
          <span class="repo-owner">IslandRhythms</span>
          <span class="repo-slash">/</span>
          <span class="repo-name">{{ title }}</span>
        </span>
        <span class="branch">main</span>
      </div>
      <div class="screen"><slot /></div>
    </template>

    <!-- No skin for this category yet. -->
    <div v-else class="screen"><slot /></div>
  </div>
</template>

<style scoped>
.frame {
  position: relative;
  border-radius: 0.875rem;
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--bg-elevated);
}

.screen {
  position: relative;
  background: var(--bg);
}

/* The slotted content is either an iframe or the launch card; both fill the
   frame's width. Deliberately does NOT set `display` — the launch card is a
   flex column, and this selector ties on specificity with DemoSection's own
   `.launch` rule, so whichever style block loaded last would win. */
.screen :slotted(*) {
  width: 100%;
}

/* ── Shared chrome bar ───────────────────────────────────────────────────── */
.bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--line);
  background: color-mix(in srgb, var(--cat) 7%, var(--bg-elevated));
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  color: var(--text-faint);
}

.lights {
  display: inline-flex;
  gap: 0.3125rem;
  flex-shrink: 0;
}

.lights i {
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: var(--line-strong);
}

.lights i:first-child {
  background: color-mix(in srgb, #ff6b5e 70%, transparent);
}

.lights i:nth-child(2) {
  background: color-mix(in srgb, #f7c977 70%, transparent);
}

.lights i:last-child {
  background: color-mix(in srgb, #6fd8a8 70%, transparent);
}

/* ── Web: browser ────────────────────────────────────────────────────────── */
.omnibox {
  flex: 1;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: var(--bg);
  border: 1px solid var(--line);
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Desktop: app window ─────────────────────────────────────────────────── */
.win-title {
  flex: 1;
  color: var(--text-muted);
  letter-spacing: 0.06em;
}

.win-controls {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.win-controls i {
  display: block;
  width: 10px;
  height: 10px;
  position: relative;
}

.win-controls i::before,
.win-controls i::after {
  content: '';
  position: absolute;
  background: var(--text-faint);
}

/* Minimise: one rule. Maximise: a hollow square. Close: an ✕. */
.win-controls .min::before {
  left: 0;
  right: 0;
  bottom: 1px;
  height: 1px;
}

.win-controls .max::before {
  inset: 0;
  background: transparent;
  border: 1px solid var(--text-faint);
}

.win-controls .close::before,
.win-controls .close::after {
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
}

.win-controls .close::before {
  transform: rotate(45deg);
}

.win-controls .close::after {
  transform: rotate(-45deg);
}

/* ── Software: terminal ──────────────────────────────────────────────────── */
.is-software .screen {
  padding-left: 1.75rem;
}

.tab {
  color: var(--text-muted);
}

.prompt {
  position: absolute;
  top: 0.875rem;
  left: 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--cat);
}

/* ── Open source: repo header ────────────────────────────────────────────── */
.repo {
  flex: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.3125rem;
  overflow: hidden;
}

.repo-owner {
  color: var(--text-faint);
}

.repo-slash {
  color: var(--line-strong);
}

.repo-name {
  color: var(--cat);
  font-weight: 500;
}

.branch {
  padding: 0.125rem 0.5rem;
  border-radius: 999px;
  border: 1px solid var(--line);
  color: var(--text-faint);
}

/* ── Mobile: handset ─────────────────────────────────────────────────────── */
.is-mobile {
  border: 0;
  background: none;
  display: flex;
  justify-content: center;
}

.handset {
  position: relative;
  width: 100%;
  max-width: 17rem;
  padding: 1.625rem 0.5rem 1.25rem;
  border-radius: 2rem;
  border: 1px solid var(--line-strong);
  background: linear-gradient(
    160deg,
    color-mix(in srgb, var(--cat) 12%, var(--bg-elevated)),
    var(--bg-elevated)
  );
  box-shadow: var(--shadow-card);
}

.is-mobile .screen {
  border-radius: 1.125rem;
  overflow: hidden;
  border: 1px solid var(--line);
}

/* Dynamic-island pill. */
.notch {
  position: absolute;
  top: 0.625rem;
  left: 50%;
  transform: translateX(-50%);
  width: 3.75rem;
  height: 0.375rem;
  border-radius: 999px;
  background: var(--line-strong);
}

.home {
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 4.5rem;
  height: 0.25rem;
  border-radius: 999px;
  background: var(--line-strong);
}

/* ── Games: arcade cabinet ───────────────────────────────────────────────── */
.is-games {
  border-color: color-mix(in srgb, var(--cat) 34%, transparent);
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--cat) 14%, var(--bg-elevated)),
    var(--bg-elevated)
  );
  padding: 0 0.625rem;
}

/* Lit marquee across the top of the cabinet. */
.marquee {
  margin: 0.625rem -0.625rem 0.625rem;
  padding: 0.625rem 1rem;
  text-align: center;
  background: linear-gradient(
    90deg,
    transparent,
    color-mix(in srgb, var(--cat) 26%, transparent),
    transparent
  );
  border-bottom: 1px solid color-mix(in srgb, var(--cat) 30%, transparent);
}

.marquee-text {
  font-family: var(--font-display);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--cat);
  text-shadow: 0 0 14px color-mix(in srgb, var(--cat) 65%, transparent);
}

.is-games .screen {
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--cat) 22%, transparent);
  box-shadow: inset 0 0 40px -8px rgb(0 0 0 / 0.55);
}

/* CRT scanlines. Purely an overlay, so it never eats clicks on the embed. */
.scanlines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(to bottom, rgb(0 0 0 / 0.16) 0 1px, transparent 1px 3px);
}

/* Control deck: stick on the left, three buttons on the right. */
.deck {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0.5rem 0.875rem;
}

.stick {
  position: relative;
  width: 1.5rem;
  height: 0.4375rem;
  border-radius: 999px;
  background: var(--line-strong);
}

.stick::before {
  content: '';
  position: absolute;
  bottom: 0.1875rem;
  left: 50%;
  transform: translateX(-50%);
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 999px;
  background: var(--cat);
  box-shadow: 0 0 10px color-mix(in srgb, var(--cat) 60%, transparent);
}

.buttons {
  display: inline-flex;
  gap: 0.4375rem;
}

.buttons i {
  width: 0.6875rem;
  height: 0.6875rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--cat) 40%, transparent);
  border: 1px solid color-mix(in srgb, var(--cat) 55%, transparent);
}

/* The light theme's panels are near-white, so the cabinet's dark inner glow and
   the scanlines both read as dirt. Lighten the one and drop the other. */
[data-theme='light'] .is-games .screen {
  box-shadow: inset 0 0 30px -12px rgb(29 58 82 / 0.3);
}

[data-theme='light'] .scanlines {
  background: repeating-linear-gradient(to bottom, rgb(29 58 82 / 0.07) 0 1px, transparent 1px 3px);
}
</style>
