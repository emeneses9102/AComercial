// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { initialStateCombo } from '@/helpers/combos'
import { serverQueryDefault, clearServerQueryDefaultFilter } from '@/helpers/serverQuery'

// Constante para almacenar el id base de los modales del mantenimiento Menú
export const MODAL_ID = 'modal-menu'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Menú
export const columnsMenu = ref([
  columnAction,
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreModulo',
    label: 'MÓDULO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombre',
    label: 'MENÚ',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'orden',
    label: 'ORDEN',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'ruta',
    label: 'NOMBRE DE RUTA',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Menú
export const dataTableMenu = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Menú
export const serverQueryMenu = ref({
  ...serverQueryDefault,
  tabla: 'menu',
})

// Función para limpiar filtros en la consulta de la tabla Menú
export const clearFiltersMenu = () => {
  clearServerQueryDefaultFilter(serverQueryMenu)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Menú
const initialStateMenu = {
  _id: 0,
  idModulo: 0,
  nombreModulo: '',
  nombre: '',
  orden: 0,
  formulario: '',
  ruta: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Menú
export const stateMenu = ref({ ...initialStateMenu })

// Función para regresar al estado inicial la variable reactiva que gestiona Menú
export const clearStateMenu = () => {
  stateMenu.value = { ...initialStateMenu }
}

// Variable reactiva para almacenar el listado de los combos del mantenimiento Menú
export const combosMenu = ref({
  module: { ...initialStateCombo },
})

// Constante para almacenar las columas permitidas para el filtro de la tabla Menú
export const columnsFilterMenu = [
  {
    title: 'Menú',
    field: 'a.nombre',
  },
  {
    title: 'Módulo',
    field: 'a.nombreModulo',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Menú
export const urlApiMenu = '/menu'

// Constante para almacenar el título de las notificaciónes del mantenimiento Menú
export const titleNotificationMenu = 'Menú'

// Constante para almacenar el titulo de los reportes del mantenimiento Menú
export const titleReportMenu = 'REPORTE DE MENÚS'
