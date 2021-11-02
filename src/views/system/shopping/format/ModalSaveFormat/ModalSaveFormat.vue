<template>
  <b-modal
    :id="MODAL_ID"
    centered
    :title="`${stateFormat._id ? 'Modificar' : 'Registrar'} ${titleNotificationFormat}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-format"
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
                label-for="format-name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nombre"
                  rules="required|min:3"
                >
                  <b-form-input
                    id="format-name"
                    v-model.trim="stateFormat.nombre"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                    @keydown.enter="()=>sendForm()"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- Título -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Título *"
                label-for="format-title"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Título"
                  rules="required|min:3"
                >
                  <b-form-input
                    id="format-title"
                    v-model.trim="stateFormat.titulo"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                    @keydown.enter="()=>sendForm()"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- Texto -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Texto *"
                label-for="format-text"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Texto"
                  rules="required|min:3"
                >
                  <b-form-input
                    id="format-text"
                    v-model.trim="stateFormat.texto"
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
          (!stateFormat._id && optionsPermissions.includes(GUARDAR))
          || (stateFormat._id && optionsPermissions.includes(EDITAR))
        )"
        variant="primary"
        icon-button="SaveIcon"
        :loading="stateFormat.loading"
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
  MODAL_ID, titleNotificationFormat, stateFormat, clearStateFormat, routeNameFormat,
} from '../ServicesFormat/useVariablesFormat'
import { loadItemsFormat, sendFormat } from '../ServicesFormat/useServicesFormat'

export default {
  name: 'ModalSaveFormat',
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
      if (store.state.rolesAndPermissions.options[routeNameFormat]) {
        return store.state.rolesAndPermissions.options[routeNameFormat]
      }
      return []
    })

    const sendForm = async (actionSend = null, loading = true) => {
      if (!validatePermission(optionsPermissions.value, !stateFormat.value._id ? GUARDAR : EDITAR, titleNotificationFormat)) return false
      const successValidationFormat = await context.refs['validation-format'].validate()
      if (!successValidationFormat) return false
      if (loading) stateFormat.value.loading = true
      const { status, data } = await sendFormat(actionSend || (stateFormat.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateFormat.value.loading = false
      if (!status) return false
      stateFormat.value._id = data.id
      clearStateFormat()
      document.getElementById('format-name').focus()
      context.refs['validation-format'].reset()
      await loadItemsFormat()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationFormat,
      stateFormat,
      sendForm,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
