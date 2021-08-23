<template>
  <b-card>
    <input
      class="pointsale-list__input-code"
      type="text"
      placeholder="Ingresar o escane el código"
    >
    <div class="pointsale-list-products">
      <vue-perfect-scrollbar
        :settings="{
          wheelPropagation: false,
        }"
        class="scrollable-container media-list scroll-area"
      >
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
      </vue-perfect-scrollbar>
    </div>
  </b-card>
</template>

<script>
import {
  BCard,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import PointSaleListItem from './PointSaleListItem.vue'

export default {
  name: 'PointSaleList',
  components: {
    BCard,
    VuePerfectScrollbar,
    PointSaleListItem,
  },
}
</script>

<style lang="scss">
.scroll-area {
  position: relative;
  height: calc(100vh - 20rem);
  // height: calc(100% - 1px);
  padding-right: .5em;
}
</style>
