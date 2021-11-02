<template>
  <b-modal
    :id="MODAL_ID"
    centered
    size="lg"
    :title="`${statePurchaseOrder._id ? 'Modificar' : 'Registrar'} ${titleNotificationPurchaseOrder}`"
    no-close-on-backdrop
  >
    <b-tabs>
      <b-tab>
        <template #title>
          <feather-icon icon="ShoppingBagIcon" />
          <span class="d-none d-md-inline">General</span>
        </template>

        <validation-observer
          ref="validation-purchase-order"
        >
          <header-purchase-order />
        </validation-observer>
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon icon="FolderIcon" />
          <span class="d-none d-md-inline">Detalle</span>
        </template>

        <detail-purchase-order-detail
          class="mt-1"
          :send-header="sendForm"
        />
        <detail-table-purchase-order-detail class="mt-1" />
      </b-tab>
    </b-tabs>

    <template #modal-footer>
      <button-component
        variant="outline-primary"
        icon-button="PowerIcon"
        text-default="Cerrar"
        :method-function="()=>$bvModal.hide(MODAL_ID)"
      />
      <button-component
        v-if="(
          (!statePurchaseOrder._id && optionsPermissions.includes(GUARDAR))
          || (statePurchaseOrder._id && optionsPermissions.includes(EDITAR))
        )"
        variant="primary"
        icon-button="SaveIcon"
        :loading="statePurchaseOrder.loading"
        text-default="Guardar"
        :method-function="()=>sendForm()"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal, BTabs, BTab,
} from 'bootstrap-vue'
import { ValidationObserver } from 'vee-validate'
import { computed } from '@vue/composition-api'
import store from '@/store'
import {
  EDITAR,
  GUARDAR,
} from '@/options'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { validatePermission } from '@/helpers/validateActions'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import HeaderPurchaseOrder from './HeaderPurchaseOrder.vue'
import DetailPurchaseOrderDetail from './DetailPurchaseOrderDetail.vue'
import DetailTablePurchaseOrderDetail from './DetailTablePurchaseOrderDetail.vue'
import {
  MODAL_ID, titleNotificationPurchaseOrder, statePurchaseOrder, routeNamePurchaseOrder,
} from '../ServicesPurchaseOrder/useVariablesPurchaseOrder'
import { loadItemsPurchaseOrder, sendPurchaseOrder } from '../ServicesPurchaseOrder/useServicesPurchaseOrder'
import { serverQueryPurchaseOrderDetail } from '../ServicesPurchaseOrderDetail/useVariablesPurchaseOrderDetail'

export default {
  name: 'ModalSavePurchaseOrder',
  components: {
    BModal,
    BTabs,
    BTab,
    HeaderPurchaseOrder,
    DetailPurchaseOrderDetail,
    DetailTablePurchaseOrderDetail,
    ButtonComponent,
    ValidationObserver,
  },
  setup(props, context) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNamePurchaseOrder]) {
        return store.state.rolesAndPermissions.options[routeNamePurchaseOrder]
      }
      return []
    })

    const sendForm = async (actionSend = null, loading = true) => {
      if (!validatePermission(optionsPermissions.value, !statePurchaseOrder.value._id ? GUARDAR : EDITAR, titleNotificationPurchaseOrder)) return false
      const successValidationPurchaseOrder = await context.refs['validation-purchase-order'].validate()
      if (!successValidationPurchaseOrder) return false
      if (loading) statePurchaseOrder.value.loading = true
      const { status, data } = await sendPurchaseOrder(actionSend || (statePurchaseOrder.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) statePurchaseOrder.value.loading = false
      if (!status) return false
      statePurchaseOrder.value._id = data.id
      serverQueryPurchaseOrderDetail.value.indice = data.id
      await loadItemsPurchaseOrder()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationPurchaseOrder,
      statePurchaseOrder,
      sendForm,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
