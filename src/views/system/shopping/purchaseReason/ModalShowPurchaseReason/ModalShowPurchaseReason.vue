<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    :title="`Ver ${titleNotificationPurchaseReason}`"
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
              label="Nombre *"
              label-for="purchase-reason-name"
            >
              <b-form-input
                id="purchase-reason-name"
                v-model.trim="statePurchaseReason.nombre"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- Flg Pedido Compra -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Pedido Compra"
              label-for="purchase-reason-purchase-order"
            >
              <b-badge
                class="mt-50"
                :variant="statePurchaseReason.flgPedidoCompra ? 'light-success' : 'light-danger'"
              >
                <feather-icon
                  :icon="statePurchaseReason.flgPedidoCompra ? 'CheckIcon' : 'SlashIcon'"
                  size="16"
                />
              </b-badge>
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
  BModal, BForm, BRow, BCol, BFormGroup, BFormInput, BBadge,
} from 'bootstrap-vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { MODAL_ID, titleNotificationPurchaseReason, statePurchaseReason } from '../ServicesPurchaseReason/useVariablesPurchaseReason'

export default {
  name: 'ModalShowPurchaseReason',
  components: {
    BModal,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BBadge,
    FieldSetComponent,
    ButtonComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationPurchaseReason,
      statePurchaseReason,
    }
  },
}
</script>
