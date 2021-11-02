<template>
  <div>
    <modal-save-area />
    <modal-search-area />
    <modal-show-area />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportArea,
          url: urlApiArea,
          serverQuery: serverQueryArea,
          columns: columnsArea,
          optionsColumnsFilter: columnsFilterArea,
        }"
      />
      <table-area />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSaveArea from './ModalSaveArea/ModalSaveArea.vue'
import ModalSearchArea from './ModalSearchArea/ModalSearchArea.vue'
import ModalShowArea from './ModalShowArea/ModalShowArea.vue'
import TableArea from './TableArea/TableArea.vue'
import {
  MODAL_ID, clearStateArea, columnsArea, urlApiArea, serverQueryArea, columnsFilterArea, titleReportArea,
} from './ServicesArea/useVariablesArea'

export default {
  name: 'Area',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSaveArea,
    ModalSearchArea,
    ModalShowArea,
    TableArea,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateArea()
    }

    return {
      MODAL_ID,
      clearModal,
      columnsArea,
      urlApiArea,
      serverQueryArea,
      columnsFilterArea,
      titleReportArea,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
