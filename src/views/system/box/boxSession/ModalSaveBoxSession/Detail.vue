<template>
  <field-set-component legend="Sesión Caja Detalle">
    <validation-observer
      ref="validation-box-session-detail"
    >
      <b-form
        @submit.prevent="sendForm"
        @reset="clearStateBoxSessionDetail"
      >
        <b-row>
          <!-- Medio Pago -->
          <b-col
            cols="12"
            lg="4"
          >
            <validation-provider
              #default="{ errors }"
              name="Medio Pago"
              rules="requiredComboVueSelect:m"
            >
              <b-form-group
                label="Medio Pago *"
                label-for="box-session-detail-payment-method"
                :state="errors.length > 0 ? false:null"
              >
                <vue-select
                  id="box-session-detail-payment-method"
                  v-model="stateBoxSessionDetail.idMedioPago"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="paymentMethod => paymentMethod._id"
                  label="nombre"
                  :options="combosBoxSessionDetail.paymentMethod.data"
                  :loading="combosBoxSessionDetail.paymentMethod.loading"
                  :clearable="false"
                  :disabled="combosBoxSessionDetail.paymentMethod.disabled"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </vue-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- Moneda -->
          <b-col
            cols="12"
            lg="4"
          >
            <validation-provider
              #default="{ errors }"
              name="Moneda"
              rules="requiredComboVueSelect:m"
            >
              <b-form-group
                label="Moneda *"
                label-for="box-session-detail-currency"
                :state="errors.length > 0 ? false:null"
              >
                <vue-select
                  id="box-session-detail-currency"
                  v-model="stateBoxSessionDetail.idMoneda"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="currency => currency._id"
                  label="nombre"
                  :options="combosBoxSessionDetail.currency.data"
                  :loading="combosBoxSessionDetail.currency.loading"
                  :clearable="false"
                  :disabled="combosBoxSessionDetail.currency.disabled"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </vue-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- Monto -->
          <b-col
            cols="12"
            lg="4"
          >
            <b-form-group
              label="Monto *"
              label-for="box-session-detail-monto"
            >
              <validation-provider
                #default="{ errors }"
                name="Serie"
                rules="required"
              >
                <b-form-input
                  id="box-session-detail-monto"
                  v-model.number="stateBoxSessionDetail.monto"
                  type="number"
                  step=".01"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
          >
            <div class="d-flex flex-wrap justify-content-end">
              <button-component
                type="reset"
                variant="outline-primary"
                text-default="Limpiar"
                icon-button="DeleteIcon"
              />
              <button-component
                v-if="stateBoxSessionDetail._id"
                type="submit"
                variant="success"
                text-default="Modificar"
                icon-button="RefreshCwIcon"
                :loading="stateBoxSessionDetail.loading"
              />
              <button-component
                v-else
                type="submit"
                variant="primary"
                text-default="Agregar"
                icon-button="PlusCircleIcon"
                :loading="stateBoxSessionDetail.loading"
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
import { VueSelect } from 'vue-select'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { stateBoxSession } from '../ServicesBoxSession/useVariablesBoxSession'
import { stateBoxSessionDetail, clearStateBoxSessionDetail, combosBoxSessionDetail } from '../ServicesBoxSessionDetail/useVariablesBoxSessionDetail'
import { loadItemsBoxSessionDetail, sendBoxSessionDetail } from '../ServicesBoxSessionDetail/useServicesBoxSessionDetail'

export default {
  name: 'Detail',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    ValidationObserver,
    ValidationProvider,
    FieldSetComponent,
    ButtonComponent,
    VueSelect,
  },
  props: {
    sendHeader: {
      type: Function,
      required: true,
    },
  },
  setup(props, context) {
    const sendForm = async () => {
      if (!stateBoxSession.value._id) {
        stateBoxSessionDetail.value.loading = true
        const successValidationFeature = await props.sendHeader(ACTION_REGISTER, false)
        if (!successValidationFeature) {
          stateBoxSessionDetail.value.loading = false
          return
        }
      }

      const successValidationBoxSessionDetail = await context.refs['validation-box-session-detail'].validate()
      if (!successValidationBoxSessionDetail) {
        stateBoxSessionDetail.value.loading = false
        return
      }
      const { status: statusBoxSessionDetail } = await sendBoxSessionDetail(stateBoxSessionDetail.value._id ? ACTION_UPDATE : ACTION_REGISTER)
      if (!statusBoxSessionDetail) return

      clearStateBoxSessionDetail()
      context.refs['validation-box-session-detail'].reset()
      document.getElementById('box-session-detail-payment-method').focus()
      loadItemsBoxSessionDetail(1)
    }

    return {
      stateBoxSessionDetail,
      sendForm,
      clearStateBoxSessionDetail,
      combosBoxSessionDetail,
    }
  },
}
</script>
