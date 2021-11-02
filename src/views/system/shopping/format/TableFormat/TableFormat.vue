<template>
  <!-- Tabla de Tipo Almacén -->
  <table-good-component
    :title-notification="titleNotificationFormat"
    :columns="columnsFormat"
    :server-query="serverQueryFormat"
    :data-table="dataTableFormat"
    :load-items="loadItemsFormat"
    :manage-row="sendFormat"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, stateFormat, columnsFormat, serverQueryFormat, dataTableFormat, titleNotificationFormat,
} from '../ServicesFormat/useVariablesFormat'
import { loadItemsFormat, sendFormat } from '../ServicesFormat/useServicesFormat'

export default {
  name: 'TableFormat',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      dataTableFormat.value.loading = true
      stateFormat.value = { ...stateFormat.value, ...row }
      dataTableFormat.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsFormat()
    })

    return {
      columnsFormat,
      serverQueryFormat,
      dataTableFormat,
      loadItemsFormat,
      titleNotificationFormat,
      sendFormat,
      openModalFor,
    }
  },
}
</script>
