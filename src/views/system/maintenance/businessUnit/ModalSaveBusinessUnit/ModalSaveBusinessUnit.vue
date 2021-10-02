<template>
  <b-modal
    :id="MODAL_ID"
    centered
    :title="`${stateBusinessUnit._id ? 'Modificar' : 'Registrar'} ${titleNotificationBusinessUnit}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-business-unit"
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
                label-for="business-unit-name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nombre"
                  rules="required|min:3"
                >
                  <b-form-input
                    id="business-unit-name"
                    v-model.trim="stateBusinessUnit.nombre"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                    @keydown.enter="()=>sendForm()"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- Razon Social -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Razón Social"
                label-for="business-unit-company-name"
              >
                <b-form-input
                  id="business-unit-company-name"
                  v-model.trim="stateBusinessUnit.razonSocial"
                  type="text"
                />
              </b-form-group>
            </b-col>
            <!-- Ruc -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="RUC"
                label-for="business-unit-ruc"
              >
                <validation-provider
                  #default="{ errors }"
                  name="RUC"
                  rules="digits:11"
                >
                  <b-form-input
                    id="business-unit-ruc"
                    v-model.trim="stateBusinessUnit.ruc"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                    maxlength="11"
                    @keydown.enter="()=>sendForm()"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- Ruta Api -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Ruta API"
                label-for="business-unit-route-api"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Ruta API"
                  :rules="{ regex: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/ }"
                >
                  <b-form-input
                    id="business-unit-route-api"
                    v-model.trim="stateBusinessUnit.rutaApi"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                    @keydown.enter="()=>sendForm()"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- Token Api -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Token API"
                label-for="business-unit-token-api"
              >
                <b-form-input
                  id="business-unit-token-api"
                  v-model.trim="stateBusinessUnit.tokenApi"
                  type="text"
                />
              </b-form-group>
            </b-col>
            <!-- Usuario Sunat -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Usuario Sunat"
                label-for="business-unit-user-sunat"
              >
                <b-form-input
                  id="business-unit-user-sunat"
                  v-model.trim="stateBusinessUnit.usuarioSunat"
                  type="text"
                />
              </b-form-group>
            </b-col>
            <!-- Clave -->
            <input-password-component
              v-model="stateBusinessUnit.claveSunat"
              text-field="Clave"
            />
            <!-- Producción -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Producción"
                label-for="business-unit-production"
              >
                <b-form-checkbox
                  id="business-unit-production"
                  v-model="stateBusinessUnit.produccion"
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
          (!stateBusinessUnit._id && optionsPermissions.includes(GUARDAR))
          || (stateBusinessUnit._id && optionsPermissions.includes(EDITAR))
        )"
        variant="primary"
        icon-button="SaveIcon"
        :loading="stateBusinessUnit.loading"
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
import InputPasswordComponent from '@/components/InputPasswordComponent/InputPasswordComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import {
  MODAL_ID, titleNotificationBusinessUnit, stateBusinessUnit, clearStateBusinessUnit, routeNameBusinessUnit,
} from '../ServicesBusinessUnit/useVariablesBusinessUnit'
import { loadItemsBusinessUnit, sendBusinessUnit } from '../ServicesBusinessUnit/useServicesBusinessUnit'

export default {
  name: 'ModalSaveBusinessUnit',
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
    InputPasswordComponent,
  },
  setup(props, context) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameBusinessUnit]) {
        return store.state.rolesAndPermissions.options[routeNameBusinessUnit]
      }
      return []
    })

    const sendForm = async (actionSend = null, loading = true) => {
      if (!validatePermission(optionsPermissions.value, !stateBusinessUnit.value._id ? GUARDAR : EDITAR, titleNotificationBusinessUnit)) return false
      const successValidationBusinessUnit = await context.refs['validation-business-unit'].validate()
      if (!successValidationBusinessUnit) return false
      if (loading) stateBusinessUnit.value.loading = true
      const { status, data } = await sendBusinessUnit(actionSend || (stateBusinessUnit.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateBusinessUnit.value.loading = false
      if (!status) return false
      stateBusinessUnit.value._id = data.id
      clearStateBusinessUnit()
      document.getElementById('business-unit-name').focus()
      context.refs['validation-business-unit'].reset()
      await loadItemsBusinessUnit()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationBusinessUnit,
      stateBusinessUnit,
      sendForm,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
