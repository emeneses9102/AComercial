<template>
  <modal-tools-options
    modal-id="modal-options-payment-method"
    title="Forma de Pago"
    :state-data="stateDataPaymentMethod"
    :state-selected.sync="statePointSale.idFormaPago"
    :get-all-options="getAllPaymentMethods"
    :clear-state-data="clearStateDataPaymentMethod"
    :clear-state-selected="clearStatePaymentMethodSelected"
  />
</template>

<script>
import ModalToolsOptions from '@/components/ModalToolsOptions/ModalToolsOptions.vue'
import {
  stateDataPaymentMethod,
} from './useVariablesPaymentMethod'
import {
  getAllPaymentMethods,
  clearStateDataPaymentMethod,
  clearStatePaymentMethodSelected,
} from './useServicesPaymentMethod'
import {
  statePointSale,
} from '../../../../ServicesPointSale/useVariablesPointSale'

export default {
  name: 'ModalOptionsPaymentMethod',
  components: {
    ModalToolsOptions,
  },
  setup() {
    return {
      stateDataPaymentMethod,
      statePointSale,
      getAllPaymentMethods,
      clearStateDataPaymentMethod,
      clearStatePaymentMethodSelected,
    }
  },
}
</script>
