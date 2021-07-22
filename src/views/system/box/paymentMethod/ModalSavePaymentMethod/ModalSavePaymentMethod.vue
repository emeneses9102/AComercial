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
  BModal, BForm, BRow, BCol, BFormGroup, BFormInput,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import {
  MODAL_ID, titleNotificationPaymentMethod, statePaymentMethod, clearStatePaymentMethod,
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
    ButtonComponent,
    FieldSetComponent,
    ValidationObserver,
    ValidationProvider,
  },
  setup(props, context) {
    const sendForm = async (actionSend = null, loading = true) => {
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
      sendForm,
    }
  },
}
</script>
