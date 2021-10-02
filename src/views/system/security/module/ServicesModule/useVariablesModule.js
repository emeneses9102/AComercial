// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import { initialStateCombo } from '@/helpers/combos'
import routesName from '@/helpers/routesName'

// Nombre de la ruta que usa el mantenimiento Modulo
export const routeNameModule = routesName.modulos

// Constante para almacenar el id base de los modales del mantenimiento Módulo
export const MODAL_ID = 'modal-module'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Módulo
export const columnsModule = ref([
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
    field: 'nombrePadre',
    label: 'MÓDULO SUPERIOR',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'icono',
    label: 'ICONO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Módulo
export const dataTableModule = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Módulo
export const serverQueryModule = ref({
  ...serverQueryDefault,
  tabla: 'modulos',
})

// Función para limpiar filtros en la consulta de la tabla Módulo
export const clearFiltersModule = () => {
  clearServerQueryDefaultFilter(serverQueryModule)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Módulo
const initialStateModule = {
  _id: 0,
  nombre: '',
  idPadre: 0,
  nombrePadre: '',
  icono: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Módulo
export const stateModule = ref({ ...initialStateModule })

// Función para regresar al estado inicial la variable reactiva que gestiona Módulo
export const clearStateModule = () => {
  stateModule.value = { ...initialStateModule }
}

// Variable reactiva para almacenar los datos de los combos que se manejaran en el mantenimiento Módulo
export const combosModule = ref({
  module: { ...initialStateCombo },
})

// Constante para almacenar las columas permitidas para el filtro de la table Módulo
export const columnsFilterModule = [
  {
    title: 'Nombre',
    field: 'a.nombre',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Módulo
export const urlApiModule = '/modulos'

// Constante para almacenar el título de las notificaciónes del mantenimiento Módulo
export const titleNotificationModule = 'Módulo'

// Constante para almacenar el titulo de los reportes del mantenimiento Módulo
export const titleReportModule = 'REPORTE DE MÓDULOS'
