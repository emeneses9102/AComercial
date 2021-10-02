// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import { initialStateCombo, resetCombos } from '@/helpers/combos'
import routesName from '@/helpers/routesName'

// Nombre de la ruta que usa el mantenimiento Socio
export const routeNamePartner = routesName.clientes

// Constante para almacenar el id base de los modales del mantenimiento Socio
export const MODAL_ID = 'modal-partner'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Socio
export const columnsPartner = ref([
  columnAction,
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

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Socio
export const dataTablePartner = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Socio
export const serverQueryPartner = ref({
  ...serverQueryDefault,
  tabla: 'socios',
})

// Función para limpiar filtros en la consulta de la tabla Socio
export const clearFiltersPartner = () => {
  clearServerQueryDefaultFilter(serverQueryPartner)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Socio
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

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Socio
export const statePartner = ref({ ...initialStatePartner })

// Función para regresar al estado inicial la variable reactiva que gestiona Socio
export const clearStatePartner = () => {
  statePartner.value = { ...initialStatePartner }
}

// Variable reactiva para almacenar el listado de los combos del mantenimiento Socio
export const combosPartner = ref({
  document: { ...initialStateCombo },
})

// Variable inicializadora para almacenar el ubigeo seleccionado en el mantenimiento Socio
const initialStatePartnerUbigeo = {
  departament: 0,
  province: 0,
  district: 0,
}

// Variable reactiva para almacenar el ubigeo seleccionado en el mantenimiento Socio
export const statePartnerUbigeo = ref({ ...initialStatePartnerUbigeo })

// Función para limpiar el ubigeo seleccionado
export const clearStatePartnerUbigeo = () => {
  statePartnerUbigeo.value = { ...initialStatePartnerUbigeo }
}

// Variable reactiva para almacenar los combos que se manejaran en el mantenimiento Socio
export const combosPartnerUbigeo = ref({
  departament: { ...initialStateCombo },
  province: { ...initialStateCombo },
  district: { ...initialStateCombo },
})

export const clearCombosPartnerUbigeo = () => {
  resetCombos(combosPartnerUbigeo, ['province', 'district'])
}

// Constante para almacenar las columas permitidas para el filtro de la table Socio
export const columnsFilterPartner = [
  {
    title: 'Nombre',
    field: 'a.nombres',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Socio
export const urlApiPartner = '/socio'

// Constante para almacenar el título de las notificaciónes del mantenimiento Socio
export const titleNotificationPartner = 'Socio'

// Constante para almacenar el titulo de los reportes del mantenimiento Socio
export const titleReportPartner = 'REPORTE DE SOCIOS'
