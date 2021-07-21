// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { initialStateCombo } from '@/helpers/combos'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

// Constante para almacenar el id base de los modales del mantenimiento Roles
export const MODAL_ID = 'modal-role'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Roles
export const columnsRole = ref([
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
    field: 'direccion',
    label: 'DIRECCIÓN',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Roles
export const dataTableRole = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Roles
export const serverQueryRole = ref({
  ...serverQueryDefault,
  tabla: 'roles',
})

// Función para limpiar filtros en la consulta de la tabla Roles
export const clearFiltersRole = () => {
  clearServerQueryDefaultFilter(serverQueryRole)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Roles
const initialStateRole = {
  _id: 0,
  nombre: '',
  idPredio: 0,
  nombrePredio: '',
  idAlmacen: 0,
  nombreAlmacen: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Roles
export const stateRole = ref({ ...initialStateRole })

// Función para regresar al estado inicial la variable reactiva que gestiona Roles
export const clearStateRole = () => {
  stateRole.value = { ...initialStateRole }
}

// Variable reactiva para almacenar el listado de los combos del mantenimiento Roles
export const combosRole = ref({
  predio: { ...initialStateCombo },
  storage: { ...initialStateCombo },
})

// Constante para almacenar las columas permitidas para el filtro de la tabla Roles
export const columnsFilterRole = [
  {
    title: 'Nombre',
    field: 'a.nombre',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Roles
export const urlApiRole = '/roles'

// Constante para almacenar el título de las notificaciónes del mantenimiento Roles
export const titleNotificationRole = 'Roles'

// Constante para almacenar el titulo de los reportes del mantenimiento Roles
export const titleReportRole = 'REPORTE DE ROLES'
