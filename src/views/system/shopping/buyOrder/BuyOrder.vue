<template>
  <div>
    <modal-save-buy-order />
    <modal-search-buy-order />
    <modal-show-buy-order />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportBuyOrder,
          url: urlApiBuyOrder,
          serverQuery: serverQueryBuyOrder,
          columns: columnsBuyOrder,
          optionsColumnsFilter: columnsFilterBuyOrder,
        }"
      />
      <table-buy-order />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import { onMounted } from '@vue/composition-api'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import { endPointsCombo, loadCombos } from '@/helpers/combos'
import ModalSaveBuyOrder from './ModalSaveBuyOrder/ModalSaveBuyOrder.vue'
import ModalSearchBuyOrder from './ModalSearchBuyOrder/ModalSearchBuyOrder.vue'
import ModalShowBuyOrder from './ModalShowBuyOrder/ModalShowBuyOrder.vue'
import TableBuyOrder from './TableBuyOrder/TableBuyOrder.vue'
import {
  MODAL_ID, clearStateBuyOrder, columnsBuyOrder, urlApiBuyOrder, titleNotificationBuyOrder, serverQueryBuyOrder, columnsFilterBuyOrder, titleReportBuyOrder, combosBuyOrder,
} from './ServicesBuyOrder/useVariablesBuyOrder'
import {
  clearStateBuyOrderDetail, clearDataTableBuyOrderDetail, clearFiltersBuyOrderDetail, combosBuyOrderDetail,
} from './ServicesBuyOrderDetail/useVariablesBuyOrderDetail'
import { clearDataTableBuyOrderTributeDetail, clearFiltersBuyOrderTributeDetail } from './ServicesBuyOrderTributeDetail/useVariablesBuyOrderTributeDetail'
import { clearDataTableBuyOrderTributeSummaryDetail, clearFiltersBuyOrderTributeSummaryDetail } from './ServicesBuyOrderTributeSummaryDetail/useVariablesBuyOrderTributeSummaryDetail'

export default {
  name: 'BuyOrder',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSaveBuyOrder,
    ModalSearchBuyOrder,
    ModalShowBuyOrder,
    TableBuyOrder,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateBuyOrder()
      clearStateBuyOrderDetail()
      clearFiltersBuyOrderDetail()
      clearDataTableBuyOrderDetail()
      clearFiltersBuyOrderTributeDetail()
      clearDataTableBuyOrderTributeDetail()
      clearFiltersBuyOrderTributeSummaryDetail()
      clearDataTableBuyOrderTributeSummaryDetail()
    }

    onMounted(() => {
      loadCombos(combosBuyOrder, ['currency'], `${endPointsCombo.moneda}/1`, 'Moneda')
      loadCombos(combosBuyOrder, ['paymentForm'], `${endPointsCombo.formaPago}/1`, 'Forma Pago')
      loadCombos(combosBuyOrder, ['format'], `${endPointsCombo.formato}/1`, 'Formato')
      loadCombos(combosBuyOrderDetail, ['purchaseReason'], `${endPointsCombo.motivoCompra}/1`, 'Motivo Compra')
    })

    return {
      MODAL_ID,
      clearModal,
      // openModal,
      columnsBuyOrder,
      urlApiBuyOrder,
      titleNotificationBuyOrder,
      serverQueryBuyOrder,
      columnsFilterBuyOrder,
      titleReportBuyOrder,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
