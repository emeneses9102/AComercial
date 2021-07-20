<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    :title="`Ver ${titleNotificationOption}`"
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
              label-for="option-name"
            >
              <b-form-input
                id="option-name"
                v-model.trim="stateOption.nombre"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Icono -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Icono"
              label-for="option-icon"
            >
              <b-form-input
                id="option-icon"
                v-model.trim="stateOption.icono"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Etiqueta -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Etiqueta"
              label-for="option-tag"
            >
              <b-form-input
                id="option-tag"
                v-model.trim="stateOption.etiqueta"
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
import { MODAL_ID, titleNotificationOption, stateOption } from '../ServicesOption/useVariablesOption'

export default {
  name: 'ModalShowOption',
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
      titleNotificationOption,
      stateOption,
    }
  },
}
</script>
