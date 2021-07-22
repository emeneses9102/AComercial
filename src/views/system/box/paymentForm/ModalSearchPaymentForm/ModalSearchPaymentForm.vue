<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationPaymentForm"
    :server-query.sync="serverQueryPaymentForm"
    :columns-filter="columnsFilterPaymentForm"
    :clear-filters="clearFiltersPaymentForm"
    :load-items="loadItemsPaymentForm"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationPaymentForm, serverQueryPaymentForm, columnsFilterPaymentForm, clearFiltersPaymentForm,
} from '../ServicesPaymentForm/useVariablesPaymentForm'
import { loadItemsPaymentForm } from '../ServicesPaymentForm/useServicesPaymentForm'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationPaymentForm,
      serverQueryPaymentForm,
      columnsFilterPaymentForm,
      clearFiltersPaymentForm,
      loadItemsPaymentForm,
    }
  },
}
</script>
