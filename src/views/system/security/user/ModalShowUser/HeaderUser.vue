<template>
  <b-form>
    <field-set-component legend="Datos Generales">
      <b-row>
        <!-- Usuario -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Usuario"
            label-for="user-name"
          >
            <b-form-input
              id="User-name"
              v-model.trim="stateUser.usuario"
              type="text"
              readonly
            />
          </b-form-group>
        </b-col>
        <!-- Colaborador -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Colaborador"
            label-for="user-collaborator-name"
          >
            <b-form-input
              id="user-collaborator-name"
              v-model.trim="stateUser.nombreColaborador"
              type="text"
              readonly
            />
          </b-form-group>
        </b-col>
        <!-- Rol -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Rol"
            label-for="user-role"
          >
            <b-form-input
              id="user-role"
              v-model.trim="stateUser.nombrerol"
              type="text"
              readonly
            />
          </b-form-group>
        </b-col>
        <!-- Correo -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Correo"
            label-for="user-email"
          >
            <b-form-input
              id="user-email"
              v-model.trim="stateUser.correo"
              type="text"
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- Fecha Inicio -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Fecha Inicio"
            label-for="user-date-start"
          >
            <b-form-input
              id="user-date-start"
              v-model.trim="stateUser.inicio"
              type="text"
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- Fecha Fin -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Fecha Fin"
            label-for="user-date-end"
          >
            <b-form-input
              id="user-date-end"
              v-model.trim="stateUser.fin"
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
import { stateUser } from '../ServicesUser/useVariablesUser'

export default {
  name: 'HeaderUser',
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
      stateUser,
    }
  },
}
</script>
