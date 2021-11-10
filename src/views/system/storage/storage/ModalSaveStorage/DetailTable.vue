<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      v-if="stateStorage._id"
      :columns-filter="columnsFilterSubStorage"
      :column-filter-selected-default="'a.nombre'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :title-notification="titleNotificationSubStorage"
      :columns="columnsSubStorage"
      :server-query="serverQuerySubStorage"
      :data-table="dataTableSubStorage"
      :load-items="loadItemsSubStorage"
      :manage-row="sendSubStorage"
      :pagination-enabled="!!stateStorage._id"
      :option-show="false"
      @open-modal-for-edit="openModalForEdit"
      @delete-row="onAfter"
      @change-status="onAfter"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import { stateStorage } from '../ServicesStorage/useVariablesStorage'
import {
  stateSubStorage, columnsSubStorage, serverQuerySubStorage, dataTableSubStorage, columnsFilterSubStorage, titleNotificationSubStorage, clearStateSubStorage,
} from '../ServicesSubStorage/useVariablesSubStorage'
import { loadItemsSubStorage, sendSubStorage } from '../ServicesSubStorage/useServicesSubStorage'

export default {
  name: 'DetailTable',
  components: {
    FieldSetComponent,
    TableGoodComponent,
    HeaderSearchDetailComponent,
  },
  props: {
    resetSubStorage: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    let timer = null
    const timeForLoad = 500

    // Función que se ejecutara cuando se de click en el botón editar
    const openModalForEdit = ({ _id, nombre, ubicacion }) => {
      stateSubStorage.value._id = _id
      stateSubStorage.value.nombre = nombre
      stateSubStorage.value.ubicacion = ubicacion
    }

    // Función que se ejecutara cuando se cambie el campo de busqueda
    const onChangeField = (field, value) => {
      serverQuerySubStorage.value.campofiltro = field
      serverQuerySubStorage.value.filtro = value
      if (value.trim().length) loadItemsSubStorage(1)
    }

    // Función que se ejecutara cuando ingrese un caracter en el buscador
    const onSearchForValue = (field, value) => {
      dataTableSubStorage.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQuerySubStorage.value.campofiltro = field
        serverQuerySubStorage.value.filtro = value
        loadItemsSubStorage(1)
      }, timeForLoad)
    }

    // Función que se ejecutara despues de eliminar o cambiar el estado de un registro
    const onAfter = () => {
      clearStateSubStorage()
      props.resetSubStorage()
    }

    // Retorno de variables y funciones que se utilizaran en el template
    return {
      stateStorage,
      columnsSubStorage,
      serverQuerySubStorage,
      dataTableSubStorage,
      loadItemsSubStorage,
      sendSubStorage,
      openModalForEdit,
      onAfter,
      columnsFilterSubStorage,
      titleNotificationSubStorage,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
