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
      clearStateSubStorage()
      clearFiltersSubStorage()
      stateStorage.value = { ...stateStorage.value, ...row }
      serverQuerySubStorage.value.indice = row._id
      await Promise.all([
        actionOpenModal === 'edit' ? getStorageById(row._id) : true,
        loadItemsSubStorage(1),
      ])
      dataTableStorage.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    // Función que se ejecutará cuando el componente se monte en el DOM
    onMounted(() => {
      loadItemsStorage()
    })

    // Retorno de variables y funciones que se utilizaran en el template
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
