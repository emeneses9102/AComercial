<template>
  <div>
    <modal-save-packing />
    <modal-search-packing />
    <modal-show-packing />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportPacking,
          url: urlApiPacking,
          serverQuery: serverQueryPacking,
          columns: columnsPacking,
          optionsColumnsFilter: columnsFilterPacking,
        }"
      />
      <table-packing />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSavePacking from './ModalSavePacking/ModalSavePacking.vue'
import ModalSearchPacking from './ModalSearchPacking/ModalSearchPacking.vue'
import ModalShowPacking from './ModalShowPacking/ModalShowPacking.vue'
import TablePacking from './TablePacking/TablePacking.vue'
import {
  MODAL_ID, clearStatePacking, columnsPacking, urlApiPacking, serverQueryPacking, columnsFilterPacking, titleReportPacking,
} from './ServicesPacking/useVariablesPacking'

export default {
  name: 'Packing',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSavePacking,
    ModalSearchPacking,
    ModalShowPacking,
    TablePacking,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStatePacking()
    }

    return {
      MODAL_ID,
      clearModal,
      columnsPacking,
      urlApiPacking,
      serverQueryPacking,
      columnsFilterPacking,
      titleReportPacking,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
