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
      :option-show="false"
      @open-modal-for-edit="openModalForEdit"
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
import { getPointSaleMovementById, loadItemsPointSaleMovement, sendPointSaleMovement } from '../../../../../ServicesPointSaleMovement/useServicesPointSaleMovement'

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

    const openModalForEdit = async ({ _id }) => {
      dataTablePointSaleMovement.value.loading = true
      await getPointSaleMovementById(_id)
      dataTablePointSaleMovement.value.loading = false
    }

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
      openModalForEdit,
      columnsFilterPointSaleMovement,
      titleNotificationPointSaleMovement,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
