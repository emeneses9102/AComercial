<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <!-- Login v1 -->
      <b-card class="mb-0 py-2">
        <b-link class="brand-logo">
          <!-- <vuexy-logo /> -->
          <b-img
            :src="require('@/assets/images/logo/ico-simsac.png')"
            alt="Simsac Perú"
          />
          <h2 class="brand-text text-primary ml-1 title-login">
            ERPSimsac
          </h2>
        </b-link>

        <b-card-title class="mb-1">
          Bienvenido al Sistema! 👋
        </b-card-title>
        <b-card-text class="mb-2">
          Por favor, ingrese sus credenciales para acceder
        </b-card-text>

        <!-- Formulario -->
        <validation-observer ref="loginForm">
          <b-form
            class="auth-login-form mt-2"
            @submit.prevent
          >

            <!-- Usuario -->
            <b-form-group
              label-for="login-user"
              label="Usuario"
            >
              <validation-provider
                #default="{ errors }"
                name="Usuario"
                rules="required"
              >
                <b-form-input
                  id="login-user"
                  v-model="authentication.usuario"
                  name="login-user"
                  :state="errors.length > 0 ? false:null"
                  :disabled="authentication.loading"
                  autofocus
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- Contraseña -->
            <b-form-group>
              <div class="d-flex justify-content-between">
                <label for="login-password">Contraseña</label>
              </div>
              <validation-provider
                #default="{ errors }"
                name="Contraseña"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="login-password"
                    v-model="authentication.clave"
                    :type="passwordFieldType"
                    class="form-control-merge"
                    :state="errors.length > 0 ? false:null"
                    :disabled="authentication.loading"
                    name="login-password"
                    placeholder="·················"
                  />

                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="passwordToggleIcon"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- checkbox -->
            <b-form-group>
              <b-form-checkbox
                id="remember-me"
                v-model="authentication.remember"
                name="checkbox-1"
              >
                Recuerdame
              </b-form-checkbox>
            </b-form-group>

            <!-- Botón ingresar -->
            <b-button
              variant="primary"
              type="submit"
              block
              :disabled="authentication.loading"
              @click="sendForm"
            >
              <template v-if="authentication.loading">
                <div class="d-flex align-items-center justify-content-center">
                  <b-spinner
                    class="mr-75"
                    small
                  />
                  <span>Cargando...</span>
                </div>
              </template>
              <template v-else>
                Ingresar
              </template>
            </b-button>
          </b-form>
        </validation-observer>

      </b-card>
      <!-- /Login v1 -->
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BButton, BForm, BFormInput, BFormGroup, BCard, BLink, BCardTitle, BCardText, BInputGroup, BInputGroupAppend, BFormCheckbox, BImg, BSpinner,
} from 'bootstrap-vue'
import { required } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import authenticationServices from './authenticationServices'

export default {
  components: {
    // BSV
    BButton,
    BForm,
    BFormInput,
    BFormGroup,
    BCard,
    BCardTitle,
    BLink,
    BCardText,
    BInputGroup,
    BInputGroupAppend,
    BFormCheckbox,
    BImg,
    BSpinner,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      required,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  setup(props, context) {
    const {
      authentication,
      login,
    } = authenticationServices()
    const sendForm = async () => {
      const success = await context.refs.loginForm.validate()
      if (success) login()
    }
    return {
      authentication,
      sendForm,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
.title-login {
  margin-top: auto;
  margin-bottom: auto;
}
</style>
