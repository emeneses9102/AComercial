<template>
  <div>
    <modal-save-tribute />
    <modal-search-tribute />
    <modal-show-tribute />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportTribute,
          url: urlApiTribute,
          serverQuery: serverQueryTribute,
          columns: columnsTribute,
          optionsColumnsFilter: columnsFilterTribute,
        }"
      />
      <table-tribute />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSaveTribute from './ModalSaveTribute/ModalSaveTribute.vue'
import ModalSearchTribute from './ModalSearchTribute/ModalSearchTribute.vue'
import ModalShowTribute from './ModalShowTribute/ModalShowTribute.vue'
import TableTribute from './TableTribute/TableTribute.vue'
import {
  MODAL_ID, clearStateTribute, columnsTribute, urlApiTribute, serverQueryTribute, columnsFilterTribute, titleReportTribute,
} from './ServicesTribute/useVariablesTribute'

export default {
  name: 'Tribute',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSaveTribute,
    ModalSearchTribute,
    ModalShowTribute,
    TableTribute,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateTribute()
    }

    return {
      MODAL_ID,
      clearModal,
      columnsTribute,
      urlApiTribute,
      serverQueryTribute,
      columnsFilterTribute,
      titleReportTribute,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
