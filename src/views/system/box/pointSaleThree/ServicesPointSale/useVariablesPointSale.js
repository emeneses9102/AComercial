// Importar function ref para crear variables reactivas
import { ref, watch } from '@vue/composition-api'
import { initialStateCombo } from '@/helpers/combos'
import { formatDateBySeparator } from '@/helpers/date'
import { stateDataCurrency } from '../components/PointSaleTools/ComponentsTools/ModalOptionsCurrency/useVariablesCurrency'
import { stateDataPaymentMethod } from '../components/PointSaleTools/ComponentsTools/ModalOptionsPaymetMethod/useVariablesPaymentMethod'
import { combosVoucher } from '../components/PointSaleTools/ComponentsTools/ModalOptionsVoucher/useVariablesVoucher'
import { stateDataVendor } from '../components/PointSaleTools/ComponentsTools/ModalOptionsVendor/useVariablesVendor'

// Variable inicializadora para almacenar los datos de la operacion de punto de venta
const initialStatePointSale = {
  _id: 0,
  fecha: formatDateBySeparator(),
  idSesionCaja: 0,
  idVendedor: 0,
  nombreVendedor: '',
  idFormaPago: 0,
  nombreFormaPago: '',
  vencimiento: null,
  idComprobante: 0,
  nombreComprobante: '',
  idCorrelativo: 0,
  idSocio: 0,
  idMoneda: 0,
  nombreMoneda: '',
  idOrdenPedido: 0,
  idOrdenServicio: 0,
  descripcion: '',
  subTotal: 0,
  total: 0,
  totalPagado: 0,
  vuelto: 0,
  despachado: 0,
  idAnula: 0,
  anulado: 0,
  facturado: 0,
  idCancela: 0,
  cancelado: 0,
  idCerrado: 0,
  cerrado: 0,
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar los datos de la operacion de punto de venta
export const statePointSale = ref({ ...initialStatePointSale })

watch([statePointSale, stateDataCurrency], () => {
  if (statePointSale.value.idMoneda) {
    const currencySelected = stateDataCurrency.value.data.find(currency => currency._id === statePointSale.value.idMoneda)
    if (currencySelected) statePointSale.value.nombreMoneda = currencySelected.nombre
  } else {
    statePointSale.value.nombreMoneda = ''
  }

  if (statePointSale.value.idFormaPago) {
    const paymentMethodSelected = stateDataPaymentMethod.value.data.find(paymentMethod => paymentMethod._id === statePointSale.value.idFormaPago)
    if (paymentMethodSelected) statePointSale.value.nombreFormaPago = paymentMethodSelected.nombre
  } else {
    statePointSale.value.nombreFormaPago = ''
  }

  if (statePointSale.value.idComprobante) {
    const voucherSelected = combosVoucher.value.voucher.data.find(voucher => voucher._id === statePointSale.value.idComprobante)
    if (voucherSelected) statePointSale.value.nombreComprobante = voucherSelected.nombre
  } else {
    statePointSale.value.nombreComprobante = ''
  }

  if (statePointSale.value.idVendedor) {
    const vendorSelected = stateDataVendor.value.data.find(vendor => vendor._id === statePointSale.value.idVendedor)
    if (vendorSelected) statePointSale.value.nombreVendedor = vendorSelected.nombre
  } else {
    statePointSale.value.nombreVendedor = ''
  }
}, {
  deep: true,
})

// Función para regresar al estado inicial la variable reactiva que almacena la operacion de punto de venta
export const clearStatePointSale = () => {
  statePointSale.value = { ...initialStatePointSale }
}

// Variable reactiva para almacenar que clave del teclado esta seleccionada Cantidad "C" || Codigo Producto "P"
export const keySelectedOfBoard = ref('')

// Variable para almacenar los estados opcionales de keySelectedOfBoard
export const optionsOfKeysOnBoard = {
  cantidad: 'C',
  codigoProducto: 'P',
}

// Variable reactiva para almacenar el buscador de codigo de producto
export const searchProductById = ref('')

// Variable reactiva para almacenar el listado de los combos de la gestion del punto de venta
export const combosPointSale = ref({
  currency: { ...initialStateCombo },
  paymentMethod: { ...initialStateCombo },
  documentType: { ...initialStateCombo },
})

// Variable inicializadora para almacenar la columna de filtro de un artículo
const initialStateFieldFilterArticle = '_id'

// Variable reactiva para almacenar la columna de filtro de un artículo
export const stateFieldFilterArticle = ref(initialStateFieldFilterArticle)

// Función para regresar al estado inicial la columna de filtro de un articulo
export const clearStateFieldFilterArticle = () => {
  stateFieldFilterArticle.value = initialStateFieldFilterArticle
}

// Variable para almacenar las columnas permitidas para el filtro de un articulo
export const optionsFiledFilterArticle = [
  {
    label: 'CÓDIGO',
    field: '_id',
    placeholder: 'Ingresar o escanee el Código',
  },
  {
    label: 'SKU',
    field: 'sku',
    placeholder: 'Ingresar o escanee el SKU',
  },
  {
    label: 'CÓDIGO UNICO',
    field: 'codigoUnico',
    placeholder: 'Ingresar o escanee el Código Único',
  },
  {
    label: 'CÓDIGO INTERNO',
    field: 'codInterno',
    placeholder: 'Ingresar o escanee el Código Interno',
  },
  {
    label: 'CÓDIGO BARRA',
    field: 'codBarra',
    placeholder: 'Ingresar o escanee el Código de Barra',
  },
  {
    label: 'CÓDIGO FABRICANTE',
    field: 'codFabricante',
    placeholder: 'Ingresar o escanee el Código de Fabricante',
  },
]

export const urlApiPointSale = 'puntoventa'

export const titleNotificationPointSale = 'Punto de Venta'

export const tabIndexOptionsTools = ref(0)
