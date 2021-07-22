<template>
  <!-- Tabla de Comprobante -->
  <table-good-component
    :title-notification="titleNotificationVoucher"
    :columns="columnsVoucher"
    :server-query="serverQueryVoucher"
    :data-table="dataTableVoucher"
    :load-items="loadItemsVoucher"
    :manage-row="sendVoucher"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, stateVoucher, columnsVoucher, serverQueryVoucher, dataTableVoucher, titleNotificationVoucher,
} from '../ServicesVoucher/useVariablesVoucher'
import { getVoucherById, loadItemsVoucher, sendVoucher } from '../ServicesVoucher/useServicesVoucher'
import { serverQueryVoucherDetailCorrelative, clearStateVoucherDetailCorrelative, clearFiltersVoucherDetailCorrelative } from '../ServicesVoucherDetailCorrelative/useVariablesVoucherDetailCorrelative'
import { loadItemsVoucherDetailCorrelative } from '../ServicesVoucherDetailCorrelative/useServicesVoucherDetailCorrelative'

export default {
  name: 'TableVoucher',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      dataTableVoucher.value.loading = true
      if (actionOpenModal === 'show') {
        stateVoucher.value = { ...stateVoucher.value, ...row }
      } else if (actionOpenModal === 'edit') {
        await getVoucherById(row._id)
      }
      clearStateVoucherDetailCorrelative()
      clearFiltersVoucherDetailCorrelative()
      serverQueryVoucherDetailCorrelative.value.indice = row._id
      await loadItemsVoucherDetailCorrelative(1)
      dataTableVoucher.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsVoucher()
    })

    return {
      columnsVoucher,
      serverQueryVoucher,
      dataTableVoucher,
      loadItemsVoucher,
      titleNotificationVoucher,
      sendVoucher,
      openModalFor,
    }
  },
}
</script>
