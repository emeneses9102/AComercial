<template>
  <!-- Tabla Módulo -->
  <table-good-component
    :title-notification="titleNotificationModule"
    :columns="columnsModule"
    :server-query="serverQueryModule"
    :data-table="dataTableModule"
    :load-items="loadItemsModule"
    :manage-row="sendModule"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, stateModule, columnsModule, serverQueryModule, dataTableModule, titleNotificationModule,
} from '../ServicesModule/useVariablesModule'
import { getModuleById, loadItemsModule, sendModule } from '../ServicesModule/useServicesModule'

export default {
  name: 'TableModule',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async ({
      _id, nombre, nombrePadre, icono,
    }, actionOpenModal) => {
      dataTableModule.value.loading = true
      if (actionOpenModal === 'show') {
        stateModule.value._id = _id
        stateModule.value.nombre = nombre
        stateModule.value.nombrePadre = nombrePadre
        stateModule.value.icono = icono
      } else if (actionOpenModal === 'edit') {
        await getModuleById(_id)
      }
      dataTableModule.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsModule()
    })

    return {
      columnsModule,
      serverQueryModule,
      dataTableModule,
      loadItemsModule,
      titleNotificationModule,
      sendModule,
      openModalFor,
    }
  },
}
</script>
