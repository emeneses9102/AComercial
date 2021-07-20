<template>
  <!-- Tabla Socio -->
  <table-good-component
    :title-notification="titleNotificationPartner"
    :columns="columnsPartner"
    :server-query="serverQueryPartner"
    :data-table="dataTablePartner"
    :load-items="loadItemsPartner"
    :manage-row="sendPartner"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, statePartner, columnsPartner, serverQueryPartner, dataTablePartner, titleNotificationPartner,
} from '../ServicesPartner/useVariablesPartner'
import { loadItemsPartner, sendPartner } from '../ServicesPartner/useServicesPartner'

export default {
  name: 'TablePartner',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (rowSelected, actionOpenModal) => {
      /* eslint no-param-reassign: "error" */
      dataTablePartner.value.loading = true
      delete rowSelected.codigoDepartamento
      delete rowSelected.codigoProvincia
      delete rowSelected.codigoDistrito
      console.log(rowSelected)
      statePartner.value = { ...statePartner.value, ...rowSelected }
      dataTablePartner.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsPartner()
    })

    return {
      columnsPartner,
      serverQueryPartner,
      dataTablePartner,
      loadItemsPartner,
      titleNotificationPartner,
      sendPartner,
      openModalFor,
    }
  },
}
</script>
