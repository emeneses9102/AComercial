<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationPaymentMethod"
    :server-query.sync="serverQueryPaymentMethod"
    :columns-filter="columnsFilterPaymentMethod"
    :clear-filters="clearFiltersPaymentMethod"
    :load-items="loadItemsPaymentMethod"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationPaymentMethod, serverQueryPaymentMethod, columnsFilterPaymentMethod, clearFiltersPaymentMethod,
} from '../ServicesPaymentMethod/useVariablesPaymentMethod'
import { loadItemsPaymentMethod } from '../ServicesPaymentMethod/useServicesPaymentMethod'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationPaymentMethod,
      serverQueryPaymentMethod,
      columnsFilterPaymentMethod,
      clearFiltersPaymentMethod,
      loadItemsPaymentMethod,
    }
  },
}
</script>
