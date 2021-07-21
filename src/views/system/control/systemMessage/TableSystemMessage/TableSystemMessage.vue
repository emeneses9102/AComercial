<template>
  <!-- Tabla de Mensaje Sistema -->
  <table-good-component
    :title-notification="titleNotificationSystemMessage"
    :columns="columnsSystemMessage"
    :server-query="serverQuerySystemMessage"
    :data-table="dataTableSystemMessage"
    :load-items="loadItemsSystemMessage"
    :manage-row="sendSystemMessage"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, stateSystemMessage, columnsSystemMessage, serverQuerySystemMessage, dataTableSystemMessage, titleNotificationSystemMessage, actionModal,
} from '../ServicesSystemMessage/useVariablesSystemMessage'
import { loadItemsSystemMessage, sendSystemMessage } from '../ServicesSystemMessage/useServicesSystemMessage'

export default {
  name: 'TableSystemMessage',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      dataTableSystemMessage.value.loading = true
      actionModal.value = 'UPDATE'
      stateSystemMessage.value = { ...stateSystemMessage.value, ...row }
      dataTableSystemMessage.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsSystemMessage()
    })

    return {
      columnsSystemMessage,
      serverQuerySystemMessage,
      dataTableSystemMessage,
      loadItemsSystemMessage,
      titleNotificationSystemMessage,
      sendSystemMessage,
      openModalFor,
    }
  },
}
</script>
