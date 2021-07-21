<template>
  <!-- Tabla de Unidad de Negocio -->
  <table-good-component
    :title-notification="titleNotificationBusinessUnit"
    :columns="columnsBusinessUnit"
    :server-query="serverQueryBusinessUnit"
    :data-table="dataTableBusinessUnit"
    :load-items="loadItemsBusinessUnit"
    :manage-row="sendBusinessUnit"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, stateBusinessUnit, columnsBusinessUnit, serverQueryBusinessUnit, dataTableBusinessUnit, titleNotificationBusinessUnit,
} from '../ServicesBusinessUnit/useVariablesBusinessUnit'
import { loadItemsBusinessUnit, sendBusinessUnit } from '../ServicesBusinessUnit/useServicesBusinessUnit'

export default {
  name: 'TableBusinessUnit',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      dataTableBusinessUnit.value.loading = true
      stateBusinessUnit.value = { ...stateBusinessUnit.value, ...row }
      stateBusinessUnit.value.produccion = +row.produccion
      dataTableBusinessUnit.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsBusinessUnit()
    })

    return {
      columnsBusinessUnit,
      serverQueryBusinessUnit,
      dataTableBusinessUnit,
      loadItemsBusinessUnit,
      titleNotificationBusinessUnit,
      sendBusinessUnit,
      openModalFor,
    }
  },
}
</script>
