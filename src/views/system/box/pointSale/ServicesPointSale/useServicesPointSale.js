// Importar funciones y variables necesarias para crear los servicios del mantenimiento Medio de Pago
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import { confirmSwal } from '@/helpers/messageExtensions'
import {
  clearStateProductSelected, serverQueryPointSale, dataTablePointSale, statePointSale, urlApiPointSale, titleNotificationPointSale, stateListProducts,
} from './useVariablesPointSale'

// Función para obtener los datos desde la API y actualizar los valores de dataTablePointSale
export const loadItemsPointSale = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryPointSale, dataTablePointSale, urlApiPointSale, titleNotificationPointSale, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable statePointSale
export const getPointSaleById = async _id => {
  const { data, status } = await getDataById(urlApiPointSale, _id, titleNotificationPointSale)
  if (status) {
    statePointSale.value = { ...statePointSale.value, ...data }
  }
}

// Función para gestionar una Medio de Pago
export const sendPointSale = async (action, _id = null) => {
  const response = await sendForm(statePointSale, urlApiPointSale, titleNotificationPointSale, action, _id)
  return response
}

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
      ? {
        ...product,
        cantidad: operation === '+' ? product.cantidad + 1 : product.cantidad - 1,
      }
      : product
  ))
  stateListProducts.value = [...newStateListProducts]
}

export const updateSubtotal = _id => {
  const newStateListProducts = stateListProducts.value.map(product => (
    product._id === _id
      ? {
        ...product,
        subtotal: 10,
      }
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

// Función para eliminar un item de la lista
export const changeAmount = (_id, amount, price) => {
  const newStateListProducts = stateListProducts.value.map(product => (
    product._id === _id
      ? {
        ...product,
        cantidad: amount,
        subtotal: amount * price,
      }
      : product
  ))
  stateListProducts.value = [...newStateListProducts]
}
