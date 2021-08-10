<template>
  <b-form>
    <field-set-component legend="Datos Generales">
      <b-row>

        <!-- Cajero -->
        <b-col
          cols="12"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Cajero"
            rules="requiredComboVueSelect:m"
          >
            <b-form-group
              label="Cajero *"
              label-for="box-sesion-cajero"
              :state="errors.length > 0 ? false:null"
              :disabled="true"
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
                :disabled="stateBoxSession.tipo === 1"
              >
                <template v-slot:no-options>
                  No se encontraron resultados.
                </template>
              </vue-select>
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>

        <!-- Almacén -->
        <b-col
          cols="12"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Almacén"
            rules="requiredComboVueSelect:m"
          >
            <b-form-group
              label="Almacén *"
              label-for="box-sesion-almacen"
              :state="errors.length > 0 ? false:null"
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
                :disabled="stateBoxSession.tipo === 1"
              >
                <template v-slot:no-options>
                  No se encontraron resultados.
                </template>
              </vue-select>
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>

        <!-- Fecha -->
        <b-col
          v-if="false"
          cols="12"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Fecha"
            rules="required"
          >
            <b-form-group
              label="Fecha"
              label-for="box-session-fecha"
            >
              <b-form-datepicker
                id="box-session-fecha"
                v-model="stateBoxSession.fecha"
                :state="errors.length > 0 ? false:null"
                v-bind="labelsFormDate"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>
        <!-- cod Apertura
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Apertura*"
            label-for="box-session-apertura"
          >
            <validation-provider
              #default="{ errors }"
              name="Orden"
              rules="required"
            >
              <b-form-input
                id="box-session-apertura"
                v-model.number="stateBoxSession.apertura"
                type="number"
                :state="errors.length > 0 ? false:null"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        -->
        <!-- Descripción -->
        <b-col
          v-if="false"
          cols="12"
        >
          <b-form-group
            label="Descripción "
            label-for="box-session-descripcion"
          >
            <b-form-textarea
              id="box-session-descripcion"
              v-model="stateBoxSession.descripcion"
              rows="3"
              no-resize
              :disabled="stateBoxSession.tipo === 1"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </field-set-component>
  </b-form>
</template>

<script>
import {
  BForm, BRow, BCol, BFormGroup, BFormDatepicker, BFormTextarea,
} from 'bootstrap-vue'
import { ValidationProvider } from 'vee-validate'
import { VueSelect } from 'vue-select'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import { stateBoxSession, combosBoxSession } from '../ServicesBoxSession/useVariablesBoxSession'

export default {
  name: 'HeaderBoxSession',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormDatepicker,
    BFormTextarea,
    VueSelect,
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
