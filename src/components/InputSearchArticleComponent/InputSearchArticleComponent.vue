<template>
  <fragment>
    <div>
      <b-modal
        :id="MODAL_ID"
        centered
        title="Buscador de Artículos"
        ok-title="Ok"
        cancel-title="Cerrar"
        cancel-variant="outline-primary"
        no-close-on-backdrop
        size="lg"
      >
        <field-set-component
          legend="Buscador de Artículos"
        >
          <header-search-detail-component
            :columns-filter="columnsFilterArticle"
            :column-filter-selected-default="'a.nombre'"
            @on-change-field="onChangeField"
            @on-search-for-value="onSearchForValue"
          />
          <table-good-component
            :title-notification="titleNotificationArticle"
            :columns="columnsArticle"
            :server-query="serverQueryArticle"
            :data-table="dataTableArticle"
            :load-items="loadItemsArticle"
            @on-row-click="rowSelected"
          />
        </field-set-component>
      </b-modal>
    </div>

    <!-- Articulo -->
    <b-col
      :cols="cols"
      :sm="colsm"
      :md="colmd"
      :lg="collg"
    >
      <validation-provider
        #default="{ errors }"
        name="Artículo"
        :rules="rulesValidation"
      >
        <b-form-group
          label="Artículo"
          label-for="input-article-button"
        >
          <b-input-group>
            <b-form-input
              id="input-article-button"
              v-model="nameArticle"
              :state="errors.length > 0 ? false:null"
              readonly
            />
            <b-input-group-append>
              <button-component
                class="py-25"
                icon-button="SearchIcon"
                margin-class="m-0"
                :method-function="openModal"
                :loading="dataTableArticle.loading"
                :disabled="disabledButton"
              />
            </b-input-group-append>
          </b-input-group>
          <small class="text-danger">{{ errors[0] }}</small>
        </b-form-group>
      </validation-provider>
    </b-col>
  </fragment>
</template>

<script>
import {
  BModal, BCol, BFormGroup, BFormInput, BInputGroup, BInputGroupAppend,
} from 'bootstrap-vue'
import { Fragment } from 'vue-fragment'
import { ValidationProvider } from 'vee-validate'
import ButtonComponent from '../ButtonComponent/ButtonComponent.vue'
import FieldSetComponent from '../FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '../TableComponent/TableGoodComponent.vue'
import HeaderSearchDetailComponent from '../HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import {
  MODAL_ID, stateArticle, columnsArticle, dataTableArticle, serverQueryArticle, columnsFilterArticle, titleNotificationArticle,
} from './useVariablesArticle'
import { getArticleById, loadItemsArticle } from './useServicesArticle'

export default {
  name: 'InputSearchArticleComponent',
  components: {
    BModal,
    BCol,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    ValidationProvider,
    Fragment,
    ButtonComponent,
    FieldSetComponent,
    TableGoodComponent,
    HeaderSearchDetailComponent,
  },
  model: {
    prop: 'value',
    event: 'update:value',
  },
  props: {
    // Propiedades permitidas para la distribución de columna en un componente b-row
    cols: {
      type: String,
      default: '12',
    },
    colsm: {
      type: String,
      default: '12',
    },
    colmd: {
      type: String,
      default: '12',
    },
    collg: {
      type: String,
      default: '12',
    },
    rulesValidation: {
      type: String,
      required: false,
      default: '',
    },
    selectedArticle: {
      type: Boolean,
      required: false,
      default: false,
    },
    nameArticle: {
      type: String,
      required: true,
      default: '',
    },
    disabledButton: {
      type: Boolean,
      required: false,
      default: true,
    },
    serverQueryOpcional: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props, context) {
    let timer = null
    const timeForLoad = 500

    const openModal = async () => {
      if (props.serverQueryOpcional) {
        serverQueryArticle.value.opcional = props.serverQueryOpcional
      }
      await loadItemsArticle(1)
      context.root.$bvModal.show(MODAL_ID)
    }
    const rowSelected = async row => {
      stateArticle.value = { ...stateArticle.value, ...row }
      if (props.selectedArticle) {
        dataTableArticle.value.loading = true
        await getArticleById(row._id)
        dataTableArticle.value.loading = false
      }
      stateArticle.value.nombre = row.nombre
      context.emit('on-article-selected', stateArticle.value)
      context.root.$bvModal.hide(MODAL_ID)
    }

    const onChangeField = (field, value) => {
      serverQueryArticle.value.campofiltro = field
      serverQueryArticle.value.filtro = value
      loadItemsArticle(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableArticle.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryArticle.value.campofiltro = field
        serverQueryArticle.value.filtro = value
        loadItemsArticle(1)
      }, timeForLoad)
    }

    return {
      MODAL_ID,
      columnsArticle,
      columnsFilterArticle,
      dataTableArticle,
      serverQueryArticle,
      loadItemsArticle,
      stateArticle,
      titleNotificationArticle,
      openModal,
      rowSelected,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>

<style lang="scss">
#modal-search-article {
  .modal-dialog {
    @media screen and (min-width: 576px) {
      max-width: 700px;
      width: 90%;
    }
  }
  .modal-lg {
    @media screen and (min-width: 992px) {
      max-width: 1000px;
      width: 90%;
    }
  }
}
</style>
