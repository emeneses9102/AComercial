<template>
  <b-form>
    <field-set-component
      legend="Datos de Cierre"
      collapse="show"
    >
      <b-row>
        <b-col
          cols="12"
          md="6"
        >
          <b-form-group
            label="Cerro"
            label-for="box-session-name-close"
          >
            <b-form-input
              id="box-session-name-close"
              v-model="stateBoxSession.nombreCierre"
              readonly
            />
          </b-form-group>
        </b-col>
        <b-col
          cols="12"
          md="6"
        >
          <b-form-group
            label="Fecha Cierre"
            label-for="box-session-date-close"
          >
            <b-form-input
              id="box-session-date-close"
              v-model="fechaCierre"
              class="input-type-date"
              style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
              readonly
            />
          </b-form-group>
        </b-col>
        <b-col
          cols="12"
        >
          <b-form-group
            label="Descripción de Cierre"
            label-for="box-session-descripcion-close"
          >
            <b-form-textarea
              id="box-session-descripcion-close"
              key="1"
              v-model="stateBoxSession.descripcionCierre"
              rows="2"
              no-resize
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
  BFormTextarea,
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
    BFormTextarea,
    FieldSetComponent,
  },
  setup() {
    const fechaCierre = computed(() => formatDate(stateBoxSession.value.fechaCierre))
    return {
      stateBoxSession,
      combosBoxSession,
      fechaCierre,
    }
  },
}
</script>
