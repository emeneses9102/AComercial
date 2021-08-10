<template>
  <!-- Tabla de Sesion Caja -->
  <table-good-component
    :title-notification="titleNotificationBoxSession"
    :columns="columnsBoxSession"
    :server-query="serverQueryBoxSession"
    :data-table="dataTableBoxSession"
    :load-items="loadItemsBoxSession"
    :manage-row="sendBoxSession"
    :option-open-box="true"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
    @open-modal-for-open-box="row=>openModalFor(row, 'open-box')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, stateBoxSession, columnsBoxSession, serverQueryBoxSession, dataTableBoxSession, titleNotificationBoxSession,
} from '../ServicesBoxSession/useVariablesBoxSession'
import { getBoxSessionById, loadItemsBoxSession, sendBoxSession } from '../ServicesBoxSession/useServicesBoxSession'
import { serverQueryBoxSessionDetail, clearStateBoxSessionDetail, clearFiltersBoxSessionDetail } from '../ServicesBoxSessionDetail/useVariablesBoxSessionDetail'
import { loadItemsBoxSessionDetail } from '../ServicesBoxSessionDetail/useServicesBoxSessionDetail'

export default {
  name: 'TableBoxSession',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      stateBoxSession.value.tipo = 0
      dataTableBoxSession.value.loading = true
      if (actionOpenModal === 'show') {
        stateBoxSession.value = { ...stateBoxSession.value, ...row }
      } else if (actionOpenModal === 'edit') {
        await getBoxSessionById(row._id)
      } else if (actionOpenModal === 'open-box') {
        stateBoxSession.value.tipo = 1
        await getBoxSessionById(row._id)
      }
      clearStateBoxSessionDetail()
      clearFiltersBoxSessionDetail()
      serverQueryBoxSessionDetail.value.indice = row._id
      await loadItemsBoxSessionDetail(1)
      dataTableBoxSession.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' || actionOpenModal === 'open-box' ? MODAL_ID : `${MODAL_ID}-show`)
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
      openModalFor,
    }
  },
}
</script>
