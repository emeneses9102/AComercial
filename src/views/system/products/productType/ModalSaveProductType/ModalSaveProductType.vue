<template>
  <b-modal
    :id="MODAL_ID"
    centered
    :title="`${stateProductType._id ? 'Modificar' : 'Registrar'} ${titleNotificationProductType}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-product-type"
    >
      <b-form @submit.prevent="">
        <field-set-component legend="Datos Generales">
          <b-row>
            <!-- Nombre -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Nombre *"
                label-for="product-type-name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nombre"
                  rules="required|min:3"
                >
                  <b-form-input
                    id="product-type-name"
                    v-model.trim="stateProductType.nombre"
                    type="text"
                    :state="errors.length > 0 ? false:null"
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
          (!stateProductType._id && optionsPermissions.includes(GUARDAR))
          || (stateProductType._id && optionsPermissions.includes(EDITAR))
        )"
        variant="primary"
        icon-button="SaveIcon"
        :loading="stateProductType.loading"
        text-default="Guardar"
        :method-function="()=>sendForm()"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal, BForm, BRow, BCol, BFormGroup, BFormInput,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { computed } from '@vue/composition-api'
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
  MODAL_ID, titleNotificationProductType, stateProductType, clearStateProductType, routeNameProductType,
} from '../ServicesProductType/useVariablesProductType'
import { loadItemsProductType, sendProductType } from '../ServicesProductType/useServicesProductType'

export default {
  name: 'ModalSaveProductType',
  components: {
    BModal,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    ButtonComponent,
    FieldSetComponent,
    ValidationObserver,
    ValidationProvider,
  },
  setup(props, context) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameProductType]) {
        return store.state.rolesAndPermissions.options[routeNameProductType]
      }
      return []
    })

    const sendForm = async (actionSend = null, loading = true) => {
      if (!validatePermission(optionsPermissions.value, !stateProductType.value._id ? GUARDAR : EDITAR, titleNotificationProductType)) return false
      const successValidationProductType = await context.refs['validation-product-type'].validate()
      if (!successValidationProductType) return false
      if (loading) stateProductType.value.loading = true
      const { status, data } = await sendProductType(actionSend || (stateProductType.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateProductType.value.loading = false
      if (!status) return false
      stateProductType.value._id = data.id
      clearStateProductType()
      document.getElementById('product-type-name').focus()
      context.refs['validation-product-type'].reset()
      await loadItemsProductType()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationProductType,
      stateProductType,
      sendForm,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
