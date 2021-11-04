<template>
  <b-form
    @submit.prevent=""
  >
    <field-set-component legend="Datos Generales">
      <b-row>
        <!-- Entrega -->
        <b-col
          cols="12"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Entrega"
            rules="required"
          >
            <b-form-group
              label="Entrega *"
              label-for="buy-order-date-delivery"
            >
              <b-form-datepicker
                id="buy-order-date-delivery"
                v-model="stateBuyOrder.entrega"
                :state="errors.length > 0 ? false:null"
                v-bind="labelsFormDate"
                :min="minDateDelivery"
                reset-button
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
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
            <b-form-checkbox
              id="buy-order-purchase-order"
              v-model="stateBuyOrder.pedidoCompra"
              class="custom-control-success"
              :value="1"
              :unchecked-value="0"
              switch
            />
          </b-form-group>
        </b-col>

        <!-- Moneda -->
        <b-col
          cols="12"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Moneda"
            rules="requiredComboVueSelect"
          >
            <b-form-group
              label="Moneda *"
              label-for="buy-order-currency"
              :state="errors.length > 0 ? false:null"
            >
              <vue-select
                id="buy-order-currency"
                v-model="stateBuyOrder.idMoneda"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :reduce="currency => currency._id"
                label="nombre"
                :options="combosBuyOrder.currency.data"
                :loading="combosBuyOrder.currency.loading"
                :clearable="false"
                :disabled="combosBuyOrder.currency.disabled"
              >
                <template v-slot:no-options>
                  No se encontraron resultados.
                </template>
              </vue-select>
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>

        <!-- Proveedor -->
        <b-col
          cols="12"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Proveedor"
            rules="required"
          >
            <b-form-group
              label="Proveedor"
              label-for="input-partner-button"
            >
              <b-input-group>
                <b-form-input
                  id="input-partner-button"
                  v-model="stateBuyOrder.nombreProveedor"
                  :state="errors.length > 0 ? false:null"
                  readonly
                />
                <b-input-group-append>
                  <button-component
                    class="py-25"
                    icon-button="SearchIcon"
                    margin-class="m-0"
                    :method-function="openModalQueryPartner"
                  />
                </b-input-group-append>
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>

        <!-- Consultar Proveedores -->
        <modal-query-partner
          :server-query-opcional="`a.proveedor=1`"
          @on-partner-selected="onPartnerSelected"
        />

        <!-- Forma Pago -->
        <b-col
          cols="12"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Forma de Pago"
            rules="requiredComboVueSelect"
          >
            <b-form-group
              label="Forma de Pago *"
              label-for="buy-order-payment-form"
              :state="errors.length > 0 ? false:null"
            >
              <vue-select
                id="buy-order-payment-form"
                v-model="stateBuyOrder.idFormaPago"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :reduce="paymentForm => paymentForm._id"
                label="nombre"
                :options="combosBuyOrder.paymentForm.data"
                :loading="combosBuyOrder.paymentForm.loading"
                :clearable="false"
                :disabled="combosBuyOrder.paymentForm.disabled"
              >
                <template v-slot:no-options>
                  No se encontraron resultados.
                </template>
              </vue-select>
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>

        <!-- Prioridad -->
        <b-col
          cols="12"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Prioridad"
            rules="requiredComboVueSelect"
          >
            <b-form-group
              label="Prioridad *"
              label-for="buy-order-priority"
              :state="errors.length > 0 ? false:null"
            >
              <vue-select
                id="buy-order-priority"
                v-model="stateBuyOrder.prioridad"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="[1, 2, 3, 4, 5, 6, 7, 8, 9]"
                :clearable="false"
              >
                <template v-slot:no-options>
                  No se encontraron resultados.
                </template>
              </vue-select>
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>

        <!-- Observación -->
        <b-col
          cols="12"
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
            />
          </b-form-group>
        </b-col>

        <!-- Formato -->
        <b-col
          cols="12"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Formato"
            rules="requiredComboVueSelect:m"
          >
            <b-form-group
              label="Formato *"
              label-for="buy-order-format"
              :state="errors.length > 0 ? false:null"
            >
              <vue-select
                id="buy-order-format"
                v-model="stateBuyOrder.idFormato"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :reduce="format => format._id"
                label="nombre"
                :options="combosBuyOrder.format.data"
                :loading="combosBuyOrder.format.loading"
                :clearable="false"
                :disabled="combosBuyOrder.format.disabled"
              >
                <template v-slot:no-options>
                  No se encontraron resultados.
                </template>
              </vue-select>
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>

      </b-row>
    </field-set-component>
  </b-form>
</template>

<script>
import {
  BForm, BRow, BCol, BFormGroup, BFormTextarea, BFormCheckbox, BFormDatepicker, BInputGroup, BInputGroupAppend, BFormInput,
} from 'bootstrap-vue'
import { ValidationProvider } from 'vee-validate'
import { VueSelect } from 'vue-select'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import ModalQueryPartner from '@/components/ModalQueryPartner/ModalQueryPartner.vue'
import { stateBuyOrder, combosBuyOrder } from '../ServicesBuyOrder/useVariablesBuyOrder'

export default {
  name: 'HeaderBuyOrder',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormTextarea,
    BFormCheckbox,
    BFormDatepicker,
    BInputGroup,
    BInputGroupAppend,
    BFormInput,
    VueSelect,
    ValidationProvider,
    FieldSetComponent,
    ButtonComponent,
    ModalQueryPartner,
  },
  data() {
    return {
      dateCurrent: new Date(),
      // minDateDelivery: new Date(),
      minDateDelivery: new Date((new Date()).setDate((new Date()).getDate() + 1)),
      labelsFormDate: {
        labelPrevDecade: 'Década anterior',
        labelPrevYear: 'Año anterior',
        labelPrevMonth: 'El mes pasado',
        labelCurrentMonth: 'Mes actual',
        labelNextMonth: 'Próximo mes',
        labelNextYear: 'El próximo año',
        labelNextDecade: 'La próxima década',
        labelResetButton: 'Limpiar',
        labelToday: 'Hoy',
        labelSelected: 'Fecha seleccionada',
        labelNoDateSelected: 'Sin fecha elegida',
        labelCalendar: 'Calendario',
        labelNav: 'Navegación de calendario',
        labelHelp: 'Navegar por el calendario con las teclas de flechas',
      },
    }
  },
  setup(props, context) {
    const openModalQueryPartner = () => {
      context.root.$bvModal.show('modal-query-partner')
    }

    const onPartnerSelected = ({ _id, razonSocial, nombres }) => {
      stateBuyOrder.value.idProveedor = _id
      stateBuyOrder.value.nombreProveedor = razonSocial || nombres
    }

    return {
      stateBuyOrder,
      combosBuyOrder,
      openModalQueryPartner,
      onPartnerSelected,
    }
  },
}
</script>
