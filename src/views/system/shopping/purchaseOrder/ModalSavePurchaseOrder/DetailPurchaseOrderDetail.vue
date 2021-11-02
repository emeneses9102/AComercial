<template>
  <field-set-component legend="Detalle Pedido Compra">
    <validation-observer
      ref="validation-purchase-order-detail"
    >
      <b-form
        @submit.prevent="sendForm"
        @reset="clearStatePurchaseOrderDetail"
      >
        <b-row>
          <b-col
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
                    v-model="statePurchaseOrderDetail.nombreTArticulo"
                    :state="errors.length > 0 ? false:null"
                    readonly
                  />
                  <b-input-group-append>
                    <button-component
                      class="py-25"
                      icon-button="SearchIcon"
                      margin-class="m-0"
                      :method-function="openModalQueryTableArticle"
                      :disabled="!!statePurchaseOrder._id"
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

          <!-- Cantidad -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Cantidad *"
              label-for="purchase-order-detail-quantity"
            >
              <validation-provider
                #default="{ errors }"
                name="Cantidad"
                rules="required|min_value:0.01"
              >
                <b-form-input
                  id="purchase-order-detail-quantity"
                  v-model.number="statePurchaseOrderDetail.cantidad"
                  type="number"
                  step="0.01"
                  min="0.01"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Necesario -->
          <b-col
            cols="12"
            lg="6"
          >
            <validation-provider
              #default="{ errors }"
              name="Necesario"
              rules="required"
            >
              <b-form-group
                label="Necesario *"
                label-for="purchase-order-detail-necessary"
              >
                <b-form-datepicker
                  id="purchase-order-detail-necessary"
                  v-model="statePurchaseOrderDetail.necesario"
                  :state="errors.length > 0 ? false:null"
                  v-bind="labelsFormDate"
                />
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
                v-if="statePurchaseOrderDetail._id && optionsPermissions.includes(EDITAR)"
                type="submit"
                variant="success"
                text-default="Modificar"
                icon-button="RefreshCwIcon"
                :loading="statePurchaseOrderDetail.loading"
              />
              <button-component
                v-else-if="!statePurchaseOrderDetail._id && optionsPermissions.includes(GUARDAR)"
                type="submit"
                variant="primary"
                text-default="Agregar"
                icon-button="PlusCircleIcon"
                :loading="statePurchaseOrderDetail.loading"
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
  BForm, BRow, BCol, BFormGroup, BFormInput, BInputGroup, BInputGroupAppend, BFormDatepicker,
} from 'bootstrap-vue'
import { computed } from '@vue/composition-api'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import store from '@/store'
import {
  EDITAR,
  GUARDAR,
} from '@/options'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import ModalQueryTableArticle from '@/components/ModalQueryTableArticle/ModalQueryTableArticle.vue'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { validatePermission } from '@/helpers/validateActions'
import { routeNamePurchaseOrder, statePurchaseOrder } from '../ServicesPurchaseOrder/useVariablesPurchaseOrder'
import { statePurchaseOrderDetail, clearStatePurchaseOrderDetail, titleNotificationPurchaseOrderDetail } from '../ServicesPurchaseOrderDetail/useVariablesPurchaseOrderDetail'
import { loadItemsPurchaseOrderDetail, sendPurchaseOrderDetail } from '../ServicesPurchaseOrderDetail/useServicesPurchaseOrderDetail'

export default {
  name: 'DetailPurchaseOrderDetail',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BFormDatepicker,
    ValidationObserver,
    ValidationProvider,
    FieldSetComponent,
    ButtonComponent,
    ModalQueryTableArticle,
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
      if (store.state.rolesAndPermissions.options[routeNamePurchaseOrder]) {
        return store.state.rolesAndPermissions.options[routeNamePurchaseOrder]
      }
      return []
    })

    const openModalQueryTableArticle = () => {
      context.root.$bvModal.show('modal-query-table-article')
    }

    const onArticleSelected = ({ _id, nombre }) => {
      console.log(_id, nombre)
      statePurchaseOrderDetail.value.idTArticulo = _id
      statePurchaseOrderDetail.value.nombreTArticulo = nombre
    }

    const sendForm = async () => {
      if (!validatePermission(optionsPermissions.value, !statePurchaseOrderDetail.value._id ? GUARDAR : EDITAR, titleNotificationPurchaseOrderDetail)) return

      if (!statePurchaseOrder.value._id) {
        statePurchaseOrderDetail.value.loading = true
        const successValidationFeature = await props.sendHeader(ACTION_REGISTER, false)
        if (!successValidationFeature) {
          statePurchaseOrderDetail.value.loading = false
          return
        }
      }

      const successValidationPurchaseOrderDetail = await context.refs['validation-purchase-order-detail'].validate()
      if (!successValidationPurchaseOrderDetail) {
        statePurchaseOrderDetail.value.loading = false
        return
      }
      const { status: statusPurchaseOrderDetail } = await sendPurchaseOrderDetail(statePurchaseOrderDetail.value._id ? ACTION_UPDATE : ACTION_REGISTER)
      if (!statusPurchaseOrderDetail) return

      clearStatePurchaseOrderDetail()
      context.refs['validation-purchase-order-detail'].reset()
      loadItemsPurchaseOrderDetail(1)
    }

    return {
      statePurchaseOrderDetail,
      statePurchaseOrder,
      sendForm,
      clearStatePurchaseOrderDetail,
      openModalQueryTableArticle,
      onArticleSelected,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
