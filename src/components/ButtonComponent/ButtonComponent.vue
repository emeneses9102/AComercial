<template>
  <b-button
    :variant="variant"
    :disabled="loading"
    :class="[marginClass]"
    :type="type"
    @click="methodFunction"
  >
    <div class="d-flex justify-content-center align-items-center">
      <b-spinner
        v-if="loading"
        small
      />
      <template v-else>
        <feather-icon
          v-if="iconButton"
          :icon="iconButton"
        />
      </template>
      <span :class="[responsive ? 'd-none d-sm-inline-block ml-0 ml-sm-50' : 'd-inline-block ml-50']">{{ textDefault }}</span>
    </div>
  </b-button>
</template>

<script>
import {
  BButton, BSpinner,
} from 'bootstrap-vue'

export default {
  name: 'ButtonComponent',
  components: {
    BButton,
    BSpinner,
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
  },
}
</script>
