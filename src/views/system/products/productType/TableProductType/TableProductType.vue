<template>
  <!-- Tabla de Tipo Producto -->
  <table-good-component
    :title-notification="titleNotificationProductType"
    :columns="columnsProductType"
    :server-query="serverQueryProductType"
    :data-table="dataTableProductType"
    :load-items="loadItemsProductType"
    :manage-row="sendProductType"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, stateProductType, columnsProductType, serverQueryProductType, dataTableProductType, titleNotificationProductType,
} from '../ServicesProductType/useVariablesProductType'
import { loadItemsProductType, sendProductType } from '../ServicesProductType/useServicesProductType'

export default {
  name: 'TableProductType',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async ({ _id, nombre }, actionOpenModal) => {
      dataTableProductType.value.loading = true
      stateProductType.value._id = _id
      stateProductType.value.nombre = nombre
      dataTableProductType.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsProductType()
    })

    return {
      columnsProductType,
      serverQueryProductType,
      dataTableProductType,
      loadItemsProductType,
      titleNotificationProductType,
      sendProductType,
      openModalFor,
    }
  },
}
</script>
