<template>
  <b-form
    @submit.prevent=""
  >
    <field-set-component legend="Datos Generales">
      <b-row>
        <!-- Nombre -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Nombre *"
            label-for="voucher-name"
          >
            <validation-provider
              #default="{ errors }"
              name="Nombre"
              rules="required"
            >
              <b-form-input
                id="voucher-name"
                v-model.trim="stateVoucher.nombre"
                type="text"
                :state="errors.length > 0 ? false:null"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Comprobante -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Comprobante *"
            label-for="voucher-comprobante"
          >
            <vue-select
              id="voucher-comprobante"
              v-model="stateVoucher.idComprobante"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :reduce="voucherSunat => voucherSunat._id"
              label="nombre"
              :options="combosVoucher.voucherSunat.data"
              :loading="combosVoucher.voucherSunat.loading"
              :disabled="combosVoucher.voucherSunat.disabled"
            >
              <template v-slot:no-options>
                No se encontraron resultados.
              </template>
            </vue-select>
          </b-form-group>
        </b-col>

        <!-- Operación -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Operación *"
            label-for="voucher-operation"
          >
            <vue-select
              id="voucher-operation"
              v-model="stateVoucher.idOperacion"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :reduce="operationSunat => operationSunat._id"
              label="nombre"
              :options="combosVoucher.operationSunat.data"
              :loading="combosVoucher.operationSunat.loading"
              :disabled="combosVoucher.operationSunat.disabled"
            >
              <template v-slot:no-options>
                No se encontraron resultados.
              </template>
            </vue-select>
          </b-form-group>
        </b-col>

        <!-- Tipo Comprobante-->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Tipo Comprobante *"
            label-for="voucher-voucher-type"
          >
            <vue-select
              id="voucher-voucher-type"
              v-model="stateVoucher.idTipoComprobante"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :reduce="voucherTypeSunat => voucherTypeSunat._id"
              label="nombre"
              :options="combosVoucher.voucherTypeSunat.data"
              :loading="combosVoucher.voucherTypeSunat.loading"
              :disabled="combosVoucher.voucherTypeSunat.disabled"
            >
              <template v-slot:no-options>
                No se encontraron resultados.
              </template>
            </vue-select>
          </b-form-group>
        </b-col>
      </b-row>
    </field-set-component>
  </b-form>
</template>

<script>
import {
  BForm, BRow, BCol, BFormGroup, BFormInput,
} from 'bootstrap-vue'
import { ValidationProvider } from 'vee-validate'
import { VueSelect } from 'vue-select'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import { stateVoucher, combosVoucher } from '../ServicesVoucher/useVariablesVoucher'

export default {
  name: 'HeaderVoucher',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    VueSelect,
    ValidationProvider,
    FieldSetComponent,
  },
  setup() {
    return {
      stateVoucher,
      combosVoucher,
    }
  },
}
</script>
