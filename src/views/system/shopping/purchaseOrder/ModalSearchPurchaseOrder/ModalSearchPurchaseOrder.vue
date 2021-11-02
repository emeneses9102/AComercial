<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationPurchaseOrder"
    :server-query.sync="serverQueryPurchaseOrder"
    :columns-filter="columnsFilterPurchaseOrder"
    :clear-filters="clearFiltersPurchaseOrder"
    :load-items="loadItemsPurchaseOrder"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationPurchaseOrder, serverQueryPurchaseOrder, columnsFilterPurchaseOrder, clearFiltersPurchaseOrder,
} from '../ServicesPurchaseOrder/useVariablesPurchaseOrder'
import { loadItemsPurchaseOrder } from '../ServicesPurchaseOrder/useServicesPurchaseOrder'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationPurchaseOrder,
      serverQueryPurchaseOrder,
      columnsFilterPurchaseOrder,
      clearFiltersPurchaseOrder,
      loadItemsPurchaseOrder,
    }
  },
}
</script>
