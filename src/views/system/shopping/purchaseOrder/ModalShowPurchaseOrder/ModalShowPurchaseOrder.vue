<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    size="lg"
    :title="`Ver ${titleNotificationPurchaseOrder}`"
    no-close-on-backdrop
  >
    <b-tabs>
      <b-tab>
        <template #title>
          <feather-icon icon="ShoppingBagIcon" />
          <span class="d-none d-md-inline">General</span>
        </template>

        <header-purchase-order />
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon icon="FolderIcon" />
          <span class="d-none d-md-inline">Detalle</span>
        </template>

        <detail-table-purchase-order-detail class="mt-1" />
      </b-tab>
    </b-tabs>

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
  BModal,
  BTabs,
  BTab,
} from 'bootstrap-vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import HeaderPurchaseOrder from './HeaderPurchaseOrder.vue'
import DetailTablePurchaseOrderDetail from './DetailTablePurchaseOrderDetail.vue'
import { MODAL_ID, titleNotificationPurchaseOrder } from '../ServicesPurchaseOrder/useVariablesPurchaseOrder'

export default {
  name: 'ModalShowPurchaseOrder',
  components: {
    BModal,
    BTabs,
    BTab,
    ButtonComponent,
    HeaderPurchaseOrder,
    DetailTablePurchaseOrderDetail,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationPurchaseOrder,
    }
  },
}
</script>
