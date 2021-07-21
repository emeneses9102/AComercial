// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

// Variables inicializadora para almacenar la configuración de cada columna de la tabla Sub Almacén
export const initialColumnsSubStorage = [
  {
    field: '_id',
    label: 'ID',
  },
  {
    field: 'nombre',
    label: 'NOMBRE',
  },
  {
    field: 'ubicacion',
    label: 'UBICACIÓN',
  },
  columnStatus,
]

// Variable reactiva para almacenar la configuración de cada columna de la tabla Sub Almacén con Acciones
export const columnsSubStorage = ref([
  columnAction,
  ...initialColumnsSubStorage,
])

// Variable reactiva para almacenar la configuracion de cada columna de la tabla Sub Almacén cuando solo se desea mostrar
export const columnsSubStorageForShow = ref([...initialColumnsSubStorage])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Sub Almacén
const initialDataTableSubStorage = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Sub Almacén
export const dataTableSubStorage = ref({ ...initialDataTableSubStorage })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Sub Almacén
export const clearDataTableSubStorage = () => {
  dataTableSubStorage.value = { ...initialDataTableSubStorage }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Sub Almacén
export const serverQuerySubStorage = ref({
  ...serverQueryDefault,
  tabla: 'dalmacen',
  pfin: 5,
  campo: 'a.idalmacen',
})

// Función para limpiar filtros en la consulta de la tabla Sub Almacén
export const clearFiltersSubStorage = () => {
  clearServerQueryDefaultFilter(serverQuerySubStorage)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Sub Almacén
const initialStateSubStorage = {
  _id: 0,
  nombre: '',
  idAlmacen: 0,
  ubicacion: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Sub Almacén
export const stateSubStorage = ref({ ...initialStateSubStorage })

// Función para regresar al estado inicial la variable reactiva que gestiona el mantenimiento de  Sub Almacén
export const clearStateSubStorage = () => {
  stateSubStorage.value = { ...initialStateSubStorage }
}

// Constante para almacenar las columnas permitidas para el filtro del mantenimiento Sub Almacén
export const columnsFilterSubStorage = [
  {
    title: 'Id',
    field: '_id',
  },
  {
    title: 'Nombre',
    field: 'a.nombre',
  },
]

// Constante para almacenar la url base de la petición del mantenimiento Sub Almacén
export const urlApiSubStorage = '/dalmacen'

// Constante para almacenar el titulo de las notificaciónes de Sub Almacén
export const titleNotificationSubStorage = 'Sub Almacén'
