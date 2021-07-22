<template>
  <!-- Tabla de Forma de Pago -->
  <table-good-component
    :title-notification="titleNotificationPaymentForm"
    :columns="columnsPaymentForm"
    :server-query="serverQueryPaymentForm"
    :data-table="dataTablePaymentForm"
    :load-items="loadItemsPaymentForm"
    :manage-row="sendPaymentForm"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, statePaymentForm, columnsPaymentForm, serverQueryPaymentForm, dataTablePaymentForm, titleNotificationPaymentForm,
} from '../ServicesPaymentForm/useVariablesPaymentForm'
import { loadItemsPaymentForm, sendPaymentForm } from '../ServicesPaymentForm/useServicesPaymentForm'

export default {
  name: 'TablePaymentForm',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      dataTablePaymentForm.value.loading = true
      statePaymentForm.value = { ...statePaymentForm.value, ...row }
      dataTablePaymentForm.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsPaymentForm()
    })

    return {
      columnsPaymentForm,
      serverQueryPaymentForm,
      dataTablePaymentForm,
      loadItemsPaymentForm,
      titleNotificationPaymentForm,
      sendPaymentForm,
      openModalFor,
    }
  },
}
</script>
