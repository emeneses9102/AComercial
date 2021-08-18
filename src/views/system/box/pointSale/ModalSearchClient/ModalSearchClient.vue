<template>
  <modal-search-point-sale
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationPointSale"
    :server-query.sync="serverQueryPointSale"
    :columns-filter="columnsFilterPointSale"
    :clear-filters="clearFiltersPointSale"
    :load-items="loadItemsPointSale"
  />
</template>

<script>
import ModalSearchPointSale from '@/components/ModalSearchPointSale/ModalSearchPointSale.vue'
import {
  MODAL_ID, titleNotificationPointSale, serverQueryPointSale, columnsFilterPointSale, clearFiltersPointSale,
} from '../ServicesPointSale/useVariablesPointSale'
import { loadItemsPointSale } from '../ServicesPointSale/useServicesPointSale'

export default {
  components: {
    ModalSearchPointSale,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationPointSale,
      serverQueryPointSale,
      columnsFilterPointSale,
      clearFiltersPointSale,
      loadItemsPointSale,
    }
  },
}
</script>
