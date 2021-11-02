<template>
  <!-- Tabla de Pedido Compra -->
  <table-good-component
    :title-notification="titleNotificationPurchaseOrder"
    :columns="columnsPurchaseOrder"
    :server-query="serverQueryPurchaseOrder"
    :data-table="dataTablePurchaseOrder"
    :load-items="loadItemsPurchaseOrder"
    :manage-row="sendPurchaseOrder"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, statePurchaseOrder, columnsPurchaseOrder, serverQueryPurchaseOrder, dataTablePurchaseOrder, titleNotificationPurchaseOrder,
} from '../ServicesPurchaseOrder/useVariablesPurchaseOrder'
import { getPurchaseOrderById, loadItemsPurchaseOrder, sendPurchaseOrder } from '../ServicesPurchaseOrder/useServicesPurchaseOrder'
import { serverQueryPurchaseOrderDetail, clearStatePurchaseOrderDetail, clearFiltersPurchaseOrderDetail } from '../ServicesPurchaseOrderDetail/useVariablesPurchaseOrderDetail'
import { loadItemsPurchaseOrderDetail } from '../ServicesPurchaseOrderDetail/useServicesPurchaseOrderDetail'

export default {
  name: 'TablePurchaseOrder',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      dataTablePurchaseOrder.value.loading = true
      if (actionOpenModal === 'show') {
        statePurchaseOrder.value = { ...statePurchaseOrder.value, ...row }
      } else if (actionOpenModal === 'edit') {
        await getPurchaseOrderById(row._id)
      }
      clearStatePurchaseOrderDetail()
      clearFiltersPurchaseOrderDetail()
      serverQueryPurchaseOrderDetail.value.indice = row._id
      await loadItemsPurchaseOrderDetail(1)
      dataTablePurchaseOrder.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsPurchaseOrder()
    })

    return {
      columnsPurchaseOrder,
      serverQueryPurchaseOrder,
      dataTablePurchaseOrder,
      loadItemsPurchaseOrder,
      titleNotificationPurchaseOrder,
      sendPurchaseOrder,
      openModalFor,
    }
  },
}
</script>
