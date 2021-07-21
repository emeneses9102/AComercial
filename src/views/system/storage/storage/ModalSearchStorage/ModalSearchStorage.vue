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
  components: {
    ModalSearchComponent,
  },
  setup() {
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
