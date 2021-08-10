<template>
  <b-form>
    <field-set-component legend="Datos de Cierre">
      <validation-observer
        ref="validation-box-session-detail"
      >
        <b-row>
          <!-- Descripción  -->
          <b-col
            v-if="!stateBoxSession.idCierre"
            cols="12"
          >
            <b-form-group
              label="Descripción Cierre *"
              label-for="box-session-descripcion-cierre"
            >
              <validation-provider
                #default="{ errors }"
                name="Orden"
                rules="required"
              >
                <b-form-textarea
                  id="box-session-descripcion-cierre"
                  v-model="stateBoxSession.descripcion"
                  rows="2"
                  no-resize
                  :disabled="stateBoxSession.idCierre ? true: false"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!-- Descripción Cierre -->
          <b-col
            v-if="stateBoxSession.idCierre"
            cols="12"
          >
            <b-form-group
              label="Descripción Cierre 1*"
              label-for="box-session-descripcion-cierre"
            >
              <validation-provider
                #default="{ errors }"
                name="Orden"
                rules="required"
              >
                <b-form-textarea
                  id="box-session-descripcion-cierre"
                  v-model="stateBoxSession.descripcionCierre"
                  rows="2"
                  no-resize
                  :disabled="stateBoxSession.idCierre ? true: false"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
      </validation-observer>
    </field-set-component>
  </b-form>
</template>

<script>
import {
  BForm, BRow, BCol, BFormGroup, BFormTextarea,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import { stateBoxSession, combosBoxSession } from '../ServicesBoxSession/useVariablesBoxSession'

export default {
  name: 'HeaderEnding',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormTextarea,
    ValidationObserver,
    ValidationProvider,
    FieldSetComponent,
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
      stateBoxSession,
      combosBoxSession,
    }
  },
}
</script>
