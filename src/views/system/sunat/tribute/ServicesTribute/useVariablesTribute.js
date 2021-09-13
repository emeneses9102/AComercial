// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

// Constante para almacenar el id base de los modales del mantenimiento Tipos de Tributo
export const MODAL_ID = 'modal-tribute'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Tipos de Tributo
export const columnsTribute = ref([
  columnAction,
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'codigoSunat',
    label: 'COD SUNAT',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombre',
    label: 'NOMBRE',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'namecode',
    label: 'COD INTERNACIONAL',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'tributo',
    label: 'TRIBUTO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'flgFactor',
    label: 'FACTOR',
    thClass: 'align-middle text-center',
    tdClass: 'align-middle text-center',
    type: 'boolean',
    pdf: true,
  },
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Tipos de Tributo
export const dataTableTribute = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Tipos de Tributo
export const serverQueryTribute = ref({
  ...serverQueryDefault,
  tabla: 'snttributo',
})

// Función para limpiar filtros en la consulta de la tabla Tipos de Tributo
export const clearFiltersTribute = () => {
  clearServerQueryDefaultFilter(serverQueryTribute)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Tipos de Tributo
const initialStateTribute = {
  _id: 0,
  codigoSunat: '',
  nombre: '',
  namecode: '',
  tributo: '',
  flgFactor: 0,
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Tipos de Tributo
export const stateTribute = ref({ ...initialStateTribute })

// Función para regresar al estado inicial la variable reactiva que gestiona Tipos de Tributo
export const clearStateTribute = () => {
  stateTribute.value = { ...initialStateTribute }
}

// Constante para almacenar las columas permitidas para el filtro de la table Tipos de Tributo
export const columnsFilterTribute = [
  {
    title: 'Nombre',
    field: 'a.nombre',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Tipos de Tributo
export const urlApiTribute = '/tributos'

// Constante para almacenar el título de las notificaciónes del mantenimiento Tipos de Tributo
export const titleNotificationTribute = 'Tipos de Tributo'

// Constante para almacenar el titulo de los reportes del mantenimiento Tipos de Tributo
export const titleReportTribute = 'REPORTE DE TIPO DE PRODUCTOS'
