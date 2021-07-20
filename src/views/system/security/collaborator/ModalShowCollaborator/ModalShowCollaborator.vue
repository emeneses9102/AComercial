<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    :title="`Ver ${titleNotificationCollaborator}`"
    no-close-on-backdrop
    size="lg"
  >

    <b-form>
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
                  label="Apellido Paterno"
                  label-for="collaborator-paternal"
                >
                  <b-form-input
                    id="collaborator-paternal"
                    v-model.trim="stateCollaborator.apellidoPaterno"
                    type="text"
                    readonly
                  />
                </b-form-group>
              </b-col>

              <!-- Ape Materno -->
              <b-col
                cols="12"
              >
                <b-form-group
                  label="Apellido Materno"
                  label-for="collaborator-maternal"
                >
                  <b-form-input
                    id="collaborator-maternal"
                    v-model.trim="stateCollaborator.apellidoMaterno"
                    type="text"
                    readonly
                  />
                </b-form-group>
              </b-col>

              <!-- Nombre -->
              <b-col
                cols="12"
              >
                <b-form-group
                  label="Nombre"
                  label-for="collaborator-name"
                >
                  <b-form-input
                    id="collaborator-name"
                    v-model.trim="stateCollaborator.nombre"
                    type="text"
                    readonly
                  />
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
          <b-col>
            <upload-photo-component
              :image="stateCollaborator.imagen"
              :mode-show="true"
            />
          </b-col>
        </b-row>
      </field-set-component>
    </b-form>

    <template #modal-footer>
      <button-component
        variant="primary"
        icon-button="PowerIcon"
        text-default="Cerrar"
        :method-function="()=>$bvModal.hide(`${MODAL_ID}-show`)"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal, BForm, BRow, BCol, BFormGroup, BFormInput,
} from 'bootstrap-vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import UploadPhotoComponent from '@/components/UploadPhotoComponent/UploadPhotoComponent.vue'
import { MODAL_ID, titleNotificationCollaborator, stateCollaborator } from '../ServicesCollaborator/useVariablesCollaborator'

export default {
  name: 'ModalShowCollaborator',
  components: {
    BModal,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    FieldSetComponent,
    UploadPhotoComponent,
    ButtonComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationCollaborator,
      stateCollaborator,
    }
  },
}
</script>
