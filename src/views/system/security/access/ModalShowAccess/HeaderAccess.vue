<template>
  <b-form>
    <field-set-component legend="Datos Generales">
      <b-row>
        <!-- Rol -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Módulo"
            label-for="access-role"
          >
            <b-form-input
              id="access-role"
              v-model.trim="stateAccess.nombreRol"
              type="text"
              readonly
            />
          </b-form-group>
        </b-col>
        <!-- Módulo -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Módulo"
            label-for="access-module"
          >
            <b-form-input
              id="access-module"
              v-model.trim="stateAccess.nombreModulo"
              type="text"
              readonly
            />
          </b-form-group>
        </b-col>
        <!-- Menú -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Menú"
            label-for="access-name"
          >
            <b-form-input
              id="access-name"
              v-model.trim="stateAccess.nombreMenu"
              type="text"
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
  BForm, BRow, BCol, BFormGroup, BFormInput,
} from 'bootstrap-vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import { stateAccess } from '../ServicesAccess/useVariablesAccess'

export default {
  name: 'HeaderAccess',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    FieldSetComponent,
  },
  setup() {
    return {
      stateAccess,
    }
  },
}
</script>
