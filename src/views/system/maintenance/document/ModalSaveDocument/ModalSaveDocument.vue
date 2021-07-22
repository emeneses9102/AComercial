<template>
  <b-modal
    :id="MODAL_ID"
    centered
    :title="`${stateDocument._id ? 'Modificar' : 'Registrar'} ${titleNotificationDocument}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-document"
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
                label-for="document-name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nombre"
                  rules="required|min:3"
                >
                  <b-form-input
                    id="document-name"
                    v-model.trim="stateDocument.nombre"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                    @keydown.enter="()=>sendForm()"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- Código Sunat -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Código Sunat"
                label-for="document-codigo-sunat"
              >
                <b-form-input
                  id="document-codigo-sunat"
                  v-model.trim="stateDocument.codigo_sunat"
                  type="text"
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
        variant="primary"
        icon-button="SaveIcon"
        :loading="stateDocument.loading"
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
  MODAL_ID, titleNotificationDocument, stateDocument, clearStateDocument,
} from '../ServicesDocument/useVariablesDocument'
import { loadItemsDocument, sendDocument } from '../ServicesDocument/useServicesDocument'

export default {
  name: 'ModalSaveDocument',
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
      const successValidationDocument = await context.refs['validation-document'].validate()
      if (!successValidationDocument) return false
      if (loading) stateDocument.value.loading = true
      const { status, data } = await sendDocument(actionSend || (stateDocument.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateDocument.value.loading = false
      if (!status) return false
      stateDocument.value._id = data.id
      clearStateDocument()
      document.getElementById('document-name').focus()
      context.refs['validation-document'].reset()
      await loadItemsDocument()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationDocument,
      stateDocument,
      sendForm,
    }
  },
}
</script>
