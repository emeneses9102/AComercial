// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { initialStateCombo } from '@/helpers/combos'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import routesName from '@/helpers/routesName'

// Nombre de la ruta que usa el mantenimiento Almacen
export const routeNameStorage = routesName.almacen

// Constante para almacenar el id base de los modales del mantenimiento Almacén
export const MODAL_ID = 'modal-storage'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Almacén
export const columnsStorage = ref([
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
    field: 'nombrePredio',
    label: 'PREDIO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreTipoAlmacen',
    label: 'TIPO ALMACÉN',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreNegocio',
    label: 'NEGOCIO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'OBSERVACIÓN',
    field: 'observacion',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Almacén
export const dataTableStorage = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Almacén
export const serverQueryStorage = ref({
  ...serverQueryDefault,
  tabla: 'almacen',
})

// Función para limpiar filtros en la consulta de la tabla Almacén
export const clearFiltersStorage = () => {
  clearServerQueryDefaultFilter(serverQueryStorage)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Almacén
const initialStateStorage = {
  _id: 0,
  idPredio: 0,
  nombrePredio: '',
  idTipoAlmacen: 0,
  nombreTipoAlmacen: '',
  idNegocio: 0,
  nombreNegocio: '',
  nombre: '',
  observacion: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Almacén
export const stateStorage = ref({ ...initialStateStorage })

// Función para regresar al estado inicial la variable reactiva que gestiona Almacén
export const clearStateStorage = () => {
  stateStorage.value = { ...initialStateStorage }
}

// Variable reactiva para almacenar el listado de los combos del mantenimiento Almacén
export const combosStorage = ref({
  predio: { ...initialStateCombo },
  storageType: { ...initialStateCombo },
  businessUnit: { ...initialStateCombo },
})

// Constante para almacenar las columas permitidas para el filtro de la tabla Almacén
export const columnsFilterStorage = [
  {
    title: 'Nombre',
    field: 'a.nombre',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Almacén
export const urlApiStorage = '/almacen'

// Constante para almacenar el título de las notificaciónes del mantenimiento Almacén
export const titleNotificationStorage = 'Almacén'

// Constante para almacenar el titulo de los reportes del mantenimiento Almacén
export const titleReportStorage = 'REPORTE DE ALMACENES'
