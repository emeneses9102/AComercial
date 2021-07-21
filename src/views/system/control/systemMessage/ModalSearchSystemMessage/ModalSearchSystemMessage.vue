<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationSystemMessage"
    :server-query.sync="serverQuerySystemMessage"
    :columns-filter="columnsFilterSystemMessage"
    :clear-filters="clearFiltersSystemMessage"
    :load-items="loadItemsSystemMessage"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationSystemMessage, serverQuerySystemMessage, columnsFilterSystemMessage, clearFiltersSystemMessage,
} from '../ServicesSystemMessage/useVariablesSystemMessage'
import { loadItemsSystemMessage } from '../ServicesSystemMessage/useServicesSystemMessage'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationSystemMessage,
      serverQuerySystemMessage,
      columnsFilterSystemMessage,
      clearFiltersSystemMessage,
      loadItemsSystemMessage,
    }
  },
}
</script>
