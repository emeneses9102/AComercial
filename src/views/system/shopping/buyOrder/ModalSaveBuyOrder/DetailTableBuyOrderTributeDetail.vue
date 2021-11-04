<template>
  <field-set-component legend="Listado de Tributos">
    <header-search-detail-component
      v-if="stateBuyOrder._id"
      :columns-filter="columnsFilterBuyOrderTributeDetail"
      :column-filter-selected-default="'_id'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :title-notification="titleNotificationBuyOrderTributeDetail"
      :columns="columnsBuyOrderTributeDetailForShow"
      :server-query="serverQueryBuyOrderTributeDetail"
      :data-table="dataTableBuyOrderTributeDetail"
      :load-items="loadItemsBuyOrderTributeDetail"
      :manage-row="sendBuyOrderTributeDetail"
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
  stateBuyOrderTributeDetail, columnsBuyOrderTributeDetailForShow, serverQueryBuyOrderTributeDetail, dataTableBuyOrderTributeDetail, columnsFilterBuyOrderTributeDetail, titleNotificationBuyOrderTributeDetail,
} from '../ServicesBuyOrderTributeDetail/useVariablesBuyOrderTributeDetail'
import { loadItemsBuyOrderTributeDetail, sendBuyOrderTributeDetail } from '../ServicesBuyOrderTributeDetail/useServicesBuyOrderTributeDetail'

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
      stateBuyOrderTributeDetail.value._id = _id
      stateBuyOrderTributeDetail.value.idTablaArticulo = idTArticulo
      stateBuyOrderTributeDetail.value.nombreTablaArticulo = nombreTArticulo
      stateBuyOrderTributeDetail.value.cantidad = cantidad
    }

    const onChangeField = (field, value) => {
      serverQueryBuyOrderTributeDetail.value.campofiltro = field
      serverQueryBuyOrderTributeDetail.value.filtro = value
      if (value.trim()) loadItemsBuyOrderTributeDetail(1)
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
      stateBuyOrder,
      columnsBuyOrderTributeDetailForShow,
      serverQueryBuyOrderTributeDetail,
      dataTableBuyOrderTributeDetail,
      loadItemsBuyOrderTributeDetail,
      sendBuyOrderTributeDetail,
      openModalForEdit,
      columnsFilterBuyOrderTributeDetail,
      titleNotificationBuyOrderTributeDetail,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
