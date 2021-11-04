<template>
  <field-set-component legend="Resumen">
    <header-search-detail-component
      :columns-filter="columnsFilterBuyOrderTributeSummaryDetail"
      :column-filter-selected-default="'_id'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :columns="columnsBuyOrderTributeSummaryDetailForShow"
      :server-query="serverQueryBuyOrderTributeSummaryDetail"
      :data-table="dataTableBuyOrderTributeSummaryDetail"
      :load-items="loadItemsBuyOrderTributeSummaryDetail"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  columnsBuyOrderTributeSummaryDetailForShow, serverQueryBuyOrderTributeSummaryDetail, dataTableBuyOrderTributeSummaryDetail, columnsFilterBuyOrderTributeSummaryDetail,
} from '../ServicesBuyOrderTributeSummaryDetail/useVariablesBuyOrderTributeSummaryDetail'
import { loadItemsBuyOrderTributeSummaryDetail } from '../ServicesBuyOrderTributeSummaryDetail/useServicesBuyOrderTributeSummaryDetail'

export default {
  name: 'DetailTableBuyOrderTributeSummaryDetail',
  components: {
    FieldSetComponent,
    TableGoodComponent,
    HeaderSearchDetailComponent,
  },
  setup() {
    let timer = null
    const timeForLoad = 500

    const onChangeField = (field, value) => {
      serverQueryBuyOrderTributeSummaryDetail.value.campofiltro = field
      serverQueryBuyOrderTributeSummaryDetail.value.filtro = value
      loadItemsBuyOrderTributeSummaryDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableBuyOrderTributeSummaryDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryBuyOrderTributeSummaryDetail.value.campofiltro = field
        serverQueryBuyOrderTributeSummaryDetail.value.filtro = value
        loadItemsBuyOrderTributeSummaryDetail(1)
      }, timeForLoad)
    }

    return {
      columnsBuyOrderTributeSummaryDetailForShow,
      serverQueryBuyOrderTributeSummaryDetail,
      dataTableBuyOrderTributeSummaryDetail,
      loadItemsBuyOrderTributeSummaryDetail,
      columnsFilterBuyOrderTributeSummaryDetail,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
