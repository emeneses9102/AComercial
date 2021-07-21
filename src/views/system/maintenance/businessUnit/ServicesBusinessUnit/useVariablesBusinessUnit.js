// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

// Constante para almacenar el id base de los modales del mantenimiento Unidad de Negocio
export const MODAL_ID = 'modal-business-unit'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Unidad de Negocio
export const columnsBusinessUnit = ref([
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
    field: 'ruc',
    label: 'RUC',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'razonSocial',
    label: 'RAZÓN SOCIAL',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'produccion',
    label: 'PRODUCCIÓN',
    thClass: 'align-middle text-left',
    tdClass: 'align-middle text-center',
    pdf: true,
    type: 'boolean',
  },
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Unidad de Negocio
export const dataTableBusinessUnit = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Unidad de Negocio
export const serverQueryBusinessUnit = ref({
  ...serverQueryDefault,
  tabla: 'negocio',
})

// Función para limpiar filtros en la consulta de la tabla Unidad de Negocio
export const clearFiltersBusinessUnit = () => {
  clearServerQueryDefaultFilter(serverQueryBusinessUnit)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Unidad de Negocio
const initialStateBusinessUnit = {
  _id: 0,
  nombre: '',
  razonSocial: '',
  ruc: '',
  rutaApi: '',
  tokenApi: '',
  produccion: 0,
  usuarioSunat: '',
  claveSunat: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Unidad de Negocio
export const stateBusinessUnit = ref({ ...initialStateBusinessUnit })

// Función para regresar al estado inicial la variable reactiva que gestiona Unidad de Negocio
export const clearStateBusinessUnit = () => {
  stateBusinessUnit.value = { ...initialStateBusinessUnit }
}

// Constante para almacenar las columas permitidas para el filtro de la table Unidad de Negocio
export const columnsFilterBusinessUnit = [
  {
    title: 'Nombre',
    field: 'a.nombre',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Unidad de Negocio
export const urlApiBusinessUnit = '/unidadnegocio'

// Constante para almacenar el título de las notificaciónes del mantenimiento Unidad de Negocio
export const titleNotificationBusinessUnit = 'Unidad de Negocio'

// Constante para almacenar el titulo de los reportes del mantenimiento Unidad de Negocio
export const titleReportBusinessUnit = 'REPORTE DE UNIDADES DE NEGOCIO'
