<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      id="header-search-recipe"
      :columns-filter="columnsFilterArticleRecipeDetail"
      :column-filter-selected-default="'a.nombrereceta'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :columns="columnsArticleRecipeDetailForShow"
      :server-query="serverQueryArticleRecipeDetail"
      :data-table="dataTableArticleRecipeDetail"
      :load-items="loadItemsArticleRecipeDetail"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  columnsArticleRecipeDetailForShow, serverQueryArticleRecipeDetail, dataTableArticleRecipeDetail, columnsFilterArticleRecipeDetail,
} from '../ServicesArticleRecipeDetail/useVariablesArticleRecipeDetail'
import { loadItemsArticleRecipeDetail } from '../ServicesArticleRecipeDetail/useServicesArticleRecipeDetail'

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
      serverQueryArticleRecipeDetail.value.campofiltro = field
      serverQueryArticleRecipeDetail.value.filtro = value
      loadItemsArticleRecipeDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableArticleRecipeDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryArticleRecipeDetail.value.campofiltro = field
        serverQueryArticleRecipeDetail.value.filtro = value
        loadItemsArticleRecipeDetail(1)
      }, timeForLoad)
    }

    return {
      columnsArticleRecipeDetailForShow,
      serverQueryArticleRecipeDetail,
      dataTableArticleRecipeDetail,
      loadItemsArticleRecipeDetail,
      columnsFilterArticleRecipeDetail,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
