<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationPresentation"
    :server-query.sync="serverQueryPresentation"
    :columns-filter="columnsFilterPresentation"
    :clear-filters="clearFiltersPresentation"
    :load-items="loadItemsPresentation"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationPresentation, serverQueryPresentation, columnsFilterPresentation, clearFiltersPresentation,
} from '../ServicesPresentation/useVariablesPresentation'
import { loadItemsPresentation } from '../ServicesPresentation/useServicesPresentation'

export default {
  name: 'ModalSearchPresentation',
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationPresentation,
      serverQueryPresentation,
      columnsFilterPresentation,
      clearFiltersPresentation,
      loadItemsPresentation,
    }
  },
}
</script>
