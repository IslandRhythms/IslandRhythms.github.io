<script setup>
/**
 * ShaderField — the animated hero backdrop.
 *
 * A single full-screen quad running a GLSL fragment shader: domain-warped
 * fractal Brownian motion shaped into caustic light bands, tinted by the active
 * theme and nudged by the pointer. No three.js — raw WebGL, a few KB.
 *
 * Degrades in three steps:
 *   1. No WebGL context      → CSS gradient fallback (`hasContext = false`).
 *   2. `prefers-reduced-motion` → one static frame, no rAF loop.
 *   3. Off-screen or hidden tab → loop parked via IntersectionObserver /
 *      visibilitychange, so it costs nothing while you read the rest of the page.
 */
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  /** 'dark' | 'light' — drives the colour uniforms. */
  theme: { type: String, default: 'dark' },
})

const canvas = ref(null)
const hasContext = ref(true)

/** Palette per theme: [deep water, mid water, caustic glow, warm sand]. */
const PALETTES = {
  dark: {
    deep: [0.012, 0.024, 0.051],
    mid: [0.043, 0.204, 0.278],
    glow: [0.275, 0.898, 0.812],
    sand: [0.941, 0.706, 0.361],
  },
  light: {
    deep: [0.965, 0.957, 0.937],
    mid: [0.792, 0.898, 0.882],
    glow: [0.451, 0.831, 0.769],
    sand: [0.961, 0.827, 0.612],
  },
}

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

const FRAG = `
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uPointer;
uniform float uFade;
uniform vec3  uDeep;
uniform vec3  uMid;
uniform vec3  uGlow;
uniform vec3  uSand;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

// 5-octave fbm; the matrix both rotates and scales each octave to hide the
// grid artefacts you'd otherwise get from axis-aligned value noise.
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.05;

  // Two rounds of domain warping — this is what turns bland noise into
  // something that reads as moving water.
  vec2 q = vec2(fbm(uv * 1.5 + t), fbm(uv * 1.5 + vec2(3.2, 1.7) - t));
  vec2 r = vec2(
    fbm(uv * 2.1 + 2.8 * q + vec2(1.7, 9.2) + t * 1.2),
    fbm(uv * 2.1 + 2.8 * q + vec2(8.3, 2.8) - t * 0.8)
  );
  float f = fbm(uv * 1.8 + 2.2 * r);

  // Ridged sine of the noise field = caustic light bands.
  float caustic = pow(abs(sin(f * 9.4 + uTime * 0.3)), 3.0);

  vec3 col = mix(uDeep, uMid, clamp(f * 1.3, 0.0, 1.0));
  col = mix(col, uGlow, caustic * 0.5 * smoothstep(0.15, 0.85, f));
  col += uSand * pow(clamp(length(r) - 0.35, 0.0, 1.0), 2.0) * 0.4;

  // Broad warm band drifting through the field. Reuses the first warp octave
  // rather than sampling more noise, so it's essentially free, and it keeps
  // the palette from reading as flatly monochrome teal.
  col += uSand * smoothstep(0.32, 0.88, q.x) * 0.18;

  // Pointer acts as a soft submerged light source.
  float d = length(uv - uPointer);
  col += uGlow * 0.13 * exp(-d * 2.4);

  float vig = smoothstep(1.55, 0.2, length(uv * vec2(0.7, 1.0)));
  col *= mix(0.5, 1.0, vig);

  // Ordered-ish dither kills banding across these very smooth gradients.
  col += (hash(gl_FragCoord.xy) - 0.5) / 255.0;

  gl_FragColor = vec4(col * uFade, 1.0);
}
`

let gl = null
let program = null
let raf = 0
let running = false
let startTime = 0
let observer = null
let resizeObserver = null
let reducedMotion = false

const uniforms = {}
/** Pointer in shader space, plus a target we ease toward for smooth trailing. */
const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
let fade = 0

function compile(type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('[ShaderField] shader compile failed:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function init() {
  const el = canvas.value
  if (!el) return false

  gl =
    el.getContext('webgl', {
      antialias: false,
      alpha: false,
      depth: false,
      powerPreference: 'low-power',
    }) || el.getContext('experimental-webgl')
  if (!gl) return false

  const vs = compile(gl.VERTEX_SHADER, VERT)
  const fs = compile(gl.FRAGMENT_SHADER, FRAG)
  if (!vs || !fs) return false

  program = gl.createProgram()
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn('[ShaderField] link failed:', gl.getProgramInfoLog(program))
    return false
  }
  gl.useProgram(program)

  // One quad covering clip space.
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const aPos = gl.getAttribLocation(program, 'aPos')
  gl.enableVertexAttribArray(aPos)
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

  for (const name of ['uRes', 'uTime', 'uPointer', 'uFade', 'uDeep', 'uMid', 'uGlow', 'uSand']) {
    uniforms[name] = gl.getUniformLocation(program, name)
  }

  applyPalette(props.theme)
  resize()
  return true
}

