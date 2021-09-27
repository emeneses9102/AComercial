// Importar funcion ref para crear variables reactivas
import {
  ref,
} from '@vue/composition-api'

// Variable inicializadora para almacenar todos los comprobantes
export const initialStateDataVoucher = {
  data: [],
  loading: false,
}

// Variable reactiva para almacenar todos los comprobantes
export const stateDataVoucher = ref({
  ...initialStateDataVoucher,
})
