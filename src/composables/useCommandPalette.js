import { onBeforeUnmount, onMounted, ref } from 'vue'

const open = ref(false)

/**
 * Shared open/close state for the ⌘K palette, plus the global hotkey.
 * `registerHotkey` should be called exactly once (from App.vue).
 */
export function useCommandPalette() {
  function show() {
    open.value = true
  }
  function hide() {
    open.value = false
  }
  function toggle() {
    open.value = !open.value
  }

  function registerHotkey() {
    function onKeydown(event) {
      // ⌘K / Ctrl+K
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        toggle()
        return
      }

      // "/" opens too — but not while the visitor is typing in a field.
      if (event.key === '/' && !open.value) {
        const el = document.activeElement
        const typing =
          el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)
        if (typing) return
        event.preventDefault()
        show()
      }
    }

    onMounted(() => window.addEventListener('keydown', onKeydown))
    onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
  }

  return { open, show, hide, toggle, registerHotkey }
}

export default useCommandPalette
