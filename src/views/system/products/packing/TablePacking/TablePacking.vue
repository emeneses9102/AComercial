<template>
  <!-- Tabla de Empaque -->
  <table-good-component
    :title-notification="titleNotificationPacking"
    :columns="columnsPacking"
    :server-query="serverQueryPacking"
    :data-table="dataTablePacking"
    :load-items="loadItemsPacking"
    :manage-row="sendPacking"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, statePacking, columnsPacking, serverQueryPacking, dataTablePacking, titleNotificationPacking,
} from '../ServicesPacking/useVariablesPacking'
import { loadItemsPacking, sendPacking } from '../ServicesPacking/useServicesPacking'

export default {
  name: 'TablePacking',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      dataTablePacking.value.loading = true
      statePacking.value = { ...statePacking.value, ...row }
      dataTablePacking.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsPacking()
    })

    return {
      columnsPacking,
      serverQueryPacking,
      dataTablePacking,
      loadItemsPacking,
      titleNotificationPacking,
      sendPacking,
      openModalFor,
    }
  },
}
</script>
