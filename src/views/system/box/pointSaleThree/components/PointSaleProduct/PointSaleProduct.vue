<template>
  <fragment>
    <b-card class="pointsale-product-detail">
      <div class="product-container-img">
        <div class="product-card-img">
          <b-img
            :src="stateProductSelected.imagen.trim() || require('@/assets/images/icons/no-photos.svg')"
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
          <b-badge
            v-if="stateProductSelected.descuento"
            class="d-flex align-items-center"
            variant="danger"
          >
            <span class="mr-50">{{ stateProductSelected.descuento }}%</span>
            <feather-icon
              icon="TagIcon"
            />
          </b-badge>
        </div>
      </div>
    </b-card>
  </fragment>
</template>

<script>
import {
  BCard, BImg, BBadge,
} from 'bootstrap-vue'
import { Fragment } from 'vue-fragment'
import {
  stateProductSelected,
} from '../../ServicesProduct/useVariablesProduct'
import {
  updateQuantityOfProductSelected,
} from '../../ServicesProduct/useServicesProduct'

export default {
  name: 'PointSaleProduct',
  components: {
    BCard,
    BImg,
    BBadge,
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
