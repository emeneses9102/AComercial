<template>
  <!-- Tabla de Tipo Almacén -->
  <table-good-component
    :title-notification="titleNotificationArea"
    :columns="columnsArea"
    :server-query="serverQueryArea"
    :data-table="dataTableArea"
    :load-items="loadItemsArea"
    :manage-row="sendArea"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, stateArea, columnsArea, serverQueryArea, dataTableArea, titleNotificationArea,
} from '../ServicesArea/useVariablesArea'
import { loadItemsArea, sendArea } from '../ServicesArea/useServicesArea'

export default {
  name: 'TableArea',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      dataTableArea.value.loading = true
      stateArea.value = { ...stateArea.value, ...row }
      dataTableArea.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsArea()
    })

    return {
      columnsArea,
      serverQueryArea,
      dataTableArea,
      loadItemsArea,
      titleNotificationArea,
      sendArea,
      openModalFor,
    }
  },
}
</script>
