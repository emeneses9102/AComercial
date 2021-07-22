<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    :title="`Ver ${titleNotificationCurrency}`"
    no-close-on-backdrop
  >

    <b-form>
      <field-set-component legend="Datos Generales">
        <b-row>
          <!-- Codigo3 -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Moneda"
              label-for="currency-moneda"
            >
              <b-form-input
                id="currency-moneda"
                v-model.trim="stateCurrency.moneda"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Codigo3 -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Nombre"
              label-for="currency-codigo3"
            >
              <b-form-input
                id="currency-codigo3"
                v-model.trim="stateCurrency.codigo3"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Código Moneda-->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Código de Moneda*"
              label-for="currency-codigo-moneda"
            >
              <b-form-input
                id="currency-codigo-moneda"
                v-model.number="stateCurrency.codigoMoneda"
                type="number"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Unidad Menor -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Unidad Menor"
              label-for="currency-unidad-menor"
            >
              <b-form-input
                id="currency-unidad-menor"
                v-model.trim="stateCurrency.unidadMenor"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- País -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="País"
              label-for="currency-pais"
            >
              <b-form-input
                id="currency-pais"
                v-model.trim="stateCurrency.pais"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- mLocal -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="M. Local"
              label-for="currency-mLocal"
            >
              <b-form-checkbox
                id="currency-mLocal"
                v-model.trim="stateCurrency.mlocal"
                value="1"
                class="custom-control-primary mt-1"
                name="check-button"
                unchecked-value="0"
                switch
                disabled
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
  BModal, BForm, BRow, BCol, BFormGroup, BFormInput, BFormCheckbox,
} from 'bootstrap-vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { MODAL_ID, titleNotificationCurrency, stateCurrency } from '../ServicesCurrency/useVariablesCurrency'

export default {
  name: 'ModalShowCurrency',
  components: {
    BModal,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    FieldSetComponent,
    ButtonComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationCurrency,
      stateCurrency,
    }
  },
}
</script>
