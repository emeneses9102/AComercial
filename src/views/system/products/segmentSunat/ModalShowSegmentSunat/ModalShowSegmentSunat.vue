<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    :title="`Ver ${titleNotificationSegmentSunat}`"
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
              label-for="segment-sunat-code"
            >
              <b-form-input
                id="segment-sunat-code"
                v-model.trim="stateSegmentSunat.codSegmento"
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
              label-for="segment-sunat-name"
            >
              <b-form-input
                id="segment-sunat-name"
                v-model.trim="stateSegmentSunat.nombre"
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
import { MODAL_ID, titleNotificationSegmentSunat, stateSegmentSunat } from '../ServicesSegmentSunat/useVariablesSegmentSunat'

export default {
  name: 'ModalShowSegmentSunat',
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
      titleNotificationSegmentSunat,
      stateSegmentSunat,
    }
  },
}
</script>
