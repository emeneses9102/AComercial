<template>
  <div>
    <modal-save-format />
    <modal-search-format />
    <modal-show-format />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportFormat,
          url: urlApiFormat,
          serverQuery: serverQueryFormat,
          columns: columnsFormat,
          optionsColumnsFilter: columnsFilterFormat,
        }"
      />
      <table-format />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSaveFormat from './ModalSaveFormat/ModalSaveFormat.vue'
import ModalSearchFormat from './ModalSearchFormat/ModalSearchFormat.vue'
import ModalShowFormat from './ModalShowFormat/ModalShowFormat.vue'
import TableFormat from './TableFormat/TableFormat.vue'
import {
  MODAL_ID, clearStateFormat, columnsFormat, urlApiFormat, serverQueryFormat, columnsFilterFormat, titleReportFormat,
} from './ServicesFormat/useVariablesFormat'

export default {
  name: 'Format',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSaveFormat,
    ModalSearchFormat,
    ModalShowFormat,
    TableFormat,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateFormat()
    }

    return {
      MODAL_ID,
      clearModal,
      columnsFormat,
      urlApiFormat,
      serverQueryFormat,
      columnsFilterFormat,
      titleReportFormat,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
