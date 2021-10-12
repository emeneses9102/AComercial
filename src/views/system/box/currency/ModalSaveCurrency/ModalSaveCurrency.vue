<template>
  <b-modal
    :id="MODAL_ID"
    centered
    :title="`${stateCurrency._id ? 'Modificar' : 'Registrar'} ${titleNotificationCurrency}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-currency"
    >
      <b-form @submit.prevent="">
        <field-set-component legend="Datos Generales">
          <b-row>
            <!-- Moneda -->
            <b-col
              cols="12"
              lg="6"
            >
              <b-form-group
                label="Moneda *"
                label-for="currency-moneda"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Moneda"
                  rules="required|min:3"
                >
                  <b-form-input
                    id="currency-moneda"
                    v-model.trim="stateCurrency.moneda"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                    @keydown.enter="()=>sendForm()"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Código3 -->
            <b-col
              cols="12"
              lg="6"
            >
              <b-form-group
                label="Código *"
                label-for="currency-codigo3"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Código"
                  rules="required"
                >
                  <b-form-input
                    id="currency-codigo3"
                    v-model.trim="stateCurrency.codigo3"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                    maxlength="3"
                    @keydown.enter="()=>sendForm()"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Código Moneda-->
            <b-col
              cols="12"
              lg="6"
            >
              <b-form-group
                label="Código de Moneda*"
                label-for="currency-codigo-moneda"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Orden"
                  rules="required"
                >
                  <b-form-input
                    id="currency-codigo-moneda"
                    v-model.number="stateCurrency.codigoMoneda"
                    type="number"
                    :state="errors.length > 0 ? false:null"
                    maxlength="11"
                    @keydown.enter="()=>sendForm()"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Unidad Menor -->
            <b-col
              cols="12"
              lg="6"
            >
              <b-form-group
                label="Unidad Menor *"
                label-for="currency-unidad-menor"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Unidad Menor"
                  rules="required"
                >
                  <b-form-input
                    id="currency-unidad-menor"
                    v-model.trim="stateCurrency.unidadMenor"
                    type="text"
                    maxlength="2"
                    :state="errors.length > 0 ? false:null"
                    @keydown.enter="()=>sendForm()"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- País -->
            <b-col
              cols="12"
              lg="6"
            >
              <b-form-group
                label="País *"
                label-for="currency-pais"
              >
                <validation-provider
                  #default="{ errors }"
                  name="País"
                  rules="required|min:3"
                >
                  <b-form-input
                    id="currency-pais"
                    v-model.trim="stateCurrency.pais"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                    @keydown.enter="()=>sendForm()"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- mLocal -->
            <b-col
              cols="12"
              lg="6"
            >
              <b-form-group
                label="M. Local *"
                label-for="currency-mLocal"
              >
                <validation-provider
                  #default="{ errors }"
                  name="M.Local"
                  rules="required"
                >
                  <b-form-checkbox
                    id="currency-mLocal"
                    v-model.trim="stateCurrency.mlocal"
                    value="1"
                    class="custom-control-primary mt-1"
                    name="check-button"
                    unchecked-value="0"
                    switch
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
          (!stateCurrency._id && optionsPermissions.includes(GUARDAR))
          || (stateCurrency._id && optionsPermissions.includes(EDITAR))
        )"
        variant="primary"
        icon-button="SaveIcon"
        :loading="stateCurrency.loading"
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
  MODAL_ID, titleNotificationCurrency, stateCurrency, clearStateCurrency, routeNameCurrency,
} from '../ServicesCurrency/useVariablesCurrency'
import { loadItemsCurrency, sendCurrency } from '../ServicesCurrency/useServicesCurrency'

export default {
  name: 'ModalSaveCurrency',
  components: {
    BModal,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    ButtonComponent,
    BFormCheckbox,
    FieldSetComponent,
    ValidationObserver,
    ValidationProvider,
  },
  setup(props, context) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameCurrency]) {
        return store.state.rolesAndPermissions.options[routeNameCurrency]
      }
      return []
    })

    const sendForm = async (actionSend = null, loading = true) => {
      if (!validatePermission(optionsPermissions.value, !stateCurrency.value._id ? GUARDAR : EDITAR, titleNotificationCurrency)) return false
      const successValidationCurrency = await context.refs['validation-currency'].validate()
      if (!successValidationCurrency) return false
      if (loading) stateCurrency.value.loading = true
      const { status, data } = await sendCurrency(actionSend || (stateCurrency.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateCurrency.value.loading = false
      if (!status) return false
      stateCurrency.value._id = data.id
      clearStateCurrency()
      document.getElementById('currency-moneda').focus()
      context.refs['validation-currency'].reset()
      await loadItemsCurrency()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationCurrency,
      stateCurrency,
      sendForm,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
