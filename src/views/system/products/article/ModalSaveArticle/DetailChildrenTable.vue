<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      v-if="stateArticle._id"
      id="header-search-children"
      :columns-filter="columnsFilterArticleChildrenDetail"
      :column-filter-selected-default="'_id'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :title-notification="titleNotificationArticleChildrenDetail"
      :columns="columnsArticleChildrenDetail"
      :server-query="serverQueryArticleChildrenDetail"
      :data-table="dataTableArticleChildrenDetail"
      :load-items="loadItemsArticleChildrenDetail"
      :manage-row="sendArticleChildrenDetail"
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
  columnsArticleChildrenDetail, serverQueryArticleChildrenDetail, dataTableArticleChildrenDetail, columnsFilterArticleChildrenDetail, titleNotificationArticleChildrenDetail, stateArticleChildrenDetail, clearStateArticleChildrenDetail,
} from '../ServicesArticleChildrenDetail/useVariablesArticleChildrenDetail'
import { loadItemsArticleChildrenDetail, sendArticleChildrenDetail } from '../ServicesArticleChildrenDetail/useServicesArticleChildrenDetail'

export default {
  name: 'DetailTableFeature',
  components: {
    FieldSetComponent,
    TableGoodComponent,
    HeaderSearchDetailComponent,
  },
  setup() {
    let timer = null
    const timeForLoad = 500

    const openModalFor = async ({
      _id, codBarra, codInterno, codFabricante, descripcion, idArticulo, imagen, nombre, precioCompra, precioMinimoVenta, precioVenta, stockMaximo, stockMinimo,
    }) => {
      clearStateArticleChildrenDetail()
      dataTableArticleChildrenDetail.value.loading = true
      stateArticleChildrenDetail.value._id = _id
      stateArticleChildrenDetail.value.idArticulo = idArticulo
      stateArticleChildrenDetail.value.nombre = nombre
      stateArticleChildrenDetail.value.codInterno = codInterno
      stateArticleChildrenDetail.value.codBarra = codBarra
      stateArticleChildrenDetail.value.codFabricante = codFabricante
      stateArticleChildrenDetail.value.descripcion = descripcion
      stateArticleChildrenDetail.value.imagen = imagen
      stateArticleChildrenDetail.value.precioCompra = precioCompra
      stateArticleChildrenDetail.value.precioVenta = precioVenta
      stateArticleChildrenDetail.value.precioMinimoVenta = precioMinimoVenta
      stateArticleChildrenDetail.value.stockMinimo = stockMinimo
      stateArticleChildrenDetail.value.stockMaximo = stockMaximo
      dataTableArticleChildrenDetail.value.loading = false
      return true
    }

    const onChangeField = (field, value) => {
      serverQueryArticleChildrenDetail.value.campofiltro = field
      serverQueryArticleChildrenDetail.value.filtro = value
      loadItemsArticleChildrenDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableArticleChildrenDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryArticleChildrenDetail.value.campofiltro = field
        serverQueryArticleChildrenDetail.value.filtro = value
        loadItemsArticleChildrenDetail(1)
      }, timeForLoad)
    }

    return {
      stateArticle,
      columnsArticleChildrenDetail,
      serverQueryArticleChildrenDetail,
      dataTableArticleChildrenDetail,
      loadItemsArticleChildrenDetail,
      sendArticleChildrenDetail,
      columnsFilterArticleChildrenDetail,
      titleNotificationArticleChildrenDetail,
      openModalFor,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
