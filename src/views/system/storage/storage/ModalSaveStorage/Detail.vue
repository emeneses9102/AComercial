<template>
  <field-set-component legend="Sub Almacén">
    <b-form
      @submit.prevent="sendForm"
      @reset="clearStateSubStorage"
    >
      <b-row>
        <!-- Nombre -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Nombre *"
            label-for="sub-storage-name"
          >
            <validation-provider
              #default="{ errors }"
              name="Nombre Detalle"
              rules="required|min:3|max:100"
            >
              <b-form-input
                id="sub-storage-name"
                v-model.trim="stateSubStorage.nombre"
                type="text"
                maxlength="100"
                :state="errors.length > 0 ? false:null"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <!-- Ubicacipin -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Ubicación"
            label-for="sub-storage-location"
          >
            <validation-provider
              #default="{ errors }"
              name="Ubicación"
              rules="max:100"
            >
              <b-form-input
                id="sub-storage-location"
                v-model.trim="stateSubStorage.ubicacion"
                type="text"
                maxlength="100"
                :state="errors.length > 0 ? false:null"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col
          cols="12"
        >
          <div class="d-flex flex-wrap justify-content-end">
            <button-component
              type="reset"
              variant="outline-primary"
              text-default="Limpiar"
              icon-button="DeleteIcon"
              :method-function="resetSubStorage"
            />
            <button-component
              v-if="stateSubStorage._id && optionsPermissions.includes(EDITAR)"
              type="submit"
              variant="success"
              text-default="Modificar"
              icon-button="RefreshCwIcon"
              :loading="stateSubStorage.loading"
            />
            <button-component
              v-else-if="!stateSubStorage._id && optionsPermissions.includes(GUARDAR)"
              type="submit"
              variant="primary"
              text-default="Agregar"
              icon-button="PlusCircleIcon"
              :loading="stateSubStorage.loading"
            />
          </div>
        </b-col>
      </b-row>
    </b-form>
  </field-set-component>
</template>

<script>
import {
  BForm, BRow, BCol, BFormGroup, BFormInput,
} from 'bootstrap-vue'
import { inject } from '@vue/composition-api'
import { ValidationProvider } from 'vee-validate'
import {
  EDITAR,
  GUARDAR,
} from '@/options'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { validatePermission } from '@/helpers/validateActions'
import { stateStorage } from '../ServicesStorage/useVariablesStorage'
import { stateSubStorage, clearStateSubStorage, titleNotificationSubStorage } from '../ServicesSubStorage/useVariablesSubStorage'
import { loadItemsSubStorage, sendSubStorage } from '../ServicesSubStorage/useServicesSubStorage'

export default {
  name: 'Detail',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    ValidationProvider,
    FieldSetComponent,
    ButtonComponent,
  },
  props: {
    sendHeader: {
      type: Function,
      required: true,
    },
    validateSubStorage: {
      type: Function,
      required: true,
    },
    resetSubStorage: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    // Propiedad computada para almacenar los permisos por rol
    const optionsPermissions = inject('optionsPermissions')

    // Función para enviar los datos del formulario a la API
    const sendForm = async () => {
      if (!validatePermission(optionsPermissions.value, !stateSubStorage.value._id ? GUARDAR : EDITAR, titleNotificationSubStorage)) return

      if (!stateStorage.value._id) {
        stateSubStorage.value.loading = true
        const successValidationFeature = await props.sendHeader(ACTION_REGISTER, false)
        if (!successValidationFeature) {
          stateSubStorage.value.loading = false
          return
        }
      }

      const successValidationSubStorage = await props.validateSubStorage()
      if (!successValidationSubStorage) {
        stateSubStorage.value.loading = false
        return
      }
      const { status: statusSubStorage } = await sendSubStorage(stateSubStorage.value._id ? ACTION_UPDATE : ACTION_REGISTER)
      if (!statusSubStorage) return

      clearStateSubStorage()
      props.resetSubStorage()
      document.getElementById('sub-storage-name').focus()
      loadItemsSubStorage(1)
    }

    // Retorno de variables y funciones que se utilizaran en el template
    return {
      stateSubStorage,
      sendForm,
      clearStateSubStorage,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
