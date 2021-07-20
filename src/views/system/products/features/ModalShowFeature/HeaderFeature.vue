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
            label="Nombre *"
            label-for="feature-name"
          >
            <b-form-input
              id="feature-name"
              v-model.trim="stateFeature.nombre"
              type="text"
              readonly
            />
          </b-form-group>
        </b-col>
        <!-- Abreviatura -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Abreviatura *"
            label-for="feature-abbreviation"
          >
            <b-form-input
              id="feature-abbreviation"
              v-model.trim="stateFeature.abreviatura"
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
import { stateFeature } from '../ServicesFeature/useVariablesFeature'

export default {
  name: 'HeaderFeature',
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
      stateFeature,
    }
  },
}
</script>
