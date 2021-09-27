<template>
  <modal-tools-options
    modal-id="modal-options-vendor"
    title="Vendedor"
    :state-data="stateDataVendor"
    :state-selected.sync="statePointSale.idVendedor"
    :get-all-options="getAllVendors"
    :clear-state-data="clearStateDataVendor"
    :clear-state-selected="clearStateVendorSelected"
  />
</template>

<script>
import ModalToolsOptions from '@/components/ModalToolsOptions/ModalToolsOptions.vue'
import {
  stateDataVendor,
} from './useVariablesVendor'
import {
  getAllVendors,
  clearStateDataVendor,
  clearStateVendorSelected,
} from './useServicesVendor'
import {
  statePointSale,
} from '../../../../ServicesPointSale/useVariablesPointSale'

export default {
  name: 'ModalOptionsVendor',
  components: {
    ModalToolsOptions,
  },
  setup() {
    return {
      stateDataVendor,
      statePointSale,
      getAllVendors,
      clearStateDataVendor,
      clearStateVendorSelected,
    }
  },
}
</script>
