// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

// Constante para almacenar el id base de los modales del mantenimiento Familia Sunat
export const MODAL_ID = 'modal-family-sunat'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Familia Sunat
export const columnsFamilySunat = ref([
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
    label: 'COD. SEGMENTO',
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
    field: 'nombre',
    label: 'NOMBRE',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Familia Sunat
export const dataTableFamilySunat = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Familia Sunat
export const serverQueryFamilySunat = ref({
  ...serverQueryDefault,
  tabla: 'sntfamilia',
})

// Función para limpiar filtros en la consulta de la tabla Familia Sunat
export const clearFiltersFamilySunat = () => {
  clearServerQueryDefaultFilter(serverQueryFamilySunat)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Familia Sunat
const initialStateFamilySunat = {
  _id: 0,
  codSegmento: 0,
  codFamilia: 0,
  nombre: '',
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Familia Sunat
export const stateFamilySunat = ref({ ...initialStateFamilySunat })

// Función para regresar al estado inicial la variable reactiva que gestiona Familia Sunat
export const clearStateFamilySunat = () => {
  stateFamilySunat.value = { ...initialStateFamilySunat }
}

// Constante para almacenar las columas permitidas para el filtro de la table Familia Sunat
export const columnsFilterFamilySunat = [
  {
    title: 'Nombre',
    field: 'a.nombre',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Familia Sunat
export const urlApiFamilySunat = '/codigosunat/familia'

// Constante para almacenar el título de las notificaciónes del mantenimiento Familia Sunat
export const titleNotificationFamilySunat = 'Familia Sunat'

// Constante para almacenar el titulo de los reportes del mantenimiento Familia Sunat
export const titleReportFamilySunat = 'REPORTE DE FAMILIA SUNAT'
