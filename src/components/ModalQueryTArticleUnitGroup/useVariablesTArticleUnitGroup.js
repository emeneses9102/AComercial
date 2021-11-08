import { ref } from '@vue/composition-api'
import { columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

export const MODAL_ID = 'modal-query-t-article-unit-group'

// Variable reactiva para almacenar la configuración de cada columna del mantenimiento Articulo Grupo Unidad
export const columnsTArticleUnitGroup = ref([
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreTablaArticulo',
    label: 'ARTICULO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreGrupoUnidad',
    label: 'GRUPO UNIDAD',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreDetalleUnidad',
    label: 'DETALLE GRUPO UNIDAD',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreEmpaque',
    label: 'EMPAQUE',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombrePresentacion',
    label: 'PRESENTACION',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'cantidad',
    label: 'CANTIDAD',
    thClass: 'align-middle text-center',
    tdClass: 'align-middle text-center',
    pdf: true,
  },
  columnStatus,
])

// Variable inicializadora para almacenar las propiedades necesarias para el listado del mantenimiento Articulo Grupo Unidad
const initialDataTableTArticleUnitGroup = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado del mantenimiento Articulo Grupo Unidad
export const dataTableTArticleUnitGroup = ref({ ...initialDataTableTArticleUnitGroup })

// Función para regresar al estado inicial la variable que almacena el listado del mantenimiento Articulo Grupo Unidad
export const clearDataTableTArticleUnitGroup = () => {
  dataTableTArticleUnitGroup.value = { ...initialDataTableTArticleUnitGroup }
}

// Variable reactiva para manjear los consultas del lado del servidor del mantenimiento Articulo Grupo Unidad
export const serverQueryTArticleUnitGroup = ref({
  ...serverQueryDefault,
  tabla: 'articulosgrupounidad',
})

// Función para limpiar filtros en la consulta del mantenimiento Articulo Grupo Unidad
export const clearFiltersTArticleUnitGroup = () => {
  clearServerQueryDefaultFilter(serverQueryTArticleUnitGroup)
}

// Variable inicializadora para almacenar el estado de un Articulo Grupo Unidad
const initialStateTArticleUnitGroup = {
  _id: 0,
  idTablaArticulo: 0,
  nombreTablaArticulo: '',
  idArticulo: 0,
  nombreArticulo: '',
  idGrupoUnidad: 0,
  nombreGrupoUnidad: '',
  idDetalleGrupoUnidad: 0,
  nombreDetalleUnidad: '',
  idPresentacion: 0,
  nombrePresentacion: '',
  idEmpaque: 0,
  nombreEmpaque: '',
  cantidad: 0,
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un Articulo Grupo Unidad
export const stateTArticleUnitGroup = ref({ ...initialStateTArticleUnitGroup })

// Función para regresar al estado inicial la variable reactiva de Articulo Grupo Unidad
export const clearStateTArticleUnitGroup = () => {
  stateTArticleUnitGroup.value = { ...initialStateTArticleUnitGroup }
}

// Constante para almacenar las columas permitidas para el filtro del mantenimiento Articulo Grupo Unidad
export const columnsFilterTArticleUnitGroup = [
  {
    title: 'ARTICULO',
    field: 'a.nombreTablaArticulo',
  },
  {
    title: 'GRUPO',
    field: 'a.nombreGrupoUnidad',
  },
  {
    title: 'EMPAQUE',
    field: 'a.nombreEmpaque',
  },
  {
    title: 'PRESENTACION',
    field: 'a.nombrePresentacion',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Articulo Grupo Unidad
export const urlApiTArticleUnitGroup = '/articulosgrupounidad'

// Constante para almacenar el título de las notificaciónes del Buscador Articulo Grupo Unidad
export const titleNotificationTArticleUnitGroup = 'Artículo Grupo Unidad'
