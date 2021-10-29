// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

export const MODAL_ID = 'modal-point-sale-serie'

// Variables inicializadora para almacenar la configuración de cada columna de la tabla Detalle Punto de Venta Serie
export const initialColumnsPointSaleSerie = [
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'serie',
    label: 'SERIE',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'observaciones',
    label: 'OBSERVACION',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'cantidad',
    label: 'CANTIDAD',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  columnStatus,
]

// Variable reactiva para almacenar la configuración de cada columna de la tabla Detalle Punto de Venta Serie
export const columnsPointSaleSerie = ref([
  columnAction,
  ...initialColumnsPointSaleSerie,
])

// Variable reactiva para almacenar la configuracion de cada columna de la tabla Detalle Punto de Venta Serie cuando solo se desea mostrar
export const columnsPointSaleSerieForShow = ref([...initialColumnsPointSaleSerie])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Detalle Punto de Venta Serie
const initialDataTablePointSaleSerie = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Detalle Punto de Venta Serie
export const dataTablePointSaleSerie = ref({ ...initialDataTablePointSaleSerie })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Detalle Punto de Venta Serie
export const clearDataTablePointSaleSerie = () => {
  dataTablePointSaleSerie.value = { ...initialDataTablePointSaleSerie }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Detalle Punto de Venta Serie
export const serverQueryPointSaleSerie = ref({
  ...serverQueryDefault,
  tabla: 'darticulopuntoventa',
  pfin: 5,
  campo: 'a.iddpuntoventa',
})

// Función para limpiar filtros en la consulta de la tabla Detalle Punto de Venta Serie
export const clearFiltersPointSaleSerie = () => {
  clearServerQueryDefaultFilter(serverQueryPointSaleSerie)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Punto de Venta Serie
const initialStatePointSaleSerie = {
  _id: 0,
  idDPuntoVenta: 0,
  idDArticulo: 0,
  accion: 0,
  loading: false,
}

// Variable para almacenar la cantidad del detalle punto venta
export const countPointSaleDetailSelected = ref(0)

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Punto de Venta Serie
export const statePointSaleSerie = ref({ ...initialStatePointSaleSerie })

// Función para regresar al estado inicial la variable reactiva que gestiona el mantenimiento de  Detalle Punto de Venta Serie
export const clearStatePointSaleSerie = () => {
  statePointSaleSerie.value = { ...initialStatePointSaleSerie }
}

// Constante para almacenar las columnas permitidas para el filtro del mantenimiento Detalle Punto de Venta Serie
export const columnsFilterPointSaleSerie = [
  {
    title: 'ID',
    field: '_id',
  },
  {
    title: 'SERIE',
    field: 'a.serie',
  },
  {
    title: 'OBSERVACIONES',
    field: 'a.observaciones',
  },
]

// Constante para almacenar la url base de la petición del mantenimiento Detalle Punto de Venta Serie
export const urlApiPointSaleSerie = '/darticulopuntoventa'

// Constante para almacenar el titulo de las notificaciónes de Detalle Punto de Venta Serie
export const titleNotificationPointSaleSerie = 'Detalle Serie'
