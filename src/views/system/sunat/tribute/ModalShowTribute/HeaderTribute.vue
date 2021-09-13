<template>
  <b-form>
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
            <b-form-input
              id="tribute-code-sunat"
              v-model.trim="stateTribute.codigoSunat"
              type="text"
              readonly
            />
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
            <b-form-input
              id="tribute-name"
              v-model.trim="stateTribute.nombre"
              type="text"
              readonly
            />
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
            <b-form-input
              id="tribute-code-international"
              v-model.trim="stateTribute.namecode"
              type="text"
              readonly
            />
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
            <b-form-input
              id="tribute"
              v-model.trim="stateTribute.tributo"
              type="text"
              readonly
            />
          </b-form-group>
        </b-col>
        <!-- Factor -->
        <b-col
          cols="12"
        >
          <b-form-group
            label="Factor"
            label-for="tribute-flg-factor"
          >
            <b-badge
              class="mt-50"
              :variant="stateTribute.flgFactor ? 'light-success' : 'light-danger'"
            >
              <feather-icon
                :icon="stateTribute.flgFactor ? 'CheckIcon' : 'SlashIcon'"
                size="16"
              />
            </b-badge>
          </b-form-group>
        </b-col>
      </b-row>
    </field-set-component>
  </b-form>
</template>

<script>
import {
  BForm, BRow, BCol, BFormGroup, BFormInput, BBadge,
} from 'bootstrap-vue'
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
    BBadge,
    FieldSetComponent,
  },
  setup() {
    return {
      stateTribute,
    }
  },
}
</script>
