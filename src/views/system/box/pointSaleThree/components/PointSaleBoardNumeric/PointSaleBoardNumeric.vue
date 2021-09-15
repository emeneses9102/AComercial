<template>
  <div class="pointsale-product-actions">
    <b-card class="pointsale-product-quantity">
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
    </b-card>
    <b-card class="pointsale-board-numeric">
      <button-board-numeric
        text="7"
        data-value="7"
        :method-function="selectedButton"
      />
      <button-board-numeric
        text="8"
        data-value="8"
        :method-function="selectedButton"
      />
      <button-board-numeric
        text="9"
        data-value="9"
        :method-function="selectedButton"
      />
      <button-board-numeric
        text="⇽"
        data-value="DELETE"
        :method-function="selectedButton"
      />
      <button-board-numeric
        text="4"
        data-value="4"
        :method-function="selectedButton"
      />
      <button-board-numeric
        text="5"
        data-value="5"
        :method-function="selectedButton"
      />
      <button-board-numeric
        text="6"
        data-value="6"
        :method-function="selectedButton"
      />
      <button-board-numeric
        :class="[keySelectedOfBoard === optionsOfKeysOnBoard.cantidad ? 'active' : '']"
        class="btn-board-numeric--key"
        text="C"
        data-value="C"
        :disabled="stateProductSelected._id === 0"
        :method-function="selectedButton"
      />
      <button-board-numeric
        text="1"
        data-value="1"
        :method-function="selectedButton"
      />
      <button-board-numeric
        text="2"
        data-value="2"
        :method-function="selectedButton"
      />
      <button-board-numeric
        text="3"
        data-value="3"
        :method-function="selectedButton"
      />
      <button-board-numeric
        class="btn-board-numeric--enter"
        text="↲"
        data-value="ENTER"
        :method-function="selectedButton"
      />
      <button-board-numeric
        class="btn-board-numeric--zero"
        text="0"
        data-value="0"
        :method-function="selectedButton"
      />
      <button-board-numeric
        :class="[keySelectedOfBoard === optionsOfKeysOnBoard.codigoProducto ? 'active' : '']"
        class="btn-board-numeric--key"
        text="P"
        data-value="P"
        :method-function="selectedButton"
      />
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
} from 'bootstrap-vue'
import { toRef } from '@vue/composition-api'
import store from '@/store'
import ButtonBoardNumeric from './ButtonBoardNumeric.vue'
import {
  clearStateProductSelected,
  keySelectedOfBoard, optionsOfKeysOnBoard, searchProductById, stateProductSelected,
} from '../../ServicesPointSale/useVariablesPointSale'
import { searchArticle, updateQuantity, updateQuantityOfProductSelected } from '../../ServicesPointSale/useServicesPointSale'

export default {
  name: 'PointSaleBoardNumeric',
  components: {
    BCard,
    ButtonBoardNumeric,
  },
  setup() {
    const selectedKey = buttonValue => {
      switch (buttonValue) {
        case optionsOfKeysOnBoard.cantidad:
          keySelectedOfBoard.value = optionsOfKeysOnBoard.cantidad
          break
        case optionsOfKeysOnBoard.codigoProducto:
          keySelectedOfBoard.value = optionsOfKeysOnBoard.codigoProducto
          break
        default:
          break
      }
    }

    const selectedButton = e => {
      const buttonValue = e.target.getAttribute('data-value')
      if (buttonValue === optionsOfKeysOnBoard.cantidad || buttonValue === optionsOfKeysOnBoard.codigoProducto) {
        selectedKey(buttonValue)
      } else if (keySelectedOfBoard.value) {
        let refInput
        if (keySelectedOfBoard.value === optionsOfKeysOnBoard.cantidad) {
          refInput = toRef(stateProductSelected.value, 'cantidad')
        } else if (keySelectedOfBoard.value === optionsOfKeysOnBoard.codigoProducto) {
          refInput = searchProductById
        }
        switch (buttonValue) {
          case 'DELETE':
            refInput.value = refInput.value.toString().substring(0, refInput.value.length - 1)
            break
          case 'ENTER':
            if (keySelectedOfBoard.value === optionsOfKeysOnBoard.cantidad && stateProductSelected.value._id) {
              // if (stateProductSelected.value.cantidad <= 1) {
              //   updateQuantity('+', stateProductSelected.value._id)
              // } else {
              updateQuantity('UPDATE', stateProductSelected.value._id, stateProductSelected.value.cantidad)
              // }
              clearStateProductSelected()
              store.commit('pointSale/TOGGLE_SHOW_PRODUCT_DETAIL', false)
              keySelectedOfBoard.value = ''
            } else if (keySelectedOfBoard.value === optionsOfKeysOnBoard.codigoProducto) {
              searchArticle()
            }
            break
          default:
            refInput.value += buttonValue.toString()
            break
        }
      }
    }

    return {
      keySelectedOfBoard,
      optionsOfKeysOnBoard,
      selectedButton,
      stateProductSelected,
      updateQuantityOfProductSelected,
    }
  },
}
</script>
