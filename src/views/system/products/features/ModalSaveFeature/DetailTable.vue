<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      v-if="stateFeature._id"
      :columns-filter="columnsFilterFeatureDetail"
      :column-filter-selected-default="'a.nombre'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :title-notification="titleNotificationFeatureDetail"
      :columns="columnsFeatureDetail"
      :server-query="serverQueryFeatureDetail"
      :data-table="dataTableFeatureDetail"
      :load-items="loadItemsFeatureDetail"
      :manage-row="sendFeatureDetail"
      :pagination-enabled="!!stateFeature._id"
      :option-show="false"
      @open-modal-for-edit="openModalForEdit"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import { stateFeature } from '../ServicesFeature/useVariablesFeature'
import {
  stateFeatureDetail, columnsFeatureDetail, serverQueryFeatureDetail, dataTableFeatureDetail, columnsFilterFeatureDetail, titleNotificationFeatureDetail,
} from '../ServicesFeatureDetail/useVariablesFeatureDetail'
import { loadItemsFeatureDetail, sendFeatureDetail } from '../ServicesFeatureDetail/useServicesFeatureDetail'

export default {
  name: 'DetailTable',
  components: {
    FieldSetComponent,
    TableGoodComponent,
    HeaderSearchDetailComponent,
  },
  setup() {
    let timer = null
    const timeForLoad = 500

    const openModalForEdit = ({ _id, nombre, abreviatura }) => {
      stateFeatureDetail.value._id = _id
      stateFeatureDetail.value.nombre = nombre
      stateFeatureDetail.value.abreviatura = abreviatura
    }

    const onChangeField = (field, value) => {
      serverQueryFeatureDetail.value.campofiltro = field
      serverQueryFeatureDetail.value.filtro = value
      loadItemsFeatureDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableFeatureDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryFeatureDetail.value.campofiltro = field
        serverQueryFeatureDetail.value.filtro = value
        loadItemsFeatureDetail(1)
      }, timeForLoad)
    }

    return {
      stateFeature,
      columnsFeatureDetail,
      serverQueryFeatureDetail,
      dataTableFeatureDetail,
      loadItemsFeatureDetail,
      sendFeatureDetail,
      openModalForEdit,
      columnsFilterFeatureDetail,
      titleNotificationFeatureDetail,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
