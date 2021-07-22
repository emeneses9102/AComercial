<template>
  <div>
    <modal-save-currency />
    <modal-search-currency />
    <modal-show-currency />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportCurrency,
          url: urlApiCurrency,
          serverQuery: serverQueryCurrency,
          columns: columnsCurrency,
          optionsColumnsFilter: columnsFilterCurrency,
        }"
      />
      <table-currency />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSaveCurrency from './ModalSaveCurrency/ModalSaveCurrency.vue'
import ModalSearchCurrency from './ModalSearchCurrency/ModalSearchCurrency.vue'
import ModalShowCurrency from './ModalShowCurrency/ModalShowCurrency.vue'
import TableCurrency from './TableCurrency/TableCurrency.vue'
import {
  MODAL_ID, clearStateCurrency, columnsCurrency, urlApiCurrency, serverQueryCurrency, columnsFilterCurrency, titleReportCurrency,
} from './ServicesCurrency/useVariablesCurrency'

export default {
  name: 'Currency',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSaveCurrency,
    ModalSearchCurrency,
    ModalShowCurrency,
    TableCurrency,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateCurrency()
    }

    return {
      MODAL_ID,
      clearModal,
      columnsCurrency,
      urlApiCurrency,
      serverQueryCurrency,
      columnsFilterCurrency,
      titleReportCurrency,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
