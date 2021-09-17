import {
  ref,
} from '@vue/composition-api'

export const fullScreen = ref(false)

const element = document.documentElement

export const launchFullScreen = () => {
  if (element.requestFullScreen) {
    element.requestFullScreen()
    fullScreen.value = true
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
    fullScreen.value = true
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen()
    fullScreen.value = true
  }
}

export const cancelFullScreen = () => {
  if (document.cancelFullScreen) {
    document.cancelFullScreen()
    fullScreen.value = false
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
    fullScreen.value = false
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen()
    fullScreen.value = false
  }
}
