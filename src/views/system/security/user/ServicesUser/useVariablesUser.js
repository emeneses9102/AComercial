// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { initialStateCombo } from '@/helpers/combos'
import { serverQueryDefault, clearServerQueryDefaultFilter } from '@/helpers/serverQuery'
import { formatDate } from '@/helpers/date'
import routesName from '@/helpers/routesName'

// Nombre de la ruta que usa el mantenimiento Usuario
export const routeNameUser = routesName.usuarios

// Constante para almacenar el id base de los modales del mantenimiento Usuario
export const MODAL_ID = 'modal-user'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Usuario
export const columnsUser = ref([
  columnAction,
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'usuario',
    label: 'USUARIO',
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
    field: 'nombrerol',
    label: 'ROL',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'correo',
    label: 'CORREO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'inicio',
    label: 'INICIO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    formatFn: formatDate,
    pdf: true,
  },
  {
    field: 'fin',
    label: 'FIN',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    formatFn: formatDate,
    pdf: true,
  },
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Usuario
export const dataTableUser = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Usuario
export const serverQueryUser = ref({
  ...serverQueryDefault,
  tabla: 'usuarios',
})

// Función para limpiar filtros en la consulta de la tabla Usuario
export const clearFiltersUser = () => {
  clearServerQueryDefaultFilter(serverQueryUser)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Usuario
const initialStateUser = {
  _id: 0,
  usuario: '',
  idColaborador: 0,
  nombre: '',
  idRol: 0,
  nombrerol: '',
  correo: '',
  clave: '',
  inicio: '',
  fin: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Usuario
export const stateUser = ref({ ...initialStateUser })

// Función para regresar al estado inicial la variable reactiva que gestiona Usuario
export const clearStateUser = () => {
  stateUser.value = { ...initialStateUser }
}

// Variable reactiva para almacenar el listado de los combos del mantenimiento Usuario
export const combosUser = ref({
  role: { ...initialStateCombo },
  collaborator: { ...initialStateCombo },
})

// Constante para almacenar las columas permitidas para el filtro de la tabla Usuario
export const columnsFilterUser = [
  {
    title: 'Id',
    field: 'a._id',
  },
  {
    title: 'Nombre',
    field: 'a.nombre',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Usuario
export const urlApiUser = '/usuario'

// Constante para almacenar el título de las notificaciónes del mantenimiento Usuario
export const titleNotificationUser = 'Usuario'

// Constante para almacenar el titulo de los reportes del mantenimiento Usuario
export const titleReportUser = 'REPORTE DE USUARIOS'
