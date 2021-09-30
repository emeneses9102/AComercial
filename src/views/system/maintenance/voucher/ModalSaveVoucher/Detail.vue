<template>
  <field-set-component legend="Correlativo">
    <validation-observer
      ref="validation-voucher-detail-correlativo"
    >
      <b-form
        @submit.prevent="sendForm"
        @reset="clearStateVoucherDetailCorrelative"
      >
        <b-row>
          <!-- Serie -->
          <b-col
            cols="12"
            lg="4"
          >
            <b-form-group
              label="Serie *"
              label-for="menu-serie"
            >
              <validation-provider
                #default="{ errors }"
                name="Serie"
                rules="required|min:4|max:5"
              >
                <b-form-input
                  id="menu-serie"
                  v-model="stateVoucherDetailCorrelative.serie"
                  type="text"
                  maxlength="5"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Número -->
          <b-col
            cols="12"
            lg="4"
          >
            <b-form-group
              label="Número *"
              label-for="voucher-detail-correlativo-numero"
            >
              <validation-provider
                #default="{ errors }"
                name="Número"
                rules="required"
              >
                <b-form-input
                  id="voucher-detail-correlativo-numero"
                  v-model.number="stateVoucherDetailCorrelative.numero"
                  type="number"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Predios -->
          <b-col
            cols="12"
            lg="4"
          >
            <validation-provider
              #default="{ errors }"
              name="Predios"
              rules="requiredComboVueSelect:m"
            >
              <b-form-group
                label="Predios *"
                label-for="voucher-detail-correlative-operation"
                :state="errors.length > 0 ? false:null"
              >
                <vue-select
                  id="voucher-detail-correlative-operation"
                  v-model="stateVoucherDetailCorrelative.idPredio"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="predios => predios._id"
                  label="nombre"
                  :options="combosVoucherDetailCorrelative.predios.data"
                  :loading="combosVoucherDetailCorrelative.predios.loading"
                  :clearable="false"
                  :disabled="combosVoucherDetailCorrelative.predios.disabled"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </vue-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
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
                v-if="stateVoucherDetailCorrelative._id"
                type="submit"
                variant="success"
                text-default="Modificar"
                icon-button="RefreshCwIcon"
                :loading="stateVoucherDetailCorrelative.loading"
              />
              <button-component
                v-else
                type="submit"
                variant="primary"
                text-default="Agregar"
                icon-button="PlusCircleIcon"
                :loading="stateVoucherDetailCorrelative.loading"
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
import { stateVoucher } from '../ServicesVoucher/useVariablesVoucher'
import { stateVoucherDetailCorrelative, clearStateVoucherDetailCorrelative, combosVoucherDetailCorrelative } from '../ServicesVoucherDetailCorrelative/useVariablesVoucherDetailCorrelative'
import { loadItemsVoucherDetailCorrelative, sendVoucherDetailCorrelative } from '../ServicesVoucherDetailCorrelative/useServicesVoucherDetailCorrelative'

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
      if (!stateVoucher.value._id) {
        stateVoucherDetailCorrelative.value.loading = true
        const successValidationFeature = await props.sendHeader(ACTION_REGISTER, false)
        if (!successValidationFeature) {
          stateVoucherDetailCorrelative.value.loading = false
          return
        }
      }

      const successValidationVoucherDetailCorrelative = await context.refs['validation-voucher-detail-correlativo'].validate()
      if (!successValidationVoucherDetailCorrelative) {
        stateVoucherDetailCorrelative.value.loading = false
        return
      }
      const { status: statusVoucherDetailCorrelative } = await sendVoucherDetailCorrelative(stateVoucherDetailCorrelative.value._id ? ACTION_UPDATE : ACTION_REGISTER)
      if (!statusVoucherDetailCorrelative) return

      clearStateVoucherDetailCorrelative()
      context.refs['validation-voucher-detail-correlativo'].reset()
      document.getElementById('voucher-detail-correlativo-numero').focus()
      loadItemsVoucherDetailCorrelative(1)
    }

    return {
      stateVoucherDetailCorrelative,
      sendForm,
      clearStateVoucherDetailCorrelative,
      combosVoucherDetailCorrelative,
    }
  },
}
</script>
