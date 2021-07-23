// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'

import { initialStateCombo } from '@/helpers/combos'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

// Variables inicializadora para almacenar la configuración de cada columna de la tabla Detalle Grupo Unidad
export const initialColumnsUnitGroupDetail = [
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
    field: 'nombreUnidadSunat',
    label: 'UNIDAD SUNAT',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  columnStatus,
]

// Variable reactiva para almacenar la configuración de cada columna de la tabla Detalle Grupo Unidad
export const columnsUnitGroupDetail = ref([
  columnAction,
  ...initialColumnsUnitGroupDetail,
])

// Variable reactiva para almacenar la configuracion de cada columna de la tabla Detalle Grupo Unidad cuando solo se desea mostrar
export const columnsUnitGroupDetailForShow = ref([...initialColumnsUnitGroupDetail])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Detalle Grupo Unidad
const initialDataTableUnitGroupDetail = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Detalle Grupo Unidad
export const dataTableUnitGroupDetail = ref({ ...initialDataTableUnitGroupDetail })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla detalle Grupo Unidad
export const clearDataTableUnitGroupDetail = () => {
  dataTableUnitGroupDetail.value = { ...initialDataTableUnitGroupDetail }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Detalle Grupo Unidad
export const serverQueryUnitGroupDetail = ref({
  ...serverQueryDefault,
  tabla: 'unidad',
  pfin: 5,
  campo: 'a.idgrupo',
})

// Función para limpiar filtros en la consulta de la tabla Detalle Grupo Unidad
export const clearFiltersUnitGroupDetail = () => {
  clearServerQueryDefaultFilter(serverQueryUnitGroupDetail)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Grupo Unidad
const initialStateUnitGroupDetail = {
  _id: 0,
  nombre: '',
  idGrupoUnidad: 0,
  idUnidadSunat: 0,
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Grupo Unidad
export const stateUnitGroupDetail = ref({ ...initialStateUnitGroupDetail })

// Función para regresar al estado inicial la variable reactiva que gestiona el mantenimiento de  Detalle Grupo Unidad
export const clearStateUnitGroupDetail = () => {
  stateUnitGroupDetail.value = { ...initialStateUnitGroupDetail }
}

// Variable reactiva para almacenar el listado de los combos del mantenimiento Detalle Grupo Unidad
export const combosUnitGroupDetail = ref({
  unitMeasure: { ...initialStateCombo },
})

// Constante para almacenar las columnas permitidas para el filtro del mantenimiento Detalle Grupo Unidad
export const columnsFilterUnitGroupDetail = [
  {
    title: 'Id',
    field: '_id',
  },
  {
    title: 'Nombre',
    field: 'a.nombre',
  },
]

// Constante para almacenar la url base de la petición del mantenimiento Detalle Grupo Unidad
export const urlApiUnitGroupDetail = '/unidadmedida'

// Constante para almacenar el titulo de las notificaciónes de Detalle Grupo Unidad
export const titleNotificationUnitGroupDetail = 'Detalle Grupo Unidad'
