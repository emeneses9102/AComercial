<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationSegmentSunat"
    :server-query.sync="serverQuerySegmentSunat"
    :columns-filter="columnsFilterSegmentSunat"
    :clear-filters="clearFiltersSegmentSunat"
    :load-items="loadItemsSegmentSunat"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationSegmentSunat, serverQuerySegmentSunat, columnsFilterSegmentSunat, clearFiltersSegmentSunat,
} from '../ServicesSegmentSunat/useVariablesSegmentSunat'
import { loadItemsSegmentSunat } from '../ServicesSegmentSunat/useServicesSegmentSunat'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationSegmentSunat,
      serverQuerySegmentSunat,
      columnsFilterSegmentSunat,
      clearFiltersSegmentSunat,
      loadItemsSegmentSunat,
    }
  },
}
</script>
