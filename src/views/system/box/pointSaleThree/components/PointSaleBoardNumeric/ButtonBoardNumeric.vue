<template>
  <button
    class="btn-board-numeric"
    @click="methodFunction"
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
    methodFunction: {
      type: Function,
      required: false,
      default: () => {},
    },
  },
}
</script>
