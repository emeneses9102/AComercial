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
                  rules="required|min:3"
                >
                  <b-form-input
                    id="storage-type-name"
                    v-model.trim="stateStorageType.nombre"
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
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import {
  MODAL_ID, titleNotificationStorageType, stateStorageType, clearStateStorageType,
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
    const sendForm = async (actionSend = null, loading = true) => {
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

    return {
      MODAL_ID,
      titleNotificationStorageType,
      stateStorageType,
      sendForm,
    }
  },
}
</script>
