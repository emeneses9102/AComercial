<template>
  <b-modal
    :id="MODAL_ID"
    centered
    :title="`${stateStorageType._id ? 'Modificar' : 'Registrar'} ${titleNotificationStorageType}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-storage-type"
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
                label-for="storage-type-name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nombre"
                  rules="required|min:3|max:100"
                >
                  <b-form-input
                    id="storage-type-name"
                    v-model.trim="stateStorageType.nombre"
                    type="text"
                    maxlength="100"
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
        icon-button="DeleteIcon"
        text-default="Limpiar"
        :method-function="()=>clearFormSave()"
      />
      <button-component
        v-if="(
          (!stateStorageType._id && optionsPermissions.includes(GUARDAR))
          || (stateStorageType._id && optionsPermissions.includes(EDITAR))
        )"
        variant="primary"
        icon-button="SaveIcon"
        :loading="stateStorageType.loading"
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
  MODAL_ID, titleNotificationStorageType, stateStorageType, clearStateStorageType, routeNameStorageType,
} from '../ServicesStorageType/useVariablesStorageType'
import { loadItemsStorageType, sendStorageType } from '../ServicesStorageType/useServicesStorageType'

export default {
  name: 'ModalSaveStorageType',
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
    // Propiedad computada para almacenar los permisos por rol
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameStorageType]) {
        return store.state.rolesAndPermissions.options[routeNameStorageType]
      }
      return []
    })

    // Función para limpiar el formulario
    const clearFormSave = () => {
      clearStateStorageType()
      context.refs['validation-storage-type'].reset()
    }

    // Función para enviar los datos del formulario a la API
    const sendForm = async (actionSend = null, loading = true) => {
      if (!validatePermission(optionsPermissions.value, !stateStorageType.value._id ? GUARDAR : EDITAR, titleNotificationStorageType)) return false
      const successValidationStorageType = await context.refs['validation-storage-type'].validate()
      if (!successValidationStorageType) return false
      if (loading) stateStorageType.value.loading = true
      const { status, data } = await sendStorageType(actionSend || (stateStorageType.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateStorageType.value.loading = false
      if (!status) return false
      stateStorageType.value._id = data.id
      clearStateStorageType()
      document.getElementById('storage-type-name').focus()
      context.refs['validation-storage-type'].reset()
      await loadItemsStorageType()
      return true
    }

    // Retorno de variables y funciones que se utilizaran en el template
    return {
      MODAL_ID,
      titleNotificationStorageType,
      stateStorageType,
      sendForm,
      clearFormSave,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
