import vm from '@/main'
import { ACTION_STATUS, ACTION_DELETE } from './actionsApi'

// Función para mostrar mensajes TOAST (Notificaciones)
export const messageToast = (variant, title, message) => {
  vm.$bvToast.toast(message, {
    title,
    variant,
    solid: true,
  })
}

// Función para generar un mensaje de confirmación
export const confirmSwal = async (title, action) => {
  let text = '¿Desea eliminar este producto?'
  let confirmButtonText = 'Si'

  if (action === ACTION_DELETE) {
    text = '¿Está seguro que desea eliminar este registro?'
    confirmButtonText = 'Si, eliminalo'
  }
  if (action === ACTION_STATUS) {
    text = '¿Está seguro que desea cambiar el estado de este registro?'
    confirmButtonText = 'Si, cambialo'
  }
  const { value: result } = await vm.$swal({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText,
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-outline-danger ml-1',
    },
    buttonsStyling: false,
  })
  return result
}
