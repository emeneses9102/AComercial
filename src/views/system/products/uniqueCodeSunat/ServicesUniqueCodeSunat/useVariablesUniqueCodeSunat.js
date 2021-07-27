// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import { initialStateCombo } from '@/helpers/combos'

// Constante para almacenar el id base de los modales del mantenimiento Códigos Únicos Sunat
export const MODAL_ID = 'modal-unique-code-sunat'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Códigos Únicos Sunat
export const columnsUniqueCodeSunat = ref([
  columnAction,
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'codSegmento',
    label: 'COD SEGMENTO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreSegmento',
    label: 'SEGMENTO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'codFamilia',
    label: 'COD FAMILIA',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreFamilia',
    label: 'FAMILIA',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'codClase',
    label: 'COD CLASE',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreClase',
    label: 'CLASE',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'codProducto',
    label: 'COD PRODUCTO',
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
  columnStatus,
])

const initialDataTableUniqueCodeSunat = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Código Unico
export const dataTableUniqueCodeSunat = ref({ ...initialDataTableUniqueCodeSunat })

export const clearDataTableUniqueCodeSunat = () => {
  dataTableUniqueCodeSunat.value = { ...initialDataTableUniqueCodeSunat }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Códigos Únicos Sunat
export const serverQueryUniqueCodeSunat = ref({
  ...serverQueryDefault,
  tabla: 'codigounico',
})

// Función para limpiar filtros en la consulta de la tabla Códigos Únicos Sunat
export const clearFiltersUniqueCodeSunat = () => {
  clearServerQueryDefaultFilter(serverQueryUniqueCodeSunat)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Códigos Únicos Sunat
const initialStateUniqueCodeSunat = {
  _id: 0,
  codSegmento: 0,
  nombreSegmento: '',
  codFamilia: 0,
  nombreFamilia: '',
  codClase: 0,
  nombreClase: '',
  codProducto: 0,
  nombreProducto: '',
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Códigos Únicos Sunat
export const stateUniqueCodeSunat = ref({ ...initialStateUniqueCodeSunat })

// Función para regresar al estado inicial la variable reactiva que gestiona Códigos Únicos Sunat
export const clearStateUniqueCodeSunat = () => {
  stateUniqueCodeSunat.value = { ...initialStateUniqueCodeSunat }
}

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

// Constante para almacenar las columas permitidas para el filtro de la table Códigos Únicos Sunat
export const columnsFilterUniqueCodeSunat = [
  {
    title: 'Nombre',
    field: 'a.nombre',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Códigos Únicos Sunat
export const urlApiUniqueCodeSunat = '/codigosunat'

// Constante para almacenar el título de las notificaciónes del mantenimiento Códigos Únicos Sunat
export const titleNotificationUniqueCodeSunat = 'Códigos Únicos Sunat'

// Constante para almacenar el titulo de los reportes del mantenimiento Códigos Únicos Sunat
export const titleReportUniqueCodeSunat = 'REPORTE DE CÓDIGOS ÚNICOS SUNAT'
