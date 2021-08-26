<template>
  <div
    class="product-item"
    :class="[stateProductSelected._id === codigo ? 'product-item--selected' : 'hola']"
    @click="selectedItem"
  >
    <div class="product-item-left">
      <p class="product-item__name">
        {{ nombre }}
      </p>
      <div class="product-item__info mt-75">
        <span class="product-item__price">Precio S/. {{ precio.toFixed(2) }}</span>
        <span class="product-item__quantity mt-50">Cantidad: {{ cantidad }}</span>
      </div>
    </div>
    <div class="product-item-right">
      <div class="product-item__codes">
        <p>SKU: {{ sku || '##########' }}</p>
        <p>Código: {{ codigo || '##########' }}</p>
      </div>
      <div class="product-item__actions">
        <button-component
          icon-button="PlusIcon"
          variant="primary"
          icon-size="20"
          class="p-1"
          :method-function="()=>updateQuantity('+', codigo)"
        />
        <button-component
          icon-button="MinusIcon"
          variant="warning"
          icon-size="20"
          class="p-1"
          :method-function="()=>updateQuantity('-', codigo)"
        />
        <button-component
          icon-button="XIcon"
          variant="danger"
          icon-size="20"
          class="p-1"
          :method-function="()=>removeProduct(codigo)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { stateProductSelected } from '../../ServicesPointSale/useVariablesPointSale'
import { updateQuantity, removeProduct } from '../../ServicesPointSale/useServicesPointSale'

export default {
  name: 'PointSaleListItem',
  components: {
    ButtonComponent,
  },
  props: {
    nombre: {
      type: String,
      required: true,
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
    codigo: {
      type: String,
      required: true,
      default: '',
    },
    sku: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props) {
    const selectedItem = () => {
      stateProductSelected.value._id = props.codigo
      stateProductSelected.value.ref = props.sku
      stateProductSelected.value.nombre = props.nombre
      stateProductSelected.value.imagen = props.imagen
      stateProductSelected.value.precio = props.precio
      stateProductSelected.value.descuento = props.descuento
      stateProductSelected.value.cantidad = props.cantidad
    }

    return {
      selectedItem,
      stateProductSelected,
      updateQuantity,
      removeProduct,
    }
  },
}
</script>
