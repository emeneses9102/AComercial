// Importar function ref para crear variables reactivas
import { serverQueryDefault } from '@/helpers/serverQuery'
import { ref } from '@vue/composition-api'

// Variable inicializadora para almacenar los datos del producto seleccionado
const initialStateProductSelected = {
  _id: 0,
  nombre: '-----------',
  imagen: '',
  sku: '##########',
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

export const serverQueryArticlePointSale = ref({
  ...serverQueryDefault,
  tabla: 'tarticulos',
  pinicio: '1',
  pfin: '1',
})
