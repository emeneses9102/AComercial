<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationCurrency"
    :server-query.sync="serverQueryCurrency"
    :columns-filter="columnsFilterCurrency"
    :clear-filters="clearFiltersCurrency"
    :load-items="loadItemsCurrency"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationCurrency, serverQueryCurrency, columnsFilterCurrency, clearFiltersCurrency,
} from '../ServicesCurrency/useVariablesCurrency'
import { loadItemsCurrency } from '../ServicesCurrency/useServicesCurrency'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationCurrency,
      serverQueryCurrency,
      columnsFilterCurrency,
      clearFiltersCurrency,
      loadItemsCurrency,
    }
  },
}
</script>
