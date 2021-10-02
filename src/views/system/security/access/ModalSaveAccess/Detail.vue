<template>
  <field-set-component legend="Opciones disponibles">
    <b-form
      @submit.prevent="sendForm"
      @reset="clearStateAccessOptionDetail"
    >
      <b-row>
        <!-- Opción -->
        <b-col
          cols="12"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Opción"
            rules="requiredComboVueSelect"
          >
            <b-form-group
              label="Opción *"
              label-for="access-option-detail-option"
              :state="errors.length > 0 ? false:null"
            >
              <v-select
                id="access-option-detail-option"
                v-model="stateAccessOptionDetail.idOpcion"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :reduce="option => option._id"
                label="nombre"
                :options="combosAccessOptionDetail.option.data"
                :loading="combosAccessOptionDetail.option.loading"
                :clearable="false"
                :disabled="combosAccessOptionDetail.option.disabled"
              >
                <template v-slot:no-options>
                  No se encontraron resultados.
                </template>
              </v-select>
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col
          cols="12"
          lg="6"
        >
          <div class="d-flex flex-wrap justify-content-end mt-1">
            <button-component
              type="reset"
              variant="outline-primary"
              text-default="Limpiar"
              icon-button="DeleteIcon"
              :method-function="resetDetail"
            />
            <button-component
              v-if="optionsPermissions.includes(GUARDAR)"
              type="submit"
              variant="primary"
              text-default="Agregar"
              icon-button="PlusCircleIcon"
              :loading="stateAccessOptionDetail.loading"
            />
          </div>
        </b-col>
      </b-row>
    </b-form>
  </field-set-component>
</template>

<script>
import {
  BForm, BRow, BCol, BFormGroup,
} from 'bootstrap-vue'
import { computed } from '@vue/composition-api'
import { ValidationProvider } from 'vee-validate'
import vSelect from 'vue-select'
import store from '@/store'
import {
  GUARDAR,
} from '@/options'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { validatePermission } from '@/helpers/validateActions'
import { routeNameAccess, stateAccess } from '../ServicesAccess/useVariablesAccess'
import {
  stateAccessOptionDetail, clearStateAccessOptionDetail, combosAccessOptionDetail, titleNotificationAccessOptionDetail,
} from '../ServicesAccessOptionDetail/useVariablesAccessOptionDetail'
import { loadItemsAccessOptionDetail, sendAccessOptionDetail } from '../ServicesAccessOptionDetail/useServicesAccessOptionDetail'

export default {
  name: 'Detail',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    vSelect,
    ValidationProvider,
    FieldSetComponent,
    ButtonComponent,
  },
  props: {
    sendHeader: {
      type: Function,
      required: true,
    },
    validateDetail: {
      type: Function,
      required: true,
      default: () => {},
    },
    resetDetail: {
      type: Function,
      required: true,
      default: () => {},
    },
  },
  setup(props) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameAccess]) {
        return store.state.rolesAndPermissions.options[routeNameAccess]
      }
      return []
    })

    const sendForm = async () => {
      if (!validatePermission(optionsPermissions.value, GUARDAR, titleNotificationAccessOptionDetail)) return

      if (!stateAccess.value._id) {
        stateAccessOptionDetail.value.loading = true
        const successValidationAccess = await props.sendHeader(ACTION_REGISTER, false)
        if (!successValidationAccess) {
          stateAccessOptionDetail.value.loading = false
          return
        }
      }

      const successValidationAccessOptionDetail = await props.validateDetail()
      if (!successValidationAccessOptionDetail) {
        stateAccessOptionDetail.value.loading = false
        return
      }
      const { status: statusAccessOptionDetail } = await sendAccessOptionDetail(stateAccessOptionDetail.value._id ? ACTION_UPDATE : ACTION_REGISTER)
      if (!statusAccessOptionDetail) return

      clearStateAccessOptionDetail()
      props.resetDetail()
      loadItemsAccessOptionDetail(1)
    }

    return {
      stateAccessOptionDetail,
      sendForm,
      clearStateAccessOptionDetail,
      combosAccessOptionDetail,

      optionsPermissions,
      GUARDAR,
    }
  },
}
</script>
