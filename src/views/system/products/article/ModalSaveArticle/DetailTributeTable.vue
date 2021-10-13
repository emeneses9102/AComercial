<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      v-if="stateArticle._id"
      id="header-search-tribute"
      :columns-filter="columnsFilterArticleTributeDetail"
      :column-filter-selected-default="'a.nombreTributo'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :title-notification="titleNotificationArticleTributeDetail"
      :columns="columnsArticleTributeDetail"
      :server-query="serverQueryArticleTributeDetail"
      :data-table="dataTableArticleTributeDetail"
      :load-items="loadItemsArticleTributeDetail"
      :manage-row="sendArticleTributeDetail"
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
  columnsArticleTributeDetail, serverQueryArticleTributeDetail, dataTableArticleTributeDetail, columnsFilterArticleTributeDetail, titleNotificationArticleTributeDetail, stateArticleTributeDetail,
} from '../ServicesArticleTributeDetail/useVariablesArticleTributeDetail'
import { getArticleTributeDetailById, loadItemsArticleTributeDetail, sendArticleTributeDetail } from '../ServicesArticleTributeDetail/useServicesArticleTributeDetail'

export default {
  name: 'DetailTableTribute',
  components: {
    FieldSetComponent,
    TableGoodComponent,
    HeaderSearchDetailComponent,
  },
  setup() {
    let timer = null
    const timeForLoad = 500

    const openModalFor = async ({ _id }) => {
      dataTableArticleTributeDetail.value.loading = true
      const { status, data } = await getArticleTributeDetailById(_id)
      if (!status) {
        dataTableArticleTributeDetail.value.loading = false
        return false
      }
      stateArticleTributeDetail.value._id = data._id
      stateArticleTributeDetail.value.idArticulo = data.idArticulo
      stateArticleTributeDetail.value.idTributo = data.idTributo
      stateArticleTributeDetail.value.factor = data.factor

      if ((new Date(data.inicial)).getFullYear() <= 1900) {
        stateArticleTributeDetail.value.finicial = null
      } else {
        stateArticleTributeDetail.value.finicial = data.inicial
      }
      if ((new Date(data.final)).getFullYear() <= 1900) {
        stateArticleTributeDetail.value.ffinal = null
      } else {
        stateArticleTributeDetail.value.ffinal = data.final
      }
      dataTableArticleTributeDetail.value.loading = false
      return true
    }

    const onChangeField = (field, value) => {
      serverQueryArticleTributeDetail.value.campofiltro = field
      serverQueryArticleTributeDetail.value.filtro = value
      loadItemsArticleTributeDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableArticleTributeDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryArticleTributeDetail.value.campofiltro = field
        serverQueryArticleTributeDetail.value.filtro = value
        loadItemsArticleTributeDetail(1)
      }, timeForLoad)
    }

    return {
      stateArticle,
      columnsArticleTributeDetail,
      serverQueryArticleTributeDetail,
      dataTableArticleTributeDetail,
      loadItemsArticleTributeDetail,
      sendArticleTributeDetail,
      columnsFilterArticleTributeDetail,
      titleNotificationArticleTributeDetail,
      openModalFor,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
