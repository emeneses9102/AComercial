<template>
  <!-- Tabla de Almacén -->
  <table-good-component
    :title-notification="titleNotificationStorage"
    :columns="columnsStorage"
    :server-query="serverQueryStorage"
    :data-table="dataTableStorage"
    :load-items="loadItemsStorage"
    :manage-row="sendStorage"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, stateStorage, columnsStorage, serverQueryStorage, dataTableStorage, titleNotificationStorage,
} from '../ServicesStorage/useVariablesStorage'
import { getStorageById, loadItemsStorage, sendStorage } from '../ServicesStorage/useServicesStorage'
import { serverQuerySubStorage, clearStateSubStorage, clearFiltersSubStorage } from '../ServicesSubStorage/useVariablesSubStorage'
import { loadItemsSubStorage } from '../ServicesSubStorage/useServicesSubStorage'

export default {
  name: 'TableStorage',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      dataTableStorage.value.loading = true
      if (actionOpenModal === 'show') {
        stateStorage.value = { ...stateStorage.value, ...row }
      } else if (actionOpenModal === 'edit') {
        await getStorageById(row._id)
      }
      clearStateSubStorage()
      clearFiltersSubStorage()
      serverQuerySubStorage.value.indice = row._id
      await loadItemsSubStorage(1)
      dataTableStorage.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsStorage()
    })

    return {
      columnsStorage,
      serverQueryStorage,
      dataTableStorage,
      loadItemsStorage,
      titleNotificationStorage,
      sendStorage,
      openModalFor,
    }
  },
}
</script>
