import { ref } from '@vue/composition-api'
import { columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import { initialStateCombo } from '@/helpers/combos'

export const MODAL_ID = 'modal-search-unique-code'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Código Unico
export const columnsUniqueCode = ref([
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreProducto',
    label: 'PRODUCTO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  // {
  //   field: 'nombreSegmento',
  //   label: 'SEGMENTO',
  //   thClass: 'align-middle',
  //   tdClass: 'align-middle',
  //   pdf: true,
  // },
  // {
  //   field: 'nombreFamilia',
  //   label: 'FAMILIA',
  //   thClass: 'align-middle',
  //   tdClass: 'align-middle',
  //   pdf: true,
  // },
  // {
  //   field: 'nombreClase',
  //   label: 'CLASE',
  //   thClass: 'align-middle',
  //   tdClass: 'align-middle',
  //   pdf: true,
  // },
  columnStatus,
])

const initialDataTableUniqueCode = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Código Unico
export const dataTableUniqueCode = ref({ ...initialDataTableUniqueCode })

export const clearDataTableUniqueCode = () => {
  dataTableUniqueCode.value = { ...initialDataTableUniqueCode }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Código Unico
export const serverQueryUniqueCode = ref({
  ...serverQueryDefault,
  tabla: 'codigounico',
})

// Función para limpiar filtros en la consulta de la tabla Código Unico
export const clearFiltersUniqueCode = () => {
  clearServerQueryDefaultFilter(serverQueryUniqueCode)
}

// Variable inicializadora para almacenar el estado de un Articulo
// const initialStateUniqueCode = {
//   _id: 0,
//   sku: '',
//   nombre: '',
//   descripcion: '',
//   abreviatura: '',
//   idCodUnico: 0,
//   nombreCodigoUnico: '',
//   flgStock: 1,
//   flgServicio: 0,
//   flgReceta: 0,
//   flgSerie: 0,
//   idTipoProducto: 0,
//   nombreTipoProducto: '',
//   idTipoServicio: 0,
//   nombreTipoServicio: '',
//   idGrupoUnidad: 15,
//   nombreGrupoUnidad: '',
//   idUnidad: 11,
//   nombreUnidad: '',
//   precioCompra: 0,
//   precioVenta: 0,
//   precioMinimoVenta: 0,
//   stockMinimo: 0,
//   stockMaximo: 0,
//   imagen: '',
//   accion: 0,
//   loading: false,
// }

// Variable reactiva para almacenar el estado de un Articulo
// export const stateUniqueCode = ref({ ...initialStateUniqueCode })

// Función para regresar al estado inicial la variable reactiva de Código Unicos
// export const clearStateUniqueCode = () => {
//   stateUniqueCode.value = { ...initialStateUniqueCode }
// }

const initialStateCodesSunat = {
  segmentSunat: 0,
  familySunat: 0,
  classSunat: 0,
}

export const stateCodesSunat = ref({ ...initialStateCodesSunat })

export const clearStateCodesSunat = () => {
  stateCodesSunat.value = { ...initialStateCodesSunat }
}

export const combosCodesSunat = ref({
  segmentSunat: { ...initialStateCombo },
  familySunat: { ...initialStateCombo },
  classSunat: { ...initialStateCombo },
})

// Constante para almacenar las columas permitidas para el filtro de la table Código Unicos
export const columnsFilterUniqueCode = [
  {
    title: 'PRODUCTO',
    field: 'a.nombreProducto',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Código Unicos
export const urlApiUniqueCode = '/codigosunat'

// Constante para almacenar el título de las notificaciónes del Buscador Código Unicos
export const titleNotificationUniqueCode = 'Código Unico'
