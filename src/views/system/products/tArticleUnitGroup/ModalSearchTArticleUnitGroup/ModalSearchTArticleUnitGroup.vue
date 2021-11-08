<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationTArticleUnitGroup"
    :server-query.sync="serverQueryTArticleUnitGroup"
    :columns-filter="columnsFilterTArticleUnitGroup"
    :clear-filters="clearFiltersTArticleUnitGroup"
    :load-items="loadItemsTArticleUnitGroup"
  />
</template>

<script>
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import {
  MODAL_ID, titleNotificationTArticleUnitGroup, serverQueryTArticleUnitGroup, columnsFilterTArticleUnitGroup, clearFiltersTArticleUnitGroup,
} from '../ServicesTArticleUnitGroup/useVariablesTArticleUnitGroup'
import { loadItemsTArticleUnitGroup } from '../ServicesTArticleUnitGroup/useServicesTArticleUnitGroup'

export default {
  name: 'ModalSearchTArticleUnitGroup',
  components: {
    ModalSearchComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationTArticleUnitGroup,
      serverQueryTArticleUnitGroup,
      columnsFilterTArticleUnitGroup,
      clearFiltersTArticleUnitGroup,
      loadItemsTArticleUnitGroup,
    }
  },
}
</script>
