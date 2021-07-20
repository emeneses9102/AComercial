<template>
  <b-form>
    <field-set-component legend="Datos Generales">
      <b-row>
        <!-- Módulo -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Módulo"
            label-for="menu-module"
          >
            <b-form-input
              id="menu-module"
              v-model.trim="stateMenu.nombreModulo"
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
            label-for="menu-name"
          >
            <b-form-input
              id="menu-name"
              v-model.trim="stateMenu.nombre"
              type="text"
              readonly
            />
          </b-form-group>
        </b-col>
        <!-- Órden -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Orden"
            label-for="menu-order"
          >
            <b-form-input
              id="menu-order"
              v-model.trim="stateMenu.orden"
              type="text"
              readonly
            />
          </b-form-group>
        </b-col>
        <!-- Nombre Ruta -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Nombre Ruta"
            label-for="menu-name-route"
          >
            <b-form-input
              id="menu-name-route"
              v-model.trim="stateMenu.ruta"
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
import { stateMenu } from '../ServicesMenu/useVariablesMenu'

export default {
  name: 'HeaderMenu',
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
      stateMenu,
    }
  },
}
</script>
