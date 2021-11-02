<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationPurchaseReason"
    :server-query.sync="serverQueryPurchaseReason"
    :columns-filter="columnsFilterPurchaseReason"
    :clear-filters="clearFiltersPurchaseReason"
    :load-items="loadItemsPurchaseReason"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationPurchaseReason, serverQueryPurchaseReason, columnsFilterPurchaseReason, clearFiltersPurchaseReason,
} from '../ServicesPurchaseReason/useVariablesPurchaseReason'
import { loadItemsPurchaseReason } from '../ServicesPurchaseReason/useServicesPurchaseReason'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationPurchaseReason,
      serverQueryPurchaseReason,
      columnsFilterPurchaseReason,
      clearFiltersPurchaseReason,
      loadItemsPurchaseReason,
    }
  },
}
</script>
