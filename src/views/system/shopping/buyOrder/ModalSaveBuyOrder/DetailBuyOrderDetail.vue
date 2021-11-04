<template>
  <field-set-component legend="Detalle Orden Compra">
    <validation-observer
      ref="validation-buy-order-detail"
    >
      <b-form
        @submit.prevent="sendForm"
        @reset="clearStateBuyOrderDetail"
      >
        <b-row>
          <b-col
            v-if="!stateBuyOrder.pedidoCompra"
            cols="12"
            lg="6"
          >
            <validation-provider
              #default="{ errors }"
              name="Artículo"
              rules="required"
            >
              <b-form-group
                label="Artículo"
                label-for="input-article-button"
              >
                <b-input-group>
                  <b-form-input
                    id="input-article-button"
                    v-model="stateBuyOrderDetail.nombreTablaArticulo"
                    :state="errors.length > 0 ? false:null"
                    readonly
                  />
                  <b-input-group-append>
                    <button-component
                      class="py-25"
                      icon-button="SearchIcon"
                      margin-class="m-0"
                      :disabled="!stateBuyOrder._id"
                      :method-function="openModalQueryTableArticle"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <b-col
            v-else
            cols="12"
            lg="6"
          >
            <validation-provider
              #default="{ errors }"
              name="Artículo"
              rules="required"
            >
              <b-form-group
                label="Artículo"
                label-for="input-purchase-order-detail-button"
              >
                <b-input-group>
                  <b-form-input
                    id="input-purchase-order-detail-button"
                    v-model="stateBuyOrderDetail.nombreTablaArticulo"
                    :state="errors.length > 0 ? false:null"
                    readonly
                  />
                  <b-input-group-append>
                    <button-component
                      :disabled="!stateBuyOrder._id"
                      class="py-25"
                      icon-button="SearchIcon"
                      margin-class="m-0"
                      :method-function="openModalQueryPurchaseOrderDetail"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- Consultar Tabla Articulos -->
          <modal-query-table-article
            @on-article-selected="onArticleSelected"
          />

          <!-- Consultar Pedido Compra -->
          <modal-query-purchase-order-detail
            @on-purchase-order-detail-selected="onPurchaseOrderDetailSelected"
          />

          <!-- Cantidad -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Cantidad *"
              label-for="buy-order-detail-quantity"
            >
              <validation-provider
                #default="{ errors }"
                name="Cantidad"
                :rules="validationQuantity"
              >
                <b-form-input
                  id="buy-order-detail-quantity"
                  v-model.number="stateBuyOrderDetail.cantidad"
                  type="number"
                  step="0.01"
                  min="0.01"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Precio Compra -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Precio Compra *"
              label-for="buy-order-detail-buy-price"
            >
              <validation-provider
                #default="{ errors }"
                name="Precio Compra"
                rules="required|min_value:0.01"
              >
                <b-form-input
                  id="buy-order-detail-buy-price"
                  v-model.number="stateBuyOrderDetail.precioCompra"
                  type="number"
                  step="0.01"
                  min="0.01"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Descuento -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Descuento *"
              label-for="buy-order-detail-discount"
            >
              <validation-provider
                #default="{ errors }"
                name="Descuento"
                rules="required|min_value:0.00"
              >
                <b-form-input
                  id="buy-order-detail-discount"
                  v-model.number="stateBuyOrderDetail.descuento"
                  type="number"
                  step="0.00"
                  min="0.00"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Motivo Compra -->
          <b-col
            cols="12"
            lg="6"
          >
            <validation-provider
              #default="{ errors }"
              name="Motivo Compra"
              rules="requiredComboVueSelect"
            >
              <b-form-group
                label="Motivo Compra *"
                label-for="buy-order-purchase-reasin"
                :state="errors.length > 0 ? false:null"
              >
                <vue-select
                  id="buy-order-purchase-reasin"
                  v-model="stateBuyOrderDetail.idMotivoCompra"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="purchaseReason => purchaseReason._id"
                  label="nombre"
                  :options="combosBuyOrderDetail.purchaseReason.data"
                  :loading="combosBuyOrderDetail.purchaseReason.loading"
                  :clearable="false"
                  :disabled="combosBuyOrderDetail.purchaseReason.disabled"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </vue-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <b-col
            cols="12"
          >
            <div class="d-flex flex-wrap justify-content-end">
              <button-component
                type="reset"
                variant="outline-primary"
                text-default="Limpiar"
                icon-button="DeleteIcon"
              />
              <button-component
                v-if="stateBuyOrderDetail._id && optionsPermissions.includes(EDITAR)"
                type="submit"
                variant="success"
                text-default="Modificar"
                icon-button="RefreshCwIcon"
                :loading="stateBuyOrderDetail.loading"
              />
              <button-component
                v-else-if="!stateBuyOrderDetail._id && optionsPermissions.includes(GUARDAR)"
                type="submit"
                variant="primary"
                text-default="Agregar"
                icon-button="PlusCircleIcon"
                :loading="stateBuyOrderDetail.loading"
              />
            </div>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </field-set-component>
</template>

