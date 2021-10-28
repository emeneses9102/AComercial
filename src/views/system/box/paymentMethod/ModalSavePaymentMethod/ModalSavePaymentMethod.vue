<template>
  <b-modal
    :id="MODAL_ID"
    centered
    :title="`${statePaymentMethod._id ? 'Modificar' : 'Registrar'} ${titleNotificationPaymentMethod}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-payment-method"
    >
      <b-form @submit.prevent="">
        <field-set-component legend="Datos Generales">
          <b-row>
            <!-- Código SUNAT -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="{ errors }"
                name="Cod SUNAT"
                rules="requiredComboVueSelect:m"
              >
                <b-form-group
                  label="Cod SUNAT *"
                  label-for="payment-method-code-sunat"
                  :state="errors.length > 0 ? false:null"
                >
                  <vue-select
                    id="payment-method-code-sunat"
                    v-model="statePaymentMethod.idCodigoSunat"
                    class="style-chooser"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :reduce="paymentMethodSunat => paymentMethodSunat._id"
                    label="nombre"
                    :options="combosPaymentMethod.paymentMethodSunat.data"
                    :loading="combosPaymentMethod.paymentMethodSunat.loading"
                    :clearable="false"
                    :disabled="combosPaymentMethod.paymentMethodSunat.disabled"
                  >
                    <template v-slot:no-options>
                      No se encontraron resultados.
                    </template>
                  </vue-select>
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <!-- Nombre -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Nombre *"
                label-for="payment-method-name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nombre"
                  rules="required|min:3"
                >
                  <b-form-input
                    id="payment-method-name"
                    v-model.trim="statePaymentMethod.nombre"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                    @keydown.enter="()=>sendForm()"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- Defecto -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Defecto"
                label-for="payment-method-defect"
              >
                <b-form-checkbox
                  id="payment-method-defect"
                  v-model="statePaymentMethod.defecto"
                  class="custom-control-success"
                  :value="1"
                  :unchecked-value="0"
                  switch
                />
              </b-form-group>
            </b-col>
          </b-row>
        </field-set-component>
      </b-form>
    </validation-observer>

    <template #modal-footer>
      <button-component
        variant="outline-primary"
        icon-button="PowerIcon"
        text-default="Cerrar"
        :method-function="()=>$bvModal.hide(MODAL_ID)"
      />
      <button-component
        v-if="(
          (!statePaymentMethod._id && optionsPermissions.includes(GUARDAR))
          || (statePaymentMethod._id && optionsPermissions.includes(EDITAR))
        )"
        variant="primary"
        icon-button="SaveIcon"
        :loading="statePaymentMethod.loading"
        text-default="Guardar"
        :method-function="()=>sendForm()"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal, BForm, BRow, BCol, BFormGroup, BFormInput, BFormCheckbox,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { VueSelect } from 'vue-select'
import { computed } from '@vue/composition-api'
import store from '@/store'
import {
  EDITAR,
  GUARDAR,
} from '@/options'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { validatePermission } from '@/helpers/validateActions'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import {
  MODAL_ID, titleNotificationPaymentMethod, statePaymentMethod, clearStatePaymentMethod, combosPaymentMethod, routeNamePaymentMethod,
} from '../ServicesPaymentMethod/useVariablesPaymentMethod'
import { loadItemsPaymentMethod, sendPaymentMethod } from '../ServicesPaymentMethod/useServicesPaymentMethod'

export default {
  name: 'ModalSavePaymentMethod',
  components: {
    BModal,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    ButtonComponent,
    FieldSetComponent,
    ValidationObserver,
    ValidationProvider,
    VueSelect,
  },
  setup(props, context) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNamePaymentMethod]) {
        return store.state.rolesAndPermissions.options[routeNamePaymentMethod]
      }
      return []
    })

    const sendForm = async (actionSend = null, loading = true) => {
      if (!validatePermission(optionsPermissions.value, !statePaymentMethod.value._id ? GUARDAR : EDITAR, titleNotificationPaymentMethod)) return false
      const successValidationPaymentMethod = await context.refs['validation-payment-method'].validate()
      if (!successValidationPaymentMethod) return false
      if (loading) statePaymentMethod.value.loading = true
      const { status, data } = await sendPaymentMethod(actionSend || (statePaymentMethod.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) statePaymentMethod.value.loading = false
      if (!status) return false
      statePaymentMethod.value._id = data.id
      clearStatePaymentMethod()
      document.getElementById('payment-method-name').focus()
      context.refs['validation-payment-method'].reset()
      await loadItemsPaymentMethod()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationPaymentMethod,
      statePaymentMethod,
      combosPaymentMethod,
      sendForm,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
