<template>
  <fragment>
    <b-card class="pointsale-product-detail">
      <!-- <b-card-title>Producto ( x1 )</b-card-title> -->
      <div class="product-container-img">
        <div class="product-card-img">
          <b-img
            :src="require('@/assets/images/elements/macbook-pro.png')"
            alt="Macbook Pro"
            class="product-img"
            draggable="false"
          />
        </div>
      </div>
      <p class="product-name">
        MacBook Pro 13 Pulg.
      </p>
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <p class="product-ref">
            Ref: ###########
          </p>
          <p class="product-code">
            Código: 654891354984
          </p>
          <p class="product-price">
            S/. 6599.00
          </p>
        </div>
        <div class="product-discount">
          <span class="product-discount-circle" />
          <span class="product-discount-percentage">10 %</span>
        </div>
      </div>
    </b-card>
    <b-card class="pointsale-product-quantity">
      1
    </b-card>
  </fragment>
</template>

<script>
import {
  BCard, BImg,
} from 'bootstrap-vue'
import { Fragment } from 'vue-fragment'

export default {
  name: 'PointSaleProduct',
  components: {
    BCard,
    BImg,
    Fragment,
  },
}
</script>
