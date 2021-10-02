<template>
  <b-modal
    :id="MODAL_ID"
    centered
    :title="`${stateServiceType._id ? 'Modificar' : 'Registrar'} ${titleNotificationServiceType}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-service-type"
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
                label-for="service-type-name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nombre"
                  rules="required|min:3"
                >
                  <b-form-input
                    id="service-type-name"
                    v-model.trim="stateServiceType.nombre"
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
        v-if="(
          (!stateServiceType._id && optionsPermissions.includes(GUARDAR))
          || (stateServiceType._id && optionsPermissions.includes(EDITAR))
        )"
        variant="primary"
        icon-button="SaveIcon"
        :loading="stateServiceType.loading"
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
  MODAL_ID, titleNotificationServiceType, stateServiceType, clearStateServiceType, routeNameServiceType,
} from '../ServicesServiceType/useVariablesServiceType'
import { loadItemsServiceType, sendServiceType } from '../ServicesServiceType/useServicesServiceType'

export default {
  name: 'ModalSaveServiceType',
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
      if (store.state.rolesAndPermissions.options[routeNameServiceType]) {
        return store.state.rolesAndPermissions.options[routeNameServiceType]
      }
      return []
    })

    const sendForm = async (actionSend = null, loading = true) => {
      if (!validatePermission(optionsPermissions.value, !stateServiceType.value._id ? GUARDAR : EDITAR, titleNotificationServiceType)) return false
      const successValidationServiceType = await context.refs['validation-service-type'].validate()
      if (!successValidationServiceType) return false
      if (loading) stateServiceType.value.loading = true
      const { status, data } = await sendServiceType(actionSend || (stateServiceType.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateServiceType.value.loading = false
      if (!status) return false
      stateServiceType.value._id = data.id
      clearStateServiceType()
      document.getElementById('service-type-name').focus()
      context.refs['validation-service-type'].reset()
      await loadItemsServiceType()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationServiceType,
      stateServiceType,
      sendForm,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
