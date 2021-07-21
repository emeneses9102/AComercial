<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationOption"
    :server-query.sync="serverQueryOption"
    :columns-filter="columnsFilterOption"
    :clear-filters="clearFiltersOption"
    :load-items="loadItemsOption"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationOption, serverQueryOption, columnsFilterOption, clearFiltersOption,
} from '../ServicesOption/useVariablesOption'
import { loadItemsOption } from '../ServicesOption/useServicesOption'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationOption,
      serverQueryOption,
      columnsFilterOption,
      clearFiltersOption,
      loadItemsOption,
    }
  },
}
</script>
