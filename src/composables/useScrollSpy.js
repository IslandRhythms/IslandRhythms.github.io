import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Tracks which section is currently in view so the nav can highlight it.
 *
 * Uses a band across the upper-middle of the viewport rather than naive
 * intersection ratios — with sections of wildly different heights, "whichever
 * section crosses the reading line" matches what a visitor perceives as
 * current far better than "whichever is most visible".
 *
 * @param {string[]} ids section element ids, in document order
 */
export function useScrollSpy(ids) {
  const active = ref('')
  let observer = null

  onMounted(() => {
    const targets = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!targets.length) return

    const visible = new Map()

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting)
        }
        // First section (in document order) intersecting the band wins.
        const current = ids.find((id) => visible.get(id))
        active.value = current || ''
      },
      // Band from 20% to 45% down the viewport.
      { rootMargin: '-20% 0px -55% 0px', threshold: 0 },
    )

    targets.forEach((el) => observer.observe(el))
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { active }
}

export default useScrollSpy
