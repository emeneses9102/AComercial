import { ref } from '@vue/composition-api'
import useFetchApiSimsac from '@/hooks/useFetchApiSimsac'
import { messageToast } from '@/helpers/messageExtensions'
import store from '@/store'
import router from '@/router'

// Funcion para crear los servicios de la autenticación
const authenticationServices = () => {
  // Titulo de la cabecera para la notificacion
  const titleNotification = 'Autenticación'

  // Crear estado inicial
  const initialAuthentication = {
    usuario: '',
    clave: '',
    remember: false,
    loading: false,
  }

  // Variable reactiva, tomando como base el estado inicial
  const authentication = ref({ ...initialAuthentication })

  // Función para regresar la variable reactiva al estado inicial
  const resetAuthentication = () => {
    authentication.value = { ...initialAuthentication }
  }

  // Función para iniciar sesión en el sistema
  const login = async () => {
    authentication.value.loading = true
    const { data, error } = await useFetchApiSimsac('/login', null, authentication.value)
    if (error) {
      messageToast('danger', titleNotification, 'Hubo un error')
      authentication.value.loading = false
    } else if (data) {
      if (data._id) {
        messageToast('success', titleNotification, 'Ingresaste correctamente al sistema')
        store.dispatch('authentication/login', data)
        router.push({ name: 'home' })
      } else {
        messageToast('danger', titleNotification, data.mensaje)
        authentication.value.loading = false
      }
    }
  }

  // Retornar servicios a usar
  return {
    authentication,
    resetAuthentication,
    login,
  }
}

export default authenticationServices
