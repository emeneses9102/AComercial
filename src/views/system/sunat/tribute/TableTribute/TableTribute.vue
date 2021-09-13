<template>
  <!-- Tabla de Tipo de Tributo -->
  <table-good-component
    :title-notification="titleNotificationTribute"
    :columns="columnsTribute"
    :server-query="serverQueryTribute"
    :data-table="dataTableTribute"
    :load-items="loadItemsTribute"
    :manage-row="sendTribute"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, stateTribute, columnsTribute, serverQueryTribute, dataTableTribute, titleNotificationTribute,
} from '../ServicesTribute/useVariablesTribute'
import { loadItemsTribute, sendTribute } from '../ServicesTribute/useServicesTribute'
import { serverQueryTributeFactor, clearStateTributeFactor, clearFiltersTributeFactor } from '../ServicesTributeFactor/useVariablesTributeFactor'
import { loadItemsTributeFactor } from '../ServicesTributeFactor/useServicesTributeFactor'

export default {
  name: 'TableTribute',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      dataTableTribute.value.loading = true
      stateTribute.value = { ...stateTribute.value, ...row }
      clearStateTributeFactor()
      clearFiltersTributeFactor()
      serverQueryTributeFactor.value.indice = row._id
      await loadItemsTributeFactor(1)
      dataTableTribute.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsTribute()
    })

    return {
      columnsTribute,
      serverQueryTribute,
      dataTableTribute,
      loadItemsTribute,
      titleNotificationTribute,
      sendTribute,
      openModalFor,
    }
  },
}
</script>
