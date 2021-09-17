// Importar funcion ref para crear variables reactivas
import {
  ref,
} from '@vue/composition-api'

// Variable inicializadora para almacenar todas las monedas
export const initialStateDataCurrency = {
  data: [],
  filteredData: [],
  loading: false,
}

// Variable reactiva para almacenar todas la monedas
export const stateDataCurrency = ref({
  ...initialStateDataCurrency,
})

// Variable reactiva para almacenar la moneda seleccionada
export const stateCurrencySelected = ref(0)

// Variable reactiva para almacenar la consulta
export const stateQueryName = ref('')
