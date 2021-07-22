<template>
  <div>
    <modal-search-system-error />
    <modal-show-system-error />
    <b-card>
      <header-maintenance-component
        :option-new="false"
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportSystemError,
          url: urlApiSystemError,
          serverQuery: serverQuerySystemError,
          columns: columnsSystemError,
          optionsColumnsFilter: columnsFilterSystemError,
        }"
      />
      <table-system-error />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSearchSystemError from './ModalSearchSystemError/ModalSearchSystemError.vue'
import ModalShowSystemError from './ModalShowSystemError/ModalShowSystemError.vue'
import TableSystemError from './TableSystemError/TableSystemError.vue'
import {
  MODAL_ID, clearStateSystemError, columnsSystemError, urlApiSystemError, serverQuerySystemError, columnsFilterSystemError, titleReportSystemError,
} from './ServicesSystemError/useVariablesSystemError'

export default {
  name: 'SystemError',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSearchSystemError,
    ModalShowSystemError,
    TableSystemError,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateSystemError()
    }

    return {
      MODAL_ID,
      clearModal,
      columnsSystemError,
      urlApiSystemError,
      serverQuerySystemError,
      columnsFilterSystemError,
      titleReportSystemError,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
