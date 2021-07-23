<template>
  <b-modal
    :id="modalId"
    centered
    title="Cambiar clave"
    no-close-on-backdrop
    @show="clearChangePassowrd"
  >
    <validation-observer
      ref="validation-change-password"
    >
      <b-form @submit.prevent="">
        <field-set-component legend="Datos del Usuario Logeado">
          <b-row>
            <!-- Usuario Loageado -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Nombre"
                label-for="change-password-username"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nombre"
                  rules="required"
                >
                  <b-form-input
                    id="change-password-username"
                    v-model.trim="$store.state.authentication.user.fullname"
                    type="text"
                    readonly
                    tabindex="-1"
                    :state="errors.length > 0 ? false:null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- Clave -->
            <input-password-component
              v-model="stateChangePassword.claveUsuarioLoageado"
              rules-validation="required"
              text-field="Clave"
              :event-enter="sendForm"
              :auto-focus="true"
            />
          </b-row>
        </field-set-component>
        <field-set-component
          class="mt-1"
          legend="Datos de la nueva contraseña"
        >
          <b-row>
            <!-- Usuario a modificar -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Usuario a Modificar"
                label-for="change-password-user-modify"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Usuario"
                  rules="required"
                >
                  <b-form-input
                    id="change-password-user-modify"
                    v-model.trim="userToChangePassword"
                    type="text"
                    readonly
                    tabindex="-1"
                    :state="errors.length > 0 ? false:null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- Nueva Clave -->
            <input-password-component
              v-model="stateChangePassword.clave"
              rules-validation="required"
              text-field="Nueva Clave"
              :event-enter="sendForm"
            />
            <!-- Confirmar Clave -->
            <input-password-component
              v-model="stateChangePassword.confirmarClave"
              rules-validation="required|confirmClave"
              text-field="Confirmar Clave"
              :event-enter="sendForm"
            />
          </b-row>
        </field-set-component>
      </b-form>
    </validation-observer>

    <template #modal-footer>
      <button-component
        variant="outline-primary"
        icon-button="PowerIcon"
        text-default="Cerrar"
        :method-function="()=>$bvModal.hide(modalId)"
      />
      <button-component
        variant="primary"
        icon-button="SaveIcon"
        text-default="Guardar"
        :method-function="sendForm"
        :loading="stateChangePassword.loading"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal, BForm, BRow, BCol, BFormGroup, BFormInput,
} from 'bootstrap-vue'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import store from '@/store'
import { toRef } from '@vue/composition-api'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import InputPasswordComponent from '../InputPasswordComponent/InputPasswordComponent.vue'
import { stateChangePassword, clearChangePassowrd } from './useVariablesChangePassword'
import { sendChangePassword } from './useServicesChangePassword'

export default {
  name: 'ModalChangePassword',
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
    InputPasswordComponent,
  },
  props: {
    modalId: {
      type: String,
      required: true,
      default: '',
    },
    id: {
      type: Number,
      required: true,
      default: 0,
    },
    userToChangePassword: {
      type: String,
      required: true,
      default: '',
    },
  },
  created() {
    // Extender reglas de validación personalizando el mensaje en caso de no pasar la validación
    extend('confirmClave', {
      validate: value => value === this.stateChangePassword.clave,
      message: 'No coinciden las claves',
    })
  },
  setup(props, context) {
    const _id = toRef(props, 'id')

    const sendForm = async () => {
      const successValidationChangePassword = await context.refs['validation-change-password'].validate()
      if (!successValidationChangePassword) return false
      stateChangePassword.value.usuario = store.state.authentication.user.usuario
      stateChangePassword.value._id = _id
      const status = await sendChangePassword()
      if (!status) return false
      context.root.$bvModal.hide(props.modalId)
      return true
    }

    return {
      stateChangePassword,
      clearChangePassowrd,
      sendForm,
    }
  },
}
</script>
