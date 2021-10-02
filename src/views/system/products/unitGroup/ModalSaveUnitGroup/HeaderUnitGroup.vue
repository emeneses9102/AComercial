<template>
  <b-form
    @submit.prevent=""
  >
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
            <validation-provider
              #default="{ errors }"
              name="Nombre Grupo"
              rules="required|min:3"
            >
              <b-form-input
                id="unit-group-name"
                v-model.trim="stateUnitGroup.nombre"
                type="text"
                :state="errors.length > 0 ? false:null"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
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
import { ValidationProvider } from 'vee-validate'
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
    ValidationProvider,
    FieldSetComponent,
  },
  setup() {
    return {
      stateUnitGroup,
    }
  },
}
</script>
