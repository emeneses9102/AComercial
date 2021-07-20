<template>
  <b-form>
    <field-set-component legend="Datos Generales">
      <b-row>
        <!-- Nombre -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Nombre"
            label-for="storage-name"
          >
            <b-form-input
              id="storage-name"
              v-model.trim="stateStorage.nombre"
              type="text"
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- Predio -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Predio"
            label-for="storage-predio"
          >
            <b-form-input
              id="storage-predio"
              v-model.trim="stateStorage.nombrePredio"
              type="text"
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- Tipo Almacén -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Tipo Almacén"
            label-for="storage-storage-type"
          >
            <b-form-input
              id="storage-storage-type"
              v-model.trim="stateStorage.nombreTipoAlmacen"
              type="text"
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- Negocio -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Negocio"
            label-for="storage-busines-unit"
          >
            <b-form-input
              id="storage-busines-unit"
              v-model.trim="stateStorage.nombreNegocio"
              type="text"
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- Observación -->
        <b-col
          cols="12"
        >
          <b-form-group
            label="Observación"
            label-for="storage-observation"
          >
            <b-form-textarea
              id="storage-observation"
              v-model="stateStorage.observacion"
              rows="3"
              no-resize
              readonly
            />
          </b-form-group>
        </b-col>
      </b-row>
    </field-set-component>
  </b-form>
</template>

<script>
import {
  BForm, BRow, BCol, BFormGroup, BFormInput, BFormTextarea,
} from 'bootstrap-vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import { stateStorage } from '../ServicesStorage/useVariablesStorage'

export default {
  name: 'HeaderStorage',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    FieldSetComponent,
  },
  setup() {
    return {
      stateStorage,
    }
  },
}
</script>
