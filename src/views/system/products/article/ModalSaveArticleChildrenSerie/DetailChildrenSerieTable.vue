<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      v-if="stateArticle._id"
      id="header-search-children-feature"
      :columns-filter="columnsFilterArticleChildrenSerieDetail"
      :column-filter-selected-default="'a.serie'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :title-notification="titleNotificationArticleChildrenSerieDetail"
      :columns="columnsArticleChildrenSerieDetail"
      :server-query="serverQueryArticleChildrenSerieDetail"
      :data-table="dataTableArticleChildrenSerieDetail"
      :load-items="loadItemsArticleChildrenSerieDetail"
      :manage-row="sendArticleChildrenSerieDetail"
      :pagination-enabled="!!stateArticle._id"
      :option-show="false"
      @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import { stateArticle } from '../ServicesArticle/useVariablesArticle'
import {
  columnsArticleChildrenSerieDetail, serverQueryArticleChildrenSerieDetail, dataTableArticleChildrenSerieDetail, columnsFilterArticleChildrenSerieDetail, titleNotificationArticleChildrenSerieDetail, stateArticleChildrenSerieDetail,
} from '../ServicesArticleChildrenSerieDetail/useVariablesArticleChildrenSerieDetail'
import { loadItemsArticleChildrenSerieDetail, sendArticleChildrenSerieDetail } from '../ServicesArticleChildrenSerieDetail/useServicesArticleChildrenSerieDetail'

export default {
  name: 'DetailTableChildrenSerie',
  components: {
    FieldSetComponent,
    TableGoodComponent,
    HeaderSearchDetailComponent,
  },
  computed: {
    optionsPermissions() {
      if (this.$store.state.rolesAndPermissions.options[this.$route.name]) {
        return this.$store.state.rolesAndPermissions.options[this.$route.name]
      }
      return []
    },
  },
  setup() {
    let timer = null
    const timeForLoad = 500

    const openModalFor = async ({
      _id, idTArticulo, serie, observaciones, fabricacion, vencimiento,
    }) => {
      dataTableArticleChildrenSerieDetail.value.loading = true
      stateArticleChildrenSerieDetail.value._id = _id
      stateArticleChildrenSerieDetail.value.idTArticulo = idTArticulo
      stateArticleChildrenSerieDetail.value.serie = serie
      stateArticleChildrenSerieDetail.value.observaciones = observaciones

      if ((new Date(fabricacion)).getFullYear() <= 1900) {
        stateArticleChildrenSerieDetail.value.fabricacion = null
      } else {
        stateArticleChildrenSerieDetail.value.fabricacion = fabricacion
      }

      if ((new Date(vencimiento)).getFullYear() <= 1900) {
        stateArticleChildrenSerieDetail.value.vencimiento = null
      } else {
        stateArticleChildrenSerieDetail.value.vencimiento = vencimiento
      }

      dataTableArticleChildrenSerieDetail.value.loading = false
      return true
    }

    const onChangeField = (field, value) => {
      serverQueryArticleChildrenSerieDetail.value.campofiltro = field
      serverQueryArticleChildrenSerieDetail.value.filtro = value
      loadItemsArticleChildrenSerieDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableArticleChildrenSerieDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryArticleChildrenSerieDetail.value.campofiltro = field
        serverQueryArticleChildrenSerieDetail.value.filtro = value
        loadItemsArticleChildrenSerieDetail(1)
      }, timeForLoad)
    }

    return {
      stateArticle,
      columnsArticleChildrenSerieDetail,
      serverQueryArticleChildrenSerieDetail,
      dataTableArticleChildrenSerieDetail,
      loadItemsArticleChildrenSerieDetail,
      sendArticleChildrenSerieDetail,
      columnsFilterArticleChildrenSerieDetail,
      titleNotificationArticleChildrenSerieDetail,
      openModalFor,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
