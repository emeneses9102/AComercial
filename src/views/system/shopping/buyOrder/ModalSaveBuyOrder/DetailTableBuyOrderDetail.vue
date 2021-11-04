<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      v-if="stateBuyOrder._id"
      :columns-filter="columnsFilterBuyOrderDetail"
      :column-filter-selected-default="'a.nombreTablaArticulo'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :title-notification="titleNotificationBuyOrderDetail"
      :columns="columnsBuyOrderDetail"
      :server-query="serverQueryBuyOrderDetail"
      :data-table="dataTableBuyOrderDetail"
      :load-items="loadItemsBuyOrderDetail"
      :manage-row="sendBuyOrderDetail"
      :pagination-enabled="!!stateBuyOrder._id"
      :option-show="false"
      :option-status="false"
      @open-modal-for-edit="openModalForEdit"
      @delete-row="deleteBuyOrderDetail"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import { stateBuyOrder } from '../ServicesBuyOrder/useVariablesBuyOrder'
import {
  stateBuyOrderDetail, columnsBuyOrderDetail, serverQueryBuyOrderDetail, dataTableBuyOrderDetail, columnsFilterBuyOrderDetail, titleNotificationBuyOrderDetail,
} from '../ServicesBuyOrderDetail/useVariablesBuyOrderDetail'
import { loadItemsBuyOrderDetail, sendBuyOrderDetail } from '../ServicesBuyOrderDetail/useServicesBuyOrderDetail'
import { loadItemsBuyOrderTributeDetail } from '../ServicesBuyOrderTributeDetail/useServicesBuyOrderTributeDetail'
import { loadItemsBuyOrderTributeSummaryDetail } from '../ServicesBuyOrderTributeSummaryDetail/useServicesBuyOrderTributeSummaryDetail'

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

    const deleteBuyOrderDetail = () => {
      loadItemsBuyOrderTributeDetail()
      loadItemsBuyOrderTributeSummaryDetail()
    }

    const openModalForEdit = ({
      _id, idPedidoCompra, idDetallePedidoCompra, idArticulo, idTablaArticulo, nombreTablaArticulo, cantidad, precioCompra, descuento, idMotivoCompra,
    }) => {
      stateBuyOrderDetail.value._id = _id
      stateBuyOrderDetail.value.idPedidoCompra = idPedidoCompra
      stateBuyOrderDetail.value.idDetallePedidoCompra = idDetallePedidoCompra
      stateBuyOrderDetail.value.idArticulo = idArticulo
      stateBuyOrderDetail.value.idTablaArticulo = idTablaArticulo
      stateBuyOrderDetail.value.nombreTablaArticulo = nombreTablaArticulo
      stateBuyOrderDetail.value.cantidad = cantidad
      stateBuyOrderDetail.value.precioCompra = precioCompra
      stateBuyOrderDetail.value.descuento = descuento
      stateBuyOrderDetail.value.idMotivoCompra = idMotivoCompra
    }

    const onChangeField = (field, value) => {
      serverQueryBuyOrderDetail.value.campofiltro = field
      serverQueryBuyOrderDetail.value.filtro = value
      if (value.trim()) loadItemsBuyOrderDetail(1)
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
      stateBuyOrder,
      columnsBuyOrderDetail,
      serverQueryBuyOrderDetail,
      dataTableBuyOrderDetail,
      loadItemsBuyOrderDetail,
      sendBuyOrderDetail,
      openModalForEdit,
      columnsFilterBuyOrderDetail,
      titleNotificationBuyOrderDetail,
      onChangeField,
      onSearchForValue,
      deleteBuyOrderDetail,
    }
  },
}
</script>
