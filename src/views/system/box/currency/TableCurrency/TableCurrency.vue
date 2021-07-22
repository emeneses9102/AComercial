<template>
  <!-- Tabla de Moneda -->
  <table-good-component
    :title-notification="titleNotificationCurrency"
    :columns="columnsCurrency"
    :server-query="serverQueryCurrency"
    :data-table="dataTableCurrency"
    :load-items="loadItemsCurrency"
    :manage-row="sendCurrency"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, stateCurrency, columnsCurrency, serverQueryCurrency, dataTableCurrency, titleNotificationCurrency,
} from '../ServicesCurrency/useVariablesCurrency'
import { loadItemsCurrency, sendCurrency } from '../ServicesCurrency/useServicesCurrency'

export default {
  name: 'TableCurrency',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      dataTableCurrency.value.loading = true
      stateCurrency.value = { ...stateCurrency.value, ...row }
      dataTableCurrency.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsCurrency()
    })

    return {
      columnsCurrency,
      serverQueryCurrency,
      dataTableCurrency,
      loadItemsCurrency,
      titleNotificationCurrency,
      sendCurrency,
      openModalFor,
    }
  },
}
</script>
