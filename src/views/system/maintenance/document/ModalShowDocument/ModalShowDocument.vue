<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    :title="`Ver ${titleNotificationDocument}`"
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
              label="Nombre"
              label-for="document-name"
            >
              <b-form-input
                id="document-name"
                v-model.trim="stateDocument.nombre"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- Codigo Sunat -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Código Sunat"
              label-for="document-company-name"
            >
              <b-form-input
                id="document-company-name"
                v-model.trim="stateDocument.codigo_sunat"
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
import { MODAL_ID, titleNotificationDocument, stateDocument } from '../ServicesDocument/useVariablesDocument'

export default {
  name: 'ModalShowDocument',
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
      titleNotificationDocument,
      stateDocument,
    }
  },
}
</script>
