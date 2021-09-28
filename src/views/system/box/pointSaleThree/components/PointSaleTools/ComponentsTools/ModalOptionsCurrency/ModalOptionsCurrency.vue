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
