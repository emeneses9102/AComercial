<template>
  <b-modal
    :id="MODAL_ID"
    centered
    :title="`${stateOption._id ? 'Modificar' : 'Registrar'} ${titleNotificationOption}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-option"
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
                label-for="option-name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nombre"
                  rules="required|min:3"
                >
                  <b-form-input
                    id="option-name"
                    v-model.trim="stateOption.nombre"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                    @keydown.enter="()=>sendForm()"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Icono -->
            <modal-search-icon-component
              :icono.sync="stateOption.icono"
            />

            <!-- Etiqueta -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Etiqueta *"
                label-for="option-tag"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Etiqueta"
                  rules="required|min:3"
                >
                  <b-form-input
                    id="option-tag"
                    v-model.trim="stateOption.etiqueta"
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
        variant="primary"
        icon-button="SaveIcon"
        :loading="stateOption.loading"
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
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ModalSearchIconComponent from '@/components/ModalSearchIconComponent/ModalSearchIconComponent.vue'
import {
  MODAL_ID, titleNotificationOption, stateOption, clearStateOption,
} from '../ServicesOption/useVariablesOption'
import { loadItemsOption, sendOption } from '../ServicesOption/useServicesOption'

export default {
  name: 'ModalSaveOption',
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
    ModalSearchIconComponent,
  },
  setup(props, context) {
    const sendForm = async (actionSend = null, loading = true) => {
      const successValidationOption = await context.refs['validation-option'].validate()
      if (!successValidationOption) return false
      if (loading) stateOption.value.loading = true
      const { status, data } = await sendOption(actionSend || (stateOption.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateOption.value.loading = false
      if (!status) return false
      stateOption.value._id = data.id
      clearStateOption()
      document.getElementById('option-name').focus()
      context.refs['validation-option'].reset()
      await loadItemsOption()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationOption,
      stateOption,
      sendForm,
    }
  },
}
</script>
