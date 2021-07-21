<template>
  <!-- Tabla de Características -->
  <table-good-component
    :title-notification="titleNotificationFeature"
    :columns="columnsFeature"
    :server-query="serverQueryFeature"
    :data-table="dataTableFeature"
    :load-items="loadItemsFeature"
    :manage-row="sendFeature"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, stateFeature, columnsFeature, serverQueryFeature, dataTableFeature, titleNotificationFeature,
} from '../ServicesFeature/useVariablesFeature'
import { loadItemsFeature, sendFeature } from '../ServicesFeature/useServicesFeature'
import { serverQueryFeatureDetail, clearStateFeatureDetail, clearFiltersFeatureDetail } from '../ServicesFeatureDetail/useVariablesFeatureDetail'
import { loadItemsFeatureDetail } from '../ServicesFeatureDetail/useServicesFeatureDetail'

export default {
  name: 'TableFeature',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      dataTableFeature.value.loading = true
      console.log(row)
      stateFeature.value = { ...stateFeature.value, ...row }
      clearStateFeatureDetail()
      clearFiltersFeatureDetail()
      serverQueryFeatureDetail.value.indice = row._id
      await loadItemsFeatureDetail(1)
      dataTableFeature.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsFeature()
    })

    return {
      columnsFeature,
      serverQueryFeature,
      dataTableFeature,
      loadItemsFeature,
      titleNotificationFeature,
      sendFeature,
      openModalFor,
    }
  },
}
</script>
