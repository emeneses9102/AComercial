// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { initialStateCombo, resetCombos } from '@/helpers/combos'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

// Variables inicializadora para almacenar la configuración de cada columna de la tabla Cliente
export const initialColumnsClient = [
  {
    label: 'Id',
    field: '_id',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'APELLIDO PATERNO',
    field: 'apellidoPaterno',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'APELLIDO MATERNO',
    field: 'apellidoMaterno',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'NOMBRES',
    field: 'nombres',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'DNI',
    field: 'numeroDocumento',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'RUC',
    field: 'numeroRuc',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  columnStatus,
]

// Variable reactiva para almacenar la configuración de cada columna de la tabla Cliente con Acciones
export const columnsClient = ref([
  columnAction,
  ...initialColumnsClient,
])

// Variable reactiva para almacenar la configuracion de cada columna de la tabla Cliente cuando solo se desea mostrar
export const columnsClientForShow = ref([...initialColumnsClient])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Cliente
const initialDataTableClient = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Cliente
export const dataTableClient = ref({ ...initialDataTableClient })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Cliente
export const clearDataTableClient = () => {
  dataTableClient.value = { ...initialDataTableClient }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Cliente
export const serverQueryClient = ref({
  ...serverQueryDefault,
  tabla: 'socios',
  pfin: 5,
  campo: 'a.idsocios',
})

// Función para limpiar filtros en la consulta de la tabla Cliente
export const clearFiltersClient = () => {
  clearServerQueryDefaultFilter(serverQueryClient)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Cliente
const initialStateClient = {
  _id: 0,
  idDocumento: 0,
  apellidoPaterno: '',
  apellidoMaterno: '',
  nombres: '',
  numeroRuc: '',
  numeroDocumento: '',
  idUbigeo: 0,
  nombreUbigeo: '',
  direccion: '',
  telefono: '',
  correo: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Socios
export const stateClient = ref({ ...initialStateClient })

// Función para regresar al estado inicial la variable reactiva que gestiona el mantenimiento de  Socios
export const clearStateClient = () => {
  stateClient.value = { ...initialStateClient }
}
export const combosClient = ref({
  document: { ...initialStateCombo },
})

// Variable inicializadora para almacenar el ubigeo seleccionado en el mantenimiento Socio
const initialStateClientUbigeo = {
  departament: 0,
  province: 0,
  district: 0,
}

// Variable reactiva para almacenar el ubigeo seleccionado en el mantenimiento Socio
export const stateClientUbigeo = ref({ ...initialStateClientUbigeo })

// Función para limpiar el ubigeo seleccionado
export const clearStateClientUbigeo = () => {
  stateClientUbigeo.value = { ...initialStateClientUbigeo }
}

// Variable reactiva para almacenar los combos que se manejaran en el mantenimiento Socio
export const combosClientUbigeo = ref({
  departament: { ...initialStateCombo },
  province: { ...initialStateCombo },
  district: { ...initialStateCombo },
})
export const clearCombosClientUbigeo = () => {
  resetCombos(combosClientUbigeo, ['province', 'district'])
}

// Constante para almacenar las columnas permitidas para el filtro del mantenimiento Socios
export const columnsFilterClient = [
  {
    title: 'Id',
    field: '_id',
  },
  {
    title: 'NOMBRE',
    field: 'a.nombres',
  },
  {
    title: 'DNI',
    field: 'a.numeroDocumento',
  },
  {
    title: 'RUC',
    field: 'a.numeroRuc',
  },
]

// Constante para almacenar la url base de la petición del mantenimiento Socios
export const urlApiClient = '/socio'

// Constante para almacenar el titulo de las notificaciónes de Socios
export const titleNotificationClient = 'Socios'