<script>
import {
  BForm, BRow, BCol, BFormGroup, BFormInput, BInputGroup, BInputGroupAppend,
} from 'bootstrap-vue'
import { computed } from '@vue/composition-api'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { VueSelect } from 'vue-select'
import store from '@/store'
import {
  EDITAR,
  GUARDAR,
} from '@/options'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import ModalQueryTableArticle from '@/components/ModalQueryTableArticle/ModalQueryTableArticle.vue'
import ModalQueryPurchaseOrderDetail from '@/components/ModalQueryPurchaseOrderDetail/ModalQueryPurchaseOrderDetail.vue'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { validatePermission } from '@/helpers/validateActions'
import { routeNameBuyOrder, stateBuyOrder } from '../ServicesBuyOrder/useVariablesBuyOrder'
import {
  stateBuyOrderDetail, clearStateBuyOrderDetail, titleNotificationBuyOrderDetail, combosBuyOrderDetail,
} from '../ServicesBuyOrderDetail/useVariablesBuyOrderDetail'
import { loadItemsBuyOrderDetail, sendBuyOrderDetail } from '../ServicesBuyOrderDetail/useServicesBuyOrderDetail'
import { loadItemsBuyOrderTributeDetail } from '../ServicesBuyOrderTributeDetail/useServicesBuyOrderTributeDetail'
import { loadItemsBuyOrderTributeSummaryDetail } from '../ServicesBuyOrderTributeSummaryDetail/useServicesBuyOrderTributeSummaryDetail'

export default {
  name: 'DetailBuyOrderDetail',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    ValidationObserver,
    ValidationProvider,
    VueSelect,
    FieldSetComponent,
    ButtonComponent,
    ModalQueryTableArticle,
    ModalQueryPurchaseOrderDetail,
  },
  props: {
    sendHeader: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      labelsFormDate: {
        labelPrevDecade: 'Década anterior',
        labelPrevYear: 'Año anterior',
        labelPrevMonth: 'El mes pasado',
        labelCurrentMonth: 'Mes actual',
        labelNextMonth: 'Próximo mes',
        labelNextYear: 'El próximo año',
        labelNextDecade: 'La próxima década',
        labelToday: 'Hoy',
        labelSelected: 'Fecha seleccionada',
        labelNoDateSelected: 'Sin fecha elegida',
        labelCalendar: 'Calendario',
        labelNav: 'Navegación de calendario',
        labelHelp: 'Navegar por el calendario con las teclas de flechas',
      },
    }
  },
  setup(props, context) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameBuyOrder]) {
        return store.state.rolesAndPermissions.options[routeNameBuyOrder]
      }
      return []
    })

    const validationQuantity = computed(() => {
      if (stateBuyOrderDetail.value.cantidadMax) {
        return `required|min_value:0.01|max_value:${stateBuyOrderDetail.value.cantidadMax}`
      }
      return 'required|min_value:0.01'
    })

    const openModalQueryTableArticle = () => {
      context.root.$bvModal.show('modal-query-table-article')
    }

    const openModalQueryPurchaseOrderDetail = () => {
      context.root.$bvModal.show('modal-query-purchase-order-detail')
    }

    const onArticleSelected = row => {
      stateBuyOrderDetail.value.idPedidoCompra = 0
      stateBuyOrderDetail.value.idDetallePedidoCompra = 0
      stateBuyOrderDetail.value.idArticulo = row.idArticulo
      stateBuyOrderDetail.value.idTablaArticulo = row._id
      stateBuyOrderDetail.value.nombreTablaArticulo = row.nombre
      stateBuyOrderDetail.value.precioCompra = row.precioCompra
      stateBuyOrderDetail.value.cantidadMax = 0
    }

    const onPurchaseOrderDetailSelected = row => {
      stateBuyOrderDetail.value.idPedidoCompra = row.idPedidoCompra
      stateBuyOrderDetail.value.idDetallePedidoCompra = row._id
      stateBuyOrderDetail.value.idArticulo = row.idArticulo
      stateBuyOrderDetail.value.idTablaArticulo = row.idTArticulo
      stateBuyOrderDetail.value.nombreTablaArticulo = row.nombreTArticulo
      stateBuyOrderDetail.value.precioCompra = row.precio
      stateBuyOrderDetail.value.cantidadMax = row.cantidad
      stateBuyOrderDetail.value.cantidad = row.cantidad
    }

    const sendForm = async () => {
      if (!validatePermission(optionsPermissions.value, !stateBuyOrderDetail.value._id ? GUARDAR : EDITAR, titleNotificationBuyOrderDetail)) return

      if (!stateBuyOrder.value._id) {
        stateBuyOrderDetail.value.loading = true
        const successValidationFeature = await props.sendHeader(ACTION_REGISTER, false)
        if (!successValidationFeature) {
          stateBuyOrderDetail.value.loading = false
          return
        }
      }

      const successValidationBuyOrderDetail = await context.refs['validation-buy-order-detail'].validate()
      if (!successValidationBuyOrderDetail) {
        stateBuyOrderDetail.value.loading = false
        return
      }
      const { status: statusBuyOrderDetail } = await sendBuyOrderDetail(stateBuyOrderDetail.value._id ? ACTION_UPDATE : ACTION_REGISTER)
      if (!statusBuyOrderDetail) return

      clearStateBuyOrderDetail()
      context.refs['validation-buy-order-detail'].reset()
      loadItemsBuyOrderDetail(1)
      loadItemsBuyOrderTributeDetail(1)
      loadItemsBuyOrderTributeSummaryDetail(1)
    }

    return {
      stateBuyOrderDetail,
      stateBuyOrder,
      sendForm,
      clearStateBuyOrderDetail,
      openModalQueryTableArticle,
      onArticleSelected,
      openModalQueryPurchaseOrderDetail,
      onPurchaseOrderDetailSelected,
      combosBuyOrderDetail,
      validationQuantity,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
