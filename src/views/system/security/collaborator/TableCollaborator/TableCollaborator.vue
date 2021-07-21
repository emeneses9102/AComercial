<template>
  <!-- Tabla de Colaborador -->
  <table-good-component
    :title-notification="titleNotificationCollaborator"
    :columns="columnsCollaborator"
    :server-query="serverQueryCollaborator"
    :data-table="dataTableCollaborator"
    :load-items="loadItemsCollaborator"
    :manage-row="sendCollaborator"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, stateCollaborator, columnsCollaborator, serverQueryCollaborator, dataTableCollaborator, titleNotificationCollaborator,
} from '../ServicesCollaborator/useVariablesCollaborator'
import { loadItemsCollaborator, sendCollaborator } from '../ServicesCollaborator/useServicesCollaborator'

export default {
  name: 'TableCollaborator',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      dataTableCollaborator.value.loading = true
      stateCollaborator.value = { ...stateCollaborator.value, ...row }
      dataTableCollaborator.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsCollaborator()
    })

    return {
      columnsCollaborator,
      serverQueryCollaborator,
      dataTableCollaborator,
      loadItemsCollaborator,
      titleNotificationCollaborator,
      sendCollaborator,
      openModalFor,
    }
  },
}
</script>
