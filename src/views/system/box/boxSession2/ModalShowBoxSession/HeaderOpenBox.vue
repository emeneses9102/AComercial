<template>
  <b-form>
    <field-set-component
      legend="Datos de Apertura"
      collapse="show"
    >
      <b-row>
        <b-col
          cols="12"
          md="6"
        >
          <b-form-group
            label="Aperturo"
            label-for="box-session-name-open"
          >
            <b-form-input
              id="box-session-name-open"
              v-model="stateBoxSession.nombreApertura"
              readonly
            />
          </b-form-group>
        </b-col>
        <b-col
          cols="12"
          md="6"
        >
          <b-form-group
            label="Fecha Apertura"
            label-for="box-session-date-open"
          >
            <b-form-input
              id="box-session-date-open"
              v-model="fechaApertura"
              class="input-type-date"
              readonly
            />
          </b-form-group>
        </b-col>
        <b-col
          cols="12"
        >
          <b-form-group
            label="Descripción de Apertura"
            label-for="box-session-descripcion-apertura"
          >
            <b-form-textarea
              id="box-session-descripcion-apertura"
              key="1"
              v-model="stateBoxSession.descripcionApertura"
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
    const fechaApertura = computed(() => formatDate(stateBoxSession.value.fechaApertura))
    return {
      stateBoxSession,
      combosBoxSession,
      fechaApertura,
    }
  },
}
</script>
