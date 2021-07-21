<template>
  <!-- Tabla de Tipo Almacén -->
  <table-good-component
    :title-notification="titleNotificationStorageType"
    :columns="columnsStorageType"
    :server-query="serverQueryStorageType"
    :data-table="dataTableStorageType"
    :load-items="loadItemsStorageType"
    :manage-row="sendStorageType"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, stateStorageType, columnsStorageType, serverQueryStorageType, dataTableStorageType, titleNotificationStorageType,
} from '../ServicesStorageType/useVariablesStorageType'
import { loadItemsStorageType, sendStorageType } from '../ServicesStorageType/useServicesStorageType'

export default {
  name: 'TableStorageType',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      dataTableStorageType.value.loading = true
      stateStorageType.value = { ...stateStorageType.value, ...row }
      dataTableStorageType.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsStorageType()
    })

    return {
      columnsStorageType,
      serverQueryStorageType,
      dataTableStorageType,
      loadItemsStorageType,
      titleNotificationStorageType,
      sendStorageType,
      openModalFor,
    }
  },
}
</script>
