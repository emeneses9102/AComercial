<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationClassSunat"
    :server-query.sync="serverQueryClassSunat"
    :columns-filter="columnsFilterClassSunat"
    :clear-filters="clearFiltersClassSunat"
    :load-items="loadItemsClassSunat"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationClassSunat, serverQueryClassSunat, columnsFilterClassSunat, clearFiltersClassSunat,
} from '../ServicesClassSunat/useVariablesClassSunat'
import { loadItemsClassSunat } from '../ServicesClassSunat/useServicesClassSunat'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationClassSunat,
      serverQueryClassSunat,
      columnsFilterClassSunat,
      clearFiltersClassSunat,
      loadItemsClassSunat,
    }
  },
}
</script>
