<template>
  <!-- Tabla de Segmento Sunat -->
  <table-good-component
    :title-notification="titleNotificationSegmentSunat"
    :columns="columnsSegmentSunat"
    :server-query="serverQuerySegmentSunat"
    :data-table="dataTableSegmentSunat"
    :load-items="loadItemsSegmentSunat"
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
  MODAL_ID, stateSegmentSunat, columnsSegmentSunat, serverQuerySegmentSunat, dataTableSegmentSunat, titleNotificationSegmentSunat,
} from '../ServicesSegmentSunat/useVariablesSegmentSunat'
import { loadItemsSegmentSunat } from '../ServicesSegmentSunat/useServicesSegmentSunat'

export default {
  name: 'TableSegmentSunat',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón ver
    const openModalFor = async row => {
      dataTableSegmentSunat.value.loading = true
      stateSegmentSunat.value = { ...row }
      dataTableSegmentSunat.value.loading = false
      context.root.$bvModal.show(`${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsSegmentSunat()
    })

    return {
      columnsSegmentSunat,
      serverQuerySegmentSunat,
      dataTableSegmentSunat,
      loadItemsSegmentSunat,
      titleNotificationSegmentSunat,
      openModalFor,
    }
  },
}
</script>
