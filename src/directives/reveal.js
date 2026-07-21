/**
 * v-reveal — scroll-triggered entrance animation.
 *
 * A single shared IntersectionObserver handles every element on the page, so
 * adding reveals costs nothing extra. The actual animation lives in CSS
 * (`[data-reveal]` in main.css); this only flips `data-revealed` on.
 *
 * That flag is a data attribute rather than a class on purpose. Vue patches the
 * `class` attribute wholesale from its own vnode data, so on any re-render of a
 * component with a `:class` binding — ProjectCard toggling `is-expanded`, for
 * instance — a class added out-of-band via classList.add() gets wiped, and the
 * element silently drops back to opacity 0. Vue never touches unbound data
 * attributes, so this survives re-renders.
 *
 *   <div v-reveal />                              default rise
 *   <div v-reveal="'left'" />                     directional variant
 *   <div v-reveal="{ variant: 'scale', delay: 120 }" />
 *   <li v-for="…" v-reveal="{ delay: i * 70 }" /> stagger
 */

let observer = null

function getObserver() {
  if (observer) return observer

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.dataset.revealed = 'true'
        // One-shot: never re-animate on scroll-back, and stop paying for it.
        observer.unobserve(entry.target)
      }
    },
    // Fire slightly before the element reaches the viewport edge so the motion
    // has finished by the time it's properly in view.
    { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
  )

  return observer
}

function normalize(value) {
  if (typeof value === 'string') return { variant: value, delay: 0 }
  return { variant: value?.variant ?? '', delay: value?.delay ?? 0 }
}

export const reveal = {
  mounted(el, binding) {
    const { variant, delay } = normalize(binding.value)

    el.setAttribute('data-reveal', variant)
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`)

    // Reduced motion: mark revealed immediately, skip the observer entirely.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.dataset.revealed = 'true'
      return
    }

    getObserver().observe(el)
  },

  unmounted(el) {
    observer?.unobserve(el)
  },
}

export default reveal
