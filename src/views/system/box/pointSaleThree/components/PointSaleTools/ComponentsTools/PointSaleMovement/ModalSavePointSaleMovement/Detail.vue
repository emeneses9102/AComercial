<template>
  <field-set-component legend="Detalle">
    <validation-observer
      ref="validation-point-sale-movement"
    >
      <b-form
        @submit.prevent="sendForm"
        @reset="clearStatePointSaleMovement"
      >
        <b-row>
          <!-- Moneda -->
          <b-col
            cols="12"
            md="6"
          >
            <validation-provider
              #default="{ errors }"
              name="Moneda"
              rules="requiredComboVueSelect"
            >
              <b-form-group
                label="Moneda *"
                label-for="point-sale-movement-currency"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="point-sale-movement-currency"
                  v-model="statePointSaleMovement.idMoneda"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="currency => currency._id"
                  label="nombre"
                  :options="combosPointSaleMovement.currency.data"
                  :loading="combosPointSaleMovement.currency.loading"
                  :clearable="false"
                  :disabled="combosPointSaleMovement.currency.disabled"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <!-- Medio de Pago -->
          <b-col
            cols="12"
            md="6"
          >
            <validation-provider
              #default="{ errors }"
              name="Medio de Pago"
              rules="requiredComboVueSelect:m"
            >
              <b-form-group
                label="Medio de Pago *"
                label-for="point-sale-movement-payment-method"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="point-sale-movement-payment-method"
                  v-model="statePointSaleMovement.idMedioPago"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="paymentMethod => paymentMethod._id"
                  label="nombre"
                  :options="combosPointSaleMovement.paymentMethod.data"
                  :loading="combosPointSaleMovement.paymentMethod.loading"
                  :clearable="false"
                  :disabled="combosPointSaleMovement.paymentMethod.disabled"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <!-- Pagado -->
          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              label="Pagado *"
              label-for="point-sale-movement-pagado"
            >
              <validation-provider
                #default="{ errors }"
                name="Pagado"
                rules="required|min_value:0.01"
              >
                <b-form-input
                  id="point-sale-movement-pagado"
                  v-model.number="statePointSaleMovement.pagado"
                  type="number"
                  :state="errors.length > 0 ? false:null"
                  step="0.01"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col
            cols="12"
            md="6"
          >
            <div class="d-flex flex-wrap justify-content-end mt-1">
              <button-component
                type="reset"
                variant="outline-primary"
                text-default="Limpiar"
                icon-button="DeleteIcon"
              />
              <button-component
                type="submit"
                variant="primary"
                text-default="Agregar"
                icon-button="PlusCircleIcon"
                :loading="statePointSaleMovement.loading"
              />
            </div>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </field-set-component>
</template>

<script>
import {
  BForm, BRow, BCol, BFormGroup, BFormInput,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import vSelect from 'vue-select'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import {
  statePointSaleMovement, clearStatePointSaleMovement, combosPointSaleMovement,
} from '../../../../../ServicesPointSaleMovement/useVariablesPointSaleMovement'
import { loadItemsPointSaleMovement, sendPointSaleMovement } from '../../../../../ServicesPointSaleMovement/useServicesPointSaleMovement'
import { getPointSaleById } from '../../../../../ServicesPointSale/useServicesPointSale'
import { statePointSale } from '../../../../../ServicesPointSale/useVariablesPointSale'

export default {
  name: 'Detail',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    vSelect,
    ValidationObserver,
    ValidationProvider,
    FieldSetComponent,
    ButtonComponent,
  },
  setup(props, context) {
    const sendForm = async () => {
      const successValidationPointSaleMovement = await context.refs['validation-point-sale-movement'].validate()
      if (!successValidationPointSaleMovement) {
        statePointSaleMovement.value.loading = false
        return
      }
      const { status: statusPointSaleMovement } = await sendPointSaleMovement(statePointSaleMovement.value._id ? ACTION_UPDATE : ACTION_REGISTER)
      if (!statusPointSaleMovement) return

      clearStatePointSaleMovement()
      context.refs['validation-point-sale-movement'].reset()
      statePointSaleMovement.value.idMoneda = statePointSale.value.idMoneda
      loadItemsPointSaleMovement(1)
      getPointSaleById(statePointSale.value._id)
    }

    return {
      statePointSaleMovement,
      sendForm,
      clearStatePointSaleMovement,
      combosPointSaleMovement,
    }
  },
}
</script>
