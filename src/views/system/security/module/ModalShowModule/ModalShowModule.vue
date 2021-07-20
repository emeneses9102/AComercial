<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    :title="`Ver ${titleNotificationModule}`"
    no-close-on-backdrop
  >

    <b-form>
      <field-set-component legend="Datos Generales">
        <b-row>
          <!-- Modulo Superior -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Módulo Superior"
              label-for="module-super"
            >
              <b-form-input
                id="module-super"
                v-model.trim="stateModule.nombrePadre"
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
              label-for="module-name"
            >
              <b-form-input
                id="module-name"
                v-model.trim="stateModule.nombre"
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
              label-for="module-icon"
            >
              <b-form-input
                id="module-icon"
                v-model.trim="stateModule.icono"
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
import { MODAL_ID, titleNotificationModule, stateModule } from '../ServicesModule/useVariablesModule'

export default {
  name: 'ModalShowModule',
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
      titleNotificationModule,
      stateModule,
    }
  },
}
</script>
