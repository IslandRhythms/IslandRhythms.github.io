<script setup>
/**
 * WaveField — the hero visual.
 *
 * Forty phase-shifted copies of one wave, stacked in perspective and drawn with
 * additive blending, so overlapping strokes accumulate into a luminous surface
 * rather than reading as separate lines. Lines bunch toward the back and open up
 * toward the front; colour warms from aqua to sand as they come forward.
 *
 * All of the motion is slow: the whole surface breathes over eleven seconds, and
 * the wave shape itself morphs over tens of seconds. Nothing is beat-driven.
 *
 * Degrades in two steps:
 *   1. No 2D context, so a CSS gradient fallback.
 *   2. `prefers-reduced-motion`, so one static frame and no animation loop.
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { BREATH_PERIOD, CYCLES, LINES, TABLE_SIZE, breath, buildTable } from '@/lib/waveform'

const props = defineProps({
  /** 'dark' | 'light' */
  theme: { type: String, default: 'dark' },
})

const canvas = ref(null)
const supported = ref(true)

/** Points per line. Enough for a smooth curve at any width. */
const POINTS = 240

/**
 * Depth at which lines start getting a bloom. Shadowed strokes are among the
 * slowest canvas 2D ops there are, and at full width this canvas is several
 * thousand pixels across, so the count matters: this admits the leading 10 lines
 * rather than 26. The ones behind them are drawn too faint for a blur to read
 * anyway, and in dark mode their overlap still accumulates additively into a
 * halo — the glow comes from the compositing, not from blurring every stroke.
 */
const BLOOM_FROM = 0.8

/**
 * `back` and `front` are the colours the surface lerps between as lines come
 * forward. Dark mode composites additively, which needs low per-line alpha and
 * rewards saturated colour; light mode has to composite normally, because
 * additive blending on a pale background just washes to white.
 */
const PALETTES = {
  dark: {
    back: [45, 220, 196],
    front: [247, 201, 119],
    blend: 'lighter',
    alpha: 1,
  },
  light: {
    back: [18, 183, 162],
    front: [194, 130, 44],
    blend: 'source-over',
    alpha: 0.72,
  },
}

const palette = computed(() => PALETTES[props.theme] || PALETTES.dark)

let ctx = null
let raf = 0
let running = false
let startTime = 0
let reducedMotion = false
let observer = null
let resizeObserver = null
let dpr = 1

const table = new Float32Array(TABLE_SIZE)

