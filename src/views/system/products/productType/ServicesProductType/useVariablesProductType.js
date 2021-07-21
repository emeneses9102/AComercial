// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

// Constante para almacenar el id base de los modales del mantenimiento Tipo Producto
export const MODAL_ID = 'modal-product-type'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Tipo Producto
export const columnsProductType = ref([
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

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Tipo Producto
export const dataTableProductType = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Tipo Producto
export const serverQueryProductType = ref({
  ...serverQueryDefault,
  tabla: 'tipoproducto',
})

// Función para limpiar filtros en la consulta de la tabla Tipo Producto
export const clearFiltersProductType = () => {
  clearServerQueryDefaultFilter(serverQueryProductType)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Tipo Producto
const initialStateProductType = {
  _id: 0,
  nombre: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Tipo Producto
export const stateProductType = ref({ ...initialStateProductType })

// Función para regresar al estado inicial la variable reactiva que gestiona Tipo Producto
export const clearStateProductType = () => {
  stateProductType.value = { ...initialStateProductType }
}

// Constante para almacenar las columas permitidas para el filtro de la table Tipo Producto
export const columnsFilterProductType = [
  {
    title: 'Nombre',
    field: 'a.nombre',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Tipo Producto
export const urlApiProductType = '/tipoproducto'

// Constante para almacenar el título de las notificaciónes del mantenimiento Tipo Producto
export const titleNotificationProductType = 'Tipo Producto'

// Constante para almacenar el titulo de los reportes del mantenimiento Tipo Producto
export const titleReportProductType = 'REPORTE DE TIPO DE PRODUCTOS'
