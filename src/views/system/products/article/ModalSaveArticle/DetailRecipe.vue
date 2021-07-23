<template>
  <field-set-component legend="Detalle">
    <validation-observer
      ref="validation-article-feature"
    >
      <b-form
        @submit.prevent="sendForm"
        @reset="clearStateArticleRecipeDetail"
      >
        <b-row>
          <!-- Articulo -->
          <input-search-article-component
            :selected-article="true"
            rules-validation="required"
            :name-article="stateArticleRecipeDetail.nombreReceta"
            :disabled-button="stateArticle._id && stateArticle.flgReceta ? false : true"
            :server-query-opcional="`a.id<>${stateArticle._id}`"
            @on-article-selected="recipeSelected"
          />
          <!-- Unidad -->
          <b-col
            cols="12"
            sm="6"
            lg="4"
          >
            <validation-provider
              #default="{ errors }"
              name="Unidad"
              rules="requiredComboVueSelect"
            >
              <b-form-group
                label="Unidad *"
                label-for="article-recipe-detail-unit"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="article-recipe-detail-unit"
                  v-model="stateArticleRecipeDetail.idUnidad"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="unitMeasure => unitMeasure._id"
                  label="nombre"
                  :options="combosArticleRecipeDetail.unitMeasure.data"
                  :loading="combosArticleRecipeDetail.unitMeasure.loading"
                  :clearable="false"
                  :disabled="combosArticleRecipeDetail.unitMeasure.disabled"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <!-- Cantidad -->
          <b-col
            cols="12"
            sm="6"
            lg="4"
          >
            <b-form-group
              label="Cantidad"
              label-for="article-recipe-detail-count"
            >
              <validation-provider
                #default="{ errors }"
                name="Cantidad"
                rules="required|min_value:1"
              >
                <b-form-input
                  id="article-recipe-detail-count"
                  v-model.number="stateArticleRecipeDetail.cantidad"
                  :state="errors.length > 0 ? false:null"
                  type="number"
                  min="0"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
          >
            <div class="d-flex flex-wrap justify-content-end mt-1">
              <button-component
                type="reset"
                variant="outline-primary"
                text-default="Limpiar"
                icon-button="DeleteIcon"
              />
              <button-component
                v-if="stateArticleRecipeDetail._id"
                type="submit"
                variant="success"
                text-default="Modificar"
                icon-button="RefreshCwIcon"
                :loading="stateArticleRecipeDetail.loading"
              />
              <button-component
                v-else
                type="submit"
                variant="primary"
                text-default="Agregar"
                icon-button="PlusCircleIcon"
                :loading="stateArticleRecipeDetail.loading"
                :disabled="stateArticle._id && stateArticle.flgReceta ? false : true"
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
import InputSearchArticleComponent from '@/components/InputSearchArticleComponent/InputSearchArticleComponent.vue'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { endPointsCombo, loadCombos, resetCombos } from '@/helpers/combos'
import { stateArticle } from '../ServicesArticle/useVariablesArticle'
import { stateArticleRecipeDetail, clearStateArticleRecipeDetail, combosArticleRecipeDetail } from '../ServicesArticleRecipeDetail/useVariablesArticleRecipeDetail'
import { loadItemsArticleRecipeDetail, sendArticleRecipeDetail } from '../ServicesArticleRecipeDetail/useServicesArticleRecipeDetail'

export default {
  name: 'DetailRecipe',
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
    InputSearchArticleComponent,
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
        stateArticleRecipeDetail.value.loading = true
        const successValidationArticle = await props.sendHeader(ACTION_REGISTER, false)
        if (!successValidationArticle) {
          stateArticleRecipeDetail.value.loading = false
          return
        }
      }

      const successValidationArticleRecipeDetail = await context.refs['validation-article-feature'].validate()
      if (!successValidationArticleRecipeDetail) {
        stateArticleRecipeDetail.value.loading = false
        return
      }
      const { status: statusArticleRecipeDetail } = await sendArticleRecipeDetail(stateArticleRecipeDetail.value._id ? ACTION_UPDATE : ACTION_REGISTER)
      if (!statusArticleRecipeDetail) return

      clearStateArticleRecipeDetail()
      resetCombos(combosArticleRecipeDetail, ['unitMeasure'])
      context.refs['validation-article-feature'].reset()
      loadItemsArticleRecipeDetail(1)
    }

    const recipeSelected = ({
      _id: idReceta, nombre, idGrupoUnidad, nombreGrupoUnidad,
    }) => {
      stateArticleRecipeDetail.value.idReceta = idReceta
      stateArticleRecipeDetail.value.nombreReceta = nombre
      stateArticleRecipeDetail.value.idGrupoUnidad = idGrupoUnidad
      stateArticleRecipeDetail.value.nombreGrupoUnidad = nombreGrupoUnidad
      loadCombos(combosArticleRecipeDetail, ['unitMeasure'], `${endPointsCombo.grupoUnidad}/${idGrupoUnidad}`, 'Unidad de Medida')
    }

    return {
      stateArticle,
      stateArticleRecipeDetail,
      sendForm,
      recipeSelected,
      clearStateArticleRecipeDetail,
      combosArticleRecipeDetail,
    }
  },
}
</script>
