<template>
  <!-- Tabla de Predio -->
  <table-good-component
    :title-notification="titleNotificationPredio"
    :columns="columnsPredio"
    :server-query="serverQueryPredio"
    :data-table="dataTablePredio"
    :load-items="loadItemsPredio"
    :manage-row="sendPredio"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import { endPointsCombo, loadCombos } from '@/helpers/combos'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, statePredio, columnsPredio, serverQueryPredio, dataTablePredio, titleNotificationPredio, statePredioUbigeo, combosPredio, clearCombosPredioUbigeo,
} from '../ServicesPredio/useVariablesPredio'
import { loadItemsPredio, sendPredio } from '../ServicesPredio/useServicesPredio'

export default {
  name: 'TablePredio',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async ({
      _id, codigoDepartamento, codigoProvincia, idUbigeo, nombreUbigeo, direccion, observacion,
    }, actionOpenModal) => {
      dataTablePredio.value.loading = true
      clearCombosPredioUbigeo()
      if (actionOpenModal === 'edit') {
        await Promise.all([
          loadCombos(combosPredio, ['province'], `${endPointsCombo.provincia}/${codigoDepartamento}`, 'Provincia'),
          loadCombos(combosPredio, ['district'], `${endPointsCombo.distrito}/${codigoDepartamento}/${codigoProvincia}`, 'Distrito'),
        ])
      }
      statePredioUbigeo.value.departament = codigoDepartamento
      statePredioUbigeo.value.province = codigoProvincia
      statePredioUbigeo.value.district = idUbigeo
      const ubigeoArrayString = nombreUbigeo.split(',')
      statePredio.value.nombreDepartamento = ubigeoArrayString[0] || ''
      statePredio.value.nombreProvincia = ubigeoArrayString[1] || ''
      statePredio.value.nombreDistrito = ubigeoArrayString[2] || ''
      statePredio.value._id = _id
      statePredio.value.idUbigeo = idUbigeo
      statePredio.value.observacion = observacion
      statePredio.value.direccion = direccion
      dataTablePredio.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsPredio()
    })

    return {
      columnsPredio,
      serverQueryPredio,
      dataTablePredio,
      loadItemsPredio,
      titleNotificationPredio,
      sendPredio,
      openModalFor,
    }
  },
}
</script>
