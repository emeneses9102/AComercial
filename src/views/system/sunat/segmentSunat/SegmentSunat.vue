<template>
  <div>
    <modal-search-segment-sunat />
    <modal-show-segment-sunat />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :option-new="false"
        :export-data="{
          title: titleReportSegmentSunat,
          url: urlApiSegmentSunat,
          serverQuery: serverQuerySegmentSunat,
          columns: columnsSegmentSunat,
          optionsColumnsFilter: columnsFilterSegmentSunat,
        }"
      />
      <table-segment-sunat />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSearchSegmentSunat from './ModalSearchSegmentSunat/ModalSearchSegmentSunat.vue'
import ModalShowSegmentSunat from './ModalShowSegmentSunat/ModalShowSegmentSunat.vue'
import TableSegmentSunat from './TableSegmentSunat/TableSegmentSunat.vue'
import {
  MODAL_ID, clearStateSegmentSunat, columnsSegmentSunat, urlApiSegmentSunat, serverQuerySegmentSunat, columnsFilterSegmentSunat, titleReportSegmentSunat,
} from './ServicesSegmentSunat/useVariablesSegmentSunat'

export default {
  name: 'SegmentSunat',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSearchSegmentSunat,
    ModalShowSegmentSunat,
    TableSegmentSunat,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateSegmentSunat()
    }

    return {
      MODAL_ID,
      clearModal,
      columnsSegmentSunat,
      urlApiSegmentSunat,
      serverQuerySegmentSunat,
      columnsFilterSegmentSunat,
      titleReportSegmentSunat,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
