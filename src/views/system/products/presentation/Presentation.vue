<template>
  <div>
    <modal-save-presentation />
    <modal-search-presentation />
    <modal-show-presentation />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportPresentation,
          url: urlApiPresentation,
          serverQuery: serverQueryPresentation,
          columns: columnsPresentation,
          optionsColumnsFilter: columnsFilterPresentation,
        }"
      />
      <table-presentation />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSavePresentation from './ModalSavePresentation/ModalSavePresentation.vue'
import ModalSearchPresentation from './ModalSearchPresentation/ModalSearchPresentation.vue'
import ModalShowPresentation from './ModalShowPresentation/ModalShowPresentation.vue'
import TablePresentation from './TablePresentation/TablePresentation.vue'
import {
  MODAL_ID, clearStatePresentation, columnsPresentation, urlApiPresentation, serverQueryPresentation, columnsFilterPresentation, titleReportPresentation,
} from './ServicesPresentation/useVariablesPresentation'

export default {
  name: 'Presentation',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSavePresentation,
    ModalSearchPresentation,
    ModalShowPresentation,
    TablePresentation,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStatePresentation()
    }

    return {
      MODAL_ID,
      clearModal,
      columnsPresentation,
      urlApiPresentation,
      serverQueryPresentation,
      columnsFilterPresentation,
      titleReportPresentation,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
