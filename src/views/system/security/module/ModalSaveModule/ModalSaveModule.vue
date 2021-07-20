<template>
  <b-modal
    :id="MODAL_ID"
    centered
    :title="`${stateModule._id ? 'Modificar' : 'Registrar'} ${titleNotificationModule}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-module"
    >
      <b-form @submit.prevent="">
        <field-set-component legend="Datos Generales">
          <b-row>

            <!-- Módulo Superior -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Modulo Superior"
                label-for="module-super"
              >
                <vue-select
                  id="module-super"
                  v-model="stateModule.idPadre"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="module => module._id"
                  label="nombre"
                  :options="combosModule.module.data"
                  :loading="combosModule.module.loading"
                  :disabled="combosModule.module.disabled"
                  @input="inputIdPadre"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </vue-select>
              </b-form-group>
            </b-col>

            <!-- Nombre -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Nombre *"
                label-for="module-name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nombre"
                  rules="required|min:3"
                >
                  <b-form-input
                    id="module-name"
                    v-model.trim="stateModule.nombre"
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
              :icono.sync="stateModule.icono"
            />
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
        :loading="stateModule.loading"
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
import { VueSelect } from 'vue-select'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ModalSearchIconComponent from '@/components/ModalSearchIconComponent/ModalSearchIconComponent.vue'
import {
  MODAL_ID, titleNotificationModule, stateModule, clearStateModule, combosModule,
} from '../ServicesModule/useVariablesModule'
import { loadItemsModule, sendModule } from '../ServicesModule/useServicesModule'

export default {
  name: 'ModalSaveModule',
  components: {
    BModal,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    VueSelect,
    ButtonComponent,
    FieldSetComponent,
    ValidationObserver,
    ValidationProvider,
    ModalSearchIconComponent,
  },
  setup(props, context) {
    const sendForm = async (actionSend = null, loading = true) => {
      const successValidationModule = await context.refs['validation-module'].validate()
      if (!successValidationModule) return false
      if (loading) stateModule.value.loading = true
      const { status, data } = await sendModule(actionSend || (stateModule.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateModule.value.loading = false
      if (!status) return false
      stateModule.value._id = data.id
      clearStateModule()
      context.refs['validation-module'].reset()
      await loadItemsModule()
      return true
    }

    const inputIdPadre = value => {
      if (!value) {
        stateModule.value.idPadre = 0
      }
    }

    return {
      MODAL_ID,
      titleNotificationModule,
      stateModule,
      combosModule,
      sendForm,
      inputIdPadre,
    }
  },
}
</script>
