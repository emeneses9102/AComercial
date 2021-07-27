<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    :title="`Ver ${titleNotificationClassSunat}`"
    no-close-on-backdrop
  >

    <b-form>
      <field-set-component legend="Datos Generales">
        <b-row>
          <!-- Código Familia -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Código Familia"
              label-for="class-sunat-family-code"
            >
              <b-form-input
                id="class-sunat-family-code"
                v-model.trim="stateClassSunat.codFamilia"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- Código Clase -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Código Clase"
              label-for="class-sunat-code"
            >
              <b-form-input
                id="class-sunat-code"
                v-model.trim="stateClassSunat.codClase"
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
              label-for="class-sunat-name"
            >
              <b-form-input
                id="class-sunat-name"
                v-model.trim="stateClassSunat.nombre"
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
import { MODAL_ID, titleNotificationClassSunat, stateClassSunat } from '../ServicesClassSunat/useVariablesClassSunat'

export default {
  name: 'ModalShowClassSunat',
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
      titleNotificationClassSunat,
      stateClassSunat,
    }
  },
}
</script>
