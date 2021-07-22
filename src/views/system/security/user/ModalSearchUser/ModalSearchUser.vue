<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationUser"
    :server-query.sync="serverQueryUser"
    :columns-filter="columnsFilterUser"
    :clear-filters="clearFiltersUser"
    :load-items="loadItemsUser"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationUser, serverQueryUser, columnsFilterUser, clearFiltersUser,
} from '../ServicesUser/useVariablesUser'
import { loadItemsUser } from '../ServicesUser/useServicesUser'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationUser,
      serverQueryUser,
      columnsFilterUser,
      clearFiltersUser,
      loadItemsUser,
    }
  },
}
</script>
