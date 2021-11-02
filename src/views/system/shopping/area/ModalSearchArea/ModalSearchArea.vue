<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationArea"
    :server-query.sync="serverQueryArea"
    :columns-filter="columnsFilterArea"
    :clear-filters="clearFiltersArea"
    :load-items="loadItemsArea"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationArea, serverQueryArea, columnsFilterArea, clearFiltersArea,
} from '../ServicesArea/useVariablesArea'
import { loadItemsArea } from '../ServicesArea/useServicesArea'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationArea,
      serverQueryArea,
      columnsFilterArea,
      clearFiltersArea,
      loadItemsArea,
    }
  },
}
</script>
