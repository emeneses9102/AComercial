<template>
  <b-modal
    :id="MODAL_ID"
    centered
    :title="`${stateChangeType._id ? 'Modificar' : 'Registrar'} ${titleNotificationChangeType}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-change-type"
    >
      <b-form @submit.prevent="">
        <field-set-component legend="Datos Generales">
          <b-row>
            <!-- Fecha -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="{ errors }"
                name="Fecha"
                rules="required"
              >
                <b-form-group
                  label="Fecha *"
                  label-for="change-type-date"
                >
                  <b-form-datepicker
                    id="change-type-date"
                    v-model="stateChangeType.fecha"
                    :state="errors.length > 0 ? false:null"
                    v-bind="labelsFormDate"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <!-- Moneda -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="{ errors }"
                name="Moneda"
                rules="requiredComboVueSelect"
              >
                <b-form-group
                  label="Moneda *"
                  label-for="change-type-currency"
                  :state="errors.length > 0 ? false:null"
                >
                  <vue-select
                    id="change-type-currency"
                    v-model="stateChangeType.idMoneda"
                    class="style-chooser"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :reduce="currency => currency._id"
                    label="nombre"
                    :options="combosChangeType.currency.data"
                    :loading="combosChangeType.currency.loading"
                    :clearable="false"
                    :disabled="combosChangeType.currency.disabled"
                    @option:selected="selectedCurrency"
                  >
                    <template v-slot:no-options>
                      No se encontraron resultados.
                    </template>
                  </vue-select>
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <!-- Compra -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Compra *"
                label-for="change-type-purchase"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Compra"
                  rules="required"
                >
                  <b-form-input
                    id="change-type-purchase"
                    v-model.number="stateChangeType.compra"
                    type="number"
                    :state="errors.length > 0 ? false:null"
                    :disabled="mlocal"
                    @keydown.enter="()=>sendForm()"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- Venta -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Venta *"
                label-for="change-type-sale"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Venta"
                  rules="required"
                >
                  <b-form-input
                    id="change-type-sale"
                    v-model.number="stateChangeType.venta"
                    type="number"
                    :state="errors.length > 0 ? false:null"
                    :disabled="mlocal"
                    @keydown.enter="()=>sendForm()"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
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
          (!stateChangeType._id && optionsPermissions.includes(GUARDAR))
          || (stateChangeType._id && optionsPermissions.includes(EDITAR))
        )"
        variant="primary"
        icon-button="SaveIcon"
        :loading="stateChangeType.loading"
        text-default="Guardar"
        :method-function="()=>sendForm()"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal, BForm, BRow, BCol, BFormGroup, BFormInput, BFormDatepicker,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { VueSelect } from 'vue-select'
import { computed, onMounted } from '@vue/composition-api'
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
  MODAL_ID, titleNotificationChangeType, stateChangeType, clearStateChangeType, combosChangeType, routeNameChangeType, mlocal, currenciesLocal,
} from '../ServicesChangeType/useVariablesChangeType'
import { loadItemsChangeType, sendChangeType, getCurrencyLocal } from '../ServicesChangeType/useServicesChangeType'

export default {
  name: 'ModalSaveChangeType',
  components: {
    BModal,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormDatepicker,
    ButtonComponent,
    FieldSetComponent,
    ValidationObserver,
    ValidationProvider,
    VueSelect,
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
      if (store.state.rolesAndPermissions.options[routeNameChangeType]) {
        return store.state.rolesAndPermissions.options[routeNameChangeType]
      }
      return []
    })

    onMounted(() => {
      getCurrencyLocal()
    })

    const selectedCurrency = async ({ _id }) => {
      if (currenciesLocal.value.find(currency => currency._id === _id)) {
        mlocal.value = true
        stateChangeType.value.compra = 1
        stateChangeType.value.venta = 1
      } else {
        mlocal.value = false
      }
    }

    const sendForm = async (actionSend = null, loading = true) => {
      if (!validatePermission(optionsPermissions.value, !stateChangeType.value._id ? GUARDAR : EDITAR, titleNotificationChangeType)) return false
      const successValidationChangeType = await context.refs['validation-change-type'].validate()
      if (!successValidationChangeType) return false
      if (loading) stateChangeType.value.loading = true
      const { status, data } = await sendChangeType(actionSend || (stateChangeType.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateChangeType.value.loading = false
      if (!status) return false
      stateChangeType.value._id = data.id
      clearStateChangeType()
      context.refs['validation-change-type'].reset()
      await loadItemsChangeType()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationChangeType,
      stateChangeType,
      combosChangeType,
      selectedCurrency,
      mlocal,
      sendForm,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
