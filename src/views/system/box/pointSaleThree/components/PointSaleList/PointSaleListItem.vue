<template>
  <div
    class="product-item"
    :class="[stateProductSelected._id === codigo ? 'product-item--selected' : '']"
    :disabled="!!statePointSale.cancelado"
    @click="selectedItem"
  >
    <div class="d-flex align-items-center">
      <div>
        <b-img
          :src="imagen || require('@/assets/images/icons/no-photos.svg')"
          :alt="nombre"
          class="product-item__image"
          draggable="false"
        />
      </div>
      <div class="product-item-left">
        <p class="product-item__name">
          {{ nombre }} - # {{ codigo }}
        </p>
        <div class="product-item__info mt-75">
          <div class="product-item__info__column mr-1">
            <span class="d-block product-item__price">Precio: {{ precio.toFixed(2) }}</span>
            <span class="d-block product-item__quantity mt-25">Cantidad: {{ cantidad }}</span>
          </div>
          <div class="product-item__info__column mr-1">
            <span class="d-block product-item__subtotal">Sub Total: {{ subTotal.toFixed(2) }}</span>
            <span class="d-block product-item__tribute mt-25">Tributo: {{ tributo.toFixed(2) }}</span>
          </div>
          <div class="product-item__info__column">
            <span class="d-block product-item__discount">Descuento: {{ descuento.toFixed(2) }}</span>
            <span class="d-block product-item__total mt-25">Total: {{ total.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="product-item-right">
      <div class="product-item__actions">
        <button-component
          icon-button="XIcon"
          variant="danger"
          icon-size="20"
          class="p-1"
          :method-function="()=>removeArticle(codigo)"
          :disabled="!!statePointSale.cancelado || !!statePointSale.cerrado || !!statePointSale.anulado || !!statePointSale.facturado"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  BImg,
} from 'bootstrap-vue'
import store from '@/store'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import {
  stateProductSelected,
  clearStateProductSelected,
} from '../../ServicesProduct/useVariablesProduct'
import {
  statePointSale,
  keySelectedOfBoard,
  optionsOfKeysOnBoard,
} from '../../ServicesPointSale/useVariablesPointSale'
import {
  updateQuantity,
  removeArticle,
} from '../../ServicesPointSaleDetail/useServicesPointSaleDetail'

export default {
  name: 'PointSaleListItem',
  components: {
    ButtonComponent,
    BImg,
  },
  props: {
    codigo: {
      type: Number,
      required: true,
      default: 0,
    },
    nombre: {
      type: String,
      required: true,
      default: '',
    },
    imagen: {
      type: String,
      required: false,
      default: '',
    },
    precio: {
      type: Number,
      required: true,
      default: 0,
    },
    cantidad: {
      type: Number,
      required: true,
      default: 0,
    },
    subTotal: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    descuento: {
      type: Number,
      required: false,
      default: 0,
    },
    tributo: {
      type: Number,
      required: true,
      default: 0,
    },

  },
  setup(props) {
    const selectedItem = () => {
      if (!statePointSale.value.cerrado && !statePointSale.value.cancelado && !statePointSale.value.anulado && !statePointSale.value.facturado) {
        if (store.state.pointSale.showProductDetail && stateProductSelected.value._id) {
          store.commit('pointSale/TOGGLE_SHOW_PRODUCT_DETAIL', false)
          clearStateProductSelected()
          keySelectedOfBoard.value = ''
        } else {
          stateProductSelected.value._id = props.codigo
          stateProductSelected.value.sku = props.sku
          stateProductSelected.value.nombre = props.nombre
          stateProductSelected.value.imagen = props.imagen
          stateProductSelected.value.precio = props.precio
          stateProductSelected.value.descuento = props.descuento
          stateProductSelected.value.cantidad = props.cantidad.toString()
          keySelectedOfBoard.value = optionsOfKeysOnBoard.cantidad
          store.commit('pointSale/TOGGLE_SHOW_PRODUCT_DETAIL', true)
        }
      }
    }

    return {
      selectedItem,
      stateProductSelected,
      statePointSale,
      updateQuantity,
      removeArticle,
    }
  },
}
</script>
