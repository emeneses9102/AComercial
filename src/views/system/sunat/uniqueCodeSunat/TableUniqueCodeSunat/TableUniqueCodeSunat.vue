<template>
  <!-- Tabla de Segmento Sunat -->
  <table-good-component
    :title-notification="titleNotificationUniqueCodeSunat"
    :columns="columnsUniqueCodeSunat"
    :server-query="serverQueryUniqueCodeSunat"
    :data-table="dataTableUniqueCodeSunat"
    :load-items="loadItemsUniqueCodeSunat"
    :option-delete="false"
    :option-edit="false"
    :option-status="false"
    @open-modal-for-show="row=>openModalFor(row)"
  />
</template>

<script>
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, stateUniqueCodeSunat, columnsUniqueCodeSunat, serverQueryUniqueCodeSunat, dataTableUniqueCodeSunat, titleNotificationUniqueCodeSunat,
} from '../ServicesUniqueCodeSunat/useVariablesUniqueCodeSunat'
import { loadItemsUniqueCodeSunat } from '../ServicesUniqueCodeSunat/useServicesUniqueCodeSunat'

export default {
  name: 'TableUniqueCodeSunat',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón ver
    const openModalFor = async row => {
      dataTableUniqueCodeSunat.value.loading = true
      stateUniqueCodeSunat.value = { ...row }
      dataTableUniqueCodeSunat.value.loading = false
      context.root.$bvModal.show(`${MODAL_ID}-show`)
    }

    return {
      columnsUniqueCodeSunat,
      serverQueryUniqueCodeSunat,
      dataTableUniqueCodeSunat,
      loadItemsUniqueCodeSunat,
      titleNotificationUniqueCodeSunat,
      openModalFor,
    }
  },
}
</script>
