<template>
  <field-set-component
    legend="Sessión Caja Comprobantes"
  >
    <b-row>
      <b-col
        cols="6"
      >
        <b-form-group
          label="Comprobante"
          label-for="modal-tools-options-voucher"
        >
          <vue-select
            id="modal-tools-options-voucher"
            v-model="stateBoxSessionVoucherDetail.idComprobante"
            :reduce="option => option._id"
            label="nombre"
            :clearable="false"
            :options="combosBoxSessionVoucherDetail.voucher.data"
            :loading="combosBoxSessionVoucherDetail.voucher.loading"
            :disabled="combosBoxSessionVoucherDetail.voucher.disabled"
            @option:selected="voucherSelected"
          />
        </b-form-group>
      </b-col>
      <b-col
        cols="6"
      >
        <b-form-group
          label="Correlativo"
          label-for="modal-tools-options-correlative"
        >
          <vue-select
            id="modal-tools-options-correlative"
            v-model="stateBoxSessionVoucherDetail.idCorrelativo"
            :reduce="option => option._id"
            label="nombre"
            :clearable="false"
            :options="combosBoxSessionVoucherDetail.correlative.data"
            :loading="combosBoxSessionVoucherDetail.correlative.loading"
            :disabled="combosBoxSessionVoucherDetail.correlative.disabled"
          />
        </b-form-group>
      </b-col>
      <b-col
        cols="12"
        md="4"
      >
        <b-form-group
          label="Por Defecto"
          label-for="modal-tools-options-voucher-default"
        >
          <b-form-checkbox
            id="modal-tools-options-voucher-default"
            v-model="stateBoxSessionVoucherDetail.defecto"
            class="custom-control-success"
            :value="1"
            :unchecked-value="0"
            switch
          />
        </b-form-group>
      </b-col>
      <b-col
        cols="12"
        md="8"
      >
        <div class="d-flex flex-wrap justify-content-end">
          <button-component
            type="reset"
            variant="outline-primary"
            text-default="Limpiar"
            icon-button="DeleteIcon"
          />
          <button-component
            v-if="stateBoxSessionVoucherDetail._id"
            type="submit"
            variant="success"
            text-default="Modificar"
            icon-button="RefreshCwIcon"
            :loading="stateBoxSessionVoucherDetail.loading"
          />
          <button-component
            v-else
            type="submit"
            variant="primary"
            text-default="Agregar"
            icon-button="PlusCircleIcon"
            :loading="stateBoxSessionVoucherDetail.loading"
          />
        </div>
      </b-col>
    </b-row>
  </field-set-component>
</template>

<script>
import {
  BRow,
  BCol,
  BFormGroup,
  BFormCheckbox,
} from 'bootstrap-vue'
import { onMounted } from '@vue/composition-api'
import { VueSelect } from 'vue-select'
import {
  endPointsCombo,
  loadCombos,
  resetCombos,
} from '@/helpers/combos'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import {
  stateBoxSessionVoucherDetail,
  combosBoxSessionVoucherDetail,
} from '../ServicesBoxSessionVoucherDetail/useVariablesBoxSessionVoucherDetail'
import { stateBoxSession } from '../ServicesBoxSession/useVariablesBoxSession'

export default {
  name: 'DetailVoucher',
  components: {
    FieldSetComponent,
    BRow,
    BCol,
    BFormGroup,
    BFormCheckbox,
    VueSelect,
    ButtonComponent,
  },
  setup() {
    onMounted(() => {
      stateBoxSessionVoucherDetail.value.idComprobante = 0
      stateBoxSessionVoucherDetail.value.idCorrelativo = 0
      resetCombos(combosBoxSessionVoucherDetail, ['voucher', 'correlative'])
      loadCombos(combosBoxSessionVoucherDetail, ['voucher'], `${endPointsCombo.comprobanteSesionCaja}/1/${stateBoxSession.value._id}/0`, 'Comprobantes')
    })

    const voucherSelected = () => {
      stateBoxSessionVoucherDetail.value.idCorrelativo = 0
      resetCombos(combosBoxSessionVoucherDetail, ['correlative'])
      loadCombos(combosBoxSessionVoucherDetail, ['correlative'], `${endPointsCombo.correlativoSesionCaja}/1/${stateBoxSession.value._id}/${stateBoxSessionVoucherDetail.value.idComprobante}`, 'Correlativos')
    }

    return {
      stateBoxSessionVoucherDetail,
      combosBoxSessionVoucherDetail,
      voucherSelected,
    }
  },
}
</script>
