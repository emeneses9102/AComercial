<template>
  <b-form>
    <field-set-component legend="Datos Generales">
      <b-row>
        <!-- Área -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Área"
            label-for="purchase-order-area"
          >
            <b-form-input
              id="purchase-order-area"
              v-model.trim="statePurchaseOrder.nombreArea"
              type="text"
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- Sucursal (Predio) -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Sucursal"
            label-for="purchase-order-predio"
          >
            <b-form-input
              id="purchase-order-predio"
              v-model.trim="statePurchaseOrder.nombreSucursal"
              type="text"
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- Prioridad -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Prioridad"
            label-for="purchase-order-priority"
          >
            <b-form-input
              id="purchase-order-priority"
              v-model.number="statePurchaseOrder.prioridad"
              type="number"
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- Necesario -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Necesario"
            label-for="purchase-order-necessary"
          >
            <b-form-datepicker
              id="purchase-order-necessary"
              v-model="statePurchaseOrder.necesario"
              disabled
            />
          </b-form-group>
        </b-col>

        <!-- Válido Hasta -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Valido hasta"
            label-for="purchase-order-validity"
          >
            <b-form-datepicker
              id="purchase-order-validity"
              v-model="statePurchaseOrder.validohasta"
              disabled
            />
          </b-form-group>
        </b-col>

        <!-- Observación -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Observación"
            label-for="purchase-order-observation"
          >
            <b-form-textarea
              id="purchase-order-observation"
              v-model="statePurchaseOrder.observacion"
              rows="2"
              no-resize
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
  BForm, BRow, BCol, BFormGroup, BFormInput, BFormTextarea, BFormDatepicker,
} from 'bootstrap-vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import { statePurchaseOrder } from '../ServicesPurchaseOrder/useVariablesPurchaseOrder'

export default {
  name: 'HeaderPurchaseOrder',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BFormDatepicker,
    FieldSetComponent,
  },
  setup() {
    return {
      statePurchaseOrder,
    }
  },
}
</script>
