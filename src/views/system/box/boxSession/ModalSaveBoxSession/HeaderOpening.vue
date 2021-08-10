<template>
  <b-form>
    <field-set-component legend="Datos de Apertura">
      <validation-observer
        ref="validation-box-session-detail"
      >
        <b-row>

          <!-- Descripción Apertura -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Descripción Apertura * "
              label-for="box-session-descripcion-apertura"
            >
              <validation-provider
                #default="{ errors }"
                name="Orden"
                rules="required"
              >
                <b-form-textarea
                  id="box-session-descripcion-apertura"
                  v-model="stateBoxSession.descripcion"
                  rows="2"
                  no-resize
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
  name: 'HeaderOpening',
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
      fecha: () => {
        const formato = new Date()
        return formato.toISOString()
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
