<template>
  <field-set-component legend="Detalle">
    <validation-observer
      ref="validation-user-storage"
    >
      <b-form
        @submit.prevent="sendForm"
        @reset="clearStateUserStorageDetail"
      >
        <b-row>
          <!-- Almacén -->
          <b-col
            cols="12"
            md="8"
            lg="5"
          >
            <validation-provider
              #default="{ errors }"
              name="Almacén"
              rules="requiredComboVueSelect"
            >
              <b-form-group
                label="Almacén *"
                label-for="user-storage-detail-storage"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="user-storage-detail-storage"
                  v-model="stateUserStorageDetail.idAlmacen"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="storage => storage._id"
                  label="nombre"
                  :options="combosUserStorageDetail.storage.data"
                  :loading="combosUserStorageDetail.storage.loading"
                  :clearable="false"
                  :disabled="combosUserStorageDetail.storage.disabled"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- Administrar Caja -->
          <b-col
            cols="12"
            md="4"
            lg="2"
          >
            <b-form-group
              label="Administrar Caja"
              label-for="user-storage-detail-adm-box"
            >
              <b-form-checkbox
                id="user-storage-detail-adm-box"
                v-model="stateUserStorageDetail.admCaja"
                class="custom-control-success mt-50"
                :value="1"
                :unchecked-value="0"
                switch
              />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            lg="5"
          >
            <div class="d-flex flex-wrap justify-content-end mt-1">
              <button-component
                type="reset"
                variant="outline-primary"
                text-default="Limpiar"
                icon-button="DeleteIcon"
              />
              <button-component
                v-if="stateUserStorageDetail._id"
                type="submit"
                variant="success"
                text-default="Modificar"
                icon-button="RefreshCwIcon"
                :loading="stateUserStorageDetail.loading"
              />
              <button-component
                v-else
                type="submit"
                variant="primary"
                text-default="Agregar"
                icon-button="PlusCircleIcon"
                :loading="stateUserStorageDetail.loading"
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
  BForm, BRow, BCol, BFormGroup, BFormCheckbox,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import vSelect from 'vue-select'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { stateUser } from '../ServicesUser/useVariablesUser'
import { stateUserStorageDetail, clearStateUserStorageDetail, combosUserStorageDetail } from '../ServicesUserStorageDetail/useVariablesUserStorageDetail'
import { loadItemsUserStorageDetail, sendUserStorageDetail } from '../ServicesUserStorageDetail/useServicesUserStorageDetail'

export default {
  name: 'Detail',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormCheckbox,
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
    const sendForm = async () => {
      if (!stateUser.value._id) {
        stateUserStorageDetail.value.loading = true
        const successValidationUser = await props.sendHeader(ACTION_REGISTER, false)
        if (!successValidationUser) {
          stateUserStorageDetail.value.loading = false
          return
        }
      }

      const successValidationUserStorageDetail = await context.refs['validation-user-storage'].validate()
      if (!successValidationUserStorageDetail) {
        stateUserStorageDetail.value.loading = false
        return
      }
      const { status: statusUserStorageDetail } = await sendUserStorageDetail(stateUserStorageDetail.value._id ? ACTION_UPDATE : ACTION_REGISTER)
      if (!statusUserStorageDetail) return

      clearStateUserStorageDetail()
      context.refs['validation-user-storage'].reset()
      loadItemsUserStorageDetail(1)
    }

    return {
      stateUser,
      stateUserStorageDetail,
      sendForm,
      clearStateUserStorageDetail,
      combosUserStorageDetail,
    }
  },
}
</script>
