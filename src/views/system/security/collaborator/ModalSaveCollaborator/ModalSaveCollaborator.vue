<template>
  <b-modal
    :id="MODAL_ID"
    centered
    :title="`${stateCollaborator._id ? 'Modificar' : 'Registrar'} ${titleNotificationCollaborator}`"
    no-close-on-backdrop
    size="lg"
  >
    <validation-observer
      ref="validation-collaborator"
    >
      <b-form @submit.prevent="">
        <field-set-component legend="Datos Generales">
          <b-row>
            <b-col
              cols="12"
              md="6"
              lg="8"
            >
              <b-row>
                <!-- Ape Paterno -->
                <b-col
                  cols="12"
                >
                  <b-form-group
                    label="Apellido Paterno *"
                    label-for="collaborator-paternal"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Apellido Paterno"
                      rules="required|min:3"
                    >
                      <b-form-input
                        id="collaborator-paternal"
                        v-model.trim="stateCollaborator.apellidoPaterno"
                        type="text"
                        :state="errors.length > 0 ? false:null"
                        @keydown.enter="()=>sendForm()"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <!-- Ape Materno -->
                <b-col
                  cols="12"
                >
                  <b-form-group
                    label="Apellido Materno *"
                    label-for="collaborator-maternal"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Apellido Materno"
                      rules="required|min:3"
                    >
                      <b-form-input
                        id="collaborator-maternal"
                        v-model.trim="stateCollaborator.apellidoMaterno"
                        type="text"
                        :state="errors.length > 0 ? false:null"
                        @keydown.enter="()=>sendForm()"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <!-- Nombre -->
                <b-col
                  cols="12"
                >
                  <b-form-group
                    label="Nombre *"
                    label-for="collaborator-name"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Nombre"
                      rules="required|min:3"
                    >
                      <b-form-input
                        id="collaborator-name"
                        v-model.trim="stateCollaborator.nombre"
                        type="text"
                        :state="errors.length > 0 ? false:null"
                        @keydown.enter="()=>sendForm()"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
            <b-col
              cols="12"
              md="6"
              lg="4"
            >
              <upload-photo-component
                :image.sync="stateCollaborator.imagen"
              />
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
        :loading="stateCollaborator.loading"
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
import UploadPhotoComponent from '@/components/UploadPhotoComponent/UploadPhotoComponent.vue'
import {
  MODAL_ID, titleNotificationCollaborator, stateCollaborator, clearStateCollaborator,
} from '../ServicesCollaborator/useVariablesCollaborator'
import { loadItemsCollaborator, sendCollaborator } from '../ServicesCollaborator/useServicesCollaborator'

export default {
  name: 'ModalSaveCollaborator',
  components: {
    BModal,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    ButtonComponent,
    FieldSetComponent,
    UploadPhotoComponent,
    ValidationObserver,
    ValidationProvider,
  },
  setup(props, context) {
    const sendForm = async (actionSend = null, loading = true) => {
      const successValidationCollaborator = await context.refs['validation-collaborator'].validate()
      if (!successValidationCollaborator) return false
      if (loading) stateCollaborator.value.loading = true
      const { status, data } = await sendCollaborator(actionSend || (stateCollaborator.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateCollaborator.value.loading = false
      if (!status) return false
      stateCollaborator.value._id = data.id
      clearStateCollaborator()
      document.getElementById('collaborator-paternal').focus()
      context.refs['validation-collaborator'].reset()
      await loadItemsCollaborator()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationCollaborator,
      stateCollaborator,
      sendForm,
    }
  },
}
</script>
