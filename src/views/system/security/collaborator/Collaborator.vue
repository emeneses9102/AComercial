<template>
  <div>
    <modal-save-collaborator />
    <modal-search-collaborator />
    <modal-show-collaborator />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportCollaborator,
          url: urlApiCollaborator,
          serverQuery: serverQueryCollaborator,
          columns: columnsCollaborator,
          optionsColumnsFilter: columnsFilterCollaborator,
        }"
      />
      <table-collaborator />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSaveCollaborator from './ModalSaveCollaborator/ModalSaveCollaborator.vue'
import ModalSearchCollaborator from './ModalSearchCollaborator/ModalSearchCollaborator.vue'
import ModalShowCollaborator from './ModalShowCollaborator/ModalShowCollaborator.vue'
import TableCollaborator from './TableCollaborator/TableCollaborator.vue'
import {
  MODAL_ID, clearStateCollaborator, columnsCollaborator, urlApiCollaborator, serverQueryCollaborator, columnsFilterCollaborator, titleReportCollaborator,
} from './ServicesCollaborator/useVariablesCollaborator'

export default {
  name: 'Collaborator',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSaveCollaborator,
    ModalSearchCollaborator,
    ModalShowCollaborator,
    TableCollaborator,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateCollaborator()
    }

    return {
      MODAL_ID,
      clearModal,
      columnsCollaborator,
      urlApiCollaborator,
      serverQueryCollaborator,
      columnsFilterCollaborator,
      titleReportCollaborator,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
