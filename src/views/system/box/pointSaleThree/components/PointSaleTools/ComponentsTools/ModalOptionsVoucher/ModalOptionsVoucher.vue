<template>
  <modal-tools-options
    modal-id="modal-options-voucher"
    title="Comprobante"
    :state-data="stateDataVoucher"
    :state-selected.sync="stateVoucherSelected"
    :state-query.sync="stateQueryName"
    :get-all-options="getAllVouchers"
    :clear-state-data="clearStateDataVoucher"
    :clear-state-selected="clearStateVoucherSelected"
    :clear-state-query="clearStateQueryName"
  />
</template>

<script>
import ModalToolsOptions from '@/components/ModalToolsOptions/ModalToolsOptions.vue'
import {
  stateDataVoucher,
  stateVoucherSelected,
  stateQueryName,
} from './useVariablesVoucher'
import {
  getAllVouchers,
  clearStateDataVoucher,
  clearStateVoucherSelected,
  clearStateQueryName,
} from './useServicesVoucher'

export default {
  name: 'ModalOptionsVoucer',
  components: {
    ModalToolsOptions,
  },
  setup() {
    return {
      stateDataVoucher,
      stateVoucherSelected,
      stateQueryName,
      getAllVouchers,
      clearStateDataVoucher,
      clearStateVoucherSelected,
      clearStateQueryName,
    }
  },
}
</script>
