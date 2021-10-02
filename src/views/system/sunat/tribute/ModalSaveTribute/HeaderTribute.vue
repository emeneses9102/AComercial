<template>
  <b-form
    @submit.prevent=""
  >
    <field-set-component legend="Datos Generales">
      <b-row>
        <!-- Codigo Sunat -->
        <b-col
          cols="12"
          md="6"
        >
          <b-form-group
            label="Código SUNAT *"
            label-for="tribute-code-sunat"
          >
            <validation-provider
              #default="{ errors }"
              name="Código SUNAT"
              rules="required"
            >
              <b-form-input
                id="tribute-code-sunat"
                v-model.trim="stateTribute.codigoSunat"
                type="text"
                readonly
                :state="errors.length > 0 ? false:null"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <!-- Nombre -->
        <b-col
          cols="12"
          md="6"
        >
          <b-form-group
            label="Nombre"
            label-for="tribute-name"
          >
            <validation-provider
              #default="{ errors }"
              name="Nombre"
              rules="required"
            >
              <b-form-input
                id="tribute-name"
                v-model.trim="stateTribute.nombre"
                type="text"
                readonly
                :state="errors.length > 0 ? false:null"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <!-- Codigo Internacional -->
        <b-col
          cols="12"
          md="6"
        >
          <b-form-group
            label="Código Internacional"
            label-for="tribute-code-international"
          >
            <validation-provider
              #default="{ errors }"
              name="Código Internacional"
              rules="required"
            >
              <b-form-input
                id="tribute-code-international"
                v-model.trim="stateTribute.namecode"
                type="text"
                readonly
                :state="errors.length > 0 ? false:null"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <!-- Tributo -->
        <b-col
          cols="12"
          md="6"
        >
          <b-form-group
            label="Tributo"
            label-for="tribute"
          >
            <validation-provider
              #default="{ errors }"
              name="Tributo"
              rules="required"
            >
              <b-form-input
                id="tribute"
                v-model.trim="stateTribute.tributo"
                type="text"
                readonly
                :state="errors.length > 0 ? false:null"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <!-- Factor -->
        <b-col
          cols="12"
        >
          <b-form-group
            label="Factor"
            label-for="tribute-factor"
          >
            <b-form-checkbox
              id="tribute-factor"
              v-model="stateTribute.flgFactor"
              class="custom-control-success"
              :value="1"
              :unchecked-value="0"
              switch
            />
          </b-form-group>
        </b-col>
      </b-row>
    </field-set-component>
  </b-form>
</template>

<script>
import {
  BForm, BRow, BCol, BFormGroup, BFormInput, BFormCheckbox,
} from 'bootstrap-vue'
import { ValidationProvider } from 'vee-validate'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import { stateTribute } from '../ServicesTribute/useVariablesTribute'

export default {
  name: 'HeaderTribute',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    ValidationProvider,
    FieldSetComponent,
  },
  setup() {
    return {
      stateTribute,
    }
  },
}
</script>
