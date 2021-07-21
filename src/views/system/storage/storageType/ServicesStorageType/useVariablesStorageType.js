// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

// Constante para almacenar el id base de los modales del mantenimiento Tipo Almacén
export const MODAL_ID = 'modal-storage-type'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Tipo Almacén
export const columnsStorageType = ref([
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

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Tipo Almacén
export const dataTableStorageType = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Tipo Almacén
export const serverQueryStorageType = ref({
  ...serverQueryDefault,
  tabla: 'tipoalmacen',
})

// Función para limpiar filtros en la consulta de la tabla Tipo Almacén
export const clearFiltersStorageType = () => {
  clearServerQueryDefaultFilter(serverQueryStorageType)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Tipo Almacén
const initialStateStorageType = {
  _id: 0,
  nombre: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Tipo Almacén
export const stateStorageType = ref({ ...initialStateStorageType })

// Función para regresar al estado inicial la variable reactiva que gestiona Tipo Almacén
export const clearStateStorageType = () => {
  stateStorageType.value = { ...initialStateStorageType }
}

// Constante para almacenar las columas permitidas para el filtro de la table Tipo Almacén
export const columnsFilterStorageType = [
  {
    title: 'Nombre',
    field: 'a.nombre',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Tipo Almacén
export const urlApiStorageType = '/tipoalmacen'

// Constante para almacenar el título de las notificaciónes del mantenimiento Tipo Almacén
export const titleNotificationStorageType = 'Tipo Almacén'

// Constante para almacenar el titulo de los reportes del mantenimiento Tipo Almacén
export const titleReportStorageType = 'REPORTE DE TIPO DE ALMACENES'
