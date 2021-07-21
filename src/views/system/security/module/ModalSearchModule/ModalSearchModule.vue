<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationModule"
    :server-query.sync="serverQueryModule"
    :columns-filter="columnsFilterModule"
    :clear-filters="clearFiltersModule"
    :load-items="loadItemsModule"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationModule, serverQueryModule, columnsFilterModule, clearFiltersModule,
} from '../ServicesModule/useVariablesModule'
import { loadItemsModule } from '../ServicesModule/useServicesModule'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationModule,
      serverQueryModule,
      columnsFilterModule,
      clearFiltersModule,
      loadItemsModule,
    }
  },
}
</script>
