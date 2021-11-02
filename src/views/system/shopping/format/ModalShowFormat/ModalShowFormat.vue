<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    :title="`Ver ${titleNotificationFormat}`"
    no-close-on-backdrop
  >

    <b-form>
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
              <b-form-input
                id="format-name"
                v-model.trim="stateFormat.nombre"
                type="text"
                readonly
              />
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
              <b-form-input
                id="format-title"
                v-model.trim="stateFormat.titulo"
                type="text"
                readonly
              />
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
              <b-form-input
                id="format-text"
                v-model.trim="stateFormat.texto"
                type="text"
                readonly
              />
            </b-form-group>
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
import { MODAL_ID, titleNotificationFormat, stateFormat } from '../ServicesFormat/useVariablesFormat'

export default {
  name: 'ModalShowFormat',
  components: {
    BModal,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    FieldSetComponent,
    ButtonComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationFormat,
      stateFormat,
    }
  },
}
</script>
