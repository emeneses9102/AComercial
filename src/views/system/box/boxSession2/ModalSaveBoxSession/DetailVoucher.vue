<template>
  <field-set-component
    legend="Sessión Caja Comprobantes"
  >
    <validation-observer
      ref="validation-box-session-voucher-detail"
    >
      <b-form
        @submit.prevent="sendForm"
        @reset="clearStateBoxSessionVoucherDetail"
      >
        <b-row>
          <b-col
            cols="6"
          >
            <validation-provider
              #default="{ errors }"
              name="Comprobante"
              rules="requiredComboVueSelect:m"
            >
              <b-form-group
                label="Comprobante"
                label-for="modal-tools-options-voucher"
                :state="errors.length > 0 ? false:null"
              >
                <vue-select
                  id="modal-tools-options-voucher"
                  v-model="stateBoxSessionVoucherDetail.idComprobante"
                  :reduce="option => option._id"
                  label="nombre"
                  :clearable="false"
                  :options="combosBoxSessionVoucherDetail.voucher.data"
                  :loading="combosBoxSessionVoucherDetail.voucher.loading"
                  :disabled="combosBoxSessionVoucherDetail.voucher.disabled"
                  @option:selected="voucherSelected"
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
            cols="6"
          >
            <validation-provider
              #default="{ errors }"
              name="Correlativo"
              rules="requiredComboVueSelect:m"
            >
              <b-form-group
                label="Correlativo"
                label-for="modal-tools-options-correlative"
                :state="errors.length > 0 ? false:null"
              >
                <vue-select
                  id="modal-tools-options-correlative"
                  v-model="stateBoxSessionVoucherDetail.idCorrelativo"
                  :reduce="option => option._id"
                  label="nombre"
                  :clearable="false"
                  :options="combosBoxSessionVoucherDetail.correlative.data"
                  :loading="combosBoxSessionVoucherDetail.correlative.loading"
                  :disabled="combosBoxSessionVoucherDetail.correlative.disabled"
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
            md="4"
          >
            <b-form-group
              label="Por Defecto"
              label-for="modal-tools-options-voucher-default"
            >
              <b-form-checkbox
                id="modal-tools-options-voucher-default"
                v-model="stateBoxSessionVoucherDetail.flgDefecto"
                class="custom-control-success"
                :value="1"
                :unchecked-value="0"
                switch
              />
            </b-form-group>
          </b-col>
          <b-col
            cols="12"
            md="8"
          >
            <div class="d-flex flex-wrap justify-content-end">
              <button-component
                type="reset"
                variant="outline-primary"
                text-default="Limpiar"
                icon-button="DeleteIcon"
              />
              <button-component
                v-if="stateBoxSessionVoucherDetail._id && optionsPermissions.includes(EDITAR)"
                type="submit"
                variant="success"
                text-default="Modificar"
                icon-button="RefreshCwIcon"
                :loading="stateBoxSessionVoucherDetail.loading"
              />
              <button-component
                v-else-if="!stateBoxSessionVoucherDetail._id && optionsPermissions.includes(GUARDAR)"
                type="submit"
                variant="primary"
                text-default="Agregar"
                icon-button="PlusCircleIcon"
                :loading="stateBoxSessionVoucherDetail.loading"
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
  BForm,
  BRow,
  BCol,
  BFormGroup,
  BFormCheckbox,
} from 'bootstrap-vue'
import { computed, onMounted } from '@vue/composition-api'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { VueSelect } from 'vue-select'
import store from '@/store'
import {
  EDITAR,
  GUARDAR,
} from '@/options'
import {
  endPointsCombo,
  loadCombos,
  resetCombos,
} from '@/helpers/combos'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { validatePermission } from '@/helpers/validateActions'
import {
  stateBoxSessionVoucherDetail,
  combosBoxSessionVoucherDetail,
  clearStateBoxSessionVoucherDetail,
  titleNotificationBoxSessionVoucherDetail,
  serverQueryBoxSessionVoucherDetail,
} from '../ServicesBoxSessionVoucherDetail/useVariablesBoxSessionVoucherDetail'
import { routeNameBoxSession, stateBoxSession } from '../ServicesBoxSession/useVariablesBoxSession'
import { loadItemsBoxSessionVoucherDetail, sendBoxSessionVoucherDetail } from '../ServicesBoxSessionVoucherDetail/useServicesBoxSessionVoucherDetail'

export default {
  name: 'DetailVoucher',
  components: {
    FieldSetComponent,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormCheckbox,
    VueSelect,
    ButtonComponent,
    ValidationObserver,
    ValidationProvider,
  },
  setup(props, context) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameBoxSession]) {
        return store.state.rolesAndPermissions.options[routeNameBoxSession]
      }
      return []
    })

    onMounted(() => {
      stateBoxSessionVoucherDetail.value.idComprobante = 0
      stateBoxSessionVoucherDetail.value.idCorrelativo = 0
      resetCombos(combosBoxSessionVoucherDetail, ['voucher', 'correlative'])
      loadCombos(combosBoxSessionVoucherDetail, ['voucher'], `${endPointsCombo.comprobanteSesionCaja}/1/${stateBoxSession.value._id}/0`, 'Comprobantes')
    })

    const voucherSelected = () => {
      stateBoxSessionVoucherDetail.value.idCorrelativo = 0
      resetCombos(combosBoxSessionVoucherDetail, ['correlative'])
      loadCombos(combosBoxSessionVoucherDetail, ['correlative'], `${endPointsCombo.correlativoSesionCaja}/1/${stateBoxSession.value._id}/${stateBoxSessionVoucherDetail.value.idComprobante}`, 'Correlativos')
    }

    const sendForm = async () => {
      if (!validatePermission(optionsPermissions.value, !stateBoxSessionVoucherDetail.value._id ? GUARDAR : EDITAR, titleNotificationBoxSessionVoucherDetail)) return

      const successValidationBoxSessionVoucherDetail = await context.refs['validation-box-session-voucher-detail'].validate()
      if (!successValidationBoxSessionVoucherDetail) {
        stateBoxSessionVoucherDetail.value.loading = false
        return
      }
      const { status: statusUnitGroupDetail } = await sendBoxSessionVoucherDetail(stateBoxSessionVoucherDetail.value._id ? ACTION_UPDATE : ACTION_REGISTER)
      if (!statusUnitGroupDetail) return

      clearStateBoxSessionVoucherDetail()
      context.refs['validation-box-session-voucher-detail'].reset()
      serverQueryBoxSessionVoucherDetail.value.indice = stateBoxSession.value._id
      loadItemsBoxSessionVoucherDetail(1)
    }

    return {
      stateBoxSessionVoucherDetail,
      sendForm,
      combosBoxSessionVoucherDetail,
      clearStateBoxSessionVoucherDetail,
      voucherSelected,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
