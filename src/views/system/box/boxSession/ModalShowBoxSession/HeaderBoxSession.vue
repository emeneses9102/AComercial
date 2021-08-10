<template>
  <b-form>
    <field-set-component legend="Datos Generales">
      <b-row>

        <!-- Cajero -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Cajero *"
            label-for="box-sesion-cajero"
          >
            <vue-select
              id="box-session-cajero"
              v-model="stateBoxSession.idCajero"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :reduce="cashier => cashier._id"
              label="nombre"
              :options="combosBoxSession.cashier.data"
              :loading="combosBoxSession.cashier.loading"
              :clearable="false"
              :disabled="combosBoxSession.cashier.disabled"
            >
              <template v-slot:no-options>
                No se encontraron resultados.
              </template>
            </vue-select>
          </b-form-group>
        </b-col>

        <!-- Almacén -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Almacén *"
            label-for="box-sesion-almacen"
          >
            <vue-select
              id="box-sesion-almacen"
              v-model="stateBoxSession.idAlmacen"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :reduce="storage => storage._id"
              label="nombre"
              :options="combosBoxSession.storage.data"
              :loading="combosBoxSession.storage.loading"
              :clearable="false"
              :disabled="combosBoxSession.storage.disabled"
            >
              <template v-slot:no-options>
                No se encontraron resultados.
              </template>
            </vue-select>
          </b-form-group>
        </b-col>

        <!-- Fecha -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Fecha"
            label-for="box-session-fecha"
          >
            <b-form-datepicker
              id="box-session-fecha"
              v-model="stateBoxSession.fecha"
              v-bind="labelsFormDate"
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- Fecha de Apertura -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Fecha Apertura"
            label-for="box-session-fecha-apertura"
          >
            <b-form-datepicker
              id="box-session-fecha-apertura"
              v-model="stateBoxSession.fechaApertura"
              v-bind="labelsFormDate"
            />
          </b-form-group>
        </b-col>

        <!-- cod Apertura-->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Apertura*"
            label-for="box-session-apertura"
          >
            <b-form-input
              id="box-session-apertura"
              v-model.number="stateBoxSession.apertura"
              type="number"
            />
          </b-form-group>
        </b-col>

        <!-- Comprobante -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Comprobante"
            label-for="box-session-comprobante"
          >
            <b-form-input
              id="box-session-comprobante"
              v-model.trim="stateBoxSession.nombreComprobante"
              type="text"
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- Operación -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Operación"
            label-for="box-session-oparcion"
          >
            <b-form-input
              id="box-session-oparcion"
              v-model.trim="stateBoxSession.nombreOperacion"
              type="text"
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- Tipo Comprobante -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Tipo comprobante"
            label-for="box-session-BoxSession-type"
          >
            <b-form-input
              id="box-session-BoxSession-type"
              v-model.trim="stateBoxSession.nombreTipoComprobante"
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
  BForm, BRow, BCol, BFormGroup, BFormInput, BFormDatepicker,
} from 'bootstrap-vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import { VueSelect } from 'vue-select'
import { stateBoxSession, combosBoxSession } from '../ServicesBoxSession/useVariablesBoxSession'

export default {
  name: 'HeaderBoxSession',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormDatepicker,
    VueSelect,
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
