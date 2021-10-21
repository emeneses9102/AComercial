<template>
  <b-overlay
    :show="$store.state.pointSale.loading"
    variant="transparent"
    :opacity="0.85"
    blur="2px"
    rounded="md"
  >
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
        <point-sale-amount class="pointsale-amount" />
      </div>
    </div>
  </b-overlay>
</template>

<script>
import {
  BOverlay,
} from 'bootstrap-vue'
import {
  // mapActions,
  mapState,
} from 'vuex'
// import { messageToast } from '@/helpers/messageExtensions'
// import {
//   endPointsCombo,
//   loadCombos,
//   resetCombos,
// } from '@/helpers/combos'
import PointSaleAmount from './components/PointSaleAmount/PointSaleAmount.vue'
import PointSaleBoardNumeric from './components/PointSaleBoardNumeric/PointSaleBoardNumeric.vue'
import PointSaleClient from './components/PointSaleClient/PointSaleClient.vue'
import PointSaleList from './components/PointSaleList/PointSaleList.vue'
import PointSaleProduct from './components/PointSaleProduct/PointSaleProduct.vue'
import PointSaleTools from './components/PointSaleTools/PointSaleTools.vue'
import PointSaleVoucher from './components/PointSaleVoucher/PointSaleVoucher.vue'
// import {
//   getBoxSessionByIdCollaborator, getCurrencyLocal,
// } from './ServicesBoxSession/useServicesBoxSession'
// import {
//   statePointSale,
//   clearStatePointSale,
// } from './ServicesPointSale/useVariablesPointSale'
// import { clearStateClient } from './ServicesClient/useVariablesClient'
// import { clearStateProductSelected } from './ServicesProduct/useVariablesProduct'
// import { clearListPointSaleDetail, clearStatePointSaleDetail } from './ServicesPointSaleDetail/useVariablesPointSaleDetail'
// import { combosVoucher } from './components/PointSaleTools/ComponentsTools/ModalOptionsVoucher/useVariablesVoucher'
import { clearViewPointSale } from './ServicesPointSale/useServicesPointSale'

export default {
  name: 'PointSaleThree',
  components: {
    BOverlay,
    PointSaleClient,
    PointSaleVoucher,
    PointSaleProduct,
    PointSaleBoardNumeric,
    PointSaleList,
    PointSaleTools,
    PointSaleAmount,
  },
  computed: {
    ...mapState('boxSession', ['boxSession']),
    ...mapState('authentication', ['user']),
  },
  async created() {
    clearViewPointSale()
    // this.logout()
    // clearStateClient()
    // clearStateProductSelected()
    // clearStatePointSale()
    // clearStatePointSaleDetail()
    // clearListPointSaleDetail()
    // resetCombos(combosVoucher, ['voucher', 'correlative'])
    // this.verifyBoxSessionActive()
    // if (!this.boxSession._id) {
    //   this.verifyBoxSessionActive()
    // } else if (this.user?.idColaborador === this.boxSession?.idCajero) {
    //   setTimeout(() => {
    //     statePointSale.value.idSesionCaja = this.boxSession._id
    //     statePointSale.value.idVendedor = this.boxSession.idCajero
    //     statePointSale.value.idMoneda = this.boxSession.idMoneda
    //     loadCombos(combosVoucher, ['voucher'], `${endPointsCombo.comprobanteSesionCaja}/1/${this.boxSession._id}/0`, 'Comprobante')
    //   }, 10)
    // } else {
    //   this.logout()
    //   this.verifyBoxSessionActive()
    // }
  },
  methods: {
    // ...mapActions('boxSession', ['login', 'logout']),
    // async verifyBoxSessionActive() {
    //   this.$store.commit('pointSale/ACTIVE_LOADING')
    //   const response = await getBoxSessionByIdCollaborator(this.user.idColaborador)
    //   this.$store.commit('pointSale/DESACTIVE_LOADING')
    //   if (response) {
    //     const responseCurrency = await getCurrencyLocal()
    //     if (responseCurrency) {
    //       this.login({ ...response, idMoneda: responseCurrency._id })
    //     } else {
    //       this.login({ ...response, idMoneda: 0 })
    //     }
    //     setTimeout(() => {
    //       statePointSale.value.idSesionCaja = this.boxSession._id
    //       statePointSale.value.idVendedor = this.boxSession.idCajero
    //       statePointSale.value.idMoneda = this.boxSession.idMoneda
    //       loadCombos(combosVoucher, ['voucher'], `${endPointsCombo.comprobanteSesionCaja}/1/${this.boxSession._id}/0`, 'Comprobante')
    //     }, 10)
    //   } else {
    //     messageToast('danger', 'Sesión Caja', 'No tienes una sesión aperturada')
    //   }
    // },
  },
}
</script>

<style lang="scss">
@import './styles/styles.scss';
</style>
