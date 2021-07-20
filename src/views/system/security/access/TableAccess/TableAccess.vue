<template>
  <table-good-component
    :title-notification="titleNotificationAccess"
    :columns="columnsAccess"
    :server-query="serverQueryAccess"
    :data-table="dataTableAccess"
    :load-items="loadItemsAccess"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  columnsAccess, dataTableAccess, titleNotificationAccess, serverQueryAccess,
} from '../ServicesAccess/useVariablesAccess'
import { loadItemsAccess } from '../ServicesAccess/useServicesAccess'

export default {
  name: 'TableAccess',
  components: {
    TableGoodComponent,
  },
  setup() {
    onMounted(() => {
      loadItemsAccess()
    })
    return {
      columnsAccess,
      serverQueryAccess,
      dataTableAccess,
      loadItemsAccess,
      titleNotificationAccess,
    }
  },
}
</script>
