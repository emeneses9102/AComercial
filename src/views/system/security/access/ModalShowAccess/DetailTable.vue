<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      :columns-filter="columnsFilterAccessOptionDetail"
      :column-filter-selected-default="'a.nombreopcion'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :columns="columnsAccessOptionDetailForShow"
      :server-query="serverQueryAccessOptionDetail"
      :data-table="dataTableAccessOptionDetail"
      :load-items="loadItemsAccessOptionDetail"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  columnsAccessOptionDetailForShow, serverQueryAccessOptionDetail, dataTableAccessOptionDetail, columnsFilterAccessOptionDetail,
} from '../ServicesAccessOptionDetail/useVariablesAccessOptionDetail'
import { loadItemsAccessOptionDetail } from '../ServicesAccessOptionDetail/useServicesAccessOptionDetail'

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
      serverQueryAccessOptionDetail.value.campofiltro = field
      serverQueryAccessOptionDetail.value.filtro = value
      loadItemsAccessOptionDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableAccessOptionDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryAccessOptionDetail.value.campofiltro = field
        serverQueryAccessOptionDetail.value.filtro = value
        loadItemsAccessOptionDetail(1)
      }, timeForLoad)
    }

    return {
      columnsAccessOptionDetailForShow,
      serverQueryAccessOptionDetail,
      dataTableAccessOptionDetail,
      loadItemsAccessOptionDetail,
      columnsFilterAccessOptionDetail,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
