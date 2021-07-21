<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationVoucher"
    :server-query.sync="serverQueryVoucher"
    :columns-filter="columnsFilterVoucher"
    :clear-filters="clearFiltersVoucher"
    :load-items="loadItemsVoucher"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationVoucher, serverQueryVoucher, columnsFilterVoucher, clearFiltersVoucher,
} from '../ServicesVoucher/useVariablesVoucher'
import { loadItemsVoucher } from '../ServicesVoucher/useServicesVoucher'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationVoucher,
      serverQueryVoucher,
      columnsFilterVoucher,
      clearFiltersVoucher,
      loadItemsVoucher,
    }
  },
}
</script>
