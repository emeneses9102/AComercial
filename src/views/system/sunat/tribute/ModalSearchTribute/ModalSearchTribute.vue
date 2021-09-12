<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationTribute"
    :server-query.sync="serverQueryTribute"
    :columns-filter="columnsFilterTribute"
    :clear-filters="clearFiltersTribute"
    :load-items="loadItemsTribute"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationTribute, serverQueryTribute, columnsFilterTribute, clearFiltersTribute,
} from '../ServicesTribute/useVariablesTribute'
import { loadItemsTribute } from '../ServicesTribute/useServicesTribute'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationTribute,
      serverQueryTribute,
      columnsFilterTribute,
      clearFiltersTribute,
      loadItemsTribute,
    }
  },
}
</script>
