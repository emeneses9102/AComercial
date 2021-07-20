<template>
  <!-- Tabla de Tipo Producto -->
  <table-good-component
    :title-notification="titleNotificationServiceType"
    :columns="columnsServiceType"
    :server-query="serverQueryServiceType"
    :data-table="dataTableServiceType"
    :load-items="loadItemsServiceType"
    :manage-row="sendServiceType"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, stateServiceType, columnsServiceType, serverQueryServiceType, dataTableServiceType, titleNotificationServiceType,
} from '../ServicesServiceType/useVariablesServiceType'
import { loadItemsServiceType, sendServiceType } from '../ServicesServiceType/useServicesServiceType'

export default {
  name: 'TableServiceType',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async ({ _id, nombre }, actionOpenModal) => {
      dataTableServiceType.value.loading = true
      stateServiceType.value._id = _id
      stateServiceType.value.nombre = nombre
      dataTableServiceType.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsServiceType()
    })

    return {
      columnsServiceType,
      serverQueryServiceType,
      dataTableServiceType,
      loadItemsServiceType,
      titleNotificationServiceType,
      sendServiceType,
      openModalFor,
    }
  },
}
</script>
