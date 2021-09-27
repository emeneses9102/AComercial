// Importar funcion ref para crear variables reactivas
import {
  ref,
} from '@vue/composition-api'

// Variable inicializadora para almacenar todos los vendedores
export const initialStateDataVendor = {
  data: [],
  loading: false,
}

// Variable reactiva para almacenar todos los vendedores
export const stateDataVendor = ref({
  ...initialStateDataVendor,
})
