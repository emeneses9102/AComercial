<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationStorageType"
    :server-query.sync="serverQueryStorageType"
    :columns-filter="columnsFilterStorageType"
    :clear-filters="clearFiltersStorageType"
    :load-items="loadItemsStorageType"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationStorageType, serverQueryStorageType, columnsFilterStorageType, clearFiltersStorageType,
} from '../ServicesStorageType/useVariablesStorageType'
import { loadItemsStorageType } from '../ServicesStorageType/useServicesStorageType'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationStorageType,
      serverQueryStorageType,
      columnsFilterStorageType,
      clearFiltersStorageType,
      loadItemsStorageType,
    }
  },
}
</script>
