<template>
  <fragment>
    <b-card class="pointsale-product-detail">
      <div class="product-container-img">
        <div class="product-card-img">
          <b-img
            :src="stateProductSelected.imagen || require('@/assets/images/icons/no-photos.svg')"
            :alt="stateProductSelected.nombre"
            class="product-img"
            draggable="false"
          />
        </div>
      </div>
      <div>
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
            v-if="!stateProductSelected.descuento"
            class="product-discount"
          >
            <span class="product-discount-circle" />
            <span class="product-discount-percentage">{{ stateProductSelected.descuento }} %</span>
          </div>
        </div>
      </div>
    </b-card>
    <!-- <b-card class="pointsale-product-quantity">
      <button
        class="product-quantity__increment"
        @click="()=>updateQuantityOfProductSelected('+')"
      >
        <feather-icon
          icon="PlusIcon"
          size="20"
        />
      </button>
      <div
        class="product-quantity__value"
      >
        {{ stateProductSelected.cantidad || '' }}
      </div>
      <button
        class="product-quantity__decrement"
        @click="()=>updateQuantityOfProductSelected('-')"
      >
        <feather-icon
          icon="MinusIcon"
          size="20"
        />
      </button>
    </b-card> -->
  </fragment>
</template>

<script>
import {
  BCard, BImg,
} from 'bootstrap-vue'
import { Fragment } from 'vue-fragment'
import {
  stateProductSelected,
} from '../../ServicesPointSale/useVariablesPointSale'
import {
  updateQuantityOfProductSelected,
} from '../../ServicesPointSale/useServicesPointSale'

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
      updateQuantityOfProductSelected,
    }
  },
}
</script>
