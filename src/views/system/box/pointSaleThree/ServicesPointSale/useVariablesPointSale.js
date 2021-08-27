// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Variable inicializadora para almacenar los datos del cliente seleccionado
const initialStateClient = {
  _id: 0,
  nombreDocumento: '-----------',
  numeroDocumento: '-----------',
  nombres: '-----------',
  direccion: '-----------',
  telefono: '-----------',
  correo: '-----------',
}

// Variable reactiva para almacenar los datos del cliente seleccionado
export const stateClient = ref({ ...initialStateClient })

// Función para regresar al estado inicial la variable reactiva que almacena el cliente seleccionado
export const clearStateClient = () => {
  stateClient.value = { ...initialStateClient }
}

// Variable inicializadora para almacenar los datos del producto seleccionado
const initialStateProductSelected = {
  _id: 0,
  nombre: '-----------',
  imagen: '',
  ref: '##########',
  cantidad: 1,
  precio: 0,
  descuento: 0,
}

// Variable reactiva para almacenar los datos del producto seleccionado
export const stateProductSelected = ref({ ...initialStateProductSelected })

// Función para regresar al estado inicial la variable reactiva que almacena el cliente seleccionado
export const clearStateProductSelected = () => {
  stateProductSelected.value = { ...initialStateProductSelected }
}

// Variable reactiva para almacenar que clave del teclado esta seleccionada Cantidad "C" || Codigo Producto "P"
export const keySelectedOfBoard = ref('')

// Variable para almacenar los estados opcionales de keySelectedOfBoard

export const optionsOfKeysOnBoard = {
  cantidad: 'C',
  codigoProducto: 'P',
}

// Variable reactiva para almacenar el buscador de codigo de producto
export const searchProductById = ref('')

// Variable inicializadora para almacenar el carrito de compras
const initialStateListProducts = []

// Variable reactiva para almacenar el carrito de compras
export const stateListProducts = ref([...initialStateListProducts])

// Función para regresar al estado inicial la variable reactiva que almacena el carrito de compras
export const clearStateListProducts = () => {
  stateListProducts.value = [...initialStateListProducts]
}
