<template>
  <field-set-component legend="Detalle">
    <validation-observer
      ref="validation-article-feature"
    >
      <b-form
        @submit.prevent="sendForm"
        @reset="clearStateArticleFeatureDetail"
      >
        <b-row>
          <!-- Caracteristica -->
          <b-col
            cols="12"
            lg="6"
          >
            <validation-provider
              #default="{ errors }"
              name="Característica"
              rules="requiredComboVueSelect"
            >
              <b-form-group
                label="Característica *"
                label-for="article-feature-detail-feature"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="article-feature-detail-feature"
                  v-model="stateArticleFeatureDetail.idCaracteristica"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="feature => feature._id"
                  label="nombre"
                  :options="combosArticleFeatureDetail.feature.data"
                  :loading="combosArticleFeatureDetail.feature.loading"
                  :clearable="false"
                  :disabled="combosArticleFeatureDetail.feature.disabled || !!stateArticleFeatureDetail._id"
                  @option:selected="featureSelected"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <!-- Valor Caracteristica -->
          <b-col
            cols="12"
            lg="6"
          >
            <validation-provider
              #default="{ errors }"
              name="Valor"
              rules="requiredComboVueSelect:m"
            >
              <b-form-group
                label="Valor *"
                label-for="article-feature-detail-value"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="article-feature-detail-value"
                  v-model="stateArticleFeatureDetail.idDtlCaracteristica"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="featureDetail => featureDetail._id"
                  label="nombre"
                  :options="combosArticleFeatureDetail.featureDetail.data"
                  :loading="combosArticleFeatureDetail.featureDetail.loading"
                  :clearable="false"
                  :disabled="combosArticleFeatureDetail.featureDetail.disabled || !!stateArticleFeatureDetail._id"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <!-- Órden -->
          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              label="Órden"
              label-for="article-feature-detail-order"
            >
              <validation-provider
                #default="{ errors }"
                name="Órden"
                rules="required"
              >
                <b-form-input
                  id="article-feature-detail-order"
                  v-model.trim="stateArticleFeatureDetail.orden"
                  type="number"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col
            cols="12"
            md="6"
          >
            <div class="d-flex flex-wrap justify-content-end mt-1">
              <button-component
                type="reset"
                variant="outline-primary"
                text-default="Limpiar"
                icon-button="DeleteIcon"
              />
              <button-component
                v-if="stateArticleFeatureDetail._id"
                type="submit"
                variant="success"
                text-default="Modificar"
                icon-button="RefreshCwIcon"
                :loading="stateArticleFeatureDetail.loading"
              />
              <button-component
                v-else
                type="submit"
                variant="primary"
                text-default="Agregar"
                icon-button="PlusCircleIcon"
                :loading="stateArticleFeatureDetail.loading"
                :disabled="stateArticle._id ? false : true"
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
import vSelect from 'vue-select'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { endPointsCombo, loadCombos } from '@/helpers/combos'
import { stateArticle } from '../ServicesArticle/useVariablesArticle'
import { stateArticleFeatureDetail, clearStateArticleFeatureDetail, combosArticleFeatureDetail } from '../ServicesArticleFeatureDetail/useVariablesArticleFeatureDetail'
import { loadItemsArticleFeatureDetail, sendArticleFeatureDetail } from '../ServicesArticleFeatureDetail/useServicesArticleFeatureDetail'

export default {
  name: 'DetailFeature',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
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
      if (!stateArticle.value._id) {
        stateArticleFeatureDetail.value.loading = true
        const successValidationArticle = await props.sendHeader(ACTION_REGISTER, false)
        if (!successValidationArticle) {
          stateArticleFeatureDetail.value.loading = false
          return
        }
      }

      const successValidationArticleFeatureDetail = await context.refs['validation-article-feature'].validate()
      if (!successValidationArticleFeatureDetail) {
        stateArticleFeatureDetail.value.loading = false
        return
      }
      const { status: statusArticleFeatureDetail } = await sendArticleFeatureDetail(stateArticleFeatureDetail.value._id ? ACTION_UPDATE : ACTION_REGISTER)
      if (!statusArticleFeatureDetail) return

      clearStateArticleFeatureDetail()
      context.refs['validation-article-feature'].reset()
      loadItemsArticleFeatureDetail(1)
    }

    const featureSelected = ({ _id }) => {
      loadCombos(combosArticleFeatureDetail, ['featureDetail'], `${endPointsCombo.detalleCaracteristica}/1/${_id}`, 'Valores Característica')
    }

    return {
      stateArticle,
      stateArticleFeatureDetail,
      sendForm,
      featureSelected,
      clearStateArticleFeatureDetail,
      combosArticleFeatureDetail,
    }
  },
}
</script>
