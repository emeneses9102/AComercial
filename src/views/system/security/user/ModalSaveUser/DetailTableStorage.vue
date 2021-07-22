<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      v-if="stateUser._id"
      id="header-search-storage"
      :columns-filter="columnsFilterUserStorageDetail"
      :column-filter-selected-default="'a.nombrealmacen'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :title-notification="titleNotificationUserStorageDetail"
      :columns="columnsUserStorageDetail"
      :server-query="serverQueryUserStorageDetail"
      :data-table="dataTableUserStorageDetail"
      :load-items="loadItemsUserStorageDetail"
      :manage-row="sendUserStorageDetail"
      :pagination-enabled="!!stateUser._id"
      :option-show="false"
      @open-modal-for-edit="openModalForEdit"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import { stateUser } from '../ServicesUser/useVariablesUser'
import {
  columnsUserStorageDetail, serverQueryUserStorageDetail, dataTableUserStorageDetail, columnsFilterUserStorageDetail, titleNotificationUserStorageDetail,
} from '../ServicesUserStorageDetail/useVariablesUserStorageDetail'
import { getUserStorageDetailById, loadItemsUserStorageDetail, sendUserStorageDetail } from '../ServicesUserStorageDetail/useServicesUserStorageDetail'

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
      dataTableUserStorageDetail.value.loading = true
      await getUserStorageDetailById(_id)
      dataTableUserStorageDetail.value.loading = false
    }

    const onChangeField = (field, value) => {
      serverQueryUserStorageDetail.value.campofiltro = field
      serverQueryUserStorageDetail.value.filtro = value
      loadItemsUserStorageDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableUserStorageDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryUserStorageDetail.value.campofiltro = field
        serverQueryUserStorageDetail.value.filtro = value
        loadItemsUserStorageDetail(1)
      }, timeForLoad)
    }

    return {
      stateUser,
      columnsUserStorageDetail,
      serverQueryUserStorageDetail,
      dataTableUserStorageDetail,
      loadItemsUserStorageDetail,
      sendUserStorageDetail,
      columnsFilterUserStorageDetail,
      titleNotificationUserStorageDetail,
      openModalForEdit,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
