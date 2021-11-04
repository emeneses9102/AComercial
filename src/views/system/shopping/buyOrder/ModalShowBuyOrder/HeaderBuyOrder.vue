<template>
  <b-form>
    <field-set-component legend="Datos Generales">
      <b-row>
        <!-- Entrega -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Entrega"
            label-for="buy-order-date-delivery"
          >
            <b-form-datepicker
              id="buy-order-date-delivery"
              v-model="stateBuyOrder.entrega"
              disabled
            />
          </b-form-group>
        </b-col>

        <!-- Pedido Compra -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Pedido Compra"
            label-for="buy-order-purchase-order"
          >
            <b-badge
              class="mt-50"
              :variant="stateBuyOrder.pedidoCompra ? 'light-success' : 'light-danger'"
            >
              <feather-icon
                :icon="stateBuyOrder.pedidoCompra ? 'CheckIcon' : 'SlashIcon'"
                size="16"
              />
            </b-badge>
          </b-form-group>
        </b-col>

        <!-- Moneda -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Moneda"
            label-for="buy-order-currency"
          >
            <b-form-input
              id="buy-order-currency"
              v-model.trim="stateBuyOrder.nombreMoneda"
              type="text"
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- Proveedor -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Proveedor"
            label-for="buy-order-provider"
          >
            <b-form-input
              id="buy-order-provider"
              v-model.trim="stateBuyOrder.nombreProveedor"
              type="text"
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- Forma Pago -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Forma Pago"
            label-for="buy-order-payment-form"
          >
            <b-form-input
              id="buy-order-payment-form"
              v-model.trim="stateBuyOrder.nombreFormaPago"
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
            label-for="buy-order-priority"
          >
            <b-form-input
              id="buy-order-priority"
              v-model.number="stateBuyOrder.prioridad"
              type="number"
              readonly
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
            label-for="buy-order-observation"
          >
            <b-form-textarea
              id="buy-order-observation"
              v-model="stateBuyOrder.observacion"
              rows="2"
              no-resize
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- Formato -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Formato"
            label-for="buy-order-format"
          >
            <b-form-input
              id="buy-order-format"
              v-model.trim="stateBuyOrder.nombreFormato"
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
  BForm, BRow, BCol, BFormGroup, BFormInput, BFormTextarea, BBadge, BFormDatepicker,
} from 'bootstrap-vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import { stateBuyOrder } from '../ServicesBuyOrder/useVariablesBuyOrder'

export default {
  name: 'HeaderBuyOrder',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BBadge,
    BFormDatepicker,
    FieldSetComponent,
  },
  setup() {
    return {
      stateBuyOrder,
    }
  },
}
</script>
