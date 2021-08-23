<template>
  <button
    class="btn-board-numeric"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'ButtonBoardNumeric',
  props: {
    text: {
      type: String,
      required: true,
      default: 'N',
    },
  },
}
</script>
