<template>
  <b-modal
    :id="MODAL_ID"
    centered
    :title="`Guardar ${titleNotificationSystemMessage}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-system-message"
    >
      <b-form @submit.prevent="">
        <field-set-component legend="Datos Generales">
          <b-row>
            <!-- codigo -->
            <b-col
              cols="12"
              lg="6"
            >
              <b-form-group
                label="Código *"
                label-for="system-message-codigo"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Orden"
                  rules="required"
                >
                  <b-form-input
                    id="system-message-codigo"
                    v-model.number="stateSystemMessage._id"
                    type="number"
                    :readonly="actionModal === 'UPDATE' ? true : false"
                    :state="errors.length > 0 ? false:null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- SQLEstado -->
            <b-col
              cols="12"
              lg="6"
            >
              <b-form-group
                label="SQL Estado *"
                label-for="system-message-sqlEstado"
              >
                <validation-provider
                  #default="{ errors }"
                  name="sqlEstado"
                  rules="required|min:3"
                >
                  <b-form-input
                    id="system-message-sqlEstado"
                    v-model.trim="stateSystemMessage.sqlEstado"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                    @keydown.enter="()=>sendForm()"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- msjError -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Mensaje Error *"
                label-for="system-message-msjError"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Mensaje Error"
                  rules="required|min:3"
                >
                  <b-form-input
                    id="system-message-msjError"
                    v-model.trim="stateSystemMessage.msjError"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                    @keydown.enter="()=>sendForm()"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- mensaje -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Mensaje *"
                label-for="system-message-mensaje"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Mensaje"
                  rules="required|min:3"
                >
                  <b-form-input
                    id="system-message-mensaje"
                    v-model.trim="stateSystemMessage.mensaje"
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
          (!stateSystemMessage._id && optionsPermissions.includes(GUARDAR))
          || (stateSystemMessage._id && optionsPermissions.includes(EDITAR))
        )"
        variant="primary"
        icon-button="SaveIcon"
        :loading="stateSystemMessage.loading"
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
import { validatePermission } from '@/helpers/validateActions'
import {
  GUARDAR,
  EDITAR,
} from '@/options'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import {
  MODAL_ID, titleNotificationSystemMessage, stateSystemMessage, clearStateSystemMessage, actionModal, routeNameSystemMessage,
} from '../ServicesSystemMessage/useVariablesSystemMessage'
import { loadItemsSystemMessage, sendSystemMessage } from '../ServicesSystemMessage/useServicesSystemMessage'

export default {
  name: 'ModalSaveSystemMessage',
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
      if (store.state.rolesAndPermissions.options[routeNameSystemMessage]) {
        return store.state.rolesAndPermissions.options[routeNameSystemMessage]
      }
      return []
    })

    const sendForm = async (actionSend = null, loading = true) => {
      if (!validatePermission(optionsPermissions.value, !stateSystemMessage.value._id ? GUARDAR : EDITAR, titleNotificationSystemMessage)) return false
      const successValidationSystemMessage = await context.refs['validation-system-message'].validate()
      if (!successValidationSystemMessage) return false
      if (loading) stateSystemMessage.value.loading = true
      const { status, data } = await sendSystemMessage(actionSend || (actionModal.value === 'UPDATE' ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateSystemMessage.value.loading = false
      if (!status) return false
      stateSystemMessage.value._id = data.id
      clearStateSystemMessage()
      actionModal.value = 'NEW'
      document.getElementById('system-message-codigo').focus()
      context.refs['validation-system-message'].reset()
      await loadItemsSystemMessage()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationSystemMessage,
      stateSystemMessage,
      sendForm,
      actionModal,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
