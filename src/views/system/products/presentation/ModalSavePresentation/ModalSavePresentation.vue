<template>
  <b-modal
    :id="MODAL_ID"
    centered
    :title="`${statePresentation._id ? 'Modificar' : 'Registrar'} ${titleNotificationPresentation}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-presentation"
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
                label-for="presentation-name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nombre"
                  rules="required|min:3"
                >
                  <b-form-input
                    id="presentation-name"
                    v-model.trim="statePresentation.nombre"
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
          (!statePresentation._id && optionsPermissions.includes(GUARDAR))
          || (statePresentation._id && optionsPermissions.includes(EDITAR))
        )"
        variant="primary"
        icon-button="SaveIcon"
        :loading="statePresentation.loading"
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
  MODAL_ID, titleNotificationPresentation, statePresentation, clearStatePresentation, routeNamePresentation,
} from '../ServicesPresentation/useVariablesPresentation'
import { loadItemsPresentation, sendPresentation } from '../ServicesPresentation/useServicesPresentation'

export default {
  name: 'ModalSavePresentation',
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
      if (store.state.rolesAndPermissions.options[routeNamePresentation]) {
        return store.state.rolesAndPermissions.options[routeNamePresentation]
      }
      return []
    })

    const sendForm = async (actionSend = null, loading = true) => {
      if (!validatePermission(optionsPermissions.value, !statePresentation.value._id ? GUARDAR : EDITAR, titleNotificationPresentation)) return false
      const successValidationPresentation = await context.refs['validation-presentation'].validate()
      if (!successValidationPresentation) return false
      if (loading) statePresentation.value.loading = true
      const { status, data } = await sendPresentation(actionSend || (statePresentation.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) statePresentation.value.loading = false
      if (!status) return false
      statePresentation.value._id = data.id
      clearStatePresentation()
      document.getElementById('presentation-name').focus()
      context.refs['validation-presentation'].reset()
      await loadItemsPresentation()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationPresentation,
      statePresentation,
      sendForm,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
