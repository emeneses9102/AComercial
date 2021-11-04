<template>
  <field-set-component legend="Resumen de Tributos">
    <header-search-detail-component
      v-if="stateBuyOrder._id"
      :columns-filter="columnsFilterBuyOrderTributeSummaryDetail"
      :column-filter-selected-default="'_id'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :title-notification="titleNotificationBuyOrderTributeSummaryDetail"
      :columns="columnsBuyOrderTributeSummaryDetailForShow"
      :server-query="serverQueryBuyOrderTributeSummaryDetail"
      :data-table="dataTableBuyOrderTributeSummaryDetail"
      :load-items="loadItemsBuyOrderTributeSummaryDetail"
      :manage-row="sendBuyOrderTributeSummaryDetail"
      :pagination-enabled="!!stateBuyOrder._id"
      :option-status="false"
      :option-edit="false"
      :option-show="false"
      :option-delete="false"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import { stateBuyOrder } from '../ServicesBuyOrder/useVariablesBuyOrder'
import {
  stateBuyOrderTributeSummaryDetail, columnsBuyOrderTributeSummaryDetailForShow, serverQueryBuyOrderTributeSummaryDetail, dataTableBuyOrderTributeSummaryDetail, columnsFilterBuyOrderTributeSummaryDetail, titleNotificationBuyOrderTributeSummaryDetail,
} from '../ServicesBuyOrderTributeSummaryDetail/useVariablesBuyOrderTributeSummaryDetail'
import { loadItemsBuyOrderTributeSummaryDetail, sendBuyOrderTributeSummaryDetail } from '../ServicesBuyOrderTributeSummaryDetail/useServicesBuyOrderTributeSummaryDetail'

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

    const openModalForEdit = ({
      _id, idTArticulo, nombreTArticulo, cantidad,
    }) => {
      stateBuyOrderTributeSummaryDetail.value._id = _id
      stateBuyOrderTributeSummaryDetail.value.idTablaArticulo = idTArticulo
      stateBuyOrderTributeSummaryDetail.value.nombreTablaArticulo = nombreTArticulo
      stateBuyOrderTributeSummaryDetail.value.cantidad = cantidad
    }

    const onChangeField = (field, value) => {
      serverQueryBuyOrderTributeSummaryDetail.value.campofiltro = field
      serverQueryBuyOrderTributeSummaryDetail.value.filtro = value
      if (value.trim()) loadItemsBuyOrderTributeSummaryDetail(1)
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
      stateBuyOrder,
      columnsBuyOrderTributeSummaryDetailForShow,
      serverQueryBuyOrderTributeSummaryDetail,
      dataTableBuyOrderTributeSummaryDetail,
      loadItemsBuyOrderTributeSummaryDetail,
      sendBuyOrderTributeSummaryDetail,
      openModalForEdit,
      columnsFilterBuyOrderTributeSummaryDetail,
      titleNotificationBuyOrderTributeSummaryDetail,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
