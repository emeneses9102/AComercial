<template>
  <field-set-component legend="Detalle">
    <validation-observer
      ref="validation-feature-detail"
    >
      <b-form
        @submit.prevent="sendForm"
        @reset="clearStateFeatureDetail"
      >
        <b-row>
          <!-- Nombre -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Nombre *"
              label-for="feature-detail-name"
            >
              <validation-provider
                #default="{ errors }"
                name="Nombre Detalle"
                rules="required|min:3"
              >
                <b-form-input
                  id="feature-detail-name"
                  v-model.trim="stateFeatureDetail.nombre"
                  type="text"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!-- Abreviatura -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Abreviatura *"
              label-for="feature-detail-abbreviation"
            >
              <b-form-input
                id="feature-detail-abbreviation"
                v-model.trim="stateFeatureDetail.abreviatura"
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
                v-if="stateFeatureDetail._id"
                type="submit"
                variant="success"
                text-default="Modificar"
                icon-button="RefreshCwIcon"
                :loading="stateFeatureDetail.loading"
              />
              <button-component
                v-else
                type="submit"
                variant="primary"
                text-default="Agregar"
                icon-button="PlusCircleIcon"
                :loading="stateFeatureDetail.loading"
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
import { stateFeature } from '../ServicesFeature/useVariablesFeature'
import { stateFeatureDetail, clearStateFeatureDetail } from '../ServicesFeatureDetail/useVariablesFeatureDetail'
import { loadItemsFeatureDetail, sendFeatureDetail } from '../ServicesFeatureDetail/useServicesFeatureDetail'

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
      if (!stateFeature.value._id) {
        stateFeatureDetail.value.loading = true
        const successValidationFeature = await props.sendHeader(ACTION_REGISTER, false)
        if (!successValidationFeature) {
          stateFeatureDetail.value.loading = false
          return
        }
      }

      const successValidationFeatureDetail = await context.refs['validation-feature-detail'].validate()
      if (!successValidationFeatureDetail) {
        stateFeatureDetail.value.loading = false
        return
      }
      const { status: statusFeatureDetail } = await sendFeatureDetail(stateFeatureDetail.value._id ? ACTION_UPDATE : ACTION_REGISTER)
      if (!statusFeatureDetail) return

      clearStateFeatureDetail()
      context.refs['validation-feature-detail'].reset()
      document.getElementById('feature-detail-name').focus()
      loadItemsFeatureDetail(1)
    }

    return {
      stateFeatureDetail,
      sendForm,
      clearStateFeatureDetail,
    }
  },
}
</script>
