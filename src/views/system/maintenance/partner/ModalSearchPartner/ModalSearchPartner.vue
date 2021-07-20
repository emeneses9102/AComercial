<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationPartner"
    :server-query.sync="serverQueryPartner"
    :columns-filter="columnsFilterPartner"
    :clear-filters="clearFiltersPartner"
    :load-items="loadItemsPartner"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationPartner, serverQueryPartner, columnsFilterPartner, clearFiltersPartner,
} from '../ServicesPartner/useVariablesPartner'
import { loadItemsPartner } from '../ServicesPartner/useServicesPartner'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationPartner,
      serverQueryPartner,
      columnsFilterPartner,
      clearFiltersPartner,
      loadItemsPartner,
    }
  },
}
</script>
