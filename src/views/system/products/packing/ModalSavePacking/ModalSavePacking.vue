<template>
  <b-modal
    :id="MODAL_ID"
    centered
    :title="`${statePacking._id ? 'Modificar' : 'Registrar'} ${titleNotificationPacking}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-packing"
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
                label-for="packing-name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nombre"
                  rules="required|min:3"
                >
                  <b-form-input
                    id="packing-name"
                    v-model.trim="statePacking.nombre"
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
          (!statePacking._id && optionsPermissions.includes(GUARDAR))
          || (statePacking._id && optionsPermissions.includes(EDITAR))
        )"
        variant="primary"
        icon-button="SaveIcon"
        :loading="statePacking.loading"
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
  MODAL_ID, titleNotificationPacking, statePacking, clearStatePacking, routeNamePacking,
} from '../ServicesPacking/useVariablesPacking'
import { loadItemsPacking, sendPacking } from '../ServicesPacking/useServicesPacking'

export default {
  name: 'ModalSavePacking',
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
      if (store.state.rolesAndPermissions.options[routeNamePacking]) {
        return store.state.rolesAndPermissions.options[routeNamePacking]
      }
      return []
    })

    const sendForm = async (actionSend = null, loading = true) => {
      if (!validatePermission(optionsPermissions.value, !statePacking.value._id ? GUARDAR : EDITAR, titleNotificationPacking)) return false
      const successValidationPacking = await context.refs['validation-packing'].validate()
      if (!successValidationPacking) return false
      if (loading) statePacking.value.loading = true
      const { status, data } = await sendPacking(actionSend || (statePacking.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) statePacking.value.loading = false
      if (!status) return false
      statePacking.value._id = data.id
      clearStatePacking()
      document.getElementById('packing-name').focus()
      context.refs['validation-packing'].reset()
      await loadItemsPacking()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationPacking,
      statePacking,
      sendForm,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
