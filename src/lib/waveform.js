/**
 * ─────────────────────────────────────────────────────────────────────────────
 * The waveform behind the hero.
 * ─────────────────────────────────────────────────────────────────────────────
 * A harmonic stack summed into a single wavetable once per frame. The hero draws
 * that one table forty times over, each copy offset in phase and stepped down in
 * perspective, which is what turns a line into a surface.
 *
 * Building a table instead of evaluating the sum per pixel is the whole trick:
 * the wave is periodic in x, so forty lines of 240 points cost one pass of 512
 * samples rather than 9,600 evaluations of a four-term sum.
 *
 * Tuning lives here. `BREATH_PERIOD` sets the pace, `CYCLES` how many waves span
 * the field, `LINES` how dense the surface is, `HARMONICS` its character.
 */

/** Seconds for one full swell and release. */
export const BREATH_PERIOD = 11

/** Wave cycles across the field. Fewer reads calmer and larger. */
export const CYCLES = 1.9

/** Lines stacked to build the surface. */
export const LINES = 48

/** Wavetable resolution. One full period of the harmonic stack. */
export const TABLE_SIZE = 512

/**
 * Partials summed to make the wave. `drift` is how fast each one's phase creeps,
 * in cycles per second. The rates differ and are mutually irrational, so the
 * surface never repeats but takes tens of seconds to visibly change.
 */
const HARMONICS = [
  { mult: 1, amp: 1, drift: 0.01 },
  { mult: 2, amp: 0.34, drift: 0.017 },
  { mult: 3, amp: 0.16, drift: -0.013 },
  { mult: 5, amp: 0.07, drift: 0.023 },
]

/** Constant normaliser, so amplitude never flickers as the shape changes. */
const TOTAL_AMP = HARMONICS.reduce((sum, h) => sum + h.amp, 0)

/**
 * The breathing envelope: 0 at rest, 1 at full swell.
 * Smoothstepped so it lingers at each end rather than passing straight through,
 * which is what makes it read as breathing and not as a sine wave.
 *
 * @param {number} t      seconds
 * @param {number} offset 0..1, phase offset for staggering
 */
export function breath(t, offset = 0) {
  const raw = 0.5 + 0.5 * Math.sin((t / BREATH_PERIOD + offset) * Math.PI * 2)
  return raw * raw * (3 - 2 * raw)
}

/**
 * Fill `table` with exactly one spatial period of the wave, in the range -1..1.
 * Because it is one whole period, any line can sample it at an arbitrary offset
 * with a plain modulo and the result still joins up seamlessly.
 *
 * @param {Float32Array} table reused every frame, so no per-frame allocation
 * @param {number} t seconds
 */
export function buildTable(table, t) {
  const n = table.length

  for (let j = 0; j < n; j++) {
    const x = j / n
    let sum = 0

    for (let k = 0; k < HARMONICS.length; k++) {
      const h = HARMONICS[k]
      sum += h.amp * Math.sin(Math.PI * 2 * (h.mult * x + t * h.drift))
    }

    table[j] = sum / TOTAL_AMP
  }

  return table
}
