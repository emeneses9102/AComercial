<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      id="header-search-children"
      :columns-filter="columnsFilterArticleChildrenDetail"
      :column-filter-selected-default="'_id'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :columns="columnsArticleChildrenDetailForShow"
      :server-query="serverQueryArticleChildrenDetail"
      :data-table="dataTableArticleChildrenDetail"
      :load-items="loadItemsArticleChildrenDetail"
      :option-show="false"
      :option-status="false"
      :option-edit="false"
      :option-delete="false"
    >
      <template
        #options-pluss="{ props }"
      >
        <template
          v-if="true"
        >
          <b-dropdown-item @click="openModalForShow(props.row, 'feature')">
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
          <b-dropdown-item @click="openModalForShow(props.row, 'serie')">
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
import {
  columnsArticleChildrenDetailForShow, serverQueryArticleChildrenDetail, dataTableArticleChildrenDetail, columnsFilterArticleChildrenDetail,
} from '../ServicesArticleChildrenDetail/useVariablesArticleChildrenDetail'
import { loadItemsArticleChildrenDetail } from '../ServicesArticleChildrenDetail/useServicesArticleChildrenDetail'
import { serverQueryArticleChildrenFeatureDetail, stateArticleChildrenFeatureDetail } from '../ServicesArticleChildrenFeatureDetail/useVariablesArticleChildrenFeatureDetail'
import { serverQueryArticleChildrenSerieDetail, stateArticleChildrenSerieDetail } from '../ServicesArticleChildrenSerieDetail/useVariablesArticleChildrenSerieDetail'

export default {
  name: 'DetailTable',
  components: {
    BDropdownItem,
    FieldSetComponent,
    TableGoodComponent,
    HeaderSearchDetailComponent,
  },
  setup(props, context) {
    let timer = null
    const timeForLoad = 500

    const openModalForShow = (row, actionModal = 'feature') => {
      if (actionModal === 'feature') {
        stateArticleChildrenFeatureDetail.value.idTArticulo = row._id
        serverQueryArticleChildrenFeatureDetail.value.filtro = ''
        context.root.$bvModal.show('modal-article-children-detail-show')
      } else if (actionModal === 'serie') {
        stateArticleChildrenSerieDetail.value.idTArticulo = row._id
        serverQueryArticleChildrenSerieDetail.value.filtro = ''
        context.root.$bvModal.show('modal-article-children-serie-detail-show')
      }
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
      columnsArticleChildrenDetailForShow,
      serverQueryArticleChildrenDetail,
      dataTableArticleChildrenDetail,
      loadItemsArticleChildrenDetail,
      columnsFilterArticleChildrenDetail,
      onChangeField,
      onSearchForValue,
      openModalForShow,
    }
  },
}
</script>
