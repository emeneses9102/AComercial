<template>
  <b-modal
    :id="MODAL_ID"
    centered
    :title="`${statePurchaseReason._id ? 'Modificar' : 'Registrar'} ${titleNotificationPurchaseReason}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-purchase-reason"
    >
      <b-form @submit.prevent="">
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
                <validation-provider
                  #default="{ errors }"
                  name="Nombre"
                  rules="required|min:3"
                >
                  <b-form-input
                    id="purchase-reason-name"
                    v-model.trim="statePurchaseReason.nombre"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                    @keydown.enter="()=>sendForm()"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- Pedido Compra -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Pedido Compra"
                label-for="purchase-reason-purchase-order"
              >
                <b-form-checkbox
                  id="purchase-reason-purchase-order"
                  v-model="statePurchaseReason.flgPedidoCompra"
                  class="custom-control-success"
                  :value="1"
                  :unchecked-value="0"
                  switch
                />
              </b-form-group>
            </b-col>
          </b-row>
        </field-set-component>
      </b-form>
    </validation-observer>

    <template #modal-footer>
      <button-component
        variant="outline-primary"
        icon-button="PowerIcon"
        text-default="Cerrar"
        :method-function="()=>$bvModal.hide(MODAL_ID)"
      />
      <button-component
        v-if="(
          (!statePurchaseReason._id && optionsPermissions.includes(GUARDAR))
          || (statePurchaseReason._id && optionsPermissions.includes(EDITAR))
        )"
        variant="primary"
        icon-button="SaveIcon"
        :loading="statePurchaseReason.loading"
        text-default="Guardar"
        :method-function="()=>sendForm()"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal, BForm, BRow, BCol, BFormGroup, BFormInput, BFormCheckbox,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { computed } from '@vue/composition-api'
import store from '@/store'
import {
  EDITAR,
  GUARDAR,
} from '@/options'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { validatePermission } from '@/helpers/validateActions'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import {
  MODAL_ID, titleNotificationPurchaseReason, statePurchaseReason, clearStatePurchaseReason, routeNamePurchaseReason,
} from '../ServicesPurchaseReason/useVariablesPurchaseReason'
import { loadItemsPurchaseReason, sendPurchaseReason } from '../ServicesPurchaseReason/useServicesPurchaseReason'

export default {
  name: 'ModalSavePurchaseReason',
  components: {
    BModal,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    ButtonComponent,
    FieldSetComponent,
    ValidationObserver,
    ValidationProvider,
  },
  setup(props, context) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNamePurchaseReason]) {
        return store.state.rolesAndPermissions.options[routeNamePurchaseReason]
      }
      return []
    })

    const sendForm = async (actionSend = null, loading = true) => {
      if (!validatePermission(optionsPermissions.value, !statePurchaseReason.value._id ? GUARDAR : EDITAR, titleNotificationPurchaseReason)) return false
      const successValidationPurchaseReason = await context.refs['validation-purchase-reason'].validate()
      if (!successValidationPurchaseReason) return false
      if (loading) statePurchaseReason.value.loading = true
      const { status, data } = await sendPurchaseReason(actionSend || (statePurchaseReason.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) statePurchaseReason.value.loading = false
      if (!status) return false
      statePurchaseReason.value._id = data.id
      clearStatePurchaseReason()
      document.getElementById('purchase-reason-name').focus()
      context.refs['validation-purchase-reason'].reset()
      await loadItemsPurchaseReason()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationPurchaseReason,
      statePurchaseReason,
      sendForm,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
