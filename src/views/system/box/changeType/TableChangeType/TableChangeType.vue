<template>
  <!-- Tabla de Medio de Pago -->
  <table-good-component
    :title-notification="titleNotificationChangeType"
    :columns="columnsChangeType"
    :server-query="serverQueryChangeType"
    :data-table="dataTableChangeType"
    :load-items="loadItemsChangeType"
    :manage-row="sendChangeType"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, stateChangeType, columnsChangeType, serverQueryChangeType, dataTableChangeType, titleNotificationChangeType, currenciesLocal, mlocal,
} from '../ServicesChangeType/useVariablesChangeType'
import { loadItemsChangeType, sendChangeType } from '../ServicesChangeType/useServicesChangeType'

export default {
  name: 'TableChangeType',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      dataTableChangeType.value.loading = true
      stateChangeType.value = { ...stateChangeType.value, ...row }
      if (currenciesLocal.value.find(currency => currency._id === stateChangeType.value.idMoneda)) {
        mlocal.value = true
      } else {
        mlocal.value = false
      }
      dataTableChangeType.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsChangeType()
    })

    return {
      columnsChangeType,
      serverQueryChangeType,
      dataTableChangeType,
      loadItemsChangeType,
      titleNotificationChangeType,
      sendChangeType,
      openModalFor,
    }
  },
}
</script>
