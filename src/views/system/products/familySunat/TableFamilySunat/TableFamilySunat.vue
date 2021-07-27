<template>
  <!-- Tabla de Segmento Sunat -->
  <table-good-component
    :title-notification="titleNotificationFamilySunat"
    :columns="columnsFamilySunat"
    :server-query="serverQueryFamilySunat"
    :data-table="dataTableFamilySunat"
    :load-items="loadItemsFamilySunat"
    :option-delete="false"
    :option-edit="false"
    :option-status="false"
    @open-modal-for-show="row=>openModalFor(row)"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, stateFamilySunat, columnsFamilySunat, serverQueryFamilySunat, dataTableFamilySunat, titleNotificationFamilySunat,
} from '../ServicesFamilySunat/useVariablesFamilySunat'
import { loadItemsFamilySunat } from '../ServicesFamilySunat/useServicesFamilySunat'

export default {
  name: 'TableFamilySunat',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón ver
    const openModalFor = async row => {
      dataTableFamilySunat.value.loading = true
      stateFamilySunat.value = { ...row }
      dataTableFamilySunat.value.loading = false
      context.root.$bvModal.show(`${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsFamilySunat()
    })

    return {
      columnsFamilySunat,
      serverQueryFamilySunat,
      dataTableFamilySunat,
      loadItemsFamilySunat,
      titleNotificationFamilySunat,
      openModalFor,
    }
  },
}
</script>
