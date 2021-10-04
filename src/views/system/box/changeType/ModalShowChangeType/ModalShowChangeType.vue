<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    :title="`Ver ${titleNotificationChangeType}`"
    no-close-on-backdrop
  >

    <b-form>
      <field-set-component legend="Datos Generales">
        <b-row>
          <b-col
            cols="12"
          >
            <b-form-group
              label="Fecha"
              label-for="change-type-date"
            >
              <b-form-datepicker
                id="change-type-date"
                v-model="stateChangeType.fecha"
                v-bind="labelsFormDate"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- Moneda -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Moneda"
              label-for="change-type-currency-name"
            >
              <b-form-input
                id="change-type-currency-name"
                v-model.trim="stateChangeType.nombreMoneda"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- Compra -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Compra"
              label-for="change-type-purchase"
            >
              <b-form-input
                id="change-type-purchase"
                v-model.number="stateChangeType.compra"
                type="number"
                step="0.0001"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- Venta -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Venta"
              label-for="change-type-sale"
            >
              <b-form-input
                id="change-type-sale"
                v-model.number="stateChangeType.venta"
                type="number"
                step="0.0001"
                readonly
              />
            </b-form-group>
          </b-col>
        </b-row>
      </field-set-component>
    </b-form>

    <template #modal-footer>
      <button-component
        variant="primary"
        icon-button="PowerIcon"
        text-default="Cerrar"
        :method-function="()=>$bvModal.hide(`${MODAL_ID}-show`)"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal, BForm, BRow, BCol, BFormGroup, BFormInput, BFormDatepicker,
} from 'bootstrap-vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { MODAL_ID, titleNotificationChangeType, stateChangeType } from '../ServicesChangeType/useVariablesChangeType'

export default {
  name: 'ModalShowChangeType',
  components: {
    BModal,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormDatepicker,
    FieldSetComponent,
    ButtonComponent,
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
      MODAL_ID,
      titleNotificationChangeType,
      stateChangeType,
    }
  },
}
</script>
