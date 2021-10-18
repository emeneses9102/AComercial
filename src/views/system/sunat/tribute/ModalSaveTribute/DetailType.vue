<template>
  <field-set-component legend="Detalle Tipos">
    <validation-observer
      ref="validation-tribute-type"
    >
      <b-form
        @submit.prevent="sendForm"
        @reset="clearStateTributeTypeDetail"
      >
        <b-row>
          <!-- Tipo Producto -->
          <b-col
            cols="12"
            lg="6"
          >
            <validation-provider
              #default="{ errors }"
              name="Tipo Producto"
            >
              <b-form-group
                label="Tipo Producto"
                label-for="tribute-type-product-type"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="tribute-type-product-type"
                  v-model="stateTributeTypeDetail.idTipoProducto"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="productType => productType._id"
                  label="nombre"
                  :options="combosTributeTypeDetail.productType.data"
                  :loading="combosTributeTypeDetail.productType.loading"
                  :clearable="false"
                  :disabled="combosTributeTypeDetail.productType.disabled"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <!-- Tipo Servicio -->
          <b-col
            cols="12"
            lg="6"
          >
            <validation-provider
              #default="{ errors }"
              name="Tipo Servicio"
            >
              <b-form-group
                label="Tipo Servicio"
                label-for="tribute-type-service-type"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="tribute-type-service-type"
                  v-model="stateTributeTypeDetail.idTipoServicio"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="serviceType => serviceType._id"
                  label="nombre"
                  :options="combosTributeTypeDetail.serviceType.data"
                  :loading="combosTributeTypeDetail.serviceType.loading"
                  :clearable="false"
                  :disabled="combosTributeTypeDetail.serviceType.disabled"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <!-- Factor -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Factor *"
              label-for="tribute-type-detail-factor-number"
            >
              <validation-provider
                #default="{ errors }"
                name="Factor"
                rules="required"
              >
                <b-form-input
                  id="tribute-type-detail-factor-number"
                  v-model.trim="stateTributeTypeDetail.factor"
                  type="number"
                  step="0.01"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!-- Inicio -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Inicio"
              label-for="tribute-type-detail-start"
            >
              <b-form-datepicker
                id="tribute-type-detail-start"
                v-model="stateTributeTypeDetail.finicial"
                v-bind="labelsFormDate"
              />
            </b-form-group>
          </b-col>
          <!-- Fin -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Fin"
              label-for="tribute-type-detail-end"
            >
              <b-form-datepicker
                id="tribute-type-detail-end"
                v-model="stateTributeTypeDetail.ffinal"
                v-bind="labelsFormDate"
              />
            </b-form-group>
          </b-col>
          <b-col
            cols="12"
          >
            <div class="d-flex flex-wrap justify-content-end mt-1">
              <button-component
                type="reset"
                variant="outline-primary"
                text-default="Limpiar"
                icon-button="DeleteIcon"
              />
              <button-component
                v-if="stateTributeTypeDetail._id && optionsPermissions.includes(EDITAR)"
                type="submit"
                variant="success"
                text-default="Modificar"
                icon-button="RefreshCwIcon"
                :loading="stateTributeTypeDetail.loading"
              />
              <button-component
                v-else-if="!stateTributeTypeDetail._id && optionsPermissions.includes(GUARDAR)"
                type="submit"
                variant="primary"
                text-default="Agregar"
                icon-button="PlusCircleIcon"
                :loading="stateTributeTypeDetail.loading"
                :disabled="stateTribute._id ? false : true"
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
  BForm, BRow, BCol, BFormGroup, BFormInput, BFormDatepicker,
} from 'bootstrap-vue'
import { computed, onMounted } from '@vue/composition-api'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import vSelect from 'vue-select'
import store from '@/store'
import {
  EDITAR,
  GUARDAR,
} from '@/options'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { endPointsCombo, loadCombos } from '@/helpers/combos'
import { validatePermission } from '@/helpers/validateActions'
import { messageToast } from '@/helpers/messageExtensions'
import { routeNameTribute, stateTribute } from '../ServicesTribute/useVariablesTribute'
import {
  stateTributeTypeDetail, clearStateTributeTypeDetail, combosTributeTypeDetail, titleNotificationTributeTypeDetail,
} from '../ServicesTributeTypeDetail/useVariablesTributeTypeDetail'
import { loadItemsTributeTypeDetail, sendTributeTypeDetail } from '../ServicesTributeTypeDetail/useServicesTributeTypeDetail'

export default {
  name: 'DetailType',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormDatepicker,
    vSelect,
    ValidationObserver,
    ValidationProvider,
    FieldSetComponent,
    ButtonComponent,
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
        labelNoDateSelected: '',
        labelCalendar: 'Calendario',
        labelNav: 'Navegación de calendario',
        labelHelp: 'Navegar por el calendario con las teclas de flechas',
      },
    }
  },
  setup(props, context) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameTribute]) {
        return store.state.rolesAndPermissions.options[routeNameTribute]
      }
      return []
    })

    onMounted(() => {
      loadCombos(combosTributeTypeDetail, ['productType'], `${endPointsCombo.tipoProducto}/1`, 'Tipo Producto')
      loadCombos(combosTributeTypeDetail, ['serviceType'], `${endPointsCombo.tipoServicio}/1`, 'Tipo Servicio')
    })

    const sendForm = async () => {
      if (!validatePermission(optionsPermissions.value, !stateTributeTypeDetail.value._id ? GUARDAR : EDITAR, titleNotificationTributeTypeDetail)) return

      if (!stateTribute.value._id) {
        stateTributeTypeDetail.value.loading = true
        const successValidationTribute = await props.sendHeader(ACTION_REGISTER, false)
        if (!successValidationTribute) {
          stateTributeTypeDetail.value.loading = false
          return
        }
      }

      const successValidationTributeTypeDetail = await context.refs['validation-tribute-type'].validate()

      if (!stateTributeTypeDetail.value.idTipoProducto && !stateTributeTypeDetail.value.idTipoServicio) {
        messageToast('warning', 'Campos Requeridos', 'Debe seleccionar un Tipo Producto y/o Tipo Servicio')
        return
      }

      if (!successValidationTributeTypeDetail) {
        stateTributeTypeDetail.value.loading = false
        return
      }
      const { status: statusTributeTypeDetail } = await sendTributeTypeDetail(stateTributeTypeDetail.value._id ? ACTION_UPDATE : ACTION_REGISTER)
      if (!statusTributeTypeDetail) return

      clearStateTributeTypeDetail()
      context.refs['validation-tribute-type'].reset()
      loadItemsTributeTypeDetail(1)
    }

    return {
      stateTribute,
      stateTributeTypeDetail,
      sendForm,
      clearStateTributeTypeDetail,
      combosTributeTypeDetail,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
