<template>
  <div>
    <modal-save-business-unit />
    <modal-search-business-unit />
    <modal-show-business-unit />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportBusinessUnit,
          url: urlApiBusinessUnit,
          serverQuery: serverQueryBusinessUnit,
          columns: columnsBusinessUnit,
          optionsColumnsFilter: columnsFilterBusinessUnit,
        }"
      />
      <table-business-unit />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSaveBusinessUnit from './ModalSaveBusinessUnit/ModalSaveBusinessUnit.vue'
import ModalSearchBusinessUnit from './ModalSearchBusinessUnit/ModalSearchBusinessUnit.vue'
import ModalShowBusinessUnit from './ModalShowBusinessUnit/ModalShowBusinessUnit.vue'
import TableBusinessUnit from './TableBusinessUnit/TableBusinessUnit.vue'
import {
  MODAL_ID, clearStateBusinessUnit, columnsBusinessUnit, urlApiBusinessUnit, serverQueryBusinessUnit, columnsFilterBusinessUnit, titleReportBusinessUnit,
} from './ServicesBusinessUnit/useVariablesBusinessUnit'

export default {
  name: 'BusinessUnit',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSaveBusinessUnit,
    ModalSearchBusinessUnit,
    ModalShowBusinessUnit,
    TableBusinessUnit,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateBusinessUnit()
    }

    return {
      MODAL_ID,
      clearModal,
      columnsBusinessUnit,
      urlApiBusinessUnit,
      serverQueryBusinessUnit,
      columnsFilterBusinessUnit,
      titleReportBusinessUnit,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
