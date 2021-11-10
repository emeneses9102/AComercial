<template>
  <b-modal
    :id="MODAL_ID"
    centered
    size="lg"
    :title="`${stateStorage._id ? 'Modificar' : 'Registrar'} ${titleNotificationStorage}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-storage"
    >
      <header-storage />
    </validation-observer>
    <validation-observer
      ref="validation-sub-storage"
    >
      <detail
        class="mt-1"
        :validate-sub-storage="validateSubStorage"
        :reset-sub-storage="resetSubStorage"
        :send-header="sendForm"
      />
    </validation-observer>
    <detail-table
      class="mt-1"
      :reset-sub-storage="resetSubStorage"
    />

    <template #modal-footer>
      <button-component
        variant="outline-primary"
        icon-button="DeleteIcon"
        text-default="Limpiar"
        :method-function="()=>clearFormSave()"
      />
      <button-component
        v-if="(
          (!stateStorage._id && optionsPermissions.includes(GUARDAR))
          || (stateStorage._id && optionsPermissions.includes(EDITAR))
        )"
        variant="primary"
        icon-button="SaveIcon"
        :loading="stateStorage.loading"
        text-default="Guardar"
        :method-function="()=>sendForm()"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal,
} from 'bootstrap-vue'
import { ValidationObserver } from 'vee-validate'
import { inject } from '@vue/composition-api'
import {
  EDITAR,
  GUARDAR,
} from '@/options'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { validatePermission } from '@/helpers/validateActions'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import HeaderStorage from './HeaderStorage.vue'
import Detail from './Detail.vue'
import DetailTable from './DetailTable.vue'
import {
  MODAL_ID, titleNotificationStorage, stateStorage, clearStateStorage,
} from '../ServicesStorage/useVariablesStorage'
import { loadItemsStorage, sendStorage } from '../ServicesStorage/useServicesStorage'
import {
  clearDataTableSubStorage, clearFiltersSubStorage, clearStateSubStorage, serverQuerySubStorage,
} from '../ServicesSubStorage/useVariablesSubStorage'

export default {
  name: 'ModalSaveStorage',
  components: {
    BModal,
    HeaderStorage,
    Detail,
    DetailTable,
    ButtonComponent,
    ValidationObserver,
  },
  setup(props, context) {
    // Propiedad computada para almacenar los permisos por rol
    const optionsPermissions = inject('optionsPermissions')

    // Función para limpiar el formulario
    const clearFormSave = () => {
      clearStateStorage()
      clearStateSubStorage()
      clearFiltersSubStorage()
      clearDataTableSubStorage()
      context.refs['validation-storage'].reset()
      context.refs['validation-sub-storage'].reset()
    }

    // Función para validar el formulario sub almacen
    const validateSubStorage = async () => {
      const success = await context.refs['validation-sub-storage'].validate()
      return success
    }

    // Función para resetear la validacion del formulario sub almacen
    const resetSubStorage = () => {
      context.refs['validation-sub-storage'].reset()
    }

    // Función para enviar los datos del formulario a la API
    const sendForm = async (actionSend = null, loading = true) => {
      if (!validatePermission(optionsPermissions.value, !stateStorage.value._id ? GUARDAR : EDITAR, titleNotificationStorage)) return false
      const successValidationStorage = await context.refs['validation-storage'].validate()
      if (!successValidationStorage) return false
      if (loading) stateStorage.value.loading = true
      const { status, data } = await sendStorage(actionSend || (stateStorage.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateStorage.value.loading = false
      if (!status) return false
      stateStorage.value._id = data.id
      serverQuerySubStorage.value.indice = data.id
      loadItemsStorage()
      return true
    }

    // Retorno de variables y funciones que se utilizaran en el template
    return {
      MODAL_ID,
      titleNotificationStorage,
      stateStorage,
      validateSubStorage,
      resetSubStorage,
      clearFormSave,
      sendForm,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
