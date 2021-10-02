// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import routesName from '@/helpers/routesName'

// Nombre de la ruta que usa el mantenimiento Moneda
export const routeNameCurrency = routesName.moneda

// Constante para almacenar el id base de los modales del mantenimiento Moneda
export const MODAL_ID = 'modal-currency'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Moneda
export const columnsCurrency = ref([
  columnAction,
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'codigoMoneda',
    label: 'Código de Moneda',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'codigo3',
    label: 'Código',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'unidadMenor',
    label: 'Unidad Menor',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'moneda',
    label: 'Moneda',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'pais',
    label: 'País',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'mlocal',
    label: 'M. Local',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Moneda
export const dataTableCurrency = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Moneda
export const serverQueryCurrency = ref({
  ...serverQueryDefault,
  tabla: 'moneda',
})

// Función para limpiar filtros en la consulta de la tabla Moneda
export const clearFiltersCurrency = () => {
  clearServerQueryDefaultFilter(serverQueryCurrency)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Moneda
const initialStateCurrency = {
  _id: 0,
  codigoMoneda: 0,
  codigo3: '',
  unidadMenor: '',
  moneda: '',
  pais: '',
  mlocal: 0,
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Moneda
export const stateCurrency = ref({ ...initialStateCurrency })

// Función para regresar al estado inicial la variable reactiva que gestiona Moneda
export const clearStateCurrency = () => {
  stateCurrency.value = { ...initialStateCurrency }
}

// Constante para almacenar las columas permitidas para el filtro de la table Moneda
export const columnsFilterCurrency = [
  {
    title: 'Código de Moneda',
    field: 'a.codigomoneda',
  },
  {
    title: 'Código',
    field: 'a.codigo3',
  },
  {
    title: 'Moneda',
    field: 'a.moneda',
  },
  {
    title: 'País',
    field: 'a.pais',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Moneda
export const urlApiCurrency = '/monedas'

// Constante para almacenar el título de las notificaciónes del mantenimiento Moneda
export const titleNotificationCurrency = 'Moneda'

// Constante para almacenar el titulo de los reportes del mantenimiento Moneda
export const titleReportCurrency = 'REPORTE DE MONEDAS'