function draw(elapsed) {
  const el = canvas.value
  if (!el || !ctx) return

  const w = el.width
  const h = el.height
  const p = palette.value

  ctx.clearRect(0, 0, w, h)

  // The hero type is left-aligned, so the surface sits in the right-hand
  // portion. On narrow screens the text spans everything, so it goes full width
  // and much fainter instead.
  const wide = el.clientWidth >= 1080
  const x0 = wide ? w * 0.4 : 0
  const span = w - x0
  const dim = (wide ? 1 : 0.5) * p.alpha

  const top = h * 0.14
  const bandHeight = h * 0.66
  const maxGain = h * 0.15

  // One trigonometric pass for the entire surface.
  buildTable(table, elapsed)
  const swell = breath(elapsed)

  ctx.globalCompositeOperation = p.blend
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'

  for (let i = 0; i < LINES; i++) {
    const d = i / (LINES - 1) // 0 at the back, 1 at the front

    // Non-linear spacing: lines crowd together at the back and open out toward
    // the viewer, which is what sells the depth.
    const yBase = top + bandHeight * Math.pow(d, 1.55)

    const gain = maxGain * (0.4 + 0.6 * d) * (0.4 + 0.6 * swell)
    // Steep ramp: the front few lines carry real weight and the rest recede into
    // a halo behind them, instead of forty lines all competing at one value.
    const alpha = (0.06 + 0.9 * d * d) * (0.55 + 0.45 * swell) * dim
    if (alpha <= 0.003) continue

    // Warm the colour only over the front half, so the field stays mostly aqua.
    const mix = d * d
    const r = Math.round(p.back[0] + (p.front[0] - p.back[0]) * mix)
    const g = Math.round(p.back[1] + (p.front[1] - p.back[1]) * mix)
    const b = Math.round(p.back[2] + (p.front[2] - p.back[2]) * mix)

    // Each line reads the table further along than the last. Spreading the
    // stack over two and a half periods rather than a fraction of one is what
    // makes neighbouring lines cross instead of running parallel, which is the
    // difference between a woven surface and a stack of contour lines.
    const offset = Math.round(d * TABLE_SIZE * 2.5)

    ctx.beginPath()
    for (let j = 0; j < POINTS; j++) {
      const u = j / (POINTS - 1)
      const index = (Math.round(u * CYCLES * TABLE_SIZE) + offset) % TABLE_SIZE
      const x = x0 + u * span
      // Taper the amplitude to nothing at both ends, so the field resolves into
      // a self-contained lens shape instead of colliding with the edges.
      const envelope = Math.pow(Math.sin(Math.PI * u), 0.55)
      const y = yBase - table[index] * gain * envelope
      j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }

    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
    ctx.lineWidth = dpr * (0.7 + 0.8 * d)
    // Bloom on the front of the stack only — see BLOOM_FROM.
    ctx.shadowBlur = d > BLOOM_FROM ? 14 * dpr : 0
    ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha})`
    ctx.stroke()
  }

  ctx.shadowBlur = 0
  ctx.globalCompositeOperation = 'source-over'

  // Fade the left edge so the surface dissolves toward the type instead of
  // stopping on a hard line. destination-out erases whatever was drawn, which
  // is far simpler than alpha-ramping forty stroked paths.
  const fadeWidth = span * 0.32
  const fade = ctx.createLinearGradient(x0, 0, x0 + fadeWidth, 0)
  fade.addColorStop(0, 'rgba(0,0,0,1)')
  fade.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.globalCompositeOperation = 'destination-out'
  ctx.fillStyle = fade
  ctx.fillRect(x0, 0, fadeWidth, h)
  ctx.globalCompositeOperation = 'source-over'
}

function resize() {
  const el = canvas.value
  if (!el || !ctx) return
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = Math.max(1, Math.floor(el.clientWidth * dpr))
  const h = Math.max(1, Math.floor(el.clientHeight * dpr))
  if (el.width === w && el.height === h) return
  el.width = w
  el.height = h
}

function loop(now) {
  if (!running) return
  draw((now - startTime) / 1000)
  raf = requestAnimationFrame(loop)
}

function start() {
  if (running || !ctx || reducedMotion) return
  running = true
  // Begin part-way into a breath, so the first frame is mid-swell, not flat.
  startTime = performance.now() - BREATH_PERIOD * 250
  raf = requestAnimationFrame(loop)
}

function stop() {
  running = false
  cancelAnimationFrame(raf)
}

function onVisibility() {
  document.hidden ? stop() : start()
}

/** A representative frame, used when the loop never runs. */
const STILL_FRAME = BREATH_PERIOD * 0.25

onMounted(() => {
  const el = canvas.value
  ctx = el?.getContext('2d')
  if (!ctx) {
    supported.value = false
    return
  }

  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  resize()

  if (reducedMotion) {
    draw(STILL_FRAME)
    return
  }

  observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), {
    threshold: 0,
  })
  observer.observe(el)

  resizeObserver = new ResizeObserver(() => {
    resize()
    if (!running) draw(STILL_FRAME)
  })
  resizeObserver.observe(el)

  document.addEventListener('visibilitychange', onVisibility)
})

watch(
  () => props.theme,
  () => {
    if (!running && ctx) draw(STILL_FRAME)
  },
)

onBeforeUnmount(() => {
  stop()
  observer?.disconnect()
  resizeObserver?.disconnect()
  document.removeEventListener('visibilitychange', onVisibility)
})
</script>

<template>
  <canvas v-if="supported" ref="canvas" class="canvas" aria-hidden="true" />
  <div v-else class="canvas fallback" aria-hidden="true" />
</template>

<style scoped>
.canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.fallback {
  background: radial-gradient(70% 50% at 78% 50%, var(--glow-accent), transparent 68%),
    linear-gradient(160deg, var(--bg), var(--bg-elevated));
}
</style>
