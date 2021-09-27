// Importar funcion ref para crear variables reactivas
import {
  ref,
} from '@vue/composition-api'

// Variable inicializadora para almacenar todas las monedas
export const initialStateDataCurrency = {
  data: [],
  loading: false,
}

// Variable reactiva para almacenar todas la monedas
export const stateDataCurrency = ref({
  ...initialStateDataCurrency,
})
