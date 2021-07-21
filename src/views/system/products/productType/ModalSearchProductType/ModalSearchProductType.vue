<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationProductType"
    :server-query.sync="serverQueryProductType"
    :columns-filter="columnsFilterProductType"
    :clear-filters="clearFiltersProductType"
    :load-items="loadItemsProductType"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationProductType, serverQueryProductType, columnsFilterProductType, clearFiltersProductType,
} from '../ServicesProductType/useVariablesProductType'
import { loadItemsProductType } from '../ServicesProductType/useServicesProductType'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationProductType,
      serverQueryProductType,
      columnsFilterProductType,
      clearFiltersProductType,
      loadItemsProductType,
    }
  },
}
</script>