function applyPalette(theme) {
  if (!gl) return
  const p = PALETTES[theme] || PALETTES.dark
  gl.useProgram(program)
  gl.uniform3fv(uniforms.uDeep, p.deep)
  gl.uniform3fv(uniforms.uMid, p.mid)
  gl.uniform3fv(uniforms.uGlow, p.glow)
  gl.uniform3fv(uniforms.uSand, p.sand)
}

function resize() {
  const el = canvas.value
  if (!el || !gl) return
  // Cap the resolution: this shader is fill-rate bound, and nobody can tell
  // the difference between 1x and 2x on a soft gradient.
  const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
  const scale = window.innerWidth > 1600 ? 0.75 : 1
  const w = Math.max(1, Math.floor(el.clientWidth * dpr * scale))
  const h = Math.max(1, Math.floor(el.clientHeight * dpr * scale))
  if (el.width === w && el.height === h) return
  el.width = w
  el.height = h
  gl.viewport(0, 0, w, h)
  gl.uniform2f(uniforms.uRes, w, h)
}

function draw(elapsed) {
  // Ease the pointer toward its target so motion feels weighted, not twitchy.
  pointer.x += (pointer.tx - pointer.x) * 0.045
  pointer.y += (pointer.ty - pointer.y) * 0.045
  fade += (1 - fade) * 0.02

  gl.uniform1f(uniforms.uTime, elapsed)
  gl.uniform2f(uniforms.uPointer, pointer.x, pointer.y)
  gl.uniform1f(uniforms.uFade, reducedMotion ? 1 : fade)
  gl.drawArrays(gl.TRIANGLES, 0, 3)
}

function loop(now) {
  if (!running) return
  draw((now - startTime) / 1000)
  raf = requestAnimationFrame(loop)
}

function start() {
  if (running || !gl || reducedMotion) return
  running = true
  startTime = performance.now() - 8000 // begin mid-animation, never from flat noise
  raf = requestAnimationFrame(loop)
}

function stop() {
  running = false
  cancelAnimationFrame(raf)
}

function onPointerMove(event) {
  const el = canvas.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  pointer.tx = (event.clientX - rect.left - rect.width / 2) / rect.height
  pointer.ty = -(event.clientY - rect.top - rect.height / 2) / rect.height
}

function onVisibility() {
  if (document.hidden) stop()
  else start()
}

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!init()) {
    hasContext.value = false
    return
  }

  if (reducedMotion) {
    // Single representative frame — still a rich image, zero ongoing cost.
    fade = 1
    draw(12)
    return
  }

  observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), {
    threshold: 0,
  })
  observer.observe(canvas.value)

  resizeObserver = new ResizeObserver(() => {
    resize()
    if (!running) draw(12)
  })
  resizeObserver.observe(canvas.value)

  window.addEventListener('pointermove', onPointerMove, { passive: true })
  document.addEventListener('visibilitychange', onVisibility)
})

watch(
  () => props.theme,
  (theme) => {
    applyPalette(theme)
    if (!running && gl) draw(12) // repaint the static frame on theme change
  },
)

onBeforeUnmount(() => {
  stop()
  observer?.disconnect()
  resizeObserver?.disconnect()
  window.removeEventListener('pointermove', onPointerMove)
  document.removeEventListener('visibilitychange', onVisibility)
  // Release the GPU context eagerly rather than waiting on GC.
  gl?.getExtension('WEBGL_lose_context')?.loseContext()
  gl = null
})
</script>

<template>
  <canvas v-if="hasContext" ref="canvas" class="shader-canvas" aria-hidden="true" />
  <div v-else class="shader-canvas shader-fallback" aria-hidden="true" />
</template>

<style scoped>
.shader-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}

/* Static stand-in when WebGL is unavailable. */
.shader-fallback {
  background: radial-gradient(90% 70% at 20% 15%, var(--glow-accent), transparent 60%),
    radial-gradient(70% 60% at 85% 80%, var(--glow-gold), transparent 60%),
    linear-gradient(160deg, var(--bg), var(--bg-elevated));
}
</style>
