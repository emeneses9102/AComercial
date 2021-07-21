<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationFeature"
    :server-query.sync="serverQueryFeature"
    :columns-filter="columnsFilterFeature"
    :clear-filters="clearFiltersFeature"
    :load-items="loadItemsFeature"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationFeature, serverQueryFeature, columnsFilterFeature, clearFiltersFeature,
} from '../ServicesFeature/useVariablesFeature'
import { loadItemsFeature } from '../ServicesFeature/useServicesFeature'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationFeature,
      serverQueryFeature,
      columnsFilterFeature,
      clearFiltersFeature,
      loadItemsFeature,
    }
  },
}
</script>
