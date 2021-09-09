<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationBoxSession"
    :server-query.sync="serverQueryBoxSession"
    :columns-filter="columnsFilterBoxSession"
    :clear-filters="clearFiltersBoxSession"
    :load-items="loadItemsBoxSession"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID,
  titleNotificationBoxSession,
  serverQueryBoxSession,
  columnsFilterBoxSession,
  clearFiltersBoxSession,
} from '../ServicesBoxSession/useVariablesBoxSession'
import {
  loadItemsBoxSession,
} from '../ServicesBoxSession/useServicesBoxSession'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationBoxSession,
      serverQueryBoxSession,
      columnsFilterBoxSession,
      clearFiltersBoxSession,
      loadItemsBoxSession,
    }
  },
}
</script>
