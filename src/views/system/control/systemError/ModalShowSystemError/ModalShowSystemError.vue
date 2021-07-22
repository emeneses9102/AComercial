<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    :title="`Ver ${titleNotificationSystemError}`"
    no-close-on-backdrop
  >

    <b-form>
      <field-set-component legend="Datos Generales">
        <b-row>

          <!-- SQLEstado -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="SQL Estado *"
              label-for="system-error-sqlEstado"
            >
              <b-form-input
                id="system-error-sqlEstado"
                v-model.trim="stateSystemError.sqlEstado"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Codigo Error -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Código *"
              label-for="system-error-codigo-error"
            >
              <b-form-input
                id="system-error-codigo-error"
                v-model.number="stateSystemError.codError"
                type="number"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Tabla -->
          <b-col
            cols="12"
            lg="4"
          >
            <b-form-group
              label="Tabla *"
              label-for="system-error-tabla"
            >
              <b-form-input
                id="system-error-tabla"
                v-model.trim="stateSystemError.tabla"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Codigo -->
          <b-col
            cols="12"
            lg="4"
          >
            <b-form-group
              label="Código *"
              label-for="system-error-codigo"
            >
              <b-form-input
                id="system-error-codigo"
                v-model.number="stateSystemError.codigo"
                type="number"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Usuario -->
          <b-col
            cols="12"
            lg="4"
          >
            <b-form-group
              label="Usuario *"
              label-for="system-error-usuario"
            >
              <b-form-input
                id="system-error-usuario"
                v-model.trim="stateSystemError.usuario"
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
              label-for="system-error-texto"
            >
              <b-form-input
                id="system-error-texto"
                v-model.trim="stateSystemError.texto"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Descripción -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Descripción *"
              label-for="system-error-descripcion"
            >
              <b-form-textarea
                id="system-error-descripcion"
                v-model="stateSystemError.descripcion"
                rows="3"
                readonly
                no-resize
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
  BModal, BForm, BRow, BCol, BFormGroup, BFormInput, BFormTextarea,
} from 'bootstrap-vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { MODAL_ID, titleNotificationSystemError, stateSystemError } from '../ServicesSystemError/useVariablesSystemError'

export default {
  name: 'ModalShowSystemError',
  components: {
    BModal,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    FieldSetComponent,
    ButtonComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationSystemError,
      stateSystemError,
    }
  },
}
</script>
