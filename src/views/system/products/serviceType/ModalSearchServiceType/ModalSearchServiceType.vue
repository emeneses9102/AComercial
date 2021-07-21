<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationServiceType"
    :server-query.sync="serverQueryServiceType"
    :columns-filter="columnsFilterServiceType"
    :clear-filters="clearFiltersServiceType"
    :load-items="loadItemsServiceType"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationServiceType, serverQueryServiceType, columnsFilterServiceType, clearFiltersServiceType,
} from '../ServicesServiceType/useVariablesServiceType'
import { loadItemsServiceType } from '../ServicesServiceType/useServicesServiceType'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationServiceType,
      serverQueryServiceType,
      columnsFilterServiceType,
      clearFiltersServiceType,
      loadItemsServiceType,
    }
  },
}
</script>
