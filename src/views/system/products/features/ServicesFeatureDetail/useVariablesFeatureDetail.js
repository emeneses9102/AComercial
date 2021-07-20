// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction } from '@/helpers/columnsTable'

// Variables inicializadora para almacenar la configuración de cada columna de la tabla Detalle Característica
export const initialColumnsFeatureDetail = [
  {
    field: '_id',
    label: 'ID',
  },
  {
    field: 'nombre',
    label: 'NOMBRE',
  },
  {
    field: 'abreviatura',
    label: 'ABREVIATURA',
  },
  {
    field: 'activo',
    label: 'ESTADO',
  },
]

// Variable reactiva para almacenar la configuración de cada columna de la tabla Detalle Característica con Acciones
export const columnsFeatureDetail = ref([
  columnAction,
  ...initialColumnsFeatureDetail,
])

// Variable reactiva para almacenar la configuracion de cada columna de la tabla Detalle Característica cuando solo se desea mostrar
export const columnsFeatureDetailForShow = ref([...initialColumnsFeatureDetail])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Detalle Característica
const initialDataTableDetail = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Detalle Característica
export const dataTableFeatureDetail = ref({ ...initialDataTableDetail })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Detalle Característica
export const clearDataTableFeatureDetail = () => {
  dataTableFeatureDetail.value = { ...initialDataTableDetail }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Detalle Característica
export const serverQueryFeatureDetail = ref({
  _id: 0,
  tabla: 'dcaracteristica',
  pinicio: 1,
  pfin: 5,
  campofiltro: '',
  filtro: '',
  campo: 'a.idcaracteristica',
  indice: 0,
})

// Función para limpiar filtros en la consulta de la tabla Detalle Característica
export const clearFiltersFeatureDetail = () => {
  serverQueryFeatureDetail.value.campofiltro = ''
  serverQueryFeatureDetail.value.filtro = ''
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Característica
const initialStateFeatureDetail = {
  _id: 0,
  nombre: '',
  abreviatura: '',
  idCaracteristica: 0,
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Característica
export const stateFeatureDetail = ref({ ...initialStateFeatureDetail })

// Función para regresar al estado inicial la variable reactiva que gestiona el mantenimiento de  Detalle Característica
export const clearStateFeatureDetail = () => {
  stateFeatureDetail.value = { ...initialStateFeatureDetail }
}

// Constante para almacenar las columnas permitidas para el filtro del mantenimiento Detalle Característica
export const columnsFilterFeatureDetail = [
  {
    title: 'Id',
    field: '_id',
  },
  {
    title: 'Nombre',
    field: 'a.nombre',
  },
]

// Constante para almacenar la url base de la petición del mantenimiento Detalle Característica
export const urlApiFeatureDetail = '/dcaracteristica'

// Constante para almacenar el titulo de las notificaciónes de Detalle Característica
export const titleNotificationFeatureDetail = 'Detalle Característica'
