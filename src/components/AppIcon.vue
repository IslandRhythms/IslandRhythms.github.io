<script setup>
/**
 * Inline icon set. Everything is a hand-picked 24×24 path so the site ships
 * zero icon-font or icon-library weight — add an entry to STROKE or FILL to extend it.
 */
const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 18 },
})

/** Stroke-based icons (inherit currentColor, 1.6px stroke). */
const STROKE = {
  mail: 'M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5zM3.5 7l7.4 5.3a2 2 0 0 0 2.2 0L20.5 7',
  arrow: 'M7 17 17 7M9 7h8v8',
  external: 'M14 4h6v6M20 4l-8.5 8.5M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4',
  code: 'm9 18-6-6 6-6M15 6l6 6-6 6',
  sun: 'M12 4V2M12 22v-2M6.3 6.3 4.9 4.9M19.1 19.1l-1.4-1.4M4 12H2M22 12h-2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  moon: 'M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3',
  print:
    'M7 9V3h10v6M7 19H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M7 15h10v6H7z',
  download: 'M12 3v12M7 11l5 5 5-5M4 19v2h16v-2',
  chevron: 'm6 9 6 6 6-6',
  close: 'M6 6l12 12M18 6 6 18',
  corner: 'M9 6h9v9',
  pin: 'M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  spark: 'M12 3v4M12 17v4M3 12h4M17 12h4M6.5 6.5 9 9M15 15l2.5 2.5M17.5 6.5 15 9M9 15l-2.5 2.5',
}

/** Filled brand marks (single path, fill-currentColor). */
const FILL = {
  github:
    'M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7 0-.7 0-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.7 1.7.3 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z',
  steam:
    'M12 0C5.8 0 .7 4.7 0 10.8l6.4 2.7a3.4 3.4 0 0 1 1.9-.6h.2l2.9-4.1v-.1a4.5 4.5 0 1 1 4.5 4.5h-.1l-4.1 2.9v.2a3.4 3.4 0 0 1-6.8.2L.4 14.6A12 12 0 1 0 12 0Zm-4.5 18.2.9-.4a2.6 2.6 0 1 0-1.4-3.4l1.5.6a1.9 1.9 0 1 1 1.5 3.5l-2.5-1.1Zm11-5.8a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm0-5.3a2.3 2.3 0 1 1-2.2 2.3 2.3 2.3 0 0 1 2.2-2.3Z',
  itch: 'M3.1 1.4C2.1 2 0 4.4 0 5.1v1.1c0 1.4 1.3 2.6 2.5 2.6 1.4 0 2.6-1.2 2.6-2.6 0 1.4 1.1 2.6 2.5 2.6s2.4-1.2 2.4-2.6c0 1.4 1.2 2.6 2.6 2.6h.1c1.4 0 2.6-1.2 2.6-2.6 0 1.4 1.1 2.6 2.5 2.6s2.5-1.2 2.5-2.6c0 1.4 1.2 2.6 2.6 2.6C22.7 8.8 24 7.6 24 6.2V5.1c0-.7-2.1-3.1-3.1-3.7C17.7 1.2 15.8 1 12 1s-6.4.1-8.9.4ZM9.6 10.5a2.9 2.9 0 0 1-2.4 1.3 3 3 0 0 1-2.4-1.3 3 3 0 0 1-2.4 1.3c-.3 0-.6 0-.9-.2-.3 2.4-.6 5.5-.6 7.4 0 2 1 3 3 3 3.4 0 5.7-1.4 5.7-1.4h6.8s2.3 1.4 5.7 1.4c2 0 3-1 3-3 0-1.9-.3-5-.6-7.4-.3.2-.6.2-.9.2a3 3 0 0 1-2.4-1.3 3 3 0 0 1-2.4 1.3 2.9 2.9 0 0 1-2.4-1.3 3 3 0 0 1-2.5 1.3h-.1a3 3 0 0 1-2.4-1.3Zm-.7 2.3h6.2a67 67 0 0 1 2.8 2.9c0 .4-.4.8-.9.8a25 25 0 0 1-2-.9c0 .5-.4 1-1.4 1H11c-1 0-1.4-.5-1.4-1a25 25 0 0 1-2 .9c-.5 0-.9-.4-.9-.8a67 67 0 0 1 2.2-2.9Zm1.9 1.6.1 1.5H13l.1-1.5h-2.3Z',
}

const isFill = props.name in FILL
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    :fill="isFill ? 'currentColor' : 'none'"
    aria-hidden="true"
    focusable="false"
    class="shrink-0"
  >
    <path v-if="isFill" :d="FILL[name]" />
    <path
      v-else
      :d="STROKE[name]"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
