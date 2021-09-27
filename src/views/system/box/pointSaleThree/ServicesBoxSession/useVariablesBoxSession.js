// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar variable de las consultas del servidor por defecto
import {
  serverQueryDefault,
} from '@/helpers/serverQuery'

// Constante para almacenar la url base de la petición al mantenimiento Sesion Caja
export const urlApiBoxSession = '/sesioncaja'

// Constante para almacenar el título de las notificaciónes del mantenimiento Sesion Caja
export const titleNotificationBoxSession = 'Sesion Caja'

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Sesion Caja
export const serverQueryBoxSession = ref({
  ...serverQueryDefault,
  tabla: 'sesioncaja',
  ffin: '1',
  campo: 'a.idcajero',
  filtrofecha: 'a.fechaapertura',
  opcional: 'a.apertura=1 and a.cierre=0 and a.activo=1',
})
