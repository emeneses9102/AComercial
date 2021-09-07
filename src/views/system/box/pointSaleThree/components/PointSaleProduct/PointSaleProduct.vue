<template>
  <fragment>
    <b-card class="pointsale-product-detail">
      <!-- <b-card-title>Producto ( x1 )</b-card-title> -->
      <div class="product-container-img">
        <div class="product-card-img">
          <b-img
            :src="stateProductSelected.imagen || require('@/assets/images/icons/no-photos.svg')"
            alt="Macbook Pro"
            class="product-img"
            draggable="false"
          />
        </div>
      </div>
      <p class="product-name">
        {{ stateProductSelected.nombre }}
      </p>
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <p class="product-ref">
            SKU: {{ stateProductSelected.sku || '###########' }}
          </p>
          <p class="product-code">
            Código: {{ stateProductSelected._id || '###########' }}
          </p>
          <p class="product-price">
            S/. {{ stateProductSelected.precio.toFixed(2) }}
          </p>
        </div>
        <div
          v-if="stateProductSelected.descuento"
          class="product-discount"
        >
          <span class="product-discount-circle" />
          <span class="product-discount-percentage">{{ stateProductSelected.descuento }} %</span>
        </div>
      </div>
    </b-card>
    <b-card class="pointsale-product-quantity">
      {{ stateProductSelected.cantidad || 'Ingrese cantidad' }}
    </b-card>
  </fragment>
</template>

<script>
import {
  BCard, BImg,
} from 'bootstrap-vue'
import { Fragment } from 'vue-fragment'
import { stateProductSelected } from '../../ServicesPointSale/useVariablesPointSale'

export default {
  name: 'PointSaleProduct',
  components: {
    BCard,
    BImg,
    Fragment,
  },
  setup() {
    return {
      stateProductSelected,
    }
  },
}
</script>
