<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationCollaborator"
    :server-query.sync="serverQueryCollaborator"
    :columns-filter="columnsFilterCollaborator"
    :clear-filters="clearFiltersCollaborator"
    :load-items="loadItemsCollaborator"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationCollaborator, serverQueryCollaborator, columnsFilterCollaborator, clearFiltersCollaborator,
} from '../ServicesCollaborator/useVariablesCollaborator'
import { loadItemsCollaborator } from '../ServicesCollaborator/useServicesCollaborator'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationCollaborator,
      serverQueryCollaborator,
      columnsFilterCollaborator,
      clearFiltersCollaborator,
      loadItemsCollaborator,
    }
  },
}
</script>
