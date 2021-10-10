<template>
  <div class="d-grid align-items-center">
    <b-badge
      class="d-flex align-items-center"
      :variant="statePointSale.cerrado ? 'light-success' : 'light-danger'"
    >
      <feather-icon :icon="statePointSale.cerrado ? 'CheckIcon' : 'SlashIcon'" />
      <div
        class="ml-25"
      >
        Cerrado
      </div>
    </b-badge>
    <b-badge
      class="d-flex align-items-center"
      :variant="statePointSale.cancelado ? 'light-success' : 'light-danger'"
    >
      <feather-icon :icon="statePointSale.cancelado ? 'CheckIcon' : 'SlashIcon'" />
      <div
        class="ml-25"
      >
        Pagado
      </div>
    </b-badge>
    <b-badge
      class="d-flex align-items-center"
      :variant="statePointSale.anulado ? 'light-success' : 'light-danger'"
    >
      <feather-icon :icon="statePointSale.anulado ? 'CheckIcon' : 'SlashIcon'" />
      <div
        class="ml-25"
      >
        Anulado
      </div>
    </b-badge>
    <b-badge
      class="d-flex align-items-center"
      :variant="statePointSale.facturado ? 'light-success' : 'light-danger'"
    >
      <feather-icon :icon="statePointSale.facturado ? 'CheckIcon' : 'SlashIcon'" />
      <div
        class="ml-25"
      >
        Facturado
      </div>
    </b-badge>
  </div>
</template>

<script>
import {
  BBadge,
} from 'bootstrap-vue'
import {
  statePointSale,
} from '@/views/system/box/pointSaleThree/ServicesPointSale/useVariablesPointSale'

export default {
  name: 'StatePointSale',
  components: {
    BBadge,
  },
  setup() {
    return {
      statePointSale,
    }
  },
}
</script>

<style lang="scss" scoped>
.d-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .25em;
}
</style>
