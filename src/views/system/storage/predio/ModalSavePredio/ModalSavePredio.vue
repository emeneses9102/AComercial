<template>
  <b-modal
    :id="MODAL_ID"
    centered
    :title="`${statePredio._id ? 'Modificar' : 'Registrar'} ${titleNotificationPredio}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-predio"
    >
      <b-form @submit.prevent="">
        <field-set-component legend="Datos Generales">
          <b-row>

            <!-- Ubigeo -->
            <ubigeo-component @selected-district="selectedDistrict" />

            <!-- Dirección -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Dirección *"
                label-for="predio-direction"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Dirección"
                  rules="required|min:10"
                >
                  <b-form-input
                    id="predio-direction"
                    v-model.trim="statePredio.direccion"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                    @keydown.enter="()=>sendForm()"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Observación -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Observación *"
                label-for="predio-observation"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Observación"
                  rules="required|min:3"
                >
                  <b-form-input
                    id="predio-observation"
                    v-model.trim="statePredio.observacion"
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
          (!statePredio._id && optionsPermissions.includes(GUARDAR))
          || (statePredio._id && optionsPermissions.includes(EDITAR))
        )"
        variant="primary"
        icon-button="SaveIcon"
        :loading="statePredio.loading"
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
import UbigeoComponent from '@/components/UbigeoComponent/UbigeoComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import {
  MODAL_ID, titleNotificationPredio, statePredio, clearStatePredio, clearCombosPredioUbigeo, clearStatePredioUbigeo, routeNamePredio,
} from '../ServicesPredio/useVariablesPredio'
import { loadItemsPredio, sendPredio } from '../ServicesPredio/useServicesPredio'

export default {
  name: 'ModalSavePredio',
  components: {
    BModal,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    UbigeoComponent,
    ButtonComponent,
    FieldSetComponent,
    ValidationObserver,
    ValidationProvider,
  },
  setup(props, context) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNamePredio]) {
        return store.state.rolesAndPermissions.options[routeNamePredio]
      }
      return []
    })

    const sendForm = async (actionSend = null, loading = true) => {
      if (!validatePermission(optionsPermissions.value, !statePredio.value._id ? GUARDAR : EDITAR, titleNotificationPredio)) return false

      const successValidationPredio = await context.refs['validation-predio'].validate()
      if (!successValidationPredio) return false
      if (loading) statePredio.value.loading = true
      const { status, data } = await sendPredio(actionSend || (statePredio.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) statePredio.value.loading = false
      if (!status) return false
      statePredio.value._id = data.id
      clearStatePredio()
      clearStatePredioUbigeo()
      clearCombosPredioUbigeo()
      context.refs['validation-predio'].reset()
      await loadItemsPredio()
      return true
    }

    const selectedDistrict = idUbigeo => {
      statePredio.value.idUbigeo = idUbigeo
    }

    return {
      MODAL_ID,
      titleNotificationPredio,
      statePredio,
      sendForm,
      selectedDistrict,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
