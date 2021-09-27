<template>
  <b-card>
    <b-card-title>Comprobante</b-card-title>
    <div class="card__group">
      <label class="card__label">Documento :</label>
      <p class="card__input">
        {{ statePointSale.nombreComprobante || '-----------' }}
      </p>
    </div>
    <div class="card__group">
      <label class="card__label">Moneda :</label>
      <p class="card__input">
        {{ statePointSale.nombreMoneda || '-----------' }}
      </p>
    </div>
    <div class="card__group">
      <label class="card__label">Forma Pago :</label>
      <p class="card__input">
        {{ statePointSale.nombreFormaPago || '-----------' }}
      </p>
    </div>
  </b-card>
</template>

<script>
import {
  BCard, BCardTitle,
} from 'bootstrap-vue'
import {
  statePointSale,
} from '../../ServicesPointSale/useVariablesPointSale'

export default {
  name: 'PointSaleVoucher',
  components: {
    BCard,
    BCardTitle,
  },
  setup() {
    return {
      statePointSale,
    }
  },
}
</script>
