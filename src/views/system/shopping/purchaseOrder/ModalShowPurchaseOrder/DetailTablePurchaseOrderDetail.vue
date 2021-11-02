<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      :columns-filter="columnsFilterPurchaseOrderDetail"
      :column-filter-selected-default="'a.nombreTArticulo'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :columns="columnsPurchaseOrderDetailForShow"
      :server-query="serverQueryPurchaseOrderDetail"
      :data-table="dataTablePurchaseOrderDetail"
      :load-items="loadItemsPurchaseOrderDetail"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  columnsPurchaseOrderDetailForShow, serverQueryPurchaseOrderDetail, dataTablePurchaseOrderDetail, columnsFilterPurchaseOrderDetail,
} from '../ServicesPurchaseOrderDetail/useVariablesPurchaseOrderDetail'
import { loadItemsPurchaseOrderDetail } from '../ServicesPurchaseOrderDetail/useServicesPurchaseOrderDetail'

export default {
  name: 'DetailTablePurchaseOrderDetail',
  components: {
    FieldSetComponent,
    TableGoodComponent,
    HeaderSearchDetailComponent,
  },
  setup() {
    let timer = null
    const timeForLoad = 500

    const onChangeField = (field, value) => {
      serverQueryPurchaseOrderDetail.value.campofiltro = field
      serverQueryPurchaseOrderDetail.value.filtro = value
      loadItemsPurchaseOrderDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTablePurchaseOrderDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryPurchaseOrderDetail.value.campofiltro = field
        serverQueryPurchaseOrderDetail.value.filtro = value
        loadItemsPurchaseOrderDetail(1)
      }, timeForLoad)
    }

    return {
      columnsPurchaseOrderDetailForShow,
      serverQueryPurchaseOrderDetail,
      dataTablePurchaseOrderDetail,
      loadItemsPurchaseOrderDetail,
      columnsFilterPurchaseOrderDetail,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
