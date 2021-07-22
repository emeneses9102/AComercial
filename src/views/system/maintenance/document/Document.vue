<template>
  <div>
    <modal-save-document />
    <modal-search-document />
    <modal-show-document />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportDocument,
          url: urlApiDocument,
          serverQuery: serverQueryDocument,
          columns: columnsDocument,
          optionsColumnsFilter: columnsFilterDocument,
        }"
      />
      <table-document />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSaveDocument from './ModalSaveDocument/ModalSaveDocument.vue'
import ModalShowDocument from './ModalShowDocument/ModalShowDocument.vue'
import ModalSearchDocument from './ModalSearchDocument/ModalSearchDocument.vue'
import TableDocument from './TableDocument/TableDocument.vue'
import {
  MODAL_ID, clearStateDocument, columnsDocument, urlApiDocument, serverQueryDocument, columnsFilterDocument, titleReportDocument,
} from './ServicesDocument/useVariablesDocument'

export default {
  name: 'Document',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSaveDocument,
    ModalSearchDocument,
    ModalShowDocument,
    TableDocument,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateDocument()
    }

    return {
      MODAL_ID,
      clearModal,
      columnsDocument,
      urlApiDocument,
      serverQueryDocument,
      columnsFilterDocument,
      titleReportDocument,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
