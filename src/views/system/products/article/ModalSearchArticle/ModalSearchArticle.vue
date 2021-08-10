<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationArticle"
    :server-query.sync="serverQueryArticle"
    :columns-filter="columnsFilterArticle"
    :clear-filters="clearFiltersArticle"
    :load-items="loadItemsArticle"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationArticle, serverQueryArticle, columnsFilterArticle, clearFiltersArticle,
} from '../ServicesArticle/useVariablesArticle'
import { loadItemsArticle } from '../ServicesArticle/useServicesArticle'

export default {
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationArticle,
      serverQueryArticle,
      columnsFilterArticle,
      clearFiltersArticle,
      loadItemsArticle,
    }
  },
}
</script>
