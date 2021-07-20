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
export default {
  name: 'FullScreen',
  data() {
    return {
      fullScreen: false,
    }
  },
  methods: {
    launchFullScreen() {
      const element = document.documentElement
      if (element.requestFullScreen) {
        element.requestFullScreen()
        this.fullScreen = true
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
        this.fullScreen = true
      } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen()
        this.fullScreen = true
      }
    },
    cancelFullScreen() {
      if (document.cancelFullScreen) {
        document.cancelFullScreen()
        this.fullScreen = false
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
        this.fullScreen = false
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
        this.fullScreen = false
      }
    },
  },
}
</script>
