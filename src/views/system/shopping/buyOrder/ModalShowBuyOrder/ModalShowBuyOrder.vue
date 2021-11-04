<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    size="lg"
    :title="`Ver ${titleNotificationBuyOrder}`"
    no-close-on-backdrop
  >
    <b-tabs>
      <b-tab>
        <template #title>
          <feather-icon icon="ShoppingBagIcon" />
          <span class="d-none d-md-inline">General</span>
        </template>

        <header-buy-order />
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon icon="FolderIcon" />
          <span class="d-none d-md-inline">Detalle</span>
        </template>

        <detail-table-buy-order-detail class="mt-1" />
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon icon="DollarSignIcon" />
          <span class="d-none d-md-inline">Tributos</span>
        </template>

        <detail-table-buy-order-tribute-detail class="mt-1" />
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon icon="BarChartIcon" />
          <span class="d-none d-md-inline">Resumen</span>
        </template>

        <detail-table-buy-order-tribute-summary-detail class="mt-1" />
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
import HeaderBuyOrder from './HeaderBuyOrder.vue'
import DetailTableBuyOrderDetail from './DetailTableBuyOrderDetail.vue'
import DetailTableBuyOrderTributeDetail from './DetailTableBuyOrderTributeDetail.vue'
import DetailTableBuyOrderTributeSummaryDetail from './DetailTableBuyOrderTributeSummaryDetail.vue'
import { MODAL_ID, titleNotificationBuyOrder } from '../ServicesBuyOrder/useVariablesBuyOrder'

export default {
  name: 'ModalShowBuyOrder',
  components: {
    BModal,
    BTabs,
    BTab,
    ButtonComponent,
    HeaderBuyOrder,
    DetailTableBuyOrderDetail,
    DetailTableBuyOrderTributeDetail,
    DetailTableBuyOrderTributeSummaryDetail,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationBuyOrder,
    }
  },
}
</script>
