<template>
  <div>
    <modal-save-system-message />
    <modal-search-system-message />
    <modal-show-system-message />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportSystemMessage,
          url: urlApiSystemMessage,
          serverQuery: serverQuerySystemMessage,
          columns: columnsSystemMessage,
          optionsColumnsFilter: columnsFilterSystemMessage,
        }"
      />
      <table-system-message />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSaveSystemMessage from './ModalSaveSystemMessage/ModalSaveSystemMessage.vue'
import ModalSearchSystemMessage from './ModalSearchSystemMessage/ModalSearchSystemMessage.vue'
import ModalShowSystemMessage from './ModalShowSystemMessage/ModalShowSystemMessage.vue'
import TableSystemMessage from './TableSystemMessage/TableSystemMessage.vue'
import {
  MODAL_ID, clearStateSystemMessage, columnsSystemMessage, urlApiSystemMessage, serverQuerySystemMessage, columnsFilterSystemMessage, titleReportSystemMessage, actionModal,
} from './ServicesSystemMessage/useVariablesSystemMessage'

export default {
  name: 'SystemMessage',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSaveSystemMessage,
    ModalSearchSystemMessage,
    ModalShowSystemMessage,
    TableSystemMessage,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      actionModal.value = 'NEW'
      clearStateSystemMessage()
    }

    return {
      MODAL_ID,
      clearModal,
      columnsSystemMessage,
      urlApiSystemMessage,
      serverQuerySystemMessage,
      columnsFilterSystemMessage,
      titleReportSystemMessage,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
