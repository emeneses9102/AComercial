<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationSystemError"
    :server-query.sync="serverQuerySystemError"
    :columns-filter="columnsFilterSystemError"
    :clear-filters="clearFiltersSystemError"
    :load-items="loadItemsSystemError"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationSystemError, serverQuerySystemError, columnsFilterSystemError, clearFiltersSystemError,
} from '../ServicesSystemError/useVariablesSystemError'
import { loadItemsSystemError } from '../ServicesSystemError/useServicesSystemError'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationSystemError,
      serverQuerySystemError,
      columnsFilterSystemError,
      clearFiltersSystemError,
      loadItemsSystemError,
    }
  },
}
</script>
