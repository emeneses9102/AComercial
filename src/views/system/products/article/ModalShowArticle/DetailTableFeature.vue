<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      id="header-search-feature"
      :columns-filter="columnsFilterArticleFeatureDetail"
      :column-filter-selected-default="'a.nombrecaracteristica'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :columns="columnsArticleFeatureDetailForShow"
      :server-query="serverQueryArticleFeatureDetail"
      :data-table="dataTableArticleFeatureDetail"
      :load-items="loadItemsArticleFeatureDetail"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  columnsArticleFeatureDetailForShow, serverQueryArticleFeatureDetail, dataTableArticleFeatureDetail, columnsFilterArticleFeatureDetail,
} from '../ServicesArticleFeatureDetail/useVariablesArticleFeatureDetail'
import { loadItemsArticleFeatureDetail } from '../ServicesArticleFeatureDetail/useServicesArticleFeatureDetail'

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
      serverQueryArticleFeatureDetail.value.campofiltro = field
      serverQueryArticleFeatureDetail.value.filtro = value
      loadItemsArticleFeatureDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableArticleFeatureDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryArticleFeatureDetail.value.campofiltro = field
        serverQueryArticleFeatureDetail.value.filtro = value
        loadItemsArticleFeatureDetail(1)
      }, timeForLoad)
    }

    return {
      columnsArticleFeatureDetailForShow,
      serverQueryArticleFeatureDetail,
      dataTableArticleFeatureDetail,
      loadItemsArticleFeatureDetail,
      columnsFilterArticleFeatureDetail,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
