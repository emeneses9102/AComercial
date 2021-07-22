<template>
  <b-form>
    <field-set-component legend="Datos Generales">
      <b-row>
        <!-- Nombre -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Nombre"
            label-for="voucher-name"
          >
            <b-form-input
              id="voucher-name"
              v-model.trim="stateVoucher.nombre"
              type="text"
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- Comprobante -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Comprobante"
            label-for="voucher-comprobante"
          >
            <b-form-input
              id="voucher-comprobante"
              v-model.trim="stateVoucher.nombreComprobante"
              type="text"
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- Operación -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Operación"
            label-for="voucher-oparcion"
          >
            <b-form-input
              id="voucher-oparcion"
              v-model.trim="stateVoucher.nombreOperacion"
              type="text"
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- Tipo Comprobante -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Tipo comprobante"
            label-for="voucher-voucher-type"
          >
            <b-form-input
              id="voucher-voucher-type"
              v-model.trim="stateVoucher.nombreTipoComprobante"
              type="text"
              readonly
            />
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
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import { stateVoucher } from '../ServicesVoucher/useVariablesVoucher'

export default {
  name: 'HeaderVoucher',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    FieldSetComponent,
  },
  setup() {
    return {
      stateVoucher,
    }
  },
}
</script>
