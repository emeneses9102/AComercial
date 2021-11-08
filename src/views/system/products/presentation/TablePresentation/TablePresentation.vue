<template>
  <!-- Tabla de Presentación -->
  <table-good-component
    :title-notification="titleNotificationPresentation"
    :columns="columnsPresentation"
    :server-query="serverQueryPresentation"
    :data-table="dataTablePresentation"
    :load-items="loadItemsPresentation"
    :manage-row="sendPresentation"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, statePresentation, columnsPresentation, serverQueryPresentation, dataTablePresentation, titleNotificationPresentation,
} from '../ServicesPresentation/useVariablesPresentation'
import { loadItemsPresentation, sendPresentation } from '../ServicesPresentation/useServicesPresentation'

export default {
  name: 'TablePresentation',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      dataTablePresentation.value.loading = true
      statePresentation.value = { ...statePresentation.value, ...row }
      dataTablePresentation.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsPresentation()
    })

    return {
      columnsPresentation,
      serverQueryPresentation,
      dataTablePresentation,
      loadItemsPresentation,
      titleNotificationPresentation,
      sendPresentation,
      openModalFor,
    }
  },
}
</script>
