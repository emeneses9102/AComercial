<template>
  <div>
    <modal-save-purchase-order />
    <modal-search-purchase-order />
    <modal-show-purchase-order />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportPurchaseOrder,
          url: urlApiPurchaseOrder,
          serverQuery: serverQueryPurchaseOrder,
          columns: columnsPurchaseOrder,
          optionsColumnsFilter: columnsFilterPurchaseOrder,
        }"
      />
      <table-purchase-order />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import { onMounted } from '@vue/composition-api'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import { endPointsCombo, loadCombos } from '@/helpers/combos'
import ModalSavePurchaseOrder from './ModalSavePurchaseOrder/ModalSavePurchaseOrder.vue'
import ModalSearchPurchaseOrder from './ModalSearchPurchaseOrder/ModalSearchPurchaseOrder.vue'
import ModalShowPurchaseOrder from './ModalShowPurchaseOrder/ModalShowPurchaseOrder.vue'
import TablePurchaseOrder from './TablePurchaseOrder/TablePurchaseOrder.vue'
import {
  MODAL_ID, clearStatePurchaseOrder, columnsPurchaseOrder, urlApiPurchaseOrder, titleNotificationPurchaseOrder, serverQueryPurchaseOrder, columnsFilterPurchaseOrder, titleReportPurchaseOrder, combosPurchaseOrder,
} from './ServicesPurchaseOrder/useVariablesPurchaseOrder'
import {
  clearStatePurchaseOrderDetail, clearDataTablePurchaseOrderDetail, clearFiltersPurchaseOrderDetail,
} from './ServicesPurchaseOrderDetail/useVariablesPurchaseOrderDetail'

export default {
  name: 'PurchaseOrder',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSavePurchaseOrder,
    ModalSearchPurchaseOrder,
    ModalShowPurchaseOrder,
    TablePurchaseOrder,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStatePurchaseOrder()
      clearStatePurchaseOrderDetail()
      clearFiltersPurchaseOrderDetail()
      clearDataTablePurchaseOrderDetail()
    }

    onMounted(() => {
      loadCombos(combosPurchaseOrder, ['area'], `${endPointsCombo.area}/1`, 'Área')
      loadCombos(combosPurchaseOrder, ['branchOffice'], `${endPointsCombo.predios}/1`, 'Predio')
    })

    return {
      MODAL_ID,
      clearModal,
      // openModal,
      columnsPurchaseOrder,
      urlApiPurchaseOrder,
      titleNotificationPurchaseOrder,
      serverQueryPurchaseOrder,
      columnsFilterPurchaseOrder,
      titleReportPurchaseOrder,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
