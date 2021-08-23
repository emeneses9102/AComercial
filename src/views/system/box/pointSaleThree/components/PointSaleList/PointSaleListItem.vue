<template>
  <div class="product-item">
    <div class="product-item-left">
      <p class="product-item__name">
        MacBook Pro 13 Pulgadas iu iu iu iu iu asdfasdfasd asd fa
      </p>
      <div class="product-item__info mt-75">
        <span class="product-item__price">Precio S/. 6599.00</span>
        <span class="product-item__quantity mt-50">Cantidad: 3</span>
      </div>
    </div>
    <div class="product-item-right">
      <div class="product-item__codes">
        <p>Ref: #######</p>
        <p>Code: 646546846</p>
      </div>
      <div class="product-item__actions">
        <button-component
          icon-button="PlusIcon"
          variant="primary"
          icon-size="20"
          class="p-1"
        />
        <button-component
          icon-button="MinusIcon"
          variant="warning"
          icon-size="20"
          class="p-1"
        />
        <button-component
          icon-button="XIcon"
          variant="danger"
          icon-size="20"
          class="p-1"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'

export default {
  name: 'PointSaleListItem',
  components: {
    ButtonComponent,
  },
}
</script>
