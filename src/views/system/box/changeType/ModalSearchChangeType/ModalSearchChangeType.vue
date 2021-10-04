<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationChangeType"
    :server-query.sync="serverQueryChangeType"
    :columns-filter="columnsFilterChangeType"
    :clear-filters="clearFiltersChangeType"
    :load-items="loadItemsChangeType"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationChangeType, serverQueryChangeType, columnsFilterChangeType, clearFiltersChangeType,
} from '../ServicesChangeType/useVariablesChangeType'
import { loadItemsChangeType } from '../ServicesChangeType/useServicesChangeType'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationChangeType,
      serverQueryChangeType,
      columnsFilterChangeType,
      clearFiltersChangeType,
      loadItemsChangeType,
    }
  },
}
</script>
