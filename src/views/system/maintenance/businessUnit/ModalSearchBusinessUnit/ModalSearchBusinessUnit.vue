<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationBusinessUnit"
    :server-query.sync="serverQueryBusinessUnit"
    :columns-filter="columnsFilterBusinessUnit"
    :clear-filters="clearFiltersBusinessUnit"
    :load-items="loadItemsBusinessUnit"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationBusinessUnit, serverQueryBusinessUnit, columnsFilterBusinessUnit, clearFiltersBusinessUnit,
} from '../ServicesBusinessUnit/useVariablesBusinessUnit'
import { loadItemsBusinessUnit } from '../ServicesBusinessUnit/useServicesBusinessUnit'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationBusinessUnit,
      serverQueryBusinessUnit,
      columnsFilterBusinessUnit,
      clearFiltersBusinessUnit,
      loadItemsBusinessUnit,
    }
  },
}
</script>
