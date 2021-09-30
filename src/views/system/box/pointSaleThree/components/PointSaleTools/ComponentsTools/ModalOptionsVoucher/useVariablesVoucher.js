/* eslint-disable import/prefer-default-export */

// Importar funcion ref para crear variables reactivas
import {
  initialStateCombo,
} from '@/helpers/combos'
import {
  ref,
} from '@vue/composition-api'

// Variable reactiva para almacenar el listado de los combos de comprobante y correlativo
export const combosVoucher = ref({
  voucher: { ...initialStateCombo },
  correlative: { ...initialStateCombo },
})
