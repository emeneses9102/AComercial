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
            label="Usuario *"
            label-for="user-name"
          >
            <validation-provider
              #default="{ errors }"
              name="Usuario"
              rules="required|min:3"
            >
              <b-form-input
                id="user-name"
                v-model.trim="stateUser.usuario"
                type="text"
                :state="errors.length > 0 ? false:null"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Colaborador -->
        <b-col
          cols="12"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Colaborador"
            rules="requiredComboVueSelect:m"
          >
            <b-form-group
              label="Colaborador *"
              label-for="user-collaborator"
              :state="errors.length > 0 ? false:null"
            >
              <vue-select
                id="user-collaborator"
                v-model="stateUser.idColaborador"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :reduce="collaborator => collaborator._id"
                label="nombre"
                :options="combosUser.collaborator.data"
                :loading="combosUser.collaborator.loading"
                :clearable="false"
                :disabled="combosUser.collaborator.disabled"
              >
                <template v-slot:no-options>
                  No se encontraron resultados.
                </template>
              </vue-select>
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>

        <!-- Rol -->
        <b-col
          cols="12"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Rol"
            rules="requiredComboVueSelect:m"
          >
            <b-form-group
              label="Rol *"
              label-for="user-role"
              :state="errors.length > 0 ? false:null"
            >
              <vue-select
                id="user-role"
                v-model="stateUser.idRol"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :reduce="role => role._id"
                label="nombre"
                :options="combosUser.role.data"
                :loading="combosUser.role.loading"
                :clearable="false"
                :disabled="combosUser.role.disabled"
              >
                <template v-slot:no-options>
                  No se encontraron resultados.
                </template>
              </vue-select>
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>

        <!-- Correo -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Correo *"
            label-for="user-email"
          >
            <validation-provider
              #default="{ errors }"
              name="Correo"
              rules="required|min:3|email"
            >
              <b-form-input
                id="user-email"
                v-model.trim="stateUser.correo"
                type="text"
                :state="errors.length > 0 ? false:null"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Clave -->
        <input-password-component
          v-if="!stateUser._id"
          v-model="stateUser.clave"
          collg="6"
          text-field="Clave"
          rules-validation="required"
        />

        <!-- Inicio -->
        <b-col
          cols="12"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Fecha Inicio"
            rules="required"
          >
            <b-form-group
              label="Fecha Inicio *"
              label-for="user-date-start"
            >
              <b-form-datepicker
                id="user-date-start"
                v-model="stateUser.inicio"
                :state="errors.length > 0 ? false:null"
                v-bind="labelsFormDate"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>

        <!-- Fin -->
        <b-col
          cols="12"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Fecha Fin"
            rules="required"
          >
            <b-form-group
              label="Fecha Fin *"
              label-for="user-date-end"
            >
              <b-form-datepicker
                id="user-date-end"
                v-model="stateUser.fin"
                :state="errors.length > 0 ? false:null"
                v-bind="labelsFormDate"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>
      </b-row>
    </field-set-component>
  </b-form>
</template>

<script>
import {
  BForm, BRow, BCol, BFormGroup, BFormInput, BFormDatepicker,
} from 'bootstrap-vue'
import { ValidationProvider } from 'vee-validate'
import { VueSelect } from 'vue-select'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import InputPasswordComponent from '@/components/InputPasswordComponent/InputPasswordComponent.vue'
import { stateUser, combosUser } from '../ServicesUser/useVariablesUser'

export default {
  name: 'HeaderUser',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormDatepicker,
    VueSelect,
    ValidationProvider,
    FieldSetComponent,
    InputPasswordComponent,
  },
  data() {
    return {
      labelsFormDate: {
        labelPrevDecade: 'Década anterior',
        labelPrevYear: 'Año anterior',
        labelPrevMonth: 'El mes pasado',
        labelCurrentMonth: 'Mes actual',
        labelNextMonth: 'Próximo mes',
        labelNextYear: 'El próximo año',
        labelNextDecade: 'La próxima década',
        labelToday: 'Hoy',
        labelSelected: 'Fecha seleccionada',
        labelNoDateSelected: 'Sin fecha elegida',
        labelCalendar: 'Calendario',
        labelNav: 'Navegación de calendario',
        labelHelp: 'Navegar por el calendario con las teclas de flechas',
      },
    }
  },
  setup() {
    return {
      stateUser,
      combosUser,
    }
  },
}
</script>
