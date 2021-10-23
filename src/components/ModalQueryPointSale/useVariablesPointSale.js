import { ref } from '@vue/composition-api'
import { columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

export const MODAL_ID = 'modal-query-point-sale'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Punto de Venta
export const columnsPointSale = ref([
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'fecha',
    label: 'FECHA',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreComprobante',
    label: 'COMPROBANTE',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'descripcion',
    label: 'DESCRIPCIÓN',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreSocio',
    label: 'SOCIO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'subTotal',
    label: 'SUBTOTAL',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'total',
    label: 'TOTAL',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  columnStatus,
])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Punto de Venta
const initialDataTablePointSale = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Punto de Venta
export const dataTablePointSale = ref({ ...initialDataTablePointSale })

// Función para regresar al estado inicial la variable que almacena el listado de la tabla Punto de Venta
export const clearDataTablePointSale = () => {
  dataTablePointSale.value = { ...initialDataTablePointSale }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Punto de Venta
export const serverQueryPointSale = ref({
  ...serverQueryDefault,
  tabla: 'puntoventa',
})

// Función para limpiar filtros en la consulta de la tabla Punto de Venta
export const clearFiltersPointSale = () => {
  clearServerQueryDefaultFilter(serverQueryPointSale)
}

// Variable inicializadora para almacenar el estado de un Punto de Venta
const initialStatePointSale = {
  _id: 0,
  idSesionCaja: 0,
  idVendedor: 0,
  idFormaPago: 0,
  vencimiento: null,
  idComprobante: 0,
  idCorrelativo: 0,
  serie: '',
  numero: 0,
  idSocio: 0,
  idMoneda: 0,
  idOrdenPedido: 0,
  idOrdenServicio: 0,
  descripcion: '',
  subTotal: 0,
  total: 0,
  totalPagado: 0,
  vuelto: 0,
  despachado: 0,
  anulado: 0,
  facturado: 0,
  idAnula: 0,
  cancelado: 0,
  idCancela: 0,
  cerrado: 0,
}

// Variable reactiva para almacenar el estado de un Punto de Venta
export const statePointSale = ref({ ...initialStatePointSale })

// Función para regresar al estado inicial la variable reactiva de Punto de Ventas
export const clearStatePointSale = () => {
  statePointSale.value = { ...initialStatePointSale }
}

// Constante para almacenar las columas permitidas para el filtro de la table Punto de Venta
export const columnsFilterPointSale = [
  {
    title: 'ID',
    field: 'a._id',
  },
  {
    title: 'SOCIO',
    field: 'a.nombreSocio',
  },
  {
    title: 'VENDEDOR',
    field: 'a.nombreVendedor',
  },
  {
    title: 'COMPROBANTE',
    field: 'a.nombreComprobante',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Punto de Venta
export const urlApiPointSale = '/puntoventa'

// Constante para almacenar el título de las notificaciónes del Buscador Punto de Venta
export const titleNotificationPointSale = 'Punto de Venta'
