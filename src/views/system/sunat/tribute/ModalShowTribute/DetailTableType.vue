<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      id="header-search-tribute-type"
      :columns-filter="columnsFilterTributeTypeDetail"
      :column-filter-selected-default="'_id'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :columns="columnsTributeTypeDetailForShow"
      :server-query="serverQueryTributeTypeDetail"
      :data-table="dataTableTributeTypeDetail"
      :load-items="loadItemsTributeTypeDetail"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  columnsTributeTypeDetailForShow, serverQueryTributeTypeDetail, dataTableTributeTypeDetail, columnsFilterTributeTypeDetail,
} from '../ServicesTributeTypeDetail/useVariablesTributeTypeDetail'
import { loadItemsTributeTypeDetail } from '../ServicesTributeTypeDetail/useServicesTributeTypeDetail'

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
      serverQueryTributeTypeDetail.value.campofiltro = field
      serverQueryTributeTypeDetail.value.filtro = value
      loadItemsTributeTypeDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableTributeTypeDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryTributeTypeDetail.value.campofiltro = field
        serverQueryTributeTypeDetail.value.filtro = value
        loadItemsTributeTypeDetail(1)
      }, timeForLoad)
    }

    return {
      columnsTributeTypeDetailForShow,
      serverQueryTributeTypeDetail,
      dataTableTributeTypeDetail,
      loadItemsTributeTypeDetail,
      columnsFilterTributeTypeDetail,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
