<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationFamilySunat"
    :server-query.sync="serverQueryFamilySunat"
    :columns-filter="columnsFilterFamilySunat"
    :clear-filters="clearFiltersFamilySunat"
    :load-items="loadItemsFamilySunat"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationFamilySunat, serverQueryFamilySunat, columnsFilterFamilySunat, clearFiltersFamilySunat,
} from '../ServicesFamilySunat/useVariablesFamilySunat'
import { loadItemsFamilySunat } from '../ServicesFamilySunat/useServicesFamilySunat'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationFamilySunat,
      serverQueryFamilySunat,
      columnsFilterFamilySunat,
      clearFiltersFamilySunat,
      loadItemsFamilySunat,
    }
  },
}
</script>
