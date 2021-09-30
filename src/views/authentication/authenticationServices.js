import { ref } from '@vue/composition-api'
import useFetchApiSimsac from '@/hooks/useFetchApiSimsac'
import { messageToast } from '@/helpers/messageExtensions'
import { getRequest } from '@/helpers/requestRaw'
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

  // Función para obtener los roles y permisos por rol
  const getRolesAndPermissions = async idRol => {
    const { error, data } = await getRequest(`/accesos/menuroles/${idRol}`, 'Generación del Menú')
    if (error || !data) return null
    return data
  }

  // Función para iniciar sesión en el sistema
  const login = async () => {
    authentication.value.loading = true
    const { data, error } = await useFetchApiSimsac('/login', null, authentication.value)
    if (error || !data) {
      messageToast('danger', titleNotification, 'Hubo un error')
      authentication.value.loading = false
    } else if (data) {
      if (data._id) {
        const result = await getRolesAndPermissions(data.idRol)
        if (!result) {
          authentication.value.loading = false
        } else {
          store.dispatch('authentication/login', data)
          store.dispatch('rolesAndPermissions/insertNavigation', result)
          messageToast('success', titleNotification, 'Ingresaste correctamente al sistema')
          router.push({ name: 'home' })
        }
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
