<template>
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
</template>

<script>
import {
  BCard,
} from 'bootstrap-vue'
import { toRef } from '@vue/composition-api'
import ButtonBoardNumeric from './ButtonBoardNumeric.vue'
import {
  keySelectedOfBoard, optionsOfKeysOnBoard, searchProductById, stateProductSelected,
} from '../../ServicesPointSale/useVariablesPointSale'

export default {
  name: 'PointSaleBoardNumeric',
  components: {
    BCard,
    ButtonBoardNumeric,
  },
  setup() {
    const selectedButton = e => {
      const $button = e.target
      const buttonValue = $button.getAttribute('data-value')
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

      if (keySelectedOfBoard.value && buttonValue !== optionsOfKeysOnBoard.cantidad && buttonValue !== optionsOfKeysOnBoard.codigoProducto) {
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
            console.log('ENTER')
            break
          default:
            refInput.value += buttonValue.toString()
            break
        }
      }
      // if (buttonValue === optionsOfKeysOnBoard.cantidad) {
      //   keySelectedOfBoard.value = optionsOfKeysOnBoard.cantidad
      // } else if ($buttonValue === optionsOfKeysOnBoard.codigoProducto) {
      //   keySelectedOfBoard.value = optionsOfKeysOnBoard.codigoProducto
      // }
    }

    return {
      keySelectedOfBoard,
      optionsOfKeysOnBoard,
      selectedButton,
    }
  },
}
</script>
