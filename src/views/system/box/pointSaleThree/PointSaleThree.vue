<template>
  <div
    class="pointsale"
    :class="[$store.state.pointSale.showProductDetail?'show-product-detail':'no-show-product-detail']"
  >
    <div class="pointsale-info">
      <point-sale-client />
      <point-sale-voucher />
    </div>
    <div class="pointsale-product">
      <point-sale-product />
      <point-sale-board-numeric />
    </div>
    <div class="pointsale-list">
      <point-sale-list />
    </div>
    <div class="pointsale-plus">
      <point-sale-tools class="pointsale-tools" />
      <point-sale-amount />
    </div>
  </div>
</template>

<script>
import useAppConfig from '@core/app-config/useAppConfig'
import PointSaleAmount from './components/PointSaleAmount/PointSaleAmount.vue'
import PointSaleBoardNumeric from './components/PointSaleBoardNumeric/PointSaleBoardNumeric.vue'
import PointSaleClient from './components/PointSaleClient/PointSaleClient.vue'
import PointSaleList from './components/PointSaleList/PointSaleList.vue'
import PointSaleProduct from './components/PointSaleProduct/PointSaleProduct.vue'
import PointSaleTools from './components/PointSaleTools/PointSaleTools.vue'
import PointSaleVoucher from './components/PointSaleVoucher/PointSaleVoucher.vue'

export default {
  name: 'PointSaleThree',
  components: {
    PointSaleClient,
    PointSaleVoucher,
    PointSaleProduct,
    PointSaleBoardNumeric,
    PointSaleList,
    PointSaleTools,
    PointSaleAmount,
  },
  created() {
    const {
      navbarType,
    } = useAppConfig()
    navbarType.value = 'sticky'
  },
  destroyed() {
    const {
      navbarType,
    } = useAppConfig()
    navbarType.value = 'sticky'
  },
}
</script>

<style lang="scss">
@import './styles/styles.scss';
</style>
