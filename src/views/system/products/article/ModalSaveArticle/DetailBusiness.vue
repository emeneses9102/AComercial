<template>
  <field-set-component legend="Detalle">
    <validation-observer
      ref="validation-article-business"
    >
      <b-form
        @submit.prevent="sendForm"
        @reset="clearStateArticleBusinessDetail"
      >
        <b-row>
          <!-- Negocio -->
          <b-col
            cols="12"
            md="6"
          >
            <validation-provider
              #default="{ errors }"
              name="Negocio"
              rules="requiredComboVueSelect:m"
            >
              <b-form-group
                label="Negocio *"
                label-for="article-business-detail-business"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="article-business-detail-business"
                  v-model="stateArticleBusinessDetail.idNegocio"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="businessUnit => businessUnit._id"
                  label="nombre"
                  :options="combosArticleBusinessDetail.businessUnit.data"
                  :loading="combosArticleBusinessDetail.businessUnit.loading"
                  :clearable="false"
                  :disabled="combosArticleBusinessDetail.businessUnit.disabled || !!stateArticleBusinessDetail._id"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
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
                v-if="stateArticleBusinessDetail._id && optionsPermissions.includes(EDITAR)"
                type="submit"
                variant="success"
                text-default="Modificar"
                icon-button="RefreshCwIcon"
                :loading="stateArticleBusinessDetail.loading"
              />
              <button-component
                v-else-if="!stateArticleBusinessDetail._id && optionsPermissions.includes(GUARDAR)"
                type="submit"
                variant="primary"
                text-default="Agregar"
                icon-button="PlusCircleIcon"
                :loading="stateArticleBusinessDetail.loading"
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
  BForm, BRow, BCol, BFormGroup,
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
import { routeNameArticle, stateArticle } from '../ServicesArticle/useVariablesArticle'
import {
  stateArticleBusinessDetail, clearStateArticleBusinessDetail, combosArticleBusinessDetail, titleNotificationArticleBusinessDetail,
} from '../ServicesArticleBusinessDetail/useVariablesArticleBusinessDetail'
import { loadItemsArticleBusinessDetail, sendArticleBusinessDetail } from '../ServicesArticleBusinessDetail/useServicesArticleBusinessDetail'

export default {
  name: 'DetailBusiness',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
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
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameArticle]) {
        return store.state.rolesAndPermissions.options[routeNameArticle]
      }
      return []
    })

    const sendForm = async () => {
      if (!validatePermission(optionsPermissions.value, !stateArticleBusinessDetail.value._id ? GUARDAR : EDITAR, titleNotificationArticleBusinessDetail)) return

      if (!stateArticle.value._id) {
        stateArticleBusinessDetail.value.loading = true
        const successValidationArticle = await props.sendHeader(ACTION_REGISTER, false)
        if (!successValidationArticle) {
          stateArticleBusinessDetail.value.loading = false
          return
        }
      }

      const successValidationArticleBusinessDetail = await context.refs['validation-article-business'].validate()
      if (!successValidationArticleBusinessDetail) {
        stateArticleBusinessDetail.value.loading = false
        return
      }
      const { status: statusArticleBusinessDetail } = await sendArticleBusinessDetail(stateArticleBusinessDetail.value._id ? ACTION_UPDATE : ACTION_REGISTER)
      if (!statusArticleBusinessDetail) return

      clearStateArticleBusinessDetail()
      context.refs['validation-article-business'].reset()
      loadItemsArticleBusinessDetail(1)
    }

    return {
      stateArticle,
      stateArticleBusinessDetail,
      sendForm,
      clearStateArticleBusinessDetail,
      combosArticleBusinessDetail,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
