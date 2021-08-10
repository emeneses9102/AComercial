// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { initialStateCombo } from '@/helpers/combos'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

// Variables inicializadora para almacenar la configuración de cada columna de la tabla Correlativo
export const initialColumnsVoucherDetailCorrelative = [
  {
    label: 'Id',
    field: '_id',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'SERIE',
    field: 'serie',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'NÚMERO',
    field: 'numero',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'PREDIO',
    field: 'nombrePredio',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'Comprobante',
    field: 'nombreComprobante',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  columnStatus,
]

// Variable reactiva para almacenar la configuración de cada columna de la tabla Correlativo con Acciones
export const columnsVoucherDetailCorrelative = ref([
  columnAction,
  ...initialColumnsVoucherDetailCorrelative,
])

// Variable reactiva para almacenar la configuracion de cada columna de la tabla Correlativo cuando solo se desea mostrar
export const columnsVoucherDetailCorrelativeForShow = ref([...initialColumnsVoucherDetailCorrelative])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Correlativo
const initialDataTableVoucherDetailCorrelative = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Correlativo
export const dataTableVoucherDetailCorrelative = ref({ ...initialDataTableVoucherDetailCorrelative })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Correlativo
export const clearDataTableVoucherDetailCorrelative = () => {
  dataTableVoucherDetailCorrelative.value = { ...initialDataTableVoucherDetailCorrelative }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Correlativo
export const serverQueryVoucherDetailCorrelative = ref({
  ...serverQueryDefault,
  tabla: 'correlativo',
  pfin: 5,
  campo: 'a.idcomprobante',
})

// Función para limpiar filtros en la consulta de la tabla Correlativo
export const clearFiltersVoucherDetailCorrelative = () => {
  clearServerQueryDefaultFilter(serverQueryVoucherDetailCorrelative)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Correlativo
const initialStateVoucherDetailCorrelative = {
  _id: 0,
  idPredio: 0,
  idComprobante: 0,
  serie: '',
  numero: 0,
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Correlativo
export const stateVoucherDetailCorrelative = ref({ ...initialStateVoucherDetailCorrelative })

// Función para regresar al estado inicial la variable reactiva que gestiona el mantenimiento de  Correlativo
export const clearStateVoucherDetailCorrelative = () => {
  stateVoucherDetailCorrelative.value = { ...initialStateVoucherDetailCorrelative }
}
export const combosVoucherDetailCorrelative = ref({
  predios: { ...initialStateCombo },
})

// Constante para almacenar las columnas permitidas para el filtro del mantenimiento Correlativo
export const columnsFilterVoucherDetailCorrelative = [
  {
    title: 'Id',
    field: '_id',
  },
  {
    title: 'Número',
    field: 'a.numero',
  },
  {
    title: 'Serie',
    field: 'a.serie',
  },
]

// Constante para almacenar la url base de la petición del mantenimiento Correlativo
export const urlApiVoucherDetailCorrelative = '/correlativo'

// Constante para almacenar el titulo de las notificaciónes de Correlativo
export const titleNotificationVoucherDetailCorrelative = 'Correlativo'
