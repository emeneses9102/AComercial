<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    :title="`Ver ${titleNotificationFamilySunat}`"
    no-close-on-backdrop
  >

    <b-form>
      <field-set-component legend="Datos Generales">
        <b-row>
          <!-- Código Segmento -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Código Segmento"
              label-for="family-sunat-segment-code"
            >
              <b-form-input
                id="family-sunat-segment-code"
                v-model.trim="stateFamilySunat.codSegmento"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- Código Familia -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Código Familia"
              label-for="family-sunat-code"
            >
              <b-form-input
                id="family-sunat-code"
                v-model.trim="stateFamilySunat.codFamilia"
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
              label-for="family-sunat-name"
            >
              <b-form-input
                id="family-sunat-name"
                v-model.trim="stateFamilySunat.nombre"
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
import { MODAL_ID, titleNotificationFamilySunat, stateFamilySunat } from '../ServicesFamilySunat/useVariablesFamilySunat'

export default {
  name: 'ModalShowFamilySunat',
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
      titleNotificationFamilySunat,
      stateFamilySunat,
    }
  },
}
</script>
