<template>
  <!-- Error page-->
  <div class="misc-wrapper">
    <b-link class="brand-logo d-flex align-items-center">
      <!-- <vuexy-logo /> -->
      <b-img
        :src="require('@/assets/images/logo/ico-simsac.png')"
      />
      <h2 class="brand-text text-primary ml-1">
        ERPSimsac Perú
      </h2>
    </b-link>

    <div class="misc-inner p-2 p-sm-3">
      <div class="w-100 text-center">
        <h2 class="mb-1">
          Página no encontrada 🕵🏻‍♀️
        </h2>
        <p class="mb-2">
          Oops! 😖 La url que solicita no se encuentra en el servidor.
        </p>

        <b-button
          variant="primary"
          class="mb-2 btn-sm-block"
          :to="{name:'home'}"
        >
          Regresar al Inicio
        </b-button>

        <!-- image -->
        <b-img
          fluid
          :src="imgUrl"
          alt="Error page"
        />
      </div>
    </div>
  </div>
<!-- / Error page-->
</template>

<script>
/* eslint-disable global-require */
import { BLink, BButton, BImg } from 'bootstrap-vue'
import store from '@/store/index'

export default {
  components: {
    BLink,
    BButton,
    BImg,
  },
  data() {
    return {
      downImg: require('@/assets/images/pages/error.svg'),
    }
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.downImg = require('@/assets/images/pages/error-dark.svg')
        return this.downImg
      }
      return this.downImg
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-misc.scss';
</style>
