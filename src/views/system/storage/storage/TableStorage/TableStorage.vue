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
    const openModalFor = async ({
      _id, nombre, nombrePredio, nombreTipoAlmacen, nombreNegocio, observacion,
    }, actionOpenModal) => {
      dataTableStorage.value.loading = true
      if (actionOpenModal === 'show') {
        stateStorage.value._id = _id
        stateStorage.value.nombre = nombre
        stateStorage.value.nombrePredio = nombrePredio
        stateStorage.value.nombreTipoAlmacen = nombreTipoAlmacen
        stateStorage.value.nombreNegocio = nombreNegocio
        stateStorage.value.observacion = observacion
      } else if (actionOpenModal === 'edit') {
        await getStorageById(_id)
      }
      clearStateSubStorage()
      clearFiltersSubStorage()
      serverQuerySubStorage.value.indice = _id
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
