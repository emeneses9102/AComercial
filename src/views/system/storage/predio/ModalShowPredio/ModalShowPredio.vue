<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    :title="`Ver ${titleNotificationPredio}`"
    no-close-on-backdrop
  >

    <b-form>
      <field-set-component legend="Datos Generales">
        <b-row>

          <!-- Departamento -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Departamento"
              label-for="predio-departament"
            >
              <b-form-input
                id="predio-departament"
                v-model.trim="statePredio.nombreDepartamento"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Provincia -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Provincia"
              label-for="predio-province"
            >
              <b-form-input
                id="predio-province"
                v-model.trim="statePredio.nombreProvincia"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Distrito -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Distrito"
              label-for="predio-district"
            >
              <b-form-input
                id="predio-district"
                v-model.trim="statePredio.nombreDistrito"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Dirección -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Dirección"
              label-for="predio-address"
            >
              <b-form-input
                id="predio-address"
                v-model.trim="statePredio.direccion"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Observación -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Observación"
              label-for="predio-observation"
            >
              <b-form-input
                id="predio-observation"
                v-model.trim="statePredio.observacion"
                type="text"
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
  BModal, BForm, BRow, BCol, BFormGroup, BFormInput,
} from 'bootstrap-vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import {
  MODAL_ID, titleNotificationPredio, statePredio,
} from '../ServicesPredio/useVariablesPredio'

export default {
  name: 'ModalShowPredio',
  components: {
    BModal,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    FieldSetComponent,
    ButtonComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationPredio,
      statePredio,
    }
  },
}
</script>
