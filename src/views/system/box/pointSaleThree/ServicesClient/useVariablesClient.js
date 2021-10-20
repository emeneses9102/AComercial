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
  numeroRuc: '',
  razonSocial: '',
  nombreUbigeo: '',
}

// Variable reactiva para almacenar los datos del cliente seleccionado
export const stateClient = ref({ ...initialStateClient })

// Función para regresar al estado inicial la variable reactiva que almacena el cliente seleccionado
export const clearStateClient = () => {
  stateClient.value = { ...initialStateClient }
}
