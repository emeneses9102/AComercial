<template>
  <!-- Tabla de Tipo Producto -->
  <table-good-component
    :title-notification="titleNotificationRole"
    :columns="columnsRole"
    :server-query="serverQueryRole"
    :data-table="dataTableRole"
    :load-items="loadItemsRole"
    :manage-row="sendRole"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, stateRole, columnsRole, serverQueryRole, dataTableRole, titleNotificationRole,
} from '../ServicesRole/useVariablesRole'
import { loadItemsRole, sendRole } from '../ServicesRole/useServicesRole'

export default {
  name: 'TableRole',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async ({
      _id, nombre, idPredio, idAlmacen,
    }, actionOpenModal) => {
      dataTableRole.value.loading = true
      stateRole.value._id = _id
      stateRole.value.nombre = nombre
      stateRole.value.idPredio = idPredio
      stateRole.value.idAlmacen = idAlmacen
      dataTableRole.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsRole()
    })

    return {
      columnsRole,
      serverQueryRole,
      dataTableRole,
      loadItemsRole,
      titleNotificationRole,
      sendRole,
      openModalFor,
    }
  },
}
</script>
