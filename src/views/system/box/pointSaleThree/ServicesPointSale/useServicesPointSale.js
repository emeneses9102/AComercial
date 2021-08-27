import { confirmSwal } from '@/helpers/messageExtensions'
import { clearStateProductSelected, stateListProducts } from './useVariablesPointSale'

// Función para agregar un producto a la lista
export const addProductToList = newProduct => {
  if (!stateListProducts.value.length) {
    // Si la lista esta vacia, agregar el producto
    stateListProducts.value = [newProduct]
  } else {
    // Si la lista no esta vacia
    const someProductWithId = stateListProducts.value.some(product => product._id === newProduct._id)
    if (someProductWithId) {
      // Aumentar la cantidad si el producto existe
      const newStateListProducts = stateListProducts.value.map(product => (
        product._id === newProduct._id
          ? { ...product, cantidad: product.cantidad + 1 }
          : product
      ))
      stateListProducts.value = [...newStateListProducts]
    } else {
      // Agregar el producto
      stateListProducts.value = [newProduct, ...stateListProducts.value]
    }
  }
}

// Función para actualizar la cantidad del producto de lista, recibira como parametro la opracion - || +
export const updateQuantity = (operation, _id) => {
  const newStateListProducts = stateListProducts.value.map(product => (
    product._id === _id
      ? { ...product, cantidad: operation === '+' ? product.cantidad + 1 : product.cantidad - 1 }
      : product
  ))
  stateListProducts.value = [...newStateListProducts]
}

// Función para eliminar un item de la lista
export const removeProduct = async _id => {
  const result = await confirmSwal('Producto', null, '¿Desea eliminar el producto de la lista?', 'Si, elimínalo')
  if (result) {
    const newStateListProducts = stateListProducts.value.filter(product => product._id !== _id)
    stateListProducts.value = [...newStateListProducts]
    clearStateProductSelected()
  }
}
