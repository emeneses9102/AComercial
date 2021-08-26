import { ref } from '@vue/composition-api'
import { columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

export const MODAL_ID = 'modal-query-partner'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Socio
export const columnsPartner = ref([
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'apellidoPaterno',
    label: 'APE. PATERNO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'apellidoMaterno',
    label: 'APE. MATERNO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombres',
    label: 'NOMBRES',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'razonSocial',
    label: 'RAZÓN SOCIAL',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'numeroRuc',
    label: 'N° RUC',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'numeroDocumento',
    label: 'N° DOC',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  columnStatus,
])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Socio
const initialDataTablePartner = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Socio
export const dataTablePartner = ref({ ...initialDataTablePartner })

// Función para regresar al estado inicial la variable que almacena el listado de la tabla Socio
export const clearDataTablePartner = () => {
  dataTablePartner.value = { ...initialDataTablePartner }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Socio
export const serverQueryPartner = ref({
  ...serverQueryDefault,
  tabla: 'socios',
})

// Función para limpiar filtros en la consulta de la tabla Socio
export const clearFiltersPartner = () => {
  clearServerQueryDefaultFilter(serverQueryPartner)
}

// Variable inicializadora para almacenar el estado de un Socio
const initialStatePartner = {
  _id: 0,
  apellidoPaterno: '',
  apellidoMaterno: '',
  nombres: '',
  razonSocial: '',
  numeroRuc: '',
  idDocumento: 0,
  nombreDocumento: '',
  numeroDocumento: '',
  idUbigeo: 0,
  nombreUbigeo: '',
  direccion: '',
  telefono: '',
  correo: '',
  cliente: 0,
  proveedor: 0,
  transportista: 0,
  nombreContacto: '',
  telefonoContacto: '',
  observaciones: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un Socio
export const statePartner = ref({ ...initialStatePartner })

// Función para regresar al estado inicial la variable reactiva de Socios
export const clearStatePartner = () => {
  statePartner.value = { ...initialStatePartner }
}

// Constante para almacenar las columas permitidas para el filtro de la table Socio
export const columnsFilterPartner = [
  {
    title: 'N° Documento',
    field: 'a.numeroDocumento',
  },
  {
    title: 'Nombre',
    field: 'a.nombres',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Socio
export const urlApiPartner = '/socio'

// Constante para almacenar el título de las notificaciónes del Buscador Socio
export const titleNotificationPartner = 'Socio'
