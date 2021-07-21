<template>
  <!-- Tabla de Características -->
  <table-good-component
    :title-notification="titleNotificationUnitGroup"
    :columns="columnsUnitGroup"
    :server-query="serverQueryUnitGroup"
    :data-table="dataTableUnitGroup"
    :load-items="loadItemsUnitGroup"
    :manage-row="sendUnitGroup"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, stateUnitGroup, columnsUnitGroup, serverQueryUnitGroup, dataTableUnitGroup, titleNotificationUnitGroup,
} from '../ServicesUnitGroup/useVariablesUnitGroup'
import { loadItemsUnitGroup, sendUnitGroup } from '../ServicesUnitGroup/useServicesUnitGroup'
import { serverQueryUnitGroupDetail, clearStateUnitGroupDetail, clearFiltersUnitGroupDetail } from '../ServicesUnitGroupDetail/useVariablesUnitGroupDetail'
import { loadItemsUnitGroupDetail } from '../ServicesUnitGroupDetail/useServicesUnitGroupDetail'

export default {
  name: 'TableUnitGroup',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      dataTableUnitGroup.value.loading = true
      stateUnitGroup.value = { ...stateUnitGroup.value, ...row }
      clearStateUnitGroupDetail()
      clearFiltersUnitGroupDetail()
      serverQueryUnitGroupDetail.value.indice = row._id
      await loadItemsUnitGroupDetail(1)
      dataTableUnitGroup.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsUnitGroup()
    })

    return {
      columnsUnitGroup,
      serverQueryUnitGroup,
      dataTableUnitGroup,
      loadItemsUnitGroup,
      titleNotificationUnitGroup,
      sendUnitGroup,
      openModalFor,
    }
  },
}
</script>
