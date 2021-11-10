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
  MODAL_ID, stateStorageType, columnsStorageType, serverQueryStorageType, dataTableStorageType, titleNotificationStorageType, clearStateStorageType,
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
      clearStateStorageType()
      stateStorageType.value = { ...stateStorageType.value, ...row }
      dataTableStorageType.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    // Función que se ejecutará cuando el componente se monte en el DOM
    onMounted(() => {
      loadItemsStorageType()
    })

    // Retorno de variables y funciones que se usan en el template
    return {
      columnsStorageType,
      serverQueryStorageType,
      dataTableStorageType,
      titleNotificationStorageType,
      loadItemsStorageType,
      sendStorageType,
      openModalFor,
    }
  },
}
</script>
