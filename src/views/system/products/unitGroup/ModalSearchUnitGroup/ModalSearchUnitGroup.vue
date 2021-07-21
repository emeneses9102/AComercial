<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationUnitGroup"
    :server-query.sync="serverQueryUnitGroup"
    :columns-filter="columnsFilterUnitGroup"
    :clear-filters="clearFiltersUnitGroup"
    :load-items="loadItemsUnitGroup"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationUnitGroup, serverQueryUnitGroup, columnsFilterUnitGroup, clearFiltersUnitGroup,
} from '../ServicesUnitGroup/useVariablesUnitGroup'
import { loadItemsUnitGroup } from '../ServicesUnitGroup/useServicesUnitGroup'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationUnitGroup,
      serverQueryUnitGroup,
      columnsFilterUnitGroup,
      clearFiltersUnitGroup,
      loadItemsUnitGroup,
    }
  },
}
</script>
