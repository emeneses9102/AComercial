<template>
  <!-- Tabla de Motivo Compra -->
  <table-good-component
    :title-notification="titleNotificationPurchaseReason"
    :columns="columnsPurchaseReason"
    :server-query="serverQueryPurchaseReason"
    :data-table="dataTablePurchaseReason"
    :load-items="loadItemsPurchaseReason"
    :manage-row="sendPurchaseReason"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, statePurchaseReason, columnsPurchaseReason, serverQueryPurchaseReason, dataTablePurchaseReason, titleNotificationPurchaseReason,
} from '../ServicesPurchaseReason/useVariablesPurchaseReason'
import { loadItemsPurchaseReason, sendPurchaseReason } from '../ServicesPurchaseReason/useServicesPurchaseReason'

export default {
  name: 'TablePurchaseReason',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      dataTablePurchaseReason.value.loading = true
      statePurchaseReason.value = { ...statePurchaseReason.value, ...row }
      dataTablePurchaseReason.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsPurchaseReason()
    })

    return {
      columnsPurchaseReason,
      serverQueryPurchaseReason,
      dataTablePurchaseReason,
      loadItemsPurchaseReason,
      titleNotificationPurchaseReason,
      sendPurchaseReason,
      openModalFor,
    }
  },
}
</script>
