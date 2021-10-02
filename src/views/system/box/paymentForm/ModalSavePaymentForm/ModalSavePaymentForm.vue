<template>
  <b-modal
    :id="MODAL_ID"
    centered
    :title="`${statePaymentForm._id ? 'Modificar' : 'Registrar'} ${titleNotificationPaymentForm}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-payment-form"
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
                label-for="payment-form-name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nombre"
                  rules="required|min:3"
                >
                  <b-form-input
                    id="payment-form-name"
                    v-model.trim="statePaymentForm.nombre"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                    @keydown.enter="()=>sendForm()"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Días-->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Días*"
                label-for="cpayment-form-dias"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Orden"
                  rules="required"
                >
                  <b-form-input
                    id="payment-form-dias"
                    v-model.number="statePaymentForm.dias"
                    type="number"
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
        v-if="(
          (!statePaymentForm._id && optionsPermissions.includes(GUARDAR))
          || (statePaymentForm._id && optionsPermissions.includes(EDITAR))
        )"
        variant="primary"
        icon-button="SaveIcon"
        :loading="statePaymentForm.loading"
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
  MODAL_ID, titleNotificationPaymentForm, statePaymentForm, clearStatePaymentForm, routeNamePaymentForm,
} from '../ServicesPaymentForm/useVariablesPaymentForm'
import { loadItemsPaymentForm, sendPaymentForm } from '../ServicesPaymentForm/useServicesPaymentForm'

export default {
  name: 'ModalSavePaymentForm',
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
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNamePaymentForm]) {
        return store.state.rolesAndPermissions.options[routeNamePaymentForm]
      }
      return []
    })

    const sendForm = async (actionSend = null, loading = true) => {
      if (!validatePermission(optionsPermissions.value, !statePaymentForm.value._id ? GUARDAR : EDITAR, titleNotificationPaymentForm)) return false
      const successValidationPaymentForm = await context.refs['validation-payment-form'].validate()
      if (!successValidationPaymentForm) return false
      if (loading) statePaymentForm.value.loading = true
      const { status, data } = await sendPaymentForm(actionSend || (statePaymentForm.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) statePaymentForm.value.loading = false
      if (!status) return false
      statePaymentForm.value._id = data.id
      clearStatePaymentForm()
      document.getElementById('payment-form-name').focus()
      context.refs['validation-payment-form'].reset()
      await loadItemsPaymentForm()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationPaymentForm,
      statePaymentForm,
      sendForm,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
