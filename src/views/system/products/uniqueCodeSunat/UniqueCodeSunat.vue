<template>
  <div>
    <modal-search-unique-code-sunat />
    <modal-show-unique-code-sunat />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :option-new="false"
        :export-data="{
          title: titleReportUniqueCodeSunat,
          url: urlApiUniqueCodeSunat,
          serverQuery: serverQueryUniqueCodeSunat,
          columns: columnsUniqueCodeSunat,
          optionsColumnsFilter: columnsFilterUniqueCodeSunat,
        }"
      />
      <table-unique-code-sunat />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSearchUniqueCodeSunat from './ModalSearchUniqueCodeSunat/ModalSearchUniqueCodeSunat.vue'
import ModalShowUniqueCodeSunat from './ModalShowUniqueCodeSunat/ModalShowUniqueCodeSunat.vue'
import TableUniqueCodeSunat from './TableUniqueCodeSunat/TableUniqueCodeSunat.vue'
import {
  MODAL_ID, clearStateUniqueCodeSunat, columnsUniqueCodeSunat, urlApiUniqueCodeSunat, serverQueryUniqueCodeSunat, columnsFilterUniqueCodeSunat, titleReportUniqueCodeSunat,
} from './ServicesUniqueCodeSunat/useVariablesUniqueCodeSunat'

export default {
  name: 'UniqueCodeSunat',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSearchUniqueCodeSunat,
    ModalShowUniqueCodeSunat,
    TableUniqueCodeSunat,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateUniqueCodeSunat()
    }

    return {
      MODAL_ID,
      clearModal,
      columnsUniqueCodeSunat,
      urlApiUniqueCodeSunat,
      serverQueryUniqueCodeSunat,
      columnsFilterUniqueCodeSunat,
      titleReportUniqueCodeSunat,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
