<template>
  <field-set-component legend="Detalle">
    <validation-observer
      ref="validation-article-tribute"
    >
      <b-form
        @submit.prevent="sendForm"
        @reset="clearStateArticleTributeDetail"
      >
        <b-row>
          <!-- Tributo -->
          <b-col
            cols="12"
            lg="6"
          >
            <validation-provider
              #default="{ errors }"
              name="Tributo"
              rules="requiredComboVueSelect"
            >
              <b-form-group
                label="Tributo *"
                label-for="article-tribute-detail-tribute"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="article-tribute-detail-tribute"
                  v-model="stateArticleTributeDetail.idTributo"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="tribute => tribute._id"
                  label="nombre"
                  :options="combosArticleTributeDetail.tribute.data"
                  :loading="combosArticleTributeDetail.tribute.loading"
                  :clearable="false"
                  :disabled="combosArticleTributeDetail.tribute.disabled || !!stateArticleTributeDetail._id"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <!-- Factor -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Factor *"
              label-for="article-tribute-detail-factor-number"
            >
              <validation-provider
                #default="{ errors }"
                name="Factor"
                rules="required"
              >
                <b-form-input
                  id="article-tribute-detail-factor-number"
                  v-model.trim="stateArticleTributeDetail.factor"
                  type="number"
                  step="0.01"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!-- Inicio -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Inicio"
              label-for="article-tribute-detail-start"
            >
              <b-form-datepicker
                id="article-tribute-detail-start"
                v-model="stateArticleTributeDetail.finicio"
                v-bind="labelsFormDate"
              />
            </b-form-group>
          </b-col>
          <!-- Fin -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Fin"
              label-for="article-tribute-detail-end"
            >
              <b-form-datepicker
                id="article-tribute-detail-end"
                v-model="stateArticleTributeDetail.ffin"
                v-bind="labelsFormDate"
              />
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
                v-if="stateArticleTributeDetail._id && optionsPermissions.includes(EDITAR)"
                type="submit"
                variant="success"
                text-default="Modificar"
                icon-button="RefreshCwIcon"
                :loading="stateArticleTributeDetail.loading"
              />
              <button-component
                v-else-if="!stateArticleTributeDetail._id && optionsPermissions.includes(GUARDAR)"
                type="submit"
                variant="primary"
                text-default="Agregar"
                icon-button="PlusCircleIcon"
                :loading="stateArticleTributeDetail.loading"
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
  BForm, BRow, BCol, BFormGroup, BFormInput, BFormDatepicker,
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
  stateArticleTributeDetail, clearStateArticleTributeDetail, combosArticleTributeDetail, titleNotificationArticleTributeDetail,
} from '../ServicesArticleTributeDetail/useVariablesArticleTributeDetail'
import { loadItemsArticleTributeDetail, sendArticleTributeDetail } from '../ServicesArticleTributeDetail/useServicesArticleTributeDetail'

export default {
  name: 'DetailFeature',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormDatepicker,
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
  data() {
    return {
      labelsFormDate: {
        labelPrevDecade: 'Década anterior',
        labelPrevYear: 'Año anterior',
        labelPrevMonth: 'El mes pasado',
        labelCurrentMonth: 'Mes actual',
        labelNextMonth: 'Próximo mes',
        labelNextYear: 'El próximo año',
        labelNextDecade: 'La próxima década',
        labelToday: 'Hoy',
        labelSelected: 'Fecha seleccionada',
        labelNoDateSelected: '',
        labelCalendar: 'Calendario',
        labelNav: 'Navegación de calendario',
        labelHelp: 'Navegar por el calendario con las teclas de flechas',
      },
    }
  },
  setup(props, context) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameArticle]) {
        return store.state.rolesAndPermissions.options[routeNameArticle]
      }
      return []
    })

    const sendForm = async () => {
      if (!validatePermission(optionsPermissions.value, !stateArticleTributeDetail.value._id ? GUARDAR : EDITAR, titleNotificationArticleTributeDetail)) return

      if (!stateArticle.value._id) {
        stateArticleTributeDetail.value.loading = true
        const successValidationArticle = await props.sendHeader(ACTION_REGISTER, false)
        if (!successValidationArticle) {
          stateArticleTributeDetail.value.loading = false
          return
        }
      }

      const successValidationArticleTributeDetail = await context.refs['validation-article-tribute'].validate()
      if (!successValidationArticleTributeDetail) {
        stateArticleTributeDetail.value.loading = false
        return
      }
      const { status: statusArticleTributeDetail } = await sendArticleTributeDetail(stateArticleTributeDetail.value._id ? ACTION_UPDATE : ACTION_REGISTER)
      if (!statusArticleTributeDetail) return

      clearStateArticleTributeDetail()
      context.refs['validation-article-tribute'].reset()
      loadItemsArticleTributeDetail(1)
    }

    return {
      stateArticle,
      stateArticleTributeDetail,
      sendForm,
      clearStateArticleTributeDetail,
      combosArticleTributeDetail,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
