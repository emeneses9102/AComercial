<template>
  <fragment>
    <b-dropdown-item
      @click="downloadExcel"
    >
      Excel
    </b-dropdown-item>
    <vue-excel-xlsx
      ref="vueExcel"
      class="d-none m-0 p-0"
      :data="dataForExport"
      :columns="newColumns"
      :filename="`${title.split(' ').join('_').toString()}_${(new Date()).toLocaleDateString()}_${(new Date()).toLocaleTimeString()}`"
      :sheetname="title"
    />
  </fragment>
</template>

<script>
import {
  BDropdownItem,
} from 'bootstrap-vue'
import { Fragment } from 'vue-fragment'
import { ref } from '@vue/composition-api'
import useFetchApiSimsac from '@/hooks/useFetchApiSimsac'

export default {
  name: 'DropDownExcelComponent',
  components: {
    BDropdownItem,
    Fragment,
  },
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
    url: {
      type: String,
      required: true,
      default: '',
    },
    serverQuery: {
      type: Object,
      required: true,
      default: () => {},
    },
    columns: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  setup(props, context) {
    const newColumns = props.columns.filter(column => column.field !== 'action')
    const dataForExport = ref([])

    const downloadExcel = async () => {
      const { data, error } = await useFetchApiSimsac(props.url, { ...props.serverQuery, pinicio: 0, pfin: 0 })
      if (error) return
      if (data) {
        dataForExport.value = data
      }
      dataForExport.value = dataForExport.value.map(row => {
        const fila = { ...row }
        newColumns.forEach(col => {
          if (col?.type === 'boolean') {
            fila[col.field] = row[col.field] ? 'SI' : 'NO'
          }
          if (col?.field === 'activo') {
            fila[col.field] = row[col.field] ? 'ACTIVO' : 'DESACTIVO'
          }
        })
        return fila
      })
      setTimeout(() => {
        context.refs.vueExcel.$el.click()
      }, 0)
    }

    return {
      newColumns,
      dataForExport,
      downloadExcel,
    }
  },
}
</script>
