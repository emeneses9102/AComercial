<template>
  <field-set-component legend="Sub Almacén">
    <validation-observer
      ref="validation-sub-storage"
    >
      <b-form
        @submit.prevent="sendForm"
        @reset="clearStateSubStorage"
      >
        <b-row>
          <!-- Nombre -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Nombre *"
              label-for="sub-storage-name"
            >
              <validation-provider
                #default="{ errors }"
                name="Nombre Detalle"
                rules="required|min:3"
              >
                <b-form-input
                  id="sub-storage-name"
                  v-model.trim="stateSubStorage.nombre"
                  type="text"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!-- Ubicacipin -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Ubicación *"
              label-for="sub-storage-location"
            >
              <b-form-input
                id="sub-storage-location"
                v-model.trim="stateSubStorage.ubicacion"
                type="text"
              />
            </b-form-group>
          </b-col>
          <b-col
            cols="12"
          >
            <div class="d-flex flex-wrap justify-content-end">
              <button-component
                type="reset"
                variant="outline-primary"
                text-default="Limpiar"
                icon-button="DeleteIcon"
              />
              <button-component
                v-if="stateSubStorage._id"
                type="submit"
                variant="success"
                text-default="Modificar"
                icon-button="RefreshCwIcon"
                :loading="stateSubStorage.loading"
              />
              <button-component
                v-else
                type="submit"
                variant="primary"
                text-default="Agregar"
                icon-button="PlusCircleIcon"
                :loading="stateSubStorage.loading"
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
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { stateStorage } from '../ServicesStorage/useVariablesStorage'
import { stateSubStorage, clearStateSubStorage } from '../ServicesSubStorage/useVariablesSubStorage'
import { loadItemsSubStorage, sendSubStorage } from '../ServicesSubStorage/useServicesSubStorage'

export default {
  name: 'Detail',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
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
      if (!stateStorage.value._id) {
        stateSubStorage.value.loading = true
        const successValidationFeature = await props.sendHeader(ACTION_REGISTER, false)
        if (!successValidationFeature) {
          stateSubStorage.value.loading = false
          return
        }
      }

      const successValidationSubStorage = await context.refs['validation-sub-storage'].validate()
      if (!successValidationSubStorage) {
        stateSubStorage.value.loading = false
        return
      }
      const { status: statusSubStorage } = await sendSubStorage(stateSubStorage.value._id ? ACTION_UPDATE : ACTION_REGISTER)
      if (!statusSubStorage) return

      clearStateSubStorage()
      context.refs['validation-sub-storage'].reset()
      document.getElementById('sub-storage-name').focus()
      loadItemsSubStorage(1)
    }

    return {
      stateSubStorage,
      sendForm,
      clearStateSubStorage,
    }
  },
}
</script>
