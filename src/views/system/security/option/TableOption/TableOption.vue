<template>
  <!-- Tabla Opción -->
  <table-good-component
    :title-notification="titleNotificationOption"
    :columns="columnsOption"
    :server-query="serverQueryOption"
    :data-table="dataTableOption"
    :load-items="loadItemsOption"
    :manage-row="sendOption"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, stateOption, columnsOption, serverQueryOption, dataTableOption, titleNotificationOption,
} from '../ServicesOption/useVariablesOption'
import { loadItemsOption, sendOption } from '../ServicesOption/useServicesOption'

export default {
  name: 'TableOption',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      dataTableOption.value.loading = true
      stateOption.value = { ...stateOption.value, ...row }
      dataTableOption.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsOption()
    })

    return {
      columnsOption,
      serverQueryOption,
      dataTableOption,
      loadItemsOption,
      titleNotificationOption,
      sendOption,
      openModalFor,
    }
  },
}
</script>
