<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      v-if="statePointSale._id"
      :columns-filter="columnsFilterPointSaleMovement"
      :column-filter-selected-default="'_id'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :title-notification="titleNotificationPointSaleMovement"
      :columns="columnsPointSaleMovement"
      :server-query="serverQueryPointSaleMovement"
      :data-table="dataTablePointSaleMovement"
      :load-items="loadItemsPointSaleMovement"
      :manage-row="sendPointSaleMovement"
      :pagination-enabled="!!statePointSale._id"
      :validate-options-by-route="false"
      :option-show="false"
      :option-edit="false"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import { statePointSale } from '../../../../../ServicesPointSale/useVariablesPointSale'
import {
  columnsPointSaleMovement, serverQueryPointSaleMovement, dataTablePointSaleMovement, columnsFilterPointSaleMovement, titleNotificationPointSaleMovement,
} from '../../../../../ServicesPointSaleMovement/useVariablesPointSaleMovement'
import { loadItemsPointSaleMovement, sendPointSaleMovement } from '../../../../../ServicesPointSaleMovement/useServicesPointSaleMovement'

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

    const onChangeField = (field, value) => {
      serverQueryPointSaleMovement.value.campofiltro = field
      serverQueryPointSaleMovement.value.filtro = value
      loadItemsPointSaleMovement(1)
    }

    const onSearchForValue = (field, value) => {
      dataTablePointSaleMovement.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryPointSaleMovement.value.campofiltro = field
        serverQueryPointSaleMovement.value.filtro = value
        loadItemsPointSaleMovement(1)
      }, timeForLoad)
    }

    return {
      statePointSale,
      columnsPointSaleMovement,
      serverQueryPointSaleMovement,
      dataTablePointSaleMovement,
      loadItemsPointSaleMovement,
      sendPointSaleMovement,
      columnsFilterPointSaleMovement,
      titleNotificationPointSaleMovement,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
