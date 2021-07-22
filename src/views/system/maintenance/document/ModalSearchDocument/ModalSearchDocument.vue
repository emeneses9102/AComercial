<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationDocument"
    :server-query.sync="serverQueryDocument"
    :columns-filter="columnsFilterDocument"
    :clear-filters="clearFiltersDocument"
    :load-items="loadItemsDocument"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationDocument, serverQueryDocument, columnsFilterDocument, clearFiltersDocument,
} from '../ServicesDocument/useVariablesDocument'
import { loadItemsDocument } from '../ServicesDocument/useServicesDocument'

export default {
  name: 'ModalSearchDocument',
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationDocument,
      serverQueryDocument,
      columnsFilterDocument,
      clearFiltersDocument,
      loadItemsDocument,
    }
  },
}
</script>
