<template>
  <field-set-component legend="Detalle Artículo">
    <validation-observer
      ref="validation-article-children-feature"
    >
      <b-form
        @submit.prevent="sendForm"
        @reset="clearStateArticleChildrenFeatureDetail"
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
                label-for="article-children-feature-detail-feature"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="article-children-feature-detail-feature"
                  v-model="stateArticleChildrenFeatureDetail.idCaracteristica"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="feature => feature._id"
                  label="nombre"
                  :options="combosArticleChildrenFeatureDetail.feature.data"
                  :loading="combosArticleChildrenFeatureDetail.feature.loading"
                  :clearable="false"
                  :disabled="combosArticleChildrenFeatureDetail.feature.disabled || !!stateArticleChildrenFeatureDetail._id"
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
                label-for="article-children-feature-detail-value"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="article-children-feature-detail-value"
                  v-model="stateArticleChildrenFeatureDetail.idDtlCaracteristica"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="featureDetail => featureDetail._id"
                  label="nombre"
                  :options="combosArticleChildrenFeatureDetail.featureDetail.data"
                  :loading="combosArticleChildrenFeatureDetail.featureDetail.loading"
                  :clearable="false"
                  :disabled="combosArticleChildrenFeatureDetail.featureDetail.disabled || !!stateArticleChildrenFeatureDetail._id"
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
              label-for="article-children-feature-detail-order"
            >
              <validation-provider
                #default="{ errors }"
                name="Órden"
                rules="required"
              >
                <b-form-input
                  id="article-children-feature-detail-order"
                  v-model.trim="stateArticleChildrenFeatureDetail.orden"
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
                v-if="stateArticleChildrenFeatureDetail._id && optionsPermissions.includes(EDITAR)"
                type="submit"
                variant="success"
                text-default="Modificar"
                icon-button="RefreshCwIcon"
                :loading="stateArticleChildrenFeatureDetail.loading"
              />
              <button-component
                v-else-if="!stateArticleChildrenFeatureDetail._id && optionsPermissions.includes(GUARDAR)"
                type="submit"
                variant="primary"
                text-default="Agregar"
                icon-button="PlusCircleIcon"
                :loading="stateArticleChildrenFeatureDetail.loading"
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
import { computed } from '@vue/composition-api'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import vSelect from 'vue-select'
import store from '@/store'
import {
  EDITAR,
  GUARDAR,
} from '@/options'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { validatePermission } from '@/helpers/validateActions'
import { endPointsCombo, loadCombos, resetCombos } from '@/helpers/combos'
import { routeNameArticle, stateArticle } from '../ServicesArticle/useVariablesArticle'
import {
  stateArticleChildrenFeatureDetail, clearStateArticleChildrenFeatureDetail, combosArticleChildrenFeatureDetail, titleNotificationArticleChildrenFeatureDetail,
} from '../ServicesArticleChildrenFeatureDetail/useVariablesArticleChildrenFeatureDetail'
import { loadItemsArticleChildrenFeatureDetail, sendArticleChildrenFeatureDetail } from '../ServicesArticleChildrenFeatureDetail/useServicesArticleChildrenFeatureDetail'

export default {
  name: 'DetailChildrenFeature',
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
  setup(props, context) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameArticle]) {
        return store.state.rolesAndPermissions.options[routeNameArticle]
      }
      return []
    })

    const sendForm = async () => {
      if (!validatePermission(optionsPermissions.value, !stateArticleChildrenFeatureDetail.value._id ? GUARDAR : EDITAR, titleNotificationArticleChildrenFeatureDetail)) return

      // if (!stateArticle.value._id) {
      //   stateArticleChildrenFeatureDetail.value.loading = true
      //   const successValidationArticle = await props.sendHeader(ACTION_REGISTER, false)
      //   if (!successValidationArticle) {
      //     stateArticleChildrenFeatureDetail.value.loading = false
      //     return
      //   }
      // }

      const successValidationArticleChildrenFeatureDetail = await context.refs['validation-article-children-feature'].validate()
      if (!successValidationArticleChildrenFeatureDetail) {
        stateArticleChildrenFeatureDetail.value.loading = false
        return
      }
      const { status: statusArticleChildrenFeatureDetail } = await sendArticleChildrenFeatureDetail(stateArticleChildrenFeatureDetail.value._id ? ACTION_UPDATE : ACTION_REGISTER)
      if (!statusArticleChildrenFeatureDetail) return

      clearStateArticleChildrenFeatureDetail()
      context.refs['validation-article-children-feature'].reset()
      loadItemsArticleChildrenFeatureDetail(1)
    }

    const featureSelected = ({ _id }) => {
      stateArticleChildrenFeatureDetail.value.idDtlCaracteristica = 0
      resetCombos(combosArticleChildrenFeatureDetail, ['featureDetail'])
      loadCombos(combosArticleChildrenFeatureDetail, ['featureDetail'], `${endPointsCombo.detalleCaracteristica}/1/${_id}/0`, 'Valores Característica')
    }

    return {
      stateArticle,
      stateArticleChildrenFeatureDetail,
      sendForm,
      featureSelected,
      clearStateArticleChildrenFeatureDetail,
      combosArticleChildrenFeatureDetail,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
