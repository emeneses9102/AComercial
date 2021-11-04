<template>
  <b-form
    @submit.prevent=""
  >
    <field-set-component legend="Datos Generales">
      <b-row>
        <!-- Area -->
        <b-col
          cols="12"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Área"
            rules="requiredComboVueSelect:m"
          >
            <b-form-group
              label="Área *"
              label-for="purchase-order-area"
              :state="errors.length > 0 ? false:null"
            >
              <vue-select
                id="purchase-order-area"
                v-model="statePurchaseOrder.idArea"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :reduce="area => area._id"
                label="nombre"
                :options="combosPurchaseOrder.area.data"
                :loading="combosPurchaseOrder.area.loading"
                :clearable="false"
                :disabled="combosPurchaseOrder.area.disabled"
              >
                <template v-slot:no-options>
                  No se encontraron resultados.
                </template>
              </vue-select>
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>

        <!-- Sucursal (Predio) -->
        <b-col
          cols="12"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Sucursal"
            rules="requiredComboVueSelect:m"
          >
            <b-form-group
              label="Sucursal *"
              label-for="purchase-order-predio"
              :state="errors.length > 0 ? false:null"
            >
              <vue-select
                id="purchase-order-predio"
                v-model="statePurchaseOrder.idSucursal"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :reduce="branchOffice => branchOffice._id"
                label="nombre"
                :options="combosPurchaseOrder.branchOffice.data"
                :loading="combosPurchaseOrder.branchOffice.loading"
                :clearable="false"
                :disabled="combosPurchaseOrder.branchOffice.disabled"
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
              label-for="purchase-order-priority"
              :state="errors.length > 0 ? false:null"
            >
              <vue-select
                id="purchase-order-priority"
                v-model="statePurchaseOrder.prioridad"
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

        <!-- Necesario -->
        <b-col
          cols="12"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Necesario"
            rules="required"
          >
            <b-form-group
              label="Necesario *"
              label-for="purchase-order-necessary"
            >
              <b-form-datepicker
                id="purchase-order-necessary"
                v-model="statePurchaseOrder.necesario"
                :state="errors.length > 0 ? false:null"
                v-bind="labelsFormDate"
                :min="dateCurrent"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>

        <!-- Valido Hasta -->
        <b-col
          cols="12"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Valido Hasta"
            rules="required"
          >
            <b-form-group
              label="Valido Hasta *"
              label-for="purchase-order-validity"
            >
              <b-form-datepicker
                id="purchase-order-validity"
                v-model="statePurchaseOrder.validohasta"
                :state="errors.length > 0 ? false:null"
                v-bind="labelsFormDate"
                :min="minDateValidity"
              />
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
            label-for="purchase-order-observation"
          >
            <b-form-textarea
              id="purchase-order-observation"
              v-model="statePurchaseOrder.observacion"
              rows="2"
              no-resize
            />
          </b-form-group>
        </b-col>
      </b-row>
    </field-set-component>
  </b-form>
</template>

<script>
import {
  BForm, BRow, BCol, BFormGroup, BFormTextarea, BFormDatepicker,
} from 'bootstrap-vue'
import { ValidationProvider } from 'vee-validate'
import { VueSelect } from 'vue-select'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import { statePurchaseOrder, combosPurchaseOrder } from '../ServicesPurchaseOrder/useVariablesPurchaseOrder'

export default {
  name: 'HeaderPurchaseOrder',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormTextarea,
    BFormDatepicker,
    VueSelect,
    ValidationProvider,
    FieldSetComponent,
  },
  data() {
    return {
      dateCurrent: new Date(),
      // minDateDelivery: new Date(),
      minDateValidity: new Date((new Date()).setDate((new Date()).getDate() + 1)),
      labelsFormDate: {
        labelPrevDecade: 'Década anterior',
        labelPrevYear: 'Año anterior',
        labelPrevMonth: 'El mes pasado',
        labelCurrentMonth: 'Mes actual',
        labelNextMonth: 'Próximo mes',
        labelNextYear: 'El próximo año',
        labelNextDecade: 'La próxima década',
        labelToday: 'Hoy',
        labelSelected: 'Fecha seleccionada',
        labelNoDateSelected: 'Sin fecha elegida',
        labelCalendar: 'Calendario',
        labelNav: 'Navegación de calendario',
        labelHelp: 'Navegar por el calendario con las teclas de flechas',
      },
    }
  },
  setup() {
    return {
      statePurchaseOrder,
      combosPurchaseOrder,
    }
  },
}
</script>
