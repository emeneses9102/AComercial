/* eslint-disable import/prefer-default-export */
import {
  EDITAR,
  GUARDAR,
} from '@/options'
import { messageToast } from './messageExtensions'

/*
FUNCIÓN PARA VALIDAR PERMISOS AL MOMENTO DE REGISTRAR Y EDITAR

PARAMETRO 1: ARREGLO DE OPCIONES
PARAMETRO 2: OPCION QUE DESEA REALIZAR
PARAMETRO 3: TITULO DEL MANTENIMIENTO
 */
export const validatePermission = (options, option, title) => {
  if (option === GUARDAR && !options.includes(GUARDAR)) {
    messageToast('danger', title, 'No tienes permisos para registrar')
    return false
  }
  if (option === EDITAR && !options.includes(EDITAR)) {
    messageToast('danger', title, 'No tienes permisos para editar')
    return false
  }
  return true
}
