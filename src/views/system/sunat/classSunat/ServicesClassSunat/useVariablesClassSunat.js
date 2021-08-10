// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

// Constante para almacenar el id base de los modales del mantenimiento Clases Sunat
export const MODAL_ID = 'modal-class-sunat'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Clases Sunat
export const columnsClassSunat = ref([
  columnAction,
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'codFamilia',
    label: 'COD. FAMILIA',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'codClase',
    label: 'COD. CLASE',
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

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Clases Sunat
export const dataTableClassSunat = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Clases Sunat
export const serverQueryClassSunat = ref({
  ...serverQueryDefault,
  tabla: 'sntclase',
})

// Función para limpiar filtros en la consulta de la tabla Clases Sunat
export const clearFiltersClassSunat = () => {
  clearServerQueryDefaultFilter(serverQueryClassSunat)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Clases Sunat
const initialStateClassSunat = {
  _id: 0,
  codFamilia: 0,
  codClase: 0,
  nombre: '',
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Clases Sunat
export const stateClassSunat = ref({ ...initialStateClassSunat })

// Función para regresar al estado inicial la variable reactiva que gestiona Clases Sunat
export const clearStateClassSunat = () => {
  stateClassSunat.value = { ...initialStateClassSunat }
}

// Constante para almacenar las columas permitidas para el filtro de la table Clases Sunat
export const columnsFilterClassSunat = [
  {
    title: 'Nombre',
    field: 'a.nombre',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Clases Sunat
export const urlApiClassSunat = '/codigosunat/clase'

// Constante para almacenar el título de las notificaciónes del mantenimiento Clases Sunat
export const titleNotificationClassSunat = 'Clases Sunat'

// Constante para almacenar el titulo de los reportes del mantenimiento Clases Sunat
export const titleReportClassSunat = 'REPORTE DE CLASES SUNAT'
