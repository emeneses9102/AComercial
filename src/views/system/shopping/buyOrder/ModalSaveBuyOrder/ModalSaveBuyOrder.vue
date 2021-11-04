<template>
  <b-modal
    :id="MODAL_ID"
    centered
    size="lg"
    :title="`${stateBuyOrder._id ? 'Modificar' : 'Registrar'} ${titleNotificationBuyOrder}`"
    no-close-on-backdrop
  >
    <b-tabs>
      <b-tab>
        <template #title>
          <feather-icon icon="ShoppingBagIcon" />
          <span class="d-none d-md-inline">General</span>
        </template>

        <validation-observer
          ref="validation-buy-order"
        >
          <header-buy-order />
        </validation-observer>
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon icon="FolderIcon" />
          <span class="d-none d-md-inline">Detalle</span>
        </template>

        <detail-buy-order-detail
          class="mt-1"
          :send-header="sendForm"
        />
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
        variant="outline-primary"
        icon-button="PowerIcon"
        text-default="Cerrar"
        :method-function="()=>$bvModal.hide(MODAL_ID)"
      />
      <button-component
        v-if="(
          (!stateBuyOrder._id && optionsPermissions.includes(GUARDAR))
          || (stateBuyOrder._id && optionsPermissions.includes(EDITAR))
        )"
        variant="primary"
        icon-button="SaveIcon"
        :loading="stateBuyOrder.loading"
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
import HeaderBuyOrder from './HeaderBuyOrder.vue'
import DetailBuyOrderDetail from './DetailBuyOrderDetail.vue'
import DetailTableBuyOrderDetail from './DetailTableBuyOrderDetail.vue'
import DetailTableBuyOrderTributeDetail from './DetailTableBuyOrderTributeDetail.vue'
import DetailTableBuyOrderTributeSummaryDetail from './DetailTableBuyOrderTributeSummaryDetail.vue'
import {
  MODAL_ID, titleNotificationBuyOrder, stateBuyOrder, routeNameBuyOrder,
} from '../ServicesBuyOrder/useVariablesBuyOrder'
import { loadItemsBuyOrder, sendBuyOrder } from '../ServicesBuyOrder/useServicesBuyOrder'
import { serverQueryBuyOrderDetail } from '../ServicesBuyOrderDetail/useVariablesBuyOrderDetail'
import { serverQueryBuyOrderTributeDetail } from '../ServicesBuyOrderTributeDetail/useVariablesBuyOrderTributeDetail'
import { serverQueryBuyOrderTributeSummaryDetail } from '../ServicesBuyOrderTributeSummaryDetail/useVariablesBuyOrderTributeSummaryDetail'

export default {
  name: 'ModalSaveBuyOrder',
  components: {
    BModal,
    BTabs,
    BTab,
    HeaderBuyOrder,
    DetailBuyOrderDetail,
    DetailTableBuyOrderDetail,
    DetailTableBuyOrderTributeDetail,
    DetailTableBuyOrderTributeSummaryDetail,
    ButtonComponent,
    ValidationObserver,
  },
  setup(props, context) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameBuyOrder]) {
        return store.state.rolesAndPermissions.options[routeNameBuyOrder]
      }
      return []
    })

    const sendForm = async (actionSend = null, loading = true) => {
      if (!validatePermission(optionsPermissions.value, !stateBuyOrder.value._id ? GUARDAR : EDITAR, titleNotificationBuyOrder)) return false
      const successValidationBuyOrder = await context.refs['validation-buy-order'].validate()
      if (!successValidationBuyOrder) return false
      if (loading) stateBuyOrder.value.loading = true
      const { status, data } = await sendBuyOrder(actionSend || (stateBuyOrder.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateBuyOrder.value.loading = false
      if (!status) return false
      stateBuyOrder.value._id = data.id
      serverQueryBuyOrderDetail.value.indice = data.id
      serverQueryBuyOrderTributeDetail.value.indice = data.id
      serverQueryBuyOrderTributeSummaryDetail.value._id = data.id
      loadItemsBuyOrder()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationBuyOrder,
      stateBuyOrder,
      sendForm,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
