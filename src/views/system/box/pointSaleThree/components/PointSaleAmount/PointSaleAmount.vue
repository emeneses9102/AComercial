<template>
  <b-card>
    <table class="table-amount">
      <tr>
        <th>Gravadas</th>
        <th>6599.00</th>
      </tr>
      <tr>
        <th>Exoneradas</th>
        <th>0.00</th>
      </tr>
      <tr>
        <th>Inafectas</th>
        <th>0.00</th>
      </tr>
      <tr>
        <th>IGV</th>
        <th>168.00</th>
      </tr>
      <tr>
        <th>ICBPER</th>
        <th>0.00</th>
      </tr>
      <tr>
        <th>ISC</th>
        <th>0.00</th>
      </tr>
    </table>
  </b-card>
</template>

<script>
import {
  BCard,
} from 'bootstrap-vue'

export default {
  name: 'PointSaleAmount',
  components: {
    BCard,
  },
}
</script>
