<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      id="header-search-children"
      :columns-filter="columnsFilterArticleChildrenDetail"
      :column-filter-selected-default="'_id'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :columns="columnsArticleChildrenDetailForShow"
      :server-query="serverQueryArticleChildrenDetail"
      :data-table="dataTableArticleChildrenDetail"
      :load-items="loadItemsArticleChildrenDetail"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  columnsArticleChildrenDetailForShow, serverQueryArticleChildrenDetail, dataTableArticleChildrenDetail, columnsFilterArticleChildrenDetail,
} from '../ServicesArticleChildrenDetail/useVariablesArticleChildrenDetail'
import { loadItemsArticleChildrenDetail } from '../ServicesArticleChildrenDetail/useServicesArticleChildrenDetail'

export default {
  name: 'DetailTable',
  components: {
    FieldSetComponent,
    TableGoodComponent,
    HeaderSearchDetailComponent,
  },
  setup() {
    let timer = null
    const timeForLoad = 500

    const onChangeField = (field, value) => {
      serverQueryArticleChildrenDetail.value.campofiltro = field
      serverQueryArticleChildrenDetail.value.filtro = value
      loadItemsArticleChildrenDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableArticleChildrenDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryArticleChildrenDetail.value.campofiltro = field
        serverQueryArticleChildrenDetail.value.filtro = value
        loadItemsArticleChildrenDetail(1)
      }, timeForLoad)
    }

    return {
      columnsArticleChildrenDetailForShow,
      serverQueryArticleChildrenDetail,
      dataTableArticleChildrenDetail,
      loadItemsArticleChildrenDetail,
      columnsFilterArticleChildrenDetail,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
