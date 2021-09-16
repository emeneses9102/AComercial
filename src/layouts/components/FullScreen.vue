<template>
  <div
    v-if="fullScreen"
    class="mr-1"
    role="button"
    @click="cancelFullScreen"
  >
    <feather-icon
      icon="MinimizeIcon"
      size="24"
    />
  </div>
  <div
    v-else
    class="mr-1"
    role="button"
    @click="launchFullScreen"
  >
    <feather-icon
      icon="MaximizeIcon"
      size="24"
    />
  </div>
</template>

<script>
import {
  fullScreen,
  launchFullScreen,
  cancelFullScreen,
} from '@/helpers/utilsUI'

export default {
  name: 'FullScreen',
  setup() {
    return {
      fullScreen,
      launchFullScreen,
      cancelFullScreen,
    }
  },
}
</script>
