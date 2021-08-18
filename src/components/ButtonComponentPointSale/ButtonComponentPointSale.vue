<template>
  <b-button
    :variant="variant"
    :disabled="loading || disabled"
    :class="[marginClass]"
    :type="type"
    @click="methodFunction"
  >
    <feather-icon
      v-if="iconButton"
      :icon="iconButton"
      size="24"
    />
  </b-button>
</template>

<script>
import {
  BButton,
} from 'bootstrap-vue'

export default {
  name: 'ButtonComponent',
  components: {
    BButton,
  },
  props: {
    type: {
      type: String,
      required: false,
      default: 'button',
    },
    variant: {
      type: String,
      required: false,
      default: 'primary',
    },
    textDefault: {
      type: String,
      required: false,
      default: '',
    },
    iconButton: {
      type: String,
      required: false,
      default: '',
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    methodFunction: {
      type: Function,
      required: false,
      default: () => {},
    },
    responsive: {
      type: Boolean,
      required: false,
      default: false,
    },
    marginClass: {
      type: String,
      required: false,
      default: 'm-25',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>
