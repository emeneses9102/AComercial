<template>
  <field-set-component
    legend="Listado"
    collapse="show"
  >
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
    >
      <template
        #options-pluss="{ props }"
      >
        <template
          v-if="true"
        >
          <b-dropdown-item @click="openModalChildrenFeature(props.row)">
            <div class="d-flex align-items-center">
              <feather-icon
                icon="FlagIcon"
                class="mr-50"
              />
              <span class="d-inline-block">Características</span>
            </div>
          </b-dropdown-item>
        </template>
        <template
          v-if="true"
        >
          <b-dropdown-item @click="openModalChildrenSerie(props.row)">
            <div class="d-flex align-items-center">
              <feather-icon
                icon="GridIcon"
                class="mr-50"
              />
              <span class="d-inline-block">Serie</span>
            </div>
          </b-dropdown-item>
        </template>
      </template>
    </table-good-component>
  </field-set-component>
</template>

<script>
import {
  BDropdownItem,
} from 'bootstrap-vue'
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import { stateArticle } from '../ServicesArticle/useVariablesArticle'
import {
  columnsArticleChildrenDetail, serverQueryArticleChildrenDetail, dataTableArticleChildrenDetail, columnsFilterArticleChildrenDetail, titleNotificationArticleChildrenDetail, stateArticleChildrenDetail, clearStateArticleChildrenDetail,
} from '../ServicesArticleChildrenDetail/useVariablesArticleChildrenDetail'
import { getArticleChildrenDetailById, loadItemsArticleChildrenDetail, sendArticleChildrenDetail } from '../ServicesArticleChildrenDetail/useServicesArticleChildrenDetail'
import { serverQueryArticleChildrenFeatureDetail, stateArticleChildrenFeatureDetail } from '../ServicesArticleChildrenFeatureDetail/useVariablesArticleChildrenFeatureDetail'
import { serverQueryArticleChildrenSerieDetail, stateArticleChildrenSerieDetail } from '../ServicesArticleChildrenSerieDetail/useVariablesArticleChildrenSerieDetail'

export default {
  name: 'DetailTableFeature',
  components: {
    BDropdownItem,
    FieldSetComponent,
    TableGoodComponent,
    HeaderSearchDetailComponent,
  },
  setup(props, context) {
    let timer = null
    const timeForLoad = 500

    const openModalChildrenFeature = ({ _id }) => {
      stateArticleChildrenFeatureDetail.value.idTArticulo = _id
      serverQueryArticleChildrenFeatureDetail.value.filtro = ''
      context.root.$bvModal.show('modal-article-children-detail')
    }

    const openModalChildrenSerie = ({ _id }) => {
      stateArticleChildrenSerieDetail.value.idTArticulo = _id
      serverQueryArticleChildrenSerieDetail.value.filtro = ''
      context.root.$bvModal.show('modal-article-children-serie-detail')
    }

    const openModalFor = async ({
      _id, codBarra, codInterno, codFabricante, descripcion, idArticulo, nombre, precioCompra, precioMinimoVenta, precioVenta, stockMaximo, stockMinimo,
    }) => {
      clearStateArticleChildrenDetail()
      dataTableArticleChildrenDetail.value.loading = true
      const { data, status } = await getArticleChildrenDetailById(_id)
      dataTableArticleChildrenDetail.value.loading = false
      if (!status || !data) return false
      stateArticleChildrenDetail.value._id = _id
      stateArticleChildrenDetail.value.idArticulo = idArticulo
      stateArticleChildrenDetail.value.nombre = nombre
      stateArticleChildrenDetail.value.codInterno = codInterno
      stateArticleChildrenDetail.value.codBarra = codBarra
      stateArticleChildrenDetail.value.codFabricante = codFabricante
      stateArticleChildrenDetail.value.descripcion = descripcion
      stateArticleChildrenDetail.value.imagen = data.imagen
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
      openModalChildrenFeature,
      openModalChildrenSerie,
      openModalFor,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
