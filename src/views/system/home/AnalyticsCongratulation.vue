<template>
  <b-card
    text-variant="center"
    class="card card-congratulations"
  >
    <!-- images -->
    <b-img
      :src="require('@/assets/images/elements/decore-left.png')"
      class="congratulations-img-left"
    />
    <b-img
      :src="require('@/assets/images/elements/decore-right.png')"
      class="congratulations-img-right"
    />
    <!--/ images -->

    <b-avatar
      variant="primary"
      size="70"
      class="shadow mb-2"
    >
      <feather-icon
        size="28"
        icon="AwardIcon"
      />
    </b-avatar>
    <h1
      class="mb-1 mt-50 text-white"
    >
      Felicidades <span class="text-capitalize">{{ $store.state.authentication.user.usuario || 'Usuario' }}</span>
      <!-- {{ ` ${$store.state.authentication.user.usuario.charAt(0).toUpperCase()}${$store.state.authentication.user.usuario.substring(1)}` }}, -->
    </h1>
    <b-card-text class="m-auto w-75">
      Hoy ha realizado un <strong> 70% </strong> más de ventas.
    </b-card-text>
  </b-card>
</template>

<script>
import {
  BCard, BImg, BAvatar, BCardText,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BAvatar,
    BImg,
    BCardText,
  },
}
</script>
