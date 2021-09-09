<template>
  <b-form>
    <field-set-component
      legend="Datos de la Sesión"
      collapse="show"
    >
      <b-row>
        <b-col
          cols="12"
          md="6"
        >
          <b-form-group
            label="Código Sesión"
            label-for="box-session-id"
          >
            <b-form-input
              id="box-session-id"
              v-model="stateBoxSession._id"
              readonly
            />
          </b-form-group>
        </b-col>

        <b-col
          cols="12"
          md="6"
        >
          <b-form-group
            label="Cajero *"
            label-for="box-sesion-cashier"
          >
            <b-form-input
              id="box-session-cashier"
              v-model="stateBoxSession.nombreCajero"
              readonly
            />
          </b-form-group>
        </b-col>

        <b-col
          cols="12"
          md="6"
        >
          <b-form-group
            label="Almacén *"
            label-for="box-sesion-storage"
          >
            <b-form-input
              id="box-session-storage"
              v-model="stateBoxSession.nombreAlmacen"
              readonly
            />
          </b-form-group>
        </b-col>

        <b-col
          cols="12"
          md="6"
        >
          <b-form-group
            label="Fecha"
            label-for="box-session-fecha"
          >
            <b-form-input
              id="box-session-storage"
              v-model="fechaSesion"
              class="input-type-date"
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
  BForm,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
} from 'bootstrap-vue'
import {
  computed,
} from '@vue/composition-api'
import {
  formatDate,
} from '@/helpers/date'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import {
  stateBoxSession,
  combosBoxSession,
} from '../ServicesBoxSession/useVariablesBoxSession'

export default {
  name: 'HeaderOpenBox',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    FieldSetComponent,
  },
  setup() {
    const fechaSesion = computed(() => formatDate(stateBoxSession.value.fecha))
    return {
      stateBoxSession,
      fechaSesion,
      combosBoxSession,
    }
  },
}
</script>
