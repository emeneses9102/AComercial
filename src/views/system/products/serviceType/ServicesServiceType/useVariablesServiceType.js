// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction } from '@/helpers/columnsTable'

// Constante para almacenar el id base de los modales del mantenimiento Tipo Servicio
export const MODAL_ID = 'modal-service-type'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Tipo Servicio
export const columnsServiceType = ref([
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
  {
    field: 'activo',
    label: 'ESTADO',
    thClass: 'align-middle',
    tdClass: 'align-middle text-center',
    pdf: true,
  },
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Tipo Servicio
export const dataTableServiceType = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Tipo Servicio
export const serverQueryServiceType = ref({
  _id: 0,
  tabla: 'tiposervicio',
  pinicio: 1,
  pfin: 10,
  campofiltro: '',
  filtro: '',
})

// Función para limpiar filtros en la consulta de la tabla Tipo Servicio
export const clearFiltersServiceType = () => {
  serverQueryServiceType.value.campofiltro = ''
  serverQueryServiceType.value.filtro = ''
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Tipo Servicio
const initialStateServiceType = {
  _id: 0,
  nombre: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Tipo Servicio
export const stateServiceType = ref({ ...initialStateServiceType })

// Función para regresar al estado inicial la variable reactiva que gestiona Tipo Servicio
export const clearStateServiceType = () => {
  stateServiceType.value = { ...initialStateServiceType }
}

// Constante para almacenar las columas permitidas para el filtro de la table Tipo Servicio
export const columnsFilterServiceType = [
  {
    title: 'Nombre',
    field: 'a.nombre',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Tipo Servicio
export const urlApiServiceType = '/tiposervicio'

// Constante para almacenar el título de las notificaciónes del mantenimiento Tipo Servicio
export const titleNotificationServiceType = 'Tipo Servicio'

// Constante para almacenar el titulo de los reportes del mantenimiento Tipo Servicio
export const titleReportServiceType = 'REPORTE DE TIPO DE SERVICIOS'
