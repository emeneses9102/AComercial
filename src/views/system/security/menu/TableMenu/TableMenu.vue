<template>
  <!-- Tabla de Características -->
  <table-good-component
    :title-notification="titleNotificationMenu"
    :columns="columnsMenu"
    :server-query="serverQueryMenu"
    :data-table="dataTableMenu"
    :load-items="loadItemsMenu"
    :manage-row="sendMenu"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, stateMenu, columnsMenu, serverQueryMenu, dataTableMenu, titleNotificationMenu,
} from '../ServicesMenu/useVariablesMenu'
import { getMenuById, loadItemsMenu, sendMenu } from '../ServicesMenu/useServicesMenu'
import { serverQueryMenuOptionDetail, clearStateMenuOptionDetail, clearFiltersMenuOptionDetail } from '../ServicesMenuOptionDetail/useVariablesMenuOptionDetail'
import { loadItemsMenuOptionDetail } from '../ServicesMenuOptionDetail/useServicesMenuOptionDetail'

export default {
  name: 'TableMenu',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async ({
      _id, nombreModulo, nombre, orden, ruta,
    }, actionOpenModal) => {
      dataTableMenu.value.loading = true
      if (actionOpenModal === 'show') {
        stateMenu.value._id = _id
        stateMenu.value.nombreModulo = nombreModulo
        stateMenu.value.nombre = nombre
        stateMenu.value.orden = orden
        stateMenu.value.ruta = ruta
      } else if (actionOpenModal === 'edit') {
        await getMenuById(_id)
      }
      clearStateMenuOptionDetail()
      clearFiltersMenuOptionDetail()
      serverQueryMenuOptionDetail.value.indice = _id
      await loadItemsMenuOptionDetail(1)
      dataTableMenu.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsMenu()
    })

    return {
      columnsMenu,
      serverQueryMenu,
      dataTableMenu,
      loadItemsMenu,
      titleNotificationMenu,
      sendMenu,
      openModalFor,
    }
  },
}
</script>
