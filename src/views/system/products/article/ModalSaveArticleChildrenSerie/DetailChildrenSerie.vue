<template>
  <field-set-component legend="Detalle Artículo Serie">
    <validation-observer
      ref="validation-article-children-serie"
    >
      <b-form
        @submit.prevent="sendForm"
        @reset="clearStateArticleChildrenSerieDetail"
      >
        <b-row>
          <!-- Serie -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Serie *"
              label-for="article-children-serie-detail-serie"
            >
              <validation-provider
                #default="{ errors }"
                name="Serie"
                rules="required|min:3"
              >
                <b-form-input
                  id="article-children-serie-detail-serie"
                  v-model.trim="stateArticleChildrenSerieDetail.serie"
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
              label="Observación"
              label-for="article-children-serie-detail-observation"
            >
              <b-form-textarea
                id="article-children-serie-detail-observation"
                v-model.trim="stateArticleChildrenSerieDetail.observaciones"
                type="text"
              />
            </b-form-group>
          </b-col>
          <!-- Fabricación -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Fabricación"
              label-for="article-children-serie-detail-manufacturing"
            >
              <b-form-datepicker
                id="article-children-serie-detail-manufacturing"
                v-model="stateArticleChildrenSerieDetail.fabricacion"
                v-bind="labelsFormDate"
              />
            </b-form-group>
          </b-col>
          <!-- Vencimiento -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Vencimiento"
              label-for="article-children-serie-detail-expiration"
            >
              <b-form-datepicker
                id="article-children-serie-detail-expiration"
                v-model="stateArticleChildrenSerieDetail.vencimiento"
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
                v-if="stateArticleChildrenSerieDetail._id && optionsPermissions.includes(EDITAR)"
                type="submit"
                variant="success"
                text-default="Modificar"
                icon-button="RefreshCwIcon"
                :loading="stateArticleChildrenSerieDetail.loading"
              />
              <button-component
                v-else-if="!stateArticleChildrenSerieDetail._id && optionsPermissions.includes(GUARDAR)"
                type="submit"
                variant="primary"
                text-default="Agregar"
                icon-button="PlusCircleIcon"
                :loading="stateArticleChildrenSerieDetail.loading"
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
  BForm, BRow, BCol, BFormGroup, BFormInput, BFormTextarea, BFormDatepicker,
} from 'bootstrap-vue'
import { computed } from '@vue/composition-api'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import store from '@/store'
import {
  EDITAR,
  GUARDAR,
} from '@/options'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { validatePermission } from '@/helpers/validateActions'
import { routeNameArticle } from '../ServicesArticle/useVariablesArticle'
import {
  stateArticleChildrenSerieDetail, clearStateArticleChildrenSerieDetail, titleNotificationArticleChildrenSerieDetail,
} from '../ServicesArticleChildrenSerieDetail/useVariablesArticleChildrenSerieDetail'
import { loadItemsArticleChildrenSerieDetail, sendArticleChildrenSerieDetail } from '../ServicesArticleChildrenSerieDetail/useServicesArticleChildrenSerieDetail'

export default {
  name: 'DetailChildrenSerie',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BFormDatepicker,
    ValidationObserver,
    ValidationProvider,
    FieldSetComponent,
    ButtonComponent,
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
      if (!validatePermission(optionsPermissions.value, !stateArticleChildrenSerieDetail.value._id ? GUARDAR : EDITAR, titleNotificationArticleChildrenSerieDetail)) return

      const successValidationArticleChildrenSerieDetail = await context.refs['validation-article-children-serie'].validate()
      if (!successValidationArticleChildrenSerieDetail) {
        stateArticleChildrenSerieDetail.value.loading = false
        return
      }
      const { status: statusArticleChildrenSerieDetail } = await sendArticleChildrenSerieDetail(stateArticleChildrenSerieDetail.value._id ? ACTION_UPDATE : ACTION_REGISTER)
      if (!statusArticleChildrenSerieDetail) return

      clearStateArticleChildrenSerieDetail()
      context.refs['validation-article-children-serie'].reset()
      loadItemsArticleChildrenSerieDetail(1)
    }

    return {
      stateArticleChildrenSerieDetail,
      sendForm,
      clearStateArticleChildrenSerieDetail,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
