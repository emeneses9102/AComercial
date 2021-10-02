// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import routesName from '@/helpers/routesName'

// Nombre de la ruta que usa el mantenimiento Colaborador
export const routeNameCollaborator = routesName.colaboradores

// Constante para almacenar el id base de los modales del mantenimiento Colaborador
export const MODAL_ID = 'modal-collaborator'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Colaborador
export const columnsCollaborator = ref([
  columnAction,
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'apellidoPaterno',
    label: 'APE. PATERNO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'apellidoMaterno',
    label: 'APE. MATERNO',
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
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Colaborador
export const dataTableCollaborator = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Colaborador
export const serverQueryCollaborator = ref({
  ...serverQueryDefault,
  tabla: 'colaborador',
})

// Función para limpiar filtros en la consulta de la tabla Colaborador
export const clearFiltersCollaborator = () => {
  clearServerQueryDefaultFilter(serverQueryCollaborator)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Colaborador
const initialStateCollaborator = {
  _id: 0,
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  imagen: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Colaborador
export const stateCollaborator = ref({ ...initialStateCollaborator })

// Función para regresar al estado inicial la variable reactiva que gestiona Colaborador
export const clearStateCollaborator = () => {
  stateCollaborator.value = { ...initialStateCollaborator }
}

// Constante para almacenar las columas permitidas para el filtro de la table Colaborador
export const columnsFilterCollaborator = [
  {
    title: 'Nombre',
    field: 'a.nombre',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Colaborador
export const urlApiCollaborator = '/colaborador'

// Constante para almacenar el título de las notificaciónes del mantenimiento Colaborador
export const titleNotificationCollaborator = 'Colaborador'

// Constante para almacenar el titulo de los reportes del mantenimiento Colaborador
export const titleReportCollaborator = 'REPORTE DE TIPO DE PRODUCTOS'
