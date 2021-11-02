<template>
  <b-modal
    :id="MODAL_ID"
    centered
    :title="`${stateArea._id ? 'Modificar' : 'Registrar'} ${titleNotificationArea}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-area"
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
                label-for="area-name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nombre"
                  rules="required|min:3"
                >
                  <b-form-input
                    id="area-name"
                    v-model.trim="stateArea.nombre"
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
          (!stateArea._id && optionsPermissions.includes(GUARDAR))
          || (stateArea._id && optionsPermissions.includes(EDITAR))
        )"
        variant="primary"
        icon-button="SaveIcon"
        :loading="stateArea.loading"
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
  MODAL_ID, titleNotificationArea, stateArea, clearStateArea, routeNameArea,
} from '../ServicesArea/useVariablesArea'
import { loadItemsArea, sendArea } from '../ServicesArea/useServicesArea'

export default {
  name: 'ModalSaveArea',
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
      if (store.state.rolesAndPermissions.options[routeNameArea]) {
        return store.state.rolesAndPermissions.options[routeNameArea]
      }
      return []
    })

    const sendForm = async (actionSend = null, loading = true) => {
      if (!validatePermission(optionsPermissions.value, !stateArea.value._id ? GUARDAR : EDITAR, titleNotificationArea)) return false
      const successValidationArea = await context.refs['validation-area'].validate()
      if (!successValidationArea) return false
      if (loading) stateArea.value.loading = true
      const { status, data } = await sendArea(actionSend || (stateArea.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateArea.value.loading = false
      if (!status) return false
      stateArea.value._id = data.id
      clearStateArea()
      document.getElementById('area-name').focus()
      context.refs['validation-area'].reset()
      await loadItemsArea()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationArea,
      stateArea,
      sendForm,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
