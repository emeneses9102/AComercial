<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationBuyOrder"
    :server-query.sync="serverQueryBuyOrder"
    :columns-filter="columnsFilterBuyOrder"
    :clear-filters="clearFiltersBuyOrder"
    :load-items="loadItemsBuyOrder"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationBuyOrder, serverQueryBuyOrder, columnsFilterBuyOrder, clearFiltersBuyOrder,
} from '../ServicesBuyOrder/useVariablesBuyOrder'
import { loadItemsBuyOrder } from '../ServicesBuyOrder/useServicesBuyOrder'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationBuyOrder,
      serverQueryBuyOrder,
      columnsFilterBuyOrder,
      clearFiltersBuyOrder,
      loadItemsBuyOrder,
    }
  },
}
</script>
