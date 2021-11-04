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
  >
    <template
      #options-pluss="{ props }"
    >
      <b-dropdown-item
        v-if="!props.row.aprobado && !props.row.rechazado && !props.row.cerrado && optionsPermissions.includes(APROBAR)"
        @click="eventRowTable(props.row, 'approve')"
      >
        <div class="d-flex align-items-center">
          <feather-icon
            icon="CheckIcon"
            class="mr-50"
          />
          <span class="d-inline-block">Aprobar</span>
        </div>
      </b-dropdown-item>
      <b-dropdown-item
        v-if="!props.row.rechazado && !props.row.aprobado && !props.row.cerrado && !props.row.anulado && optionsPermissions.includes(RECHAZAR)"
        @click="eventRowTable(props.row, 'reject')"
      >
        <div class="d-flex align-items-center">
          <feather-icon
            icon="DeleteIcon"
            class="mr-50"
          />
          <span class="d-inline-block">Rechazar</span>
        </div>
      </b-dropdown-item>
    </template>
  </table-good-component>
</template>

<script>
import {
  BDropdownItem,
} from 'bootstrap-vue'
import { computed, onMounted } from '@vue/composition-api'
import store from '@/store'
import {
  APROBAR,
  RECHAZAR,
} from '@/options'
import {
  ACTION_APPROVE,
  ACTION_REJECT,
} from '@/helpers/actionsApi'
import { confirmSwal } from '@/helpers/messageExtensions'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, statePurchaseOrder, columnsPurchaseOrder, serverQueryPurchaseOrder, dataTablePurchaseOrder, titleNotificationPurchaseOrder, routeNamePurchaseOrder,
} from '../ServicesPurchaseOrder/useVariablesPurchaseOrder'
import { getPurchaseOrderById, loadItemsPurchaseOrder, sendPurchaseOrder } from '../ServicesPurchaseOrder/useServicesPurchaseOrder'
import { serverQueryPurchaseOrderDetail, clearStatePurchaseOrderDetail, clearFiltersPurchaseOrderDetail } from '../ServicesPurchaseOrderDetail/useVariablesPurchaseOrderDetail'
import { loadItemsPurchaseOrderDetail } from '../ServicesPurchaseOrderDetail/useServicesPurchaseOrderDetail'

export default {
  name: 'TablePurchaseOrder',
  components: {
    BDropdownItem,
    TableGoodComponent,
  },
  setup(props, context) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNamePurchaseOrder]) {
        return store.state.rolesAndPermissions.options[routeNamePurchaseOrder]
      }
      return []
    })

    const eventRowTable = async (row, event) => {
      const newRow = { ...row }
      /* eslint no-param-reassign: "error" */
      delete newRow.originalIndex
      delete newRow.vgt_id
      delete newRow.id
      delete newRow.activo
      delete newRow.accion
      delete newRow.numberRow
      delete newRow.idUsuario

      let action = 0
      let confirm = true
      if (event === 'approve') {
        action = ACTION_APPROVE
      } else if (event === 'reject') {
        action = ACTION_REJECT
        confirm = await confirmSwal(titleNotificationPurchaseOrder, null, '¿Está seguro que desea rechazar este Pedido de Compra?', 'Si, rechazalo')
      }

      if (!confirm) return false
      dataTablePurchaseOrder.value.loading = true
      await sendPurchaseOrder(action, row._id)
      dataTablePurchaseOrder.value.loading = false
      loadItemsPurchaseOrder(1)
      return true
    }

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
      eventRowTable,
      openModalFor,

      optionsPermissions,
      APROBAR,
      RECHAZAR,
    }
  },
}
</script>
