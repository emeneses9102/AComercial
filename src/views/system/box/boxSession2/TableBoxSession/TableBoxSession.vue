<template>
  <!-- Tabla de Sesion Caja -->
  <table-good-component
    :title-notification="titleNotificationBoxSession"
    :columns="columnsBoxSession"
    :server-query="serverQueryBoxSession"
    :data-table="dataTableBoxSession"
    :load-items="loadItemsBoxSession"
    :manage-row="sendBoxSession"
    :option-edit="false"
    :option-open-box="true"
    :option-close-box="true"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
    @open-modal-for-open-box="row=>openModalFor(row, 'open-box')"
    @open-modal-for-close-box="row=>openModalFor(row, 'close-box')"
  >
    <template
      #option-edit="{ props }"
    >
      <template
        v-if="!props.row.cierre && optionsPermissions.includes(EDITAR)"
      >
        <b-dropdown-item @click="eventRowTable(props.row, 'edit')">
          <div class="d-flex align-items-center">
            <feather-icon
              icon="Edit2Icon"
              class="mr-50"
            />
            <span class="d-inline-block">Editar</span>
          </div>
        </b-dropdown-item>
      </template>
    </template>
    <template
      #options-pluss="{ props }"
    >
      <template
        v-if="props.row.apertura && optionsPermissions.includes(REPORTE_CAJA)"
      >
        <b-dropdown-item>
          <div class="d-flex align-items-center">
            <feather-icon
              icon="PrinterIcon"
              class="mr-50"
            />
            <span class="d-inline-block">Reporte</span>
          </div>
        </b-dropdown-item>
      </template>
      <b-dropdown-item
        v-if="!props.row.apertura && optionsPermissions.includes(APERTURAR_CAJA)"
        @click="eventRowTable(props.row, 'open-box')"
      >
        <div class="d-flex align-items-center">
          <feather-icon
            icon="LogInIcon"
            class="mr-50"
          />
          <span class="d-inline-block">Abrir Caja</span>
        </div>
      </b-dropdown-item>
      <b-dropdown-item
        v-if="props.row.apertura && !props.row.cierre && optionsPermissions.includes(CERRAR_CAJA)"
        @click="eventRowTable(props.row, 'close-box')"
      >
        <div class="d-flex align-items-center">
          <feather-icon
            icon="LogOutIcon"
            class="mr-50"
          />
          <span class="d-inline-block">Cerrar Caja</span>
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
  APERTURAR_CAJA,
  CERRAR_CAJA,
  EDITAR,
  REPORTE_CAJA,
} from '@/options'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID,
  stateBoxSession,
  columnsBoxSession,
  serverQueryBoxSession,
  dataTableBoxSession,
  titleNotificationBoxSession,
  routeNameBoxSession,
} from '../ServicesBoxSession/useVariablesBoxSession'
import {
  getBoxSessionById,
  loadItemsBoxSession,
  sendBoxSession,
} from '../ServicesBoxSession/useServicesBoxSession'
import {
  serverQueryBoxSessionDetail,
  clearStateBoxSessionDetail,
  clearFiltersBoxSessionDetail,
} from '../ServicesBoxSessionDetail/useVariablesBoxSessionDetail'
import {
  loadItemsBoxSessionDetail,
} from '../ServicesBoxSessionDetail/useServicesBoxSessionDetail'
import { loadItemsBoxSessionVoucherDetail } from '../ServicesBoxSessionVoucherDetail/useServicesBoxSessionVoucherDetail'

export default {
  name: 'TableBoxSession',
  components: {
    BDropdownItem,
    TableGoodComponent,
  },
  setup(props, context) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameBoxSession]) {
        return store.state.rolesAndPermissions.options[routeNameBoxSession]
      }
      return []
    })

    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      dataTableBoxSession.value.loading = true
      if (actionOpenModal === 'show' || actionOpenModal === 'close-box') {
        stateBoxSession.value = { ...stateBoxSession.value, ...row }
      } else if (actionOpenModal === 'edit') {
        await getBoxSessionById(row._id)
        await loadItemsBoxSessionVoucherDetail(1)
      } else if (actionOpenModal === 'open-box') {
        stateBoxSession.value = { ...stateBoxSession.value, ...row }
        await getBoxSessionById(row._id)
      }

      clearStateBoxSessionDetail()
      clearFiltersBoxSessionDetail()
      serverQueryBoxSessionDetail.value.indice = row._id

      if (actionOpenModal === 'close-box') {
        dataTableBoxSession.value.loading = false
        context.root.$bvModal.show(`${MODAL_ID}-description`)
      } else if (actionOpenModal === 'edit') {
        dataTableBoxSession.value.loading = false
        context.root.$bvModal.show(MODAL_ID)
      } else {
        await loadItemsBoxSessionDetail(1)
        dataTableBoxSession.value.loading = false
        if (actionOpenModal === 'open-box') {
          context.root.$bvModal.show(`${MODAL_ID}-open`)
        } else if (actionOpenModal === 'show') {
          context.root.$bvModal.show(`${MODAL_ID}-show`)
        }
      }
    }

    const eventRowTable = (row, event) => {
      const newRow = { ...row }
      /* eslint no-param-reassign: "error" */
      delete newRow.originalIndex
      delete newRow.vgt_id
      delete newRow.id
      delete newRow.activo
      delete newRow.accion
      delete newRow.numberRow
      delete newRow.idUsuario
      openModalFor(newRow, event)
    }

    onMounted(() => {
      loadItemsBoxSession()
    })

    return {
      columnsBoxSession,
      serverQueryBoxSession,
      dataTableBoxSession,
      loadItemsBoxSession,
      titleNotificationBoxSession,
      sendBoxSession,
      stateBoxSession,
      eventRowTable,
      openModalFor,

      optionsPermissions,
      APERTURAR_CAJA,
      CERRAR_CAJA,
      EDITAR,
      REPORTE_CAJA,
    }
  },
}
</script>
