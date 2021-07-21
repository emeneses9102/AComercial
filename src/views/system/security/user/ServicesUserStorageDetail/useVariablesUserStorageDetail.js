// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'

import { initialStateCombo } from '@/helpers/combos'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

// Variables inicializadora para almacenar la configuración de cada columna de la tabla Detalle Usuario Almacén
export const initialColumnsUserStorageDetail = [
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreAlmacen',
    label: 'ALMACÉN',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'admCaja',
    label: 'ADM. CAJA',
    thClass: 'align-middle text-center',
    tdClass: 'align-middle text-center',
    pdf: true,
    type: 'boolean',
  },
  columnStatus,
]

// Variable reactiva para almacenar la configuración de cada columna de la tabla Detalle Usuario Almacén
export const columnsUserStorageDetail = ref([
  columnAction,
  ...initialColumnsUserStorageDetail,
])

// Variable reactiva para almacenar la configuracion de cada columna de la tabla Detalle Usuario Almacén cuando solo se desea mostrar
export const columnsUserStorageDetailForShow = ref([...initialColumnsUserStorageDetail])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Detalle Usuario Almacén
const initialDataTableUserStorageDetail = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Detalle Usuario Almacén
export const dataTableUserStorageDetail = ref({ ...initialDataTableUserStorageDetail })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Detalle Usuario Almacén
export const clearDataTableUserStorageDetail = () => {
  dataTableUserStorageDetail.value = { ...initialDataTableUserStorageDetail }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Detalle Usuario Almacén
export const serverQueryUserStorageDetail = ref({
  ...serverQueryDefault,
  tabla: 'usuarioalmacen',
  pfin: 5,
  campo: 'a.idusuario',
})

// Función para limpiar filtros en la consulta de la tabla Detalle Usuario Almacén
export const clearFiltersUserStorageDetail = () => {
  clearServerQueryDefaultFilter(serverQueryUserStorageDetail)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Usuario Almacén
const initialStateUserStorageDetail = {
  _id: 0,
  idUsuario: 0,
  idAlmacen: 0,
  idLogin: 0,
  admCaja: 0,
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Usuario Almacén
export const stateUserStorageDetail = ref({ ...initialStateUserStorageDetail })

// Función para regresar al estado inicial la variable reactiva que gestiona el mantenimiento de  Detalle Usuario Almacén
export const clearStateUserStorageDetail = () => {
  stateUserStorageDetail.value = { ...initialStateUserStorageDetail }
}

// Variable reactiva para almacenar el listado de los combos del mantenimiento Detalle Usuario Almacén
export const combosUserStorageDetail = ref({
  storage: { ...initialStateCombo },
})

// Constante para almacenar las columnas permitidas para el filtro del mantenimiento Detalle Usuario Almacén
export const columnsFilterUserStorageDetail = [
  {
    title: 'Id',
    field: '_id',
  },
  {
    title: 'Almacén',
    field: 'a.nombrealmacen',
  },
]

// Constante para almacenar la url base de la petición del mantenimiento Detalle Usuario Almacén
export const urlApiUserStorageDetail = '/usuarioalmacen'

// Constante para almacenar el titulo de las notificaciónes de Detalle Usuario Almacén
export const titleNotificationUserStorageDetail = 'Detalle Usuario Almacén'
