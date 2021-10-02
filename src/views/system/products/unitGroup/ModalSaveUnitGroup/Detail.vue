<template>
  <field-set-component legend="Detalle">
    <validation-observer
      ref="validation-unit-group"
    >
      <b-form
        @submit.prevent="sendForm"
        @reset="clearStateUnitGroupDetail"
      >
        <b-row>
          <!-- Nombre -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Nombre *"
              label-for="unit-group-detail-name"
            >
              <validation-provider
                #default="{ errors }"
                name="Nombre Detalle"
                rules="required|min:3"
              >
                <b-form-input
                  id="unit-group-detail-name"
                  v-model.trim="stateUnitGroupDetail.nombre"
                  type="text"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!-- Unidad Medida -->
          <b-col
            cols="12"
            lg="6"
          >
            <validation-provider
              #default="{ errors }"
              name="grupo unidad"
              rules="requiredComboVueSelect:m"
            >
              <b-form-group
                label="Unidad Medida *"
                label-for="unit-group-detail-unit-measure"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="unit-group-detail-unit-measure"
                  v-model="stateUnitGroupDetail.idUnidadSunat"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="unitMeasure => unitMeasure._id"
                  label="nombre"
                  :options="combosUnitGroupDetail.unitMeasure.data"
                  :loading="combosUnitGroupDetail.unitMeasure.loading"
                  :clearable="false"
                  :disabled="combosUnitGroupDetail.unitMeasure.disabled"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <!-- Cantidad -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Cantidad *"
              label-for="unit-group-detail-count"
            >
              <validation-provider
                #default="{ errors }"
                name="Cantidad"
                rules="required"
              >
                <b-form-input
                  id="unit-group-detail-count"
                  v-model.number="stateUnitGroupDetail.cantidad"
                  type="number"
                  :state="errors.length > 0 ? false:null"
                  step="0.0001"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
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
                v-if="stateUnitGroupDetail._id && optionsPermissions.includes(EDITAR)"
                type="submit"
                variant="success"
                text-default="Modificar"
                icon-button="RefreshCwIcon"
                :loading="stateUnitGroupDetail.loading"
              />
              <button-component
                v-else-if="!stateUnitGroupDetail._id && optionsPermissions.includes(GUARDAR)"
                type="submit"
                variant="primary"
                text-default="Agregar"
                icon-button="PlusCircleIcon"
                :loading="stateUnitGroupDetail.loading"
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
  BForm, BRow, BCol, BFormGroup, BFormInput,
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
import { routeNameUnitGroup, stateUnitGroup } from '../ServicesUnitGroup/useVariablesUnitGroup'
import {
  stateUnitGroupDetail, clearStateUnitGroupDetail, combosUnitGroupDetail, titleNotificationUnitGroupDetail,
} from '../ServicesUnitGroupDetail/useVariablesUnitGroupDetail'
import { loadItemsUnitGroupDetail, sendUnitGroupDetail } from '../ServicesUnitGroupDetail/useServicesUnitGroupDetail'

export default {
  name: 'Detail',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
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
      if (store.state.rolesAndPermissions.options[routeNameUnitGroup]) {
        return store.state.rolesAndPermissions.options[routeNameUnitGroup]
      }
      return []
    })

    const sendForm = async () => {
      if (!validatePermission(optionsPermissions.value, !stateUnitGroupDetail.value._id ? GUARDAR : EDITAR, titleNotificationUnitGroupDetail)) return

      if (!stateUnitGroup.value._id) {
        stateUnitGroupDetail.value.loading = true
        const successValidationUnitGroup = await props.sendHeader(ACTION_REGISTER, false)
        if (!successValidationUnitGroup) {
          stateUnitGroupDetail.value.loading = false
          return
        }
      }

      const successValidationUnitGroupDetail = await context.refs['validation-unit-group'].validate()
      if (!successValidationUnitGroupDetail) {
        stateUnitGroupDetail.value.loading = false
        return
      }
      const { status: statusUnitGroupDetail } = await sendUnitGroupDetail(stateUnitGroupDetail.value._id ? ACTION_UPDATE : ACTION_REGISTER)
      if (!statusUnitGroupDetail) return

      clearStateUnitGroupDetail()
      context.refs['validation-unit-group'].reset()
      document.getElementById('unit-group-detail-name').focus()
      loadItemsUnitGroupDetail(1)
    }

    return {
      stateUnitGroupDetail,
      sendForm,
      clearStateUnitGroupDetail,
      combosUnitGroupDetail,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
