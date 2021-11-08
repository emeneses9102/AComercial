<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationPacking"
    :server-query.sync="serverQueryPacking"
    :columns-filter="columnsFilterPacking"
    :clear-filters="clearFiltersPacking"
    :load-items="loadItemsPacking"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationPacking, serverQueryPacking, columnsFilterPacking, clearFiltersPacking,
} from '../ServicesPacking/useVariablesPacking'
import { loadItemsPacking } from '../ServicesPacking/useServicesPacking'

export default {
  name: 'ModalSearchPacking',
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationPacking,
      serverQueryPacking,
      columnsFilterPacking,
      clearFiltersPacking,
      loadItemsPacking,
    }
  },
}
</script>
