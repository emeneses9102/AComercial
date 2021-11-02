<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationFormat"
    :server-query.sync="serverQueryFormat"
    :columns-filter="columnsFilterFormat"
    :clear-filters="clearFiltersFormat"
    :load-items="loadItemsFormat"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationFormat, serverQueryFormat, columnsFilterFormat, clearFiltersFormat,
} from '../ServicesFormat/useVariablesFormat'
import { loadItemsFormat } from '../ServicesFormat/useServicesFormat'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationFormat,
      serverQueryFormat,
      columnsFilterFormat,
      clearFiltersFormat,
      loadItemsFormat,
    }
  },
}
</script>
