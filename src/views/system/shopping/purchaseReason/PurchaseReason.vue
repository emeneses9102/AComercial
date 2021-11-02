<template>
  <div>
    <modal-save-purchase-reason />
    <modal-search-purchase-reason />
    <modal-show-purchase-reason />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportPurchaseReason,
          url: urlApiPurchaseReason,
          serverQuery: serverQueryPurchaseReason,
          columns: columnsPurchaseReason,
          optionsColumnsFilter: columnsFilterPurchaseReason,
        }"
      />
      <table-purchase-reason />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSavePurchaseReason from './ModalSavePurchaseReason/ModalSavePurchaseReason.vue'
import ModalSearchPurchaseReason from './ModalSearchPurchaseReason/ModalSearchPurchaseReason.vue'
import ModalShowPurchaseReason from './ModalShowPurchaseReason/ModalShowPurchaseReason.vue'
import TablePurchaseReason from './TablePurchaseReason/TablePurchaseReason.vue'
import {
  MODAL_ID, clearStatePurchaseReason, columnsPurchaseReason, urlApiPurchaseReason, serverQueryPurchaseReason, columnsFilterPurchaseReason, titleReportPurchaseReason,
} from './ServicesPurchaseReason/useVariablesPurchaseReason'

export default {
  name: 'PurchaseReason',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSavePurchaseReason,
    ModalSearchPurchaseReason,
    ModalShowPurchaseReason,
    TablePurchaseReason,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStatePurchaseReason()
    }

    return {
      MODAL_ID,
      clearModal,
      columnsPurchaseReason,
      urlApiPurchaseReason,
      serverQueryPurchaseReason,
      columnsFilterPurchaseReason,
      titleReportPurchaseReason,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
