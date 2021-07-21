<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationMenu"
    :server-query.sync="serverQueryMenu"
    :columns-filter="columnsFilterMenu"
    :clear-filters="clearFiltersMenu"
    :load-items="loadItemsMenu"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationMenu, serverQueryMenu, columnsFilterMenu, clearFiltersMenu,
} from '../ServicesMenu/useVariablesMenu'
import { loadItemsMenu } from '../ServicesMenu/useServicesMenu'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationMenu,
      serverQueryMenu,
      columnsFilterMenu,
      clearFiltersMenu,
      loadItemsMenu,
    }
  },
}
</script>
