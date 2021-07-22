<template>
  <!-- Tabla de Error del Sistema -->
  <table-good-component
    :title-notification="titleNotificationSystemError"
    :columns="columnsSystemError"
    :server-query="serverQuerySystemError"
    :data-table="dataTableSystemError"
    :load-items="loadItemsSystemError"
    :manage-row="sendSystemError"
    :option-edit="false"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, stateSystemError, columnsSystemError, serverQuerySystemError, dataTableSystemError, titleNotificationSystemError,
} from '../ServicesSystemError/useVariablesSystemError'
import { loadItemsSystemError, sendSystemError } from '../ServicesSystemError/useServicesSystemError'

export default {
  name: 'TableSystemError',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      dataTableSystemError.value.loading = true
      stateSystemError.value = { ...stateSystemError.value, ...row }
      dataTableSystemError.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsSystemError()
    })

    return {
      columnsSystemError,
      serverQuerySystemError,
      dataTableSystemError,
      loadItemsSystemError,
      titleNotificationSystemError,
      sendSystemError,
      openModalFor,
    }
  },
}
</script>
