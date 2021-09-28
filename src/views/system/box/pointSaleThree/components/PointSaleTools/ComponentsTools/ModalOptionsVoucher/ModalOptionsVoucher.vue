<template>
  <modal-tools-options
    modal-id="modal-options-voucher"
    title="Comprobante"
    :state-data="stateDataVoucher"
    :state-selected.sync="statePointSale.idComprobante"
    :get-all-options="getAllVouchers"
    :clear-state-data="clearStateDataVoucher"
    :clear-state-selected="clearStateVoucherSelected"
  />
</template>

<script>
import ModalToolsOptions from '@/components/ModalToolsOptions/ModalToolsOptions.vue'
import {
  stateDataVoucher,
} from './useVariablesVoucher'
import {
  getAllVouchers,
  clearStateDataVoucher,
  clearStateVoucherSelected,
} from './useServicesVoucher'
import {
  statePointSale,
} from '../../../../ServicesPointSale/useVariablesPointSale'

export default {
  name: 'ModalOptionsVoucher',
  components: {
    ModalToolsOptions,
  },
  setup() {
    return {
      stateDataVoucher,
      statePointSale,
      getAllVouchers,
      clearStateDataVoucher,
      clearStateVoucherSelected,
    }
  },
}
</script>
