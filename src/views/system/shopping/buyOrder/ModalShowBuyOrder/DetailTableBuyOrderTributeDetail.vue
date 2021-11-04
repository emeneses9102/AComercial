<template>
  <field-set-component legend="Tributos">
    <header-search-detail-component
      :columns-filter="columnsFilterBuyOrderTributeDetail"
      :column-filter-selected-default="'_id'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :columns="columnsBuyOrderTributeDetailForShow"
      :server-query="serverQueryBuyOrderTributeDetail"
      :data-table="dataTableBuyOrderTributeDetail"
      :load-items="loadItemsBuyOrderTributeDetail"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  columnsBuyOrderTributeDetailForShow, serverQueryBuyOrderTributeDetail, dataTableBuyOrderTributeDetail, columnsFilterBuyOrderTributeDetail,
} from '../ServicesBuyOrderTributeDetail/useVariablesBuyOrderTributeDetail'
import { loadItemsBuyOrderTributeDetail } from '../ServicesBuyOrderTributeDetail/useServicesBuyOrderTributeDetail'

export default {
  name: 'DetailTableBuyOrderTributeDetail',
  components: {
    FieldSetComponent,
    TableGoodComponent,
    HeaderSearchDetailComponent,
  },
  setup() {
    let timer = null
    const timeForLoad = 500

    const onChangeField = (field, value) => {
      serverQueryBuyOrderTributeDetail.value.campofiltro = field
      serverQueryBuyOrderTributeDetail.value.filtro = value
      loadItemsBuyOrderTributeDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableBuyOrderTributeDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryBuyOrderTributeDetail.value.campofiltro = field
        serverQueryBuyOrderTributeDetail.value.filtro = value
        loadItemsBuyOrderTributeDetail(1)
      }, timeForLoad)
    }

    return {
      columnsBuyOrderTributeDetailForShow,
      serverQueryBuyOrderTributeDetail,
      dataTableBuyOrderTributeDetail,
      loadItemsBuyOrderTributeDetail,
      columnsFilterBuyOrderTributeDetail,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
