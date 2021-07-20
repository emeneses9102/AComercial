<template>
  <div>
    <modal-save-service-type />
    <modal-search-service-type />
    <modal-show-service-type />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportServiceType,
          url: urlApiServiceType,
          serverQuery: serverQueryServiceType,
          columns: columnsServiceType,
          optionsColumnsFilter: columnsFilterServiceType,
        }"
      />
      <table-service-type />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSaveServiceType from './ModalSaveServiceType/ModalSaveServiceType.vue'
import ModalSearchServiceType from './ModalSearchServiceType/ModalSearchServiceType.vue'
import ModalShowServiceType from './ModalShowServiceType/ModalShowServiceType.vue'
import TableServiceType from './TableServiceType/TableServiceType.vue'
import {
  MODAL_ID, clearStateServiceType, columnsServiceType, urlApiServiceType, serverQueryServiceType, columnsFilterServiceType, titleReportServiceType,
} from './ServicesServiceType/useVariablesServiceType'

export default {
  name: 'ServiceType',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSaveServiceType,
    ModalSearchServiceType,
    ModalShowServiceType,
    TableServiceType,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateServiceType()
    }

    return {
      MODAL_ID,
      clearModal,
      columnsServiceType,
      urlApiServiceType,
      serverQueryServiceType,
      columnsFilterServiceType,
      titleReportServiceType,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
