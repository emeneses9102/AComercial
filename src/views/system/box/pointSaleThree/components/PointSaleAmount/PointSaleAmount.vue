<template>
  <b-card>
    <table class="table-amount">
      <tr>
        <th>Subtotal</th>
        <th>{{ statePointSale.subTotal.toFixed(2) }}</th>
      </tr>
      <tr
        v-for="tribute in listPointSaleTributeSummary.rows"
        :key="tribute._id"
      >
        <th>{{ tribute.tributo }}</th>
        <th>{{ tribute.monto.toFixed(2) }}</th>
      </tr>
      <tr>
        <th>Total</th>
        <th>{{ statePointSale.total.toFixed(2) }}</th>
      </tr>
      <tr>
        <th>Total Pagado</th>
        <th>{{ statePointSale.totalPagado ? statePointSale.totalPagado.toFixed(2) : '0.00' }}</th>
      </tr>
      <tr>
        <th>Vuelto</th>
        <th>{{ statePointSale.vuelto.toFixed(2) }}</th>
      </tr>
    </table>
  </b-card>
</template>

<script>
import {
  BCard,
} from 'bootstrap-vue'
import {
  statePointSale,
} from '../../ServicesPointSale/useVariablesPointSale'
import {
  listPointSaleTributeSummary,
} from '../../ServicesPointSaleTributeSummary/useVariablesPointSaleTributeSummary'

export default {
  name: 'PointSaleAmount',
  components: {
    BCard,
  },
  setup() {
    return {
      statePointSale,
      listPointSaleTributeSummary,
    }
  },
}
</script>
