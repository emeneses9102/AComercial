<template>
  <!-- Tabla de Medio de Pago -->
  <table-good-component
    :title-notification="titleNotificationPaymentMethod"
    :columns="columnsPaymentMethod"
    :server-query="serverQueryPaymentMethod"
    :data-table="dataTablePaymentMethod"
    :load-items="loadItemsPaymentMethod"
    :manage-row="sendPaymentMethod"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, statePaymentMethod, columnsPaymentMethod, serverQueryPaymentMethod, dataTablePaymentMethod, titleNotificationPaymentMethod,
} from '../ServicesPaymentMethod/useVariablesPaymentMethod'
import { loadItemsPaymentMethod, sendPaymentMethod } from '../ServicesPaymentMethod/useServicesPaymentMethod'

export default {
  name: 'TablePaymentMethod',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      dataTablePaymentMethod.value.loading = true
      statePaymentMethod.value = { ...statePaymentMethod.value, ...row }
      dataTablePaymentMethod.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsPaymentMethod()
    })

    return {
      columnsPaymentMethod,
      serverQueryPaymentMethod,
      dataTablePaymentMethod,
      loadItemsPaymentMethod,
      titleNotificationPaymentMethod,
      sendPaymentMethod,
      openModalFor,
    }
  },
}
</script>
