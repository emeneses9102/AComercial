import { confirmSwal, messageToast } from '@/helpers/messageExtensions'
import { getRequest } from '@/helpers/requestRaw'
import store from '@/store'
import {
  clearStateProductSelected,
  searchProductById,
  stateFieldFilterArticle,
  stateListProducts,
  stateProductSelected,
} from './useVariablesPointSale'

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
export const updateQuantity = (operation, _id, quantity) => {
  const newStateListProducts = stateListProducts.value.map(product => {
    if (product._id === _id) {
      switch (operation) {
        case '+':
          return { ...product, cantidad: product.cantidad + 1 }
        case '-':
          if (product.cantidad > 1) {
            return { ...product, cantidad: product.cantidad - 1 }
          }
          return product
        case 'UPDATE':
          return { ...product, cantidad: Number(quantity) }
        default:
          return product
      }
    }
    return product
  })
  stateListProducts.value = [...newStateListProducts]
}

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

// Función para eliminar un item de la lista
export const removeProduct = async _id => {
  const result = await confirmSwal('Producto', null, '¿Desea eliminar el producto de la lista?', 'Si, elimínalo')
  if (result) {
    const newStateListProducts = stateListProducts.value.filter(product => product._id !== _id)
    stateListProducts.value = [...newStateListProducts]
    clearStateProductSelected()
  }
}

// Función para buscar un articulo por id / sku

export const searchArticle = async () => {
  store.commit('pointSale/CHANGE_LOADING_PRODUCT_LIST', true)
  const { data, error } = await getRequest(`/articulos/?_id=0&tabla=articulos&campofiltro=${stateFieldFilterArticle.value}&filtro=${searchProductById.value}`, 'Buscando ArtÍculo')
  store.commit('pointSale/CHANGE_LOADING_PRODUCT_LIST', false)
  if (error) return false
  if (data.length !== 1) {
    return messageToast('warning', 'Artículo Buscado', 'No se encontró ningun artículo')
  }
  searchProductById.value = ''
  const {
    _id,
    sku,
    nombre,
    imagen,
    precioVenta,
    descuento,
  } = data[0]

  const newValue = {
    _id: _id.toString(),
    sku,
    nombre,
    imagen,
    precioVenta,
    descuento,
    cantidad: 1,
  }
  return addProductToList(newValue)
}
