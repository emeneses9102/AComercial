<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    :title="`Ver ${titleNotificationUniqueCodeSunat}`"
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
              label-for="unique-code-sunat-segment-code"
            >
              <b-form-input
                id="unique-code-sunat-segment-code"
                v-model.trim="stateUniqueCodeSunat.codSegmento"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- Nombre Segmento -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Nombre Segmento"
              label-for="unique-code-sunat-segment-name"
            >
              <b-form-input
                id="unique-code-sunat-segment-name"
                v-model.trim="stateUniqueCodeSunat.nombreSegmento"
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
              label-for="unique-code-sunat-family-code"
            >
              <b-form-input
                id="unique-code-sunat-family-code"
                v-model.trim="stateUniqueCodeSunat.codFamilia"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- Nombre Familia -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Nombre Familia"
              label-for="unique-code-sunat-family-name"
            >
              <b-form-input
                id="unique-code-sunat-family-name"
                v-model.trim="stateUniqueCodeSunat.nombreFamilia"
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
              label-for="unique-code-sunat-class-code"
            >
              <b-form-input
                id="unique-code-sunat-class-code"
                v-model.trim="stateUniqueCodeSunat.codClase"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- Nombre Clase -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Nombre Clase"
              label-for="unique-code-sunat-class-name"
            >
              <b-form-input
                id="unique-code-sunat-class-name"
                v-model.trim="stateUniqueCodeSunat.nombreClase"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- Código Producto -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Código Producto"
              label-for="unique-code-sunat-product-code"
            >
              <b-form-input
                id="unique-code-sunat-product-code"
                v-model.trim="stateUniqueCodeSunat.codProducto"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- Nombre Producto -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Nombre Producto"
              label-for="unique-code-sunat-product-name"
            >
              <b-form-input
                id="unique-code-sunat-product-name"
                v-model.trim="stateUniqueCodeSunat.nombreProducto"
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
import { MODAL_ID, titleNotificationUniqueCodeSunat, stateUniqueCodeSunat } from '../ServicesUniqueCodeSunat/useVariablesUniqueCodeSunat'

export default {
  name: 'ModalShowUniqueCodeSunat',
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
      titleNotificationUniqueCodeSunat,
      stateUniqueCodeSunat,
    }
  },
}
</script>
