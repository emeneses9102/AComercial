<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    :title="`Ver ${titleNotificationStorageType}`"
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
              label-for="storage-type-name"
            >
              <b-form-input
                id="storage-type-name"
                v-model.trim="stateStorageType.nombre"
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
import { MODAL_ID, titleNotificationStorageType, stateStorageType } from '../ServicesStorageType/useVariablesStorageType'

export default {
  name: 'ModalShowStorageType',
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
    // Retorno de variables y funciones que se utilizaran en el template
    return {
      MODAL_ID,
      titleNotificationStorageType,
      stateStorageType,
    }
  },
}
</script>
