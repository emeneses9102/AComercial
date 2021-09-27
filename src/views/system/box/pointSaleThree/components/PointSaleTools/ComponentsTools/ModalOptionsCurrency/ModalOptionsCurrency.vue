<template>
  <modal-tools-options
    modal-id="modal-options-currency"
    title="Moneda"
    :state-data="stateDataCurrency"
    :state-selected.sync="statePointSale.idMoneda"
    :get-all-options="getAllCurrencys"
    :clear-state-data="clearStateDataCurrency"
    :clear-state-selected="clearStateCurrencySelected"
  />
</template>

<script>
// import { toRef, watch } from '@vue/composition-api'
import ModalToolsOptions from '@/components/ModalToolsOptions/ModalToolsOptions.vue'
import {
  stateDataCurrency,
} from './useVariablesCurrency'
import {
  getAllCurrencys,
  clearStateDataCurrency,
  clearStateCurrencySelected,
} from './useServicesCurrency'
import {
  statePointSale,
} from '../../../../ServicesPointSale/useVariablesPointSale'

export default {
  name: 'ModalOptionsCurrency',
  components: {
    ModalToolsOptions,
  },
  setup() {
    // const currencyToRef = toRef(statePointSale.value, 'idMoneda')
    // watch([currencyToRef, stateDataCurrency], () => {
    //   if (currencyToRef.value) {
    //     const currencySelected = stateDataCurrency.value.data.find(currency => currency._id === currencyToRef.value)
    //     if (currencySelected) statePointSale.value.nombreMoneda = currencySelected.nombre
    //   } else {
    //     statePointSale.value.nombreMoneda = ''
    //   }
    // }, {
    //   deep: true,
    // })

    return {
      stateDataCurrency,
      statePointSale,
      getAllCurrencys,
      clearStateDataCurrency,
      clearStateCurrencySelected,
    }
  },
}
</script>
