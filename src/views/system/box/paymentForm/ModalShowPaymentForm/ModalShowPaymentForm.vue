<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    :title="`Ver ${titleNotificationPaymentForm}`"
    no-close-on-backdrop
  >

    <b-form>
      <field-set-component legend="Datos Generales">
        <b-row>
          <!-- Nombre -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Nombre"
              label-for="payment-form-name"
            >
              <b-form-input
                id="payment-form-name"
                v-model.trim="statePaymentForm.nombre"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Días-->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Días"
              label-for="payment-form-dias"
            >
              <b-form-input
                id="payment-form-dias"
                v-model.number="statePaymentForm.dias"
                type="number"
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
import { MODAL_ID, titleNotificationPaymentForm, statePaymentForm } from '../ServicesPaymentForm/useVariablesPaymentForm'

export default {
  name: 'ModalShowPaymentForm',
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
      titleNotificationPaymentForm,
      statePaymentForm,
    }
  },
}
</script>
