<template>
  <!-- Tabla de Documento -->
  <table-good-component
    :title-notification="titleNotificationDocument"
    :columns="columnsDocument"
    :server-query="serverQueryDocument"
    :data-table="dataTableDocument"
    :load-items="loadItemsDocument"
    :manage-row="sendDocument"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, stateDocument, columnsDocument, serverQueryDocument, dataTableDocument, titleNotificationDocument,
} from '../ServicesDocument/useVariablesDocument'
import { loadItemsDocument, sendDocument } from '../ServicesDocument/useServicesDocument'

export default {
  name: 'TableDocument',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      dataTableDocument.value.loading = true
      stateDocument.value = { ...stateDocument.value, ...row }
      stateDocument.value.produccion = +row.produccion
      dataTableDocument.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsDocument()
    })

    return {
      columnsDocument,
      serverQueryDocument,
      dataTableDocument,
      loadItemsDocument,
      titleNotificationDocument,
      sendDocument,
      openModalFor,
    }
  },
}
</script>
