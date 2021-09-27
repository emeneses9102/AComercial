/* eslint-disable import/prefer-default-export */

import {
  stateProductSelected,
} from './useVariablesProduct'

// Función para actualizar la cantidad del producto seleccionado
export const updateQuantityOfProductSelected = operation => {
  if (stateProductSelected.value._id) {
    const value = Number(stateProductSelected.value.cantidad)
    switch (operation) {
      case '+':
        stateProductSelected.value.cantidad = value + 1
        break
      case '-':
        if (stateProductSelected.value.cantidad > 1) {
          stateProductSelected.value.cantidad = value - 1
        }
        break
      default:
        break
    }
  }
}
