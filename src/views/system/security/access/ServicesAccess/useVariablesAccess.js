// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction } from '@/helpers/columnsTable'

// Constante para almacenar el id base de los modales del mantenimiento Accesos
export const MODAL_ID = 'modal-access'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Accesos
export const columnsAccess = ref([
  columnAction,
  {
    label: 'ID',
    field: '_id',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'ROL',
    field: 'nombreRol',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'MODULO',
    field: 'nombreModulo',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'MENU',
    field: 'nombreMenu',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'OPCION',
    field: 'nombreOpcion',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Accesos
export const dataTableAccess = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Accesos
export const serverQueryAccess = ref({
  pinicio: 1,
  pfin: 10,
  campofiltro: '',
  filtro: '',
})

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Accesos
const initialStateAccess = {
  _id: 0,
  idRol: 0,
  idModulo: 0,
  idMenu: 0,
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Accesos
export const stateAccess = ref({ ...initialStateAccess })

// Función para regresar al estado inicial la variable reactiva que gestiona Accesos
export const clearStateAccess = () => {
  stateAccess.value = { ...initialStateAccess }
}

// Constante para almacenar las columas permitidas para el filtro de la tabla Accesos
export const columnsFilterAccess = [
  {
    title: 'Rol',
    field: 'a.idRol',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Accesos
export const urlApiAccess = '/accesos/menuroles/1'

// Constante para almacenar el título de las notificaciónes del mantenimiento Accesos
export const titleNotificationAccess = 'Accesos'
