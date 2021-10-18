<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      id="header-search-business"
      :columns-filter="columnsFilterArticleBusinessDetail"
      :column-filter-selected-default="'_id'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :columns="columnsArticleBusinessDetailForShow"
      :server-query="serverQueryArticleBusinessDetail"
      :data-table="dataTableArticleBusinessDetail"
      :load-items="loadItemsArticleBusinessDetail"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  columnsArticleBusinessDetailForShow, serverQueryArticleBusinessDetail, dataTableArticleBusinessDetail, columnsFilterArticleBusinessDetail,
} from '../ServicesArticleBusinessDetail/useVariablesArticleBusinessDetail'
import { loadItemsArticleBusinessDetail } from '../ServicesArticleBusinessDetail/useServicesArticleBusinessDetail'

export default {
  name: 'DetailTableBusiness',
  components: {
    FieldSetComponent,
    TableGoodComponent,
    HeaderSearchDetailComponent,
  },
  setup() {
    let timer = null
    const timeForLoad = 500

    const onChangeField = (field, value) => {
      serverQueryArticleBusinessDetail.value.campofiltro = field
      serverQueryArticleBusinessDetail.value.filtro = value
      loadItemsArticleBusinessDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableArticleBusinessDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryArticleBusinessDetail.value.campofiltro = field
        serverQueryArticleBusinessDetail.value.filtro = value
        loadItemsArticleBusinessDetail(1)
      }, timeForLoad)
    }

    return {
      columnsArticleBusinessDetailForShow,
      serverQueryArticleBusinessDetail,
      dataTableArticleBusinessDetail,
      loadItemsArticleBusinessDetail,
      columnsFilterArticleBusinessDetail,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
