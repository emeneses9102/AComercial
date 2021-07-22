import { ACTION_CHANGE_PASSWORD } from '@/helpers/actionsApi'
import { ref } from '@vue/composition-api'

// Variable inicializadora para manejar el cambio de contraseña
const initialStateChnagePassword = {
  _id: 0,
  usuario: '',
  claveUsuarioLoageado: '',
  clave: '',
  confirmarClave: '',
  accion: ACTION_CHANGE_PASSWORD,
  loading: false,
}

// Variable reactiva para manejar el cambio de contraseña
export const stateChangePassword = ref({ ...initialStateChnagePassword })

// Funcion para limpiar la variable reactiva
export const clearChangePassowrd = () => {
  stateChangePassword.value = { ...initialStateChnagePassword }
}

// Función que retorna los datos necesarios que se enviaran a la API para el cambio de contraseña
export const preparedData = () => ref({
  _id: stateChangePassword.value._id,
  clave: stateChangePassword.value.clave,
  accion: ACTION_CHANGE_PASSWORD,
})

// Constante para almacenar la api base
export const urlApiChangePassword = '/usuario'

// Constante para almacenar el titulo que se mostrara en caso de advertencias, errores, etc.
export const titleNotificationChangePassword = 'Cambiar Contraseña'
