<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationAccess"
    :server-query.sync="serverQueryAccess"
    :columns-filter="columnsFilterAccess"
    :clear-filters="clearFiltersAccess"
    :load-items="loadItemsAccess"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationAccess, serverQueryAccess, columnsFilterAccess,
  clearFiltersAccess,
} from '../ServicesAccess/useVariablesAccess'
import { loadItemsAccess } from '../ServicesAccess/useServicesAccess'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationAccess,
      serverQueryAccess,
      columnsFilterAccess,
      clearFiltersAccess,
      loadItemsAccess,
    }
  },
}
</script>
