<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      :columns-filter="columnsFilterBuyOrderDetail"
      :column-filter-selected-default="'_id'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :columns="columnsBuyOrderDetailForShow"
      :server-query="serverQueryBuyOrderDetail"
      :data-table="dataTableBuyOrderDetail"
      :load-items="loadItemsBuyOrderDetail"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  columnsBuyOrderDetailForShow, serverQueryBuyOrderDetail, dataTableBuyOrderDetail, columnsFilterBuyOrderDetail,
} from '../ServicesBuyOrderDetail/useVariablesBuyOrderDetail'
import { loadItemsBuyOrderDetail } from '../ServicesBuyOrderDetail/useServicesBuyOrderDetail'

export default {
  name: 'DetailTableBuyOrderDetail',
  components: {
    FieldSetComponent,
    TableGoodComponent,
    HeaderSearchDetailComponent,
  },
  setup() {
    let timer = null
    const timeForLoad = 500

    const onChangeField = (field, value) => {
      serverQueryBuyOrderDetail.value.campofiltro = field
      serverQueryBuyOrderDetail.value.filtro = value
      loadItemsBuyOrderDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableBuyOrderDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryBuyOrderDetail.value.campofiltro = field
        serverQueryBuyOrderDetail.value.filtro = value
        loadItemsBuyOrderDetail(1)
      }, timeForLoad)
    }

    return {
      columnsBuyOrderDetailForShow,
      serverQueryBuyOrderDetail,
      dataTableBuyOrderDetail,
      loadItemsBuyOrderDetail,
      columnsFilterBuyOrderDetail,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
