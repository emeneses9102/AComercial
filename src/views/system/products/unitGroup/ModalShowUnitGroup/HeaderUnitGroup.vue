<template>
  <b-form>
    <field-set-component legend="Datos Generales">
      <b-row>
        <!-- Nombre -->
        <b-col
          cols="12"
        >
          <b-form-group
            label="Nombre *"
            label-for="unit-group-name"
          >
            <b-form-input
              id="unit-group-name"
              v-model.trim="stateUnitGroup.nombre"
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
import { stateUnitGroup } from '../ServicesUnitGroup/useVariablesUnitGroup'

export default {
  name: 'HeaderUnitGroup',
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
      stateUnitGroup,
    }
  },
}
</script>
