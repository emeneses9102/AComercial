<template>
  <b-modal
    :id="MODAL_ID"
    centered
    :title="`${stateTribute._id ? 'Modificar' : 'Registrar'} ${titleNotificationTribute}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-tribute"
    >
      <b-form @submit.prevent="">
        <field-set-component legend="Datos Generales">
          <b-row>
            <!-- Codigo Sunat -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Código SUNAT *"
                label-for="tribute-code-sunat"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Código SUNAT"
                  rules="required"
                >
                  <b-form-input
                    id="tribute-code-sunat"
                    v-model.trim="stateTribute.codigoSunat"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                    @keydown.enter="()=>sendForm()"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- Nombre -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Nombre"
                label-for="tribute-name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nombre"
                  rules="required"
                >
                  <b-form-input
                    id="tribute-name"
                    v-model.trim="stateTribute.nombre"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- Codigo Internacional -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Código Internacional"
                label-for="tribute-code-international"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Código Internacional"
                  rules="required"
                >
                  <b-form-input
                    id="tribute-code-international"
                    v-model.trim="stateTribute.namecode"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                    @keydown.enter="()=>sendForm()"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- Tributo -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Tributo"
                label-for="tribute"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Tributo"
                  rules="required"
                >
                  <b-form-input
                    id="tribute"
                    v-model.trim="stateTribute.tributo"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                    @keydown.enter="()=>sendForm()"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- Factor -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Factor"
                label-for="tribute-factor"
              >
                <b-form-checkbox
                  id="tribute-factor"
                  v-model="stateTribute.factor"
                  class="custom-control-success"
                  :value="1"
                  :unchecked-value="0"
                  switch
                />
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
        :loading="stateTribute.loading"
        text-default="Guardar"
        :method-function="()=>sendForm()"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal, BForm, BRow, BCol, BFormGroup, BFormInput, BFormCheckbox,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import {
  MODAL_ID, titleNotificationTribute, stateTribute, clearStateTribute,
} from '../ServicesTribute/useVariablesTribute'
import { loadItemsTribute, sendTribute } from '../ServicesTribute/useServicesTribute'

export default {
  name: 'ModalSaveTribute',
  components: {
    BModal,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    ButtonComponent,
    FieldSetComponent,
    ValidationObserver,
    ValidationProvider,
  },
  setup(props, context) {
    const sendForm = async (actionSend = null, loading = true) => {
      const successValidationTribute = await context.refs['validation-tribute'].validate()
      if (!successValidationTribute) return false
      if (loading) stateTribute.value.loading = true
      const { status, data } = await sendTribute(actionSend || (stateTribute.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateTribute.value.loading = false
      if (!status) return false
      stateTribute.value._id = data.id
      clearStateTribute()
      context.refs['validation-tribute'].reset()
      await loadItemsTribute()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationTribute,
      stateTribute,
      sendForm,
    }
  },
}
</script>
