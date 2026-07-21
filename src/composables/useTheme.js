import { ref } from 'vue'

const STORAGE_KEY = 'dcd-theme'

/**
 * Module-level singleton so every component shares one source of truth.
 * The initial value is read from the attribute that the inline script in
 * index.html already set — that script runs before first paint, which is what
 * keeps the page from flashing the wrong theme on load.
 */
const theme = ref(
  typeof document !== 'undefined' ? document.documentElement.dataset.theme || 'dark' : 'dark',
)

function apply(next) {
  theme.value = next
  if (typeof document === 'undefined') return

  document.documentElement.dataset.theme = next

  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // Private mode / storage disabled — the theme still applies for this visit.
  }

  // Keep the mobile browser chrome in step with the page.
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', next === 'light' ? '#f8f6f1' : '#04070d')
}

export function useTheme() {
  const toggle = () => apply(theme.value === 'dark' ? 'light' : 'dark')
  return { theme, toggle, setTheme: apply }
}

export default useTheme
