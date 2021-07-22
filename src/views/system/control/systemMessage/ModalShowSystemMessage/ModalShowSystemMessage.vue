<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    :title="`Ver ${titleNotificationSystemMessage}`"
    no-close-on-backdrop
  >

    <b-form>
      <field-set-component legend="Datos Generales">
        <b-row>
          <!-- codigo -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Código *"
              label-for="system-message-codigo"
            >
              <b-form-input
                id="system-message-codigo"
                v-model.number="stateSystemMessage._id"
                type="number"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- SQLEstado -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="SQL Estado *"
              label-for="system-message-sqlEstado"
            >
              <b-form-input
                id="system-message-sqlEstado"
                v-model.trim="stateSystemMessage.sqlEstado"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- msjError -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Mensaje Error *"
              label-for="system-message-msjError"
            >
              <b-form-input
                id="system-message-msjError"
                v-model.trim="stateSystemMessage.msjError"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- mensaje -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Mensaje *"
              label-for="system-message-mensaje"
            >
              <b-form-input
                id="system-message-mensaje"
                v-model.trim="stateSystemMessage.mensaje"
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
import { MODAL_ID, titleNotificationSystemMessage, stateSystemMessage } from '../ServicesSystemMessage/useVariablesSystemMessage'

export default {
  name: 'ModalShowSystemMessage',
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
      titleNotificationSystemMessage,
      stateSystemMessage,
    }
  },
}
</script>
