<template>
  <b-button
    v-b-tooltip.hover.v-primary="!!titleToolTip"
    :variant="variant"
    :disabled="loading || disabled"
    :class="[marginClass]"
    :type="type"
    :title="titleToolTip"
    @click.stop="methodFunction"
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
          :size="iconSize"
        />
      </template>
      <span
        v-if="iconButton && textDefault"
        :class="[responsive ? 'd-none d-sm-inline-block ml-0 ml-sm-50' : 'd-inline-block ml-50']"
      >
        {{ textDefault }}
      </span>
      <span
        v-else-if="!iconButton && textDefault"
        :class="[responsive ? 'd-none d-sm-inline-block' : 'd-inline-block']"
      >
        {{ textDefault }}
      </span>
    </div>
  </b-button>
</template>

<script>
import {
  BButton, BSpinner, VBTooltip,
} from 'bootstrap-vue'

export default {
  name: 'ButtonComponent',
  components: {
    BButton,
    BSpinner,
  },
  directives: {
    'b-tooltip': VBTooltip,
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
    iconSize: {
      type: String,
      required: false,
      default: '14',
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
    titleToolTip: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>
