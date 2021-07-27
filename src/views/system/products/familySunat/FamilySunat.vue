<template>
  <div>
    <modal-search-family-sunat />
    <modal-show-family-sunat />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :option-new="false"
        :export-data="{
          title: titleReportFamilySunat,
          url: urlApiFamilySunat,
          serverQuery: serverQueryFamilySunat,
          columns: columnsFamilySunat,
          optionsColumnsFilter: columnsFilterFamilySunat,
        }"
      />
      <table-family-sunat />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSearchFamilySunat from './ModalSearchFamilySunat/ModalSearchFamilySunat.vue'
import ModalShowFamilySunat from './ModalShowFamilySunat/ModalShowFamilySunat.vue'
import TableFamilySunat from './TableFamilySunat/TableFamilySunat.vue'
import {
  MODAL_ID, clearStateFamilySunat, columnsFamilySunat, urlApiFamilySunat, serverQueryFamilySunat, columnsFilterFamilySunat, titleReportFamilySunat,
} from './ServicesFamilySunat/useVariablesFamilySunat'

export default {
  name: 'FamilySunat',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSearchFamilySunat,
    ModalShowFamilySunat,
    TableFamilySunat,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateFamilySunat()
    }

    return {
      MODAL_ID,
      clearModal,
      columnsFamilySunat,
      urlApiFamilySunat,
      serverQueryFamilySunat,
      columnsFilterFamilySunat,
      titleReportFamilySunat,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
