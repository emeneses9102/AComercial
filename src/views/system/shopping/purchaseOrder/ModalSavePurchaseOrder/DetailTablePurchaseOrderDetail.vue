<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      v-if="statePurchaseOrder._id"
      :columns-filter="columnsFilterPurchaseOrderDetail"
      :column-filter-selected-default="'a.nombreTArticulo'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :title-notification="titleNotificationPurchaseOrderDetail"
      :columns="columnsPurchaseOrderDetail"
      :server-query="serverQueryPurchaseOrderDetail"
      :data-table="dataTablePurchaseOrderDetail"
      :load-items="loadItemsPurchaseOrderDetail"
      :manage-row="sendPurchaseOrderDetail"
      :pagination-enabled="!!statePurchaseOrder._id"
      :option-show="false"
      @open-modal-for-edit="openModalForEdit"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import { statePurchaseOrder } from '../ServicesPurchaseOrder/useVariablesPurchaseOrder'
import {
  statePurchaseOrderDetail, columnsPurchaseOrderDetail, serverQueryPurchaseOrderDetail, dataTablePurchaseOrderDetail, columnsFilterPurchaseOrderDetail, titleNotificationPurchaseOrderDetail,
} from '../ServicesPurchaseOrderDetail/useVariablesPurchaseOrderDetail'
import { loadItemsPurchaseOrderDetail, sendPurchaseOrderDetail } from '../ServicesPurchaseOrderDetail/useServicesPurchaseOrderDetail'

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
      _id, idTArticulo, nombreTArticulo, cantidad, necesario,
    }) => {
      statePurchaseOrderDetail.value._id = _id
      statePurchaseOrderDetail.value.idTArticulo = idTArticulo
      statePurchaseOrderDetail.value.nombreTArticulo = nombreTArticulo
      statePurchaseOrderDetail.value.cantidad = cantidad
      statePurchaseOrderDetail.value.necesario = necesario
    }

    const onChangeField = (field, value) => {
      serverQueryPurchaseOrderDetail.value.campofiltro = field
      serverQueryPurchaseOrderDetail.value.filtro = value
      if (value.trim()) loadItemsPurchaseOrderDetail(1)
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
      statePurchaseOrder,
      columnsPurchaseOrderDetail,
      serverQueryPurchaseOrderDetail,
      dataTablePurchaseOrderDetail,
      loadItemsPurchaseOrderDetail,
      sendPurchaseOrderDetail,
      openModalForEdit,
      columnsFilterPurchaseOrderDetail,
      titleNotificationPurchaseOrderDetail,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
