<template>
  <!-- Tabla de Segmento Sunat -->
  <table-good-component
    :title-notification="titleNotificationClassSunat"
    :columns="columnsClassSunat"
    :server-query="serverQueryClassSunat"
    :data-table="dataTableClassSunat"
    :load-items="loadItemsClassSunat"
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
  MODAL_ID, stateClassSunat, columnsClassSunat, serverQueryClassSunat, dataTableClassSunat, titleNotificationClassSunat,
} from '../ServicesClassSunat/useVariablesClassSunat'
import { loadItemsClassSunat } from '../ServicesClassSunat/useServicesClassSunat'

export default {
  name: 'TableClassSunat',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón ver
    const openModalFor = async row => {
      dataTableClassSunat.value.loading = true
      stateClassSunat.value = { ...row }
      dataTableClassSunat.value.loading = false
      context.root.$bvModal.show(`${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsClassSunat()
    })

    return {
      columnsClassSunat,
      serverQueryClassSunat,
      dataTableClassSunat,
      loadItemsClassSunat,
      titleNotificationClassSunat,
      openModalFor,
    }
  },
}
</script>
