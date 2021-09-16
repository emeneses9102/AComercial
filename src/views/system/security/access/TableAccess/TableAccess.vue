<template>
  <!-- Tabla de Características -->
  <table-good-component
    :title-notification="titleNotificationAccess"
    :columns="columnsAccess"
    :server-query="serverQueryAccess"
    :data-table="dataTableAccess"
    :load-items="loadItemsAccess"
    :manage-row="sendAccess"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
  />
  <!-- :option-edit="false" -->
</template>

<script>
import { onMounted } from '@vue/composition-api'
import { endPointsCombo, loadCombos } from '@/helpers/combos'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, stateAccess, columnsAccess, serverQueryAccess, dataTableAccess, titleNotificationAccess, combosAccess,
} from '../ServicesAccess/useVariablesAccess'
import { getAccessById, loadItemsAccess, sendAccess } from '../ServicesAccess/useServicesAccess'
import {
  serverQueryAccessOptionDetail, clearStateAccessOptionDetail, clearFiltersAccessOptionDetail, combosAccessOptionDetail,
} from '../ServicesAccessOptionDetail/useVariablesAccessOptionDetail'
import { loadItemsAccessOptionDetail } from '../ServicesAccessOptionDetail/useServicesAccessOptionDetail'

export default {
  name: 'TableAccess',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      dataTableAccess.value.loading = true
      if (actionOpenModal === 'show') {
        stateAccess.value = { ...stateAccess.value, ...row }
      } else if (actionOpenModal === 'edit') {
        await getAccessById(row._id)
        await loadCombos(combosAccess, ['menu'], `${endPointsCombo.menuPorIdModulo}/${stateAccess.value.idModulo}`, 'Menú')
        loadCombos(combosAccessOptionDetail, ['option'], `${endPointsCombo.opcionesDisponiblesPorIdRolIdMenu}/${stateAccess.value.idRol}/${stateAccess.value.idMenu}`, 'Opciónes disponibles')
      }
      clearStateAccessOptionDetail()
      clearFiltersAccessOptionDetail()
      serverQueryAccessOptionDetail.value.indice = row._id
      await loadItemsAccessOptionDetail(1)
      dataTableAccess.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsAccess()
    })

    return {
      columnsAccess,
      serverQueryAccess,
      dataTableAccess,
      loadItemsAccess,
      titleNotificationAccess,
      sendAccess,
      openModalFor,
    }
  },
}
</script>
