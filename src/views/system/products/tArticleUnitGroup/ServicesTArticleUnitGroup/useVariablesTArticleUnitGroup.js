// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import { initialStateCombo } from '@/helpers/combos'
import routesName from '@/helpers/routesName'

// Nombre de la ruta que usa el mantenimiento Artículo Grupo Unidad
export const routeNameTArticleUnitGroup = routesName.articulosGrupoUnidad

// Constante para almacenar el id base de los modales del mantenimiento Artículo Grupo Unidad
export const MODAL_ID = 'modal-t-article-unit-group'

// Variable reactiva para almacenar la configuración de cada columna del mantenimiento Artículo Grupo Unidad
export const columnsTArticleUnitGroup = ref([
  columnAction,
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

// Variable reactiva para almacenar las propiedades necesarias para el listado del mantenimiento Artículo Grupo Unidad
export const dataTableTArticleUnitGroup = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor del mantenimiento Artículo Grupo Unidad
export const serverQueryTArticleUnitGroup = ref({
  ...serverQueryDefault,
  tabla: 'articulogrupounidad',
})

// Función para limpiar filtros en la consulta del mantenimiento Artículo Grupo Unidad
export const clearFiltersTArticleUnitGroup = () => {
  clearServerQueryDefaultFilter(serverQueryTArticleUnitGroup)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en el mantenimiento Artículo Grupo Unidad
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

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en el mantenimiento Artículo Grupo Unidad
export const stateTArticleUnitGroup = ref({ ...initialStateTArticleUnitGroup })

// Función para regresar al estado inicial la variable reactiva que gestiona Artículo Grupo Unidad
export const clearStateTArticleUnitGroup = () => {
  stateTArticleUnitGroup.value = { ...initialStateTArticleUnitGroup }
}

// Función para regresar al estado inicial la variable reactiva, permaneciendo el articulo actual
export const clearSaveStateTArticleUnitGroup = () => {
  stateTArticleUnitGroup.value._id = 0
  stateTArticleUnitGroup.value.idGrupoUnidad = 0
  stateTArticleUnitGroup.value.nombreGrupoUnidad = ''
  stateTArticleUnitGroup.value.idDetalleGrupoUnidad = 0
  stateTArticleUnitGroup.value.nombreDetalleUnidad = ''
  stateTArticleUnitGroup.value.idPresentacion = 0
  stateTArticleUnitGroup.value.nombrePresentacion = ''
  stateTArticleUnitGroup.value.idEmpaque = 0
  stateTArticleUnitGroup.value.nombreEmpaque = ''
  stateTArticleUnitGroup.value.cantidad = 0
  stateTArticleUnitGroup.value.accion = 0
  stateTArticleUnitGroup.value.loading = false
}

// Variable reactiva para almacenar los combos que se manejaran en el mantenimiento Artículo Grupo Unidad
export const combosTArticleUnitGroup = ref({
  unitGroup: { ...initialStateCombo },
  unitMeasure: { ...initialStateCombo },
  packing: { ...initialStateCombo },
  presentation: { ...initialStateCombo },
})

// Constante para almacenar las columas permitidas para el filtro del mantenimiento Artículo Grupo Unidad
export const columnsFilterTArticleUnitGroup = [
  {
    title: 'NOMBRE',
    field: 'a.nombre',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Artículo Grupo Unidad
export const urlApiTArticleUnitGroup = '/articulosgrupounidad'

// Constante para almacenar el título de las notificaciónes del mantenimiento Artículo Grupo Unidad
export const titleNotificationTArticleUnitGroup = 'Artículo Grupo Unidad'

// Constante para almacenar el titulo de los reportes del mantenimiento Artículo Grupo Unidad
export const titleReportTArticleUnitGroup = 'REPORTE DE ARTÍCULO GRUPO UNIDAD'
