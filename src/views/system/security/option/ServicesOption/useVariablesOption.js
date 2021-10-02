// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import routesName from '@/helpers/routesName'

// Nombre de la ruta que usa el mantenimiento Menu
export const routeNameOption = routesName.eventosDelPrograma

// Constante para almacenar el id base de los modales del mantenimiento Opción
export const MODAL_ID = 'modal-option'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Opción
export const columnsOption = ref([
  columnAction,
  {
    field: '_id',
    label: 'ID',
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
    field: 'icono',
    label: 'ICONO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'etiqueta',
    label: 'ETIQUETA',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Opción
export const dataTableOption = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Opción
export const serverQueryOption = ref({
  ...serverQueryDefault,
  tabla: 'opciones',
})

// Función para limpiar filtros en la consulta de la tabla Opción
export const clearFiltersOption = () => {
  clearServerQueryDefaultFilter(serverQueryOption)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Opción
const initialStateOption = {
  _id: 0,
  nombre: '',
  icono: '',
  etiqueta: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Opción
export const stateOption = ref({ ...initialStateOption })

// Función para regresar al estado inicial la variable reactiva que gestiona Opción
export const clearStateOption = () => {
  stateOption.value = { ...initialStateOption }
}

// Constante para almacenar las columas permitidas para el filtro de la table Opción
export const columnsFilterOption = [
  {
    title: 'Nombre',
    field: 'a.nombre',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Opción
export const urlApiOption = '/opciones'

// Constante para almacenar el título de las notificaciónes del mantenimiento Opción
export const titleNotificationOption = 'Opción'

// Constante para almacenar el titulo de los reportes del mantenimiento Opción
export const titleReportOption = 'REPORTE DE OPCIONES'
