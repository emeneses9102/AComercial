<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationPredio"
    :server-query.sync="serverQueryPredio"
    :columns-filter="columnsFilterPredio"
    :clear-filters="clearFiltersPredio"
    :load-items="loadItemsPredio"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationPredio, serverQueryPredio, columnsFilterPredio, clearFiltersPredio,
} from '../ServicesPredio/useVariablesPredio'
import { loadItemsPredio } from '../ServicesPredio/useServicesPredio'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationPredio,
      serverQueryPredio,
      columnsFilterPredio,
      clearFiltersPredio,
      loadItemsPredio,
    }
  },
}
</script>
