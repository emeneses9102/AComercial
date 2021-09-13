<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      id="header-search-tribute"
      :columns-filter="columnsFilterArticleTributeDetail"
      :column-filter-selected-default="'a.nombreTributo'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :columns="columnsArticleTributeDetailForShow"
      :server-query="serverQueryArticleTributeDetail"
      :data-table="dataTableArticleTributeDetail"
      :load-items="loadItemsArticleTributeDetail"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  columnsArticleTributeDetailForShow, serverQueryArticleTributeDetail, dataTableArticleTributeDetail, columnsFilterArticleTributeDetail,
} from '../ServicesArticleTributeDetail/useVariablesArticleTributeDetail'
import { loadItemsArticleTributeDetail } from '../ServicesArticleTributeDetail/useServicesArticleTributeDetail'

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
      serverQueryArticleTributeDetail.value.campofiltro = field
      serverQueryArticleTributeDetail.value.filtro = value
      loadItemsArticleTributeDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableArticleTributeDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryArticleTributeDetail.value.campofiltro = field
        serverQueryArticleTributeDetail.value.filtro = value
        loadItemsArticleTributeDetail(1)
      }, timeForLoad)
    }

    return {
      columnsArticleTributeDetailForShow,
      serverQueryArticleTributeDetail,
      dataTableArticleTributeDetail,
      loadItemsArticleTributeDetail,
      columnsFilterArticleTributeDetail,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
