<template>
  <b-modal
    :id="`${modalId}`"
    centered
    :title="`Seleccionar ${title}`"
    no-close-on-backdrop
    size="sm"
  >
    <!-- Seleccionar Opción -->

    <field-set-component
      class="mt-75"
      legend="Selecciona el Comprobante"
    >
      <b-row>
        <b-col
          cols="12"
        >
          <b-form-group
            label="Comprobante"
            label-for="modal-tools-options-voucher"
          >
            <vue-select
              id="modal-tools-options-voucher"
              v-model="statePointSale.idComprobante"
              :reduce="option => option._id"
              label="nombre"
              :clearable="false"
              :options="combosVoucher.voucher.data"
              :loading="combosVoucher.voucher.loading"
              :disabled="combosVoucher.voucher.disabled"
              @option:selected="voucherSelected"
            />
          </b-form-group>
        </b-col>
        <b-col
          cols="12"
        >
          <b-form-group
            label="Correlativo"
            label-for="modal-tools-options-correlative"
          >
            <vue-select
              id="modal-tools-options-correlative"
              v-model="statePointSale.idCorrelativo"
              :reduce="option => option._id"
              label="nombre"
              :options="combosVoucher.correlative.data"
              :loading="combosVoucher.correlative.loading"
              :disabled="combosVoucher.correlative.disabled"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </field-set-component>

    <template #modal-footer>
      <button-component
        text-default="Listo"
        icon-button="CheckIcon"
        :method-function="()=>$bvModal.hide(modalId)"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal,
  BRow,
  BCol,
  BFormGroup,
} from 'bootstrap-vue'
import { VueSelect } from 'vue-select'
import {
  onMounted,
} from '@vue/composition-api'
import store from '@/store'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import {
  endPointsCombo,
  loadCombos,
} from '@/helpers/combos'
import {
  statePointSale,
} from '../../../../ServicesPointSale/useVariablesPointSale'
import {
  combosVoucher,
} from './useVariablesVoucher'

export default {
  name: 'ModalToolsOptions',
  components: {
    BModal,
    BRow,
    BCol,
    BFormGroup,
    VueSelect,
    FieldSetComponent,
    ButtonComponent,
  },
  setup() {
    const modalId = 'modal-options-voucher'
    const title = 'Comprobante'

    onMounted(async () => {
      statePointSale.value.idComprobante = 0
      statePointSale.value.idCorrelativo = 0
    })

    const voucherSelected = () => {
      statePointSale.value.idCorrelativo = 0
      loadCombos(combosVoucher, ['correlative'], `${endPointsCombo.correlativoPuntoVenta}/1/${store.state.boxSession.boxSession._id}/${statePointSale.value.idComprobante}`, 'Correlativo')
    }

    return {
      modalId,
      title,
      statePointSale,
      voucherSelected,
      combosVoucher,
    }
  },
}
</script>
