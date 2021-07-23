<template>
  <!-- Tabla de Características -->
  <table-good-component
    :title-notification="titleNotificationAccess"
    :columns="columnsAccess"
    :server-query="serverQueryAccess"
    :data-table="dataTableAccess"
    :load-items="loadItemsAccess"
    :manage-row="sendAccess"
    :option-edit="false"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, stateAccess, columnsAccess, serverQueryAccess, dataTableAccess, titleNotificationAccess,
} from '../ServicesAccess/useVariablesAccess'
import { loadItemsAccess, sendAccess } from '../ServicesAccess/useServicesAccess'
import { serverQueryAccessOptionDetail, clearStateAccessOptionDetail, clearFiltersAccessOptionDetail } from '../ServicesAccessOptionDetail/useVariablesAccessOptionDetail'
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
      stateAccess.value = { ...stateAccess.value, ...row }
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
