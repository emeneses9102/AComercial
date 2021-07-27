<template>
  <modal-search-component
    :modal-id="MODAL_ID"
    :title-notification="titleNotificationUniqueCodeSunat"
    :server-query.sync="serverQueryUniqueCodeSunat"
    :columns-filter="columnsFilterUniqueCodeSunat"
    :clear-filters="clearSearch"
    :execute-load-items-where-clear-filters="false"
    :load-items="loadItemsUniqueCodeSunat"
    rules-column=""
    rules-value=""
  >
    <template #before>
      <unique-code-component
        @selected-unique-code-sunat="selectedUniqueCodeSunat"
      />
    </template>
  </modal-search-component>
</template>

<script>
import { onMounted, provide } from '@vue/composition-api'
import ModalSearchComponent from '@/components/ModalSearchComponent/ModalSearchComponent.vue'
import UniqueCodeComponent from '@/components/UniqueCodeComponent/UniqueCodeComponent.vue'
import { endPointsCombo, loadCombos, resetCombos } from '@/helpers/combos'
import {
  MODAL_ID, stateCodesSunat, combosCodesSunat, titleNotificationUniqueCodeSunat, serverQueryUniqueCodeSunat, columnsFilterUniqueCodeSunat, clearFiltersUniqueCodeSunat, clearStateCodesSunat, clearDataTableUniqueCodeSunat,
} from '../ServicesUniqueCodeSunat/useVariablesUniqueCodeSunat'
import { loadItemsUniqueCodeSunat } from '../ServicesUniqueCodeSunat/useServicesUniqueCodeSunat'

export default {
  components: {
    ModalSearchComponent,
    UniqueCodeComponent,
  },
  setup() {
    provide('stateCodesSunat', stateCodesSunat)
    provide('combosCodesSunat', combosCodesSunat)

    const selectedUniqueCodeSunat = opcional => {
      serverQueryUniqueCodeSunat.value.opcional = opcional
    }

    const clearSearch = () => {
      serverQueryUniqueCodeSunat.value.opcional = ''
      clearStateCodesSunat()
      resetCombos(combosCodesSunat, ['familySunat', 'classSunat'])
      clearFiltersUniqueCodeSunat()
      clearDataTableUniqueCodeSunat()
    }

    onMounted(() => {
      loadCombos(combosCodesSunat, ['segmentSunat'], `${endPointsCombo.segmentoSunat}/1`, 'Segmento Sunat')
    })

    return {
      MODAL_ID,
      stateCodesSunat,
      titleNotificationUniqueCodeSunat,
      serverQueryUniqueCodeSunat,
      columnsFilterUniqueCodeSunat,
      clearSearch,
      loadItemsUniqueCodeSunat,
      selectedUniqueCodeSunat,
    }
  },
}
</script>
