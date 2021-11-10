<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationStorage"
    :server-query.sync="serverQueryStorage"
    :columns-filter="columnsFilterStorage"
    :clear-filters="clearFiltersStorage"
    :load-items="loadItemsStorage"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationStorage, serverQueryStorage, columnsFilterStorage, clearFiltersStorage,
} from '../ServicesStorage/useVariablesStorage'
import { loadItemsStorage } from '../ServicesStorage/useServicesStorage'

export default {
  name: 'ModalSearchStorage',
  components: {
    ModalSearchComponent,
  },
  setup() {
    // Retorno de variables y funciones que se utilizaran en el DOM
    return {
      MODAL_ID,
      titleNotificationStorage,
      serverQueryStorage,
      columnsFilterStorage,
      clearFiltersStorage,
      loadItemsStorage,
    }
  },
}
</script>
