// Importar funcion ref para crear variables reactivas
import {
  ref,
} from '@vue/composition-api'

// Variable inicializadora para almacenar todos los vendedores
export const initialStateDataVendor = {
  data: [],
  filteredData: [],
  loading: false,
}

// Variable reactiva para almacenar todos los vendedores
export const stateDataVendor = ref({
  ...initialStateDataVendor,
})

// Variable reactiva para almacenar el vendedor seleccionado
export const stateVendorSelected = ref(0)

// Variable reactiva para almacenar la consulta
export const stateQueryName = ref('')
