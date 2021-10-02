// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { initialStateCombo, resetCombos } from '@/helpers/combos'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import routesName from '@/helpers/routesName'

// Nombre de la ruta que usa el mantenimiento Predio
export const routeNamePredio = routesName.predios

// Constante para almacenar el id base de los modales del mantenimiento Predio
export const MODAL_ID = 'modal-predio'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Predio
export const columnsPredio = ref([
  columnAction,
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'codigoSunat',
    label: 'COD. SUNAT',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreUbigeo',
    label: 'NOMBRE UBIGEO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'observacion',
    label: 'OBSERVACIÓN',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'direccion',
    label: 'DIRECCIÓN',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Predio
export const dataTablePredio = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Predio
export const serverQueryPredio = ref({
  ...serverQueryDefault,
  tabla: 'predios',
})

// Función para limpiar filtros en la consulta de la tabla Predio
export const clearFiltersPredio = () => {
  clearServerQueryDefaultFilter(serverQueryPredio)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Predio
const initialStatePredio = {
  _id: 0,
  nombreDepartamento: '',
  nombreProvincia: '',
  nombreDistrito: '',
  idUbigeo: 0,
  direccion: '',
  observacion: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Predio
export const statePredio = ref({ ...initialStatePredio })

// Función para regresar al estado inicial la variable reactiva que gestiona Predio
export const clearStatePredio = () => {
  statePredio.value = { ...initialStatePredio }
}

// Variable inicializadora para almacenar el ubigeo seleccionado en el mantenimiento Predio
const initialStatePredioUbigeo = {
  departament: 0,
  province: 0,
  district: 0,
}

// Variable reactiva para almacenar el ubigeo seleccionado en el mantenimiento Predio
export const statePredioUbigeo = ref({ ...initialStatePredioUbigeo })

// Función para limpiar el ubigeo seleccionado
export const clearStatePredioUbigeo = () => {
  statePredioUbigeo.value = { ...initialStatePredioUbigeo }
}

// Variable reactiva para almacenar los combos que se manejaran en el mantenimiento Predio
export const combosPredio = ref({
  departament: { ...initialStateCombo },
  province: { ...initialStateCombo },
  district: { ...initialStateCombo },
})

export const clearCombosPredioUbigeo = () => {
  resetCombos(combosPredio, ['province', 'district'])
}

// Constante para almacenar las columas permitidas para el filtro de la table Predio
export const columnsFilterPredio = [
  {
    title: 'Observación',
    field: 'a.observacion',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Predio
export const urlApiPredio = '/predio'

// Constante para almacenar el título de las notificaciónes del mantenimiento Predio
export const titleNotificationPredio = 'Predio'

// Constante para almacenar el titulo de los reportes del mantenimiento Predio
export const titleReportPredio = 'REPORTE DE PREDIOS'
