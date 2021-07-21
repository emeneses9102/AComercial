<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationRole"
    :server-query.sync="serverQueryRole"
    :columns-filter="columnsFilterRole"
    :clear-filters="clearFiltersRole"
    :load-items="loadItemsRole"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationRole, serverQueryRole, columnsFilterRole, clearFiltersRole,
} from '../ServicesRole/useVariablesRole'
import { loadItemsRole } from '../ServicesRole/useServicesRole'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationRole,
      serverQueryRole,
      columnsFilterRole,
      clearFiltersRole,
      loadItemsRole,
    }
  },
}
</script>
