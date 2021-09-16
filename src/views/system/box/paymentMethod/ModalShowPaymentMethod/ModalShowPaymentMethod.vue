<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    :title="`Ver ${titleNotificationPaymentMethod}`"
    no-close-on-backdrop
  >

    <b-form>
      <field-set-component legend="Datos Generales">
        <b-row>
          <!-- DESCRIPCION SUNAT -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="DESCRIPCIÓN SUNAT"
              label-for="payment-method-description-sunat"
            >
              <b-form-textarea
                id="payment-method-description-sunat"
                v-model="statePaymentMethod.nombreMedioPago"
                rows="3"
                readonly
                no-resize
              />
            </b-form-group>
          </b-col>
          <!-- Nombre -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Nombre"
              label-for="payment-method-name"
            >
              <b-form-input
                id="payment-method-name"
                v-model.trim="statePaymentMethod.nombre"
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
  BModal, BForm, BRow, BCol, BFormGroup, BFormInput, BFormTextarea,
} from 'bootstrap-vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { MODAL_ID, titleNotificationPaymentMethod, statePaymentMethod } from '../ServicesPaymentMethod/useVariablesPaymentMethod'

export default {
  name: 'ModalShowPaymentMethod',
  components: {
    BModal,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    FieldSetComponent,
    ButtonComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationPaymentMethod,
      statePaymentMethod,
    }
  },
}
</script>
