// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { initialStateCombo } from '@/helpers/combos'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

// Constante para almacenar el id base de los modales del mantenimiento Sesion Caja
export const MODAL_ID = 'modal-box-session'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Sesion Caja
export const columnsBoxSession = ref([
  columnAction,
  {
    label: 'Id',
    field: '_id',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'NOMBRE CAJERO',
    field: 'nombreCajero',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'FECHA',
    field: 'fecha',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'NOMBRE ALMACÉN',
    field: 'nombreAlmacen',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'FECHA APERTURA',
    field: 'fechaApertura',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'FECHA CIERRE',
    field: 'fechaCierre',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Sesion Caja
export const dataTableBoxSession = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Sesion Caja
export const serverQueryBoxSession = ref({
  ...serverQueryDefault,
  tabla: 'sesioncaja',
})

// Función para limpiar filtros en la consulta de la tabla Sesion Caja
export const clearFiltersBoxSession = () => {
  clearServerQueryDefaultFilter(serverQueryBoxSession)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Sesion Caja
const initialStateBoxSession = {
  _id: 0,
  idCajero: 0,
  idAlmacen: 0,
  fecha: (new Date()).toISOString(),
  fechaApertura: '',
  idApertura: 0,
  apertura: 0,
  descripcion: '',
  descripcionApertura: '',
  fechaCierre: '',
  idCierre: 0,
  cierre: 0,
  descripcionCierre: '',
  tipo: 0,
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Sesion Caja
export const stateBoxSession = ref({ ...initialStateBoxSession })

// Función para regresar al estado inicial la variable reactiva que gestiona Sesion Caja
export const clearStateBoxSession = () => {
  stateBoxSession.value = { ...initialStateBoxSession }
}

// Variable reactiva para almacenar el listado de los combos del mantenimiento Sesion Caja
export const combosBoxSession = ref({
  cashier: { ...initialStateCombo },
  storage: { ...initialStateCombo },
  opening: { ...initialStateCombo },
  ending: { ...initialStateCombo },
})

// Constante para almacenar las columas permitidas para el filtro de la tabla Sesion Caja
export const columnsFilterBoxSession = [
  {
    title: 'CAJERO',
    field: 'a.nombreCajero',
  },
  {
    title: 'ALMACÉN',
    field: 'a.nombreAlmacen',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Sesion Caja
export const urlApiBoxSession = '/sesioncaja'

// Constante para almacenar el título de las notificaciónes del mantenimiento Sesion Caja
export const titleNotificationBoxSession = 'Sesion Caja'

// Constante para almacenar el titulo de los reportes del mantenimiento Sesion Caja
export const titleReportBoxSession = 'REPORTE DE SESION CAJA'
