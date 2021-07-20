// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction } from '@/helpers/columnsTable'

// Constante para almacenar el id base de los modales del mantenimiento Grupo Unidad
export const MODAL_ID = 'modal-unit-group'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Grupo Unidad
export const columnsUnitGroup = ref([
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
    field: 'activo',
    label: 'ESTADO',
    thClass: 'align-middle',
    tdClass: 'align-middle text-center',
    pdf: true,
  },
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Grupo Unidad
export const dataTableUnitGroup = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Grupo Unidad
export const serverQueryUnitGroup = ref({
  _id: 0,
  tabla: 'grupo',
  pinicio: 1,
  pfin: 10,
  campofiltro: '',
  filtro: '',
})

// Función para limpiar filtros en la consulta de la tabla Grupo Unidad
export const clearFiltersUnitGroup = () => {
  serverQueryUnitGroup.value.campofiltro = ''
  serverQueryUnitGroup.value.filtro = ''
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Grupo Unidad
const initialStateUnitGroup = {
  _id: 0,
  nombre: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Grupo Unidad
export const stateUnitGroup = ref({ ...initialStateUnitGroup })

// Función para regresar al estado inicial la variable reactiva que gestiona Grupo Unidad
export const clearStateUnitGroup = () => {
  stateUnitGroup.value = { ...initialStateUnitGroup }
}

// Constante para almacenar las columas permitidas para el filtro de la table Grupo Unidad
export const columnsFilterUnitGroup = [
  {
    title: 'Nombre',
    field: 'a.nombre',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Grupo Unidad
export const urlApiUnitGroup = '/grupounidad'

// Constante para almacenar el título de las notificaciónes del mantenimiento Grupo Unidad
export const titleNotificationUnitGroup = 'Grupo Unidad'

// Constante para almacenar el titulo de los reportes del mantenimiento Grupo Unidad
export const titleReportUnitGroup = 'REPORTE DE GRUPOS DE UNIDAD'
