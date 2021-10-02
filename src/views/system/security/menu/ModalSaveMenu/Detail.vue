<template>
  <field-set-component legend="Detalle">
    <validation-observer
      ref="validation-menu-option"
    >
      <b-form
        @submit.prevent="sendForm"
        @reset="clearStateMenuOptionDetail"
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
                label-for="menu-option-detail-option"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="menu-option-detail-option"
                  v-model="stateMenuOptionDetail.idOpcion"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="option => option._id"
                  label="nombre"
                  :options="combosMenuOptionDetail.option.data"
                  :loading="combosMenuOptionDetail.option.loading"
                  :clearable="false"
                  :disabled="combosMenuOptionDetail.option.disabled"
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
              />
              <button-component
                v-if="stateMenuOptionDetail._id && optionsPermissions.includes(EDITAR)"
                type="submit"
                variant="success"
                text-default="Modificar"
                icon-button="RefreshCwIcon"
                :loading="stateMenuOptionDetail.loading"
              />
              <button-component
                v-else-if="!stateMenuOptionDetail._id && optionsPermissions.includes(GUARDAR)"
                type="submit"
                variant="primary"
                text-default="Agregar"
                icon-button="PlusCircleIcon"
                :loading="stateMenuOptionDetail.loading"
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
  BForm, BRow, BCol, BFormGroup,
} from 'bootstrap-vue'
import { computed } from '@vue/composition-api'
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
import { validatePermission } from '@/helpers/validateActions'
import { routeNameMenu, stateMenu } from '../ServicesMenu/useVariablesMenu'
import {
  stateMenuOptionDetail, clearStateMenuOptionDetail, combosMenuOptionDetail, titleNotificationMenuOptionDetail,
} from '../ServicesMenuOptionDetail/useVariablesMenuOptionDetail'
import { loadItemsMenuOptionDetail, sendMenuOptionDetail } from '../ServicesMenuOptionDetail/useServicesMenuOptionDetail'

export default {
  name: 'Detail',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
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
  setup(props, context) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameMenu]) {
        return store.state.rolesAndPermissions.options[routeNameMenu]
      }
      return []
    })

    const sendForm = async () => {
      if (!validatePermission(optionsPermissions.value, !stateMenuOptionDetail.value._id ? GUARDAR : EDITAR, titleNotificationMenuOptionDetail)) return

      if (!stateMenu.value._id) {
        stateMenuOptionDetail.value.loading = true
        const successValidationMenu = await props.sendHeader(ACTION_REGISTER, false)
        if (!successValidationMenu) {
          stateMenuOptionDetail.value.loading = false
          return
        }
      }

      const successValidationMenuOptionDetail = await context.refs['validation-menu-option'].validate()
      if (!successValidationMenuOptionDetail) {
        stateMenuOptionDetail.value.loading = false
        return
      }
      const { status: statusMenuOptionDetail } = await sendMenuOptionDetail(stateMenuOptionDetail.value._id ? ACTION_UPDATE : ACTION_REGISTER)
      if (!statusMenuOptionDetail) return

      clearStateMenuOptionDetail()
      context.refs['validation-menu-option'].reset()
      loadItemsMenuOptionDetail(1)
    }

    return {
      stateMenuOptionDetail,
      sendForm,
      clearStateMenuOptionDetail,
      combosMenuOptionDetail,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
