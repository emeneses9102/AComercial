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
        v-if="!props.row.apertura"
      >
        <b-dropdown-item @click="editRowTable(props.row)">
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
        v-if="props.row.apertura"
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
    </template>
  </table-good-component>
</template>

<script>
import {
  BDropdownItem,
} from 'bootstrap-vue'
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID,
  stateBoxSession,
  columnsBoxSession,
  serverQueryBoxSession,
  dataTableBoxSession,
  titleNotificationBoxSession,
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

export default {
  name: 'TableBoxSession',
  components: {
    BDropdownItem,
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      dataTableBoxSession.value.loading = true
      if (actionOpenModal === 'show' || actionOpenModal === 'close-box') {
        stateBoxSession.value = { ...stateBoxSession.value, ...row }
      } else if (actionOpenModal === 'edit') {
        await getBoxSessionById(row._id)
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

    const editRowTable = row => {
      const newRow = { ...row }
      /* eslint no-param-reassign: "error" */
      delete newRow.originalIndex
      delete newRow.vgt_id
      delete newRow.id
      delete newRow.activo
      delete newRow.accion
      delete newRow.numberRow
      delete newRow.idUsuario
      openModalFor(newRow, 'edit')
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
      editRowTable,
      openModalFor,
    }
  },
}
</script>
