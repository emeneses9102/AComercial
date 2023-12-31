// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

// Constante para almacenar el id base de los modales del mantenimiento Medio de Pago
export const MODAL_ID = 'modal-point-sale'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Medio de Pago
export const columnsPointSale = ref([
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
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Medio de Pago
export const dataTablePointSale = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Medio de Pago
export const serverQueryPointSale = ref({
  ...serverQueryDefault,
  tabla: 'mediopago',
})

// Función para limpiar filtros en la consulta de la tabla Medio de Pago
export const clearFiltersPointSale = () => {
  clearServerQueryDefaultFilter(serverQueryPointSale)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Medio de Pago
const initialStatePointSale = {
  _id: 0,
  nombre: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Medio de Pago
export const statePointSale = ref({ ...initialStatePointSale })

// Función para regresar al estado inicial la variable reactiva que gestiona Medio de Pago
export const clearStatePointSale = () => {
  statePointSale.value = { ...initialStatePointSale }
}

// Constante para almacenar las columas permitidas para el filtro de la table Medio de Pago
export const columnsFilterPointSale = [
  {
    title: 'Nombre',
    field: 'a.nombre',
  },
  {
    title: 'DNI',
    field: 'a.dni',
  },
  {
    title: 'RUC',
    field: 'a.ruc',
  },
]

// Variable inicializadora para almacenar los datos del cliente seleccionado
const initialStateClient = {
  _id: 0,
  nombreDocumento: '',
  numeroDocumento: '',
  nombres: '',
  direccion: '',
  telefono: '',
  correo: '',
}

// Variable reactiva para almacenar los datos del cliente seleccionado
export const stateClient = ref({ ...initialStateClient })

// Función para regresar al estado inicial la variable reactiva que almacena el cliente seleccionado
export const clearStateClient = () => {
  stateClient.value = { ...initialStateClient }
}

// Variable inicializadora para almacenar los datos del producto seleccionado
const initialStateProductSelected = {
  _id: 0,
  nombre: '-----------',
  imagen: '',
  ref: '##########',
  cantidad: 1,
  precio: 0,
  descuento: 0,
  subtotal: 0,
}

// Variable reactiva para almacenar los datos del producto seleccionado
export const stateProductSelected = ref({ ...initialStateProductSelected })

// Función para regresar al estado inicial la variable reactiva que almacena el cliente seleccionado
export const clearStateProductSelected = () => {
  stateProductSelected.value = { ...initialStateProductSelected }
}

// Variable reactiva para almacenar el buscador de codigo de producto
export const searchProductById = ref('')
// Variable inicializadora para almacenar el carrito de compras
const initialStateListProducts = []

// Variable reactiva para almacenar el carrito de compras
export const stateListProducts = ref([...initialStateListProducts])

// Función para regresar al estado inicial la variable reactiva que almacena el carrito de compras
export const clearStateListProducts = () => {
  stateListProducts.value = [...initialStateListProducts]
}

// Constante para almacenar la url base de la petición al mantenimiento Medio de Pago
export const urlApiPointSale = '/mediopago'

// Constante para almacenar el título de las notificaciónes del mantenimiento Medio de Pago
export const titleNotificationPointSale = 'Punto Venta'

// Constante para almacenar el titulo de los reportes del mantenimiento Medio de Pago
export const titleReportPointSale = 'REPORTE DE TIPO DE PUNTO VENTA'
