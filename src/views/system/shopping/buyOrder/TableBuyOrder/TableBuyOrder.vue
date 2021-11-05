<template>
  <!-- Tabla de Orden Compra -->
  <table-good-component
    :title-notification="titleNotificationBuyOrder"
    :columns="columnsBuyOrder"
    :server-query="serverQueryBuyOrder"
    :data-table="dataTableBuyOrder"
    :load-items="loadItemsBuyOrder"
    :manage-row="sendBuyOrder"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  >
    <template
      #options-pluss="{ props }"
    >
      <b-dropdown-item
        @click="generateReport(props.row)"
      >
        <div class="d-flex align-items-center">
          <feather-icon
            icon="PrinterIcon"
            class="mr-50"
          />
          <span class="d-inline-block">Reporte</span>
        </div>
      </b-dropdown-item>
      <b-dropdown-item
        v-if="!props.row.aprobado && !props.row.anulado && optionsPermissions.includes(APROBAR)"
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
        v-if="!props.row.aprobado && !props.row.cerrado && !props.row.anulado && optionsPermissions.includes(ANULAR)"
        @click="eventRowTable(props.row, 'cancel')"
      >
        <div class="d-flex align-items-center">
          <feather-icon
            icon="DeleteIcon"
            class="mr-50"
          />
          <span class="d-inline-block">Anular</span>
        </div>
      </b-dropdown-item>
      <b-dropdown-item
        v-if="(props.row.aprobado && !props.row.atendido && !props.row.anulado) && optionsPermissions.includes(ATENDER)"
        @click="eventRowTable(props.row, 'attend')"
      >
        <div class="d-flex align-items-center">
          <feather-icon
            icon="CheckSquareIcon"
            class="mr-50"
          />
          <span class="d-inline-block">Atender</span>
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
  ANULAR,
  ATENDER,
} from '@/options'
import { ACTION_APPROVE, ACTION_ATTENDED, ACTION_CANCEL } from '@/helpers/actionsApi'
import { confirmSwal } from '@/helpers/messageExtensions'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import { generateReportBuyOrder } from '../ReportBuyOrder/useReportBuyOrder'
import {
  MODAL_ID, stateBuyOrder, columnsBuyOrder, serverQueryBuyOrder, dataTableBuyOrder, titleNotificationBuyOrder, routeNameBuyOrder, clearStateBuyOrder,
} from '../ServicesBuyOrder/useVariablesBuyOrder'
import { loadItemsBuyOrder, sendBuyOrder } from '../ServicesBuyOrder/useServicesBuyOrder'
import {
  serverQueryBuyOrderDetail, clearStateBuyOrderDetail, clearFiltersBuyOrderDetail, clearDataTableBuyOrderDetail,
} from '../ServicesBuyOrderDetail/useVariablesBuyOrderDetail'
import { loadItemsBuyOrderDetail } from '../ServicesBuyOrderDetail/useServicesBuyOrderDetail'
import { clearDataTableBuyOrderTributeDetail, clearFiltersBuyOrderTributeDetail, serverQueryBuyOrderTributeDetail } from '../ServicesBuyOrderTributeDetail/useVariablesBuyOrderTributeDetail'
import { clearDataTableBuyOrderTributeSummaryDetail, clearFiltersBuyOrderTributeSummaryDetail, serverQueryBuyOrderTributeSummaryDetail } from '../ServicesBuyOrderTributeSummaryDetail/useVariablesBuyOrderTributeSummaryDetail'
import { loadItemsBuyOrderTributeDetail } from '../ServicesBuyOrderTributeDetail/useServicesBuyOrderTributeDetail'
import { loadItemsBuyOrderTributeSummaryDetail } from '../ServicesBuyOrderTributeSummaryDetail/useServicesBuyOrderTributeSummaryDetail'

export default {
  name: 'TableBuyOrder',
  components: {
    BDropdownItem,
    TableGoodComponent,
  },
  setup(props, context) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameBuyOrder]) {
        return store.state.rolesAndPermissions.options[routeNameBuyOrder]
      }
      return []
    })

    const generateReport = row => {
      const newRow = { ...row }
      /* eslint no-param-reassign: "error" */
      delete newRow.originalIndex
      delete newRow.vgt_id
      delete newRow.id
      delete newRow.activo
      delete newRow.accion
      delete newRow.numberRow
      delete newRow.idUsuario
      generateReportBuyOrder(row)
    }

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
      } else if (event === 'cancel') {
        action = ACTION_CANCEL
        confirm = await confirmSwal(titleNotificationBuyOrder, null, '¿Está seguro que desea anular este registro?', 'Si, anúlalo')
      } else if (event === 'attend') {
        action = ACTION_ATTENDED
      }

      if (!confirm) return false
      dataTableBuyOrder.value.loading = true
      await sendBuyOrder(action, row._id)
      dataTableBuyOrder.value.loading = false
      loadItemsBuyOrder(1)
      return true
    }

    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      dataTableBuyOrder.value.loading = true
      clearStateBuyOrder()
      stateBuyOrder.value = { ...stateBuyOrder.value, ...row }
      clearStateBuyOrderDetail()
      clearFiltersBuyOrderDetail()
      clearDataTableBuyOrderDetail()
      clearFiltersBuyOrderTributeDetail()
      clearDataTableBuyOrderTributeDetail()
      clearFiltersBuyOrderTributeSummaryDetail()
      clearDataTableBuyOrderTributeSummaryDetail()
      serverQueryBuyOrderDetail.value.indice = row._id
      serverQueryBuyOrderTributeDetail.value.indice = row._id
      serverQueryBuyOrderTributeSummaryDetail.value._id = row._id
      await Promise.all([
        loadItemsBuyOrderDetail(1),
        loadItemsBuyOrderTributeDetail(1),
        loadItemsBuyOrderTributeSummaryDetail(1),
      ])
      dataTableBuyOrder.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsBuyOrder()
    })

    return {
      stateBuyOrder,
      columnsBuyOrder,
      serverQueryBuyOrder,
      dataTableBuyOrder,
      loadItemsBuyOrder,
      titleNotificationBuyOrder,
      sendBuyOrder,
      eventRowTable,
      generateReport,
      openModalFor,

      optionsPermissions,
      APROBAR,
      ANULAR,
      ATENDER,
    }
  },
}
</script>
