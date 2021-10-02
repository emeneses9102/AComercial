<template>
  <field-set-component legend="Detalle">
    <validation-observer
      ref="validation-user-business"
    >
      <b-form
        @submit.prevent="sendForm"
        @reset="clearStateUserBusinessDetail"
      >
        <b-row>
          <!-- Negocio -->
          <b-col
            cols="12"
            lg="6"
          >
            <validation-provider
              #default="{ errors }"
              name="Negocio"
              rules="requiredComboVueSelect:m"
            >
              <b-form-group
                label="Negocio *"
                label-for="user-business-detail-business-unit"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="user-business-detail-business-unit"
                  v-model="stateUserBusinessDetail.idNegocio"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="businessUnit => businessUnit._id"
                  label="nombre"
                  :options="combosUserBusinessDetail.businessUnit.data"
                  :loading="combosUserBusinessDetail.businessUnit.loading"
                  :clearable="false"
                  :disabled="combosUserBusinessDetail.businessUnit.disabled"
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
                v-if="stateUserBusinessDetail._id && optionsPermissions.includes(EDITAR)"
                type="submit"
                variant="success"
                text-default="Modificar"
                icon-button="RefreshCwIcon"
                :loading="stateUserBusinessDetail.loading"
              />
              <button-component
                v-else-if="!stateUserBusinessDetail._id && optionsPermissions.includes(GUARDAR)"
                type="submit"
                variant="primary"
                text-default="Agregar"
                icon-button="PlusCircleIcon"
                :loading="stateUserBusinessDetail.loading"
                :disabled="stateUser._id ? false : true"
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
import { routeNameUser, stateUser } from '../ServicesUser/useVariablesUser'
import {
  stateUserBusinessDetail, clearStateUserBusinessDetail, combosUserBusinessDetail, titleNotificationUserBusinessDetail,
} from '../ServicesUserBusinessDetail/useVariablesUserBusinessDetail'
import { loadItemsUserBusinessDetail, sendUserBusinessDetail } from '../ServicesUserBusinessDetail/useServicesUserBusinessDetail'

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
      if (store.state.rolesAndPermissions.options[routeNameUser]) {
        return store.state.rolesAndPermissions.options[routeNameUser]
      }
      return []
    })

    const sendForm = async () => {
      if (!validatePermission(optionsPermissions.value, !stateUserBusinessDetail.value._id ? GUARDAR : EDITAR, titleNotificationUserBusinessDetail)) return

      if (!stateUser.value._id) {
        stateUserBusinessDetail.value.loading = true
        const successValidationUser = await props.sendHeader(ACTION_REGISTER, false)
        if (!successValidationUser) {
          stateUserBusinessDetail.value.loading = false
          return
        }
      }

      const successValidationUserBusinessDetail = await context.refs['validation-user-business'].validate()
      if (!successValidationUserBusinessDetail) {
        stateUserBusinessDetail.value.loading = false
        return
      }
      const { status: statusUserBusinessDetail } = await sendUserBusinessDetail(stateUserBusinessDetail.value._id ? ACTION_UPDATE : ACTION_REGISTER)
      if (!statusUserBusinessDetail) return

      clearStateUserBusinessDetail()
      context.refs['validation-user-business'].reset()
      loadItemsUserBusinessDetail(1)
    }

    return {
      stateUser,
      stateUserBusinessDetail,
      sendForm,
      clearStateUserBusinessDetail,
      combosUserBusinessDetail,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
