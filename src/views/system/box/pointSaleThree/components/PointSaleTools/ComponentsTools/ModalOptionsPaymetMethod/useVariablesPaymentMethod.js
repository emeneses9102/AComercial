// Importar funcion ref para crear variables reactivas
import {
  ref,
} from '@vue/composition-api'

// Variable inicializadora para almacenar todas las monedas
export const initialStateDataPaymentMethod = {
  data: [],
  filteredData: [],
  loading: false,
}

// Variable reactiva para almacenar todas la monedas
export const stateDataPaymentMethod = ref({
  ...initialStateDataPaymentMethod,
})

// Variable reactiva para almacenar la moneda seleccionada
export const statePaymentMethodSelected = ref(null)

// Variable reactiva para almacenar la consulta
export const stateQueryName = ref('')
