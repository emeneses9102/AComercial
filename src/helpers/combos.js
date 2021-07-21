/* eslint no-param-reassign: "error" */

import useFetchApiSimsac from '@/hooks/useFetchApiSimsac'
import { messageToast } from './messageExtensions'

// EndPoints para consumir datos de listas despegables (combos)
export const endPointsCombo = {
  almacen: '/combo/almacen',
  colaborador: '/combo/colaborador',
  departamento: '/comboubigeo/departamento',
  distrito: '/comboubigeo/distrito',
  modulo: '/combo/modulos',
  negocio: '/combo/negocio',
  opcion: '/combo/opciones',
  predios: '/combo/predios',
  provincia: '/comboubigeo/provincia',
  rol: '/combo/roles',
  tipoAlmacen: '/combo/tipoalmacen',
  tipoDocumento: '/combo/documento',
  unidadmedida: '/combo/unidadmedida',
}

// Variable inicializadora de combos que se cargaran consumiendo la API
export const initialStateCombo = {
  disabled: true,
  loading: false,
  data: [],
}

// Función para cargar los combos
export const loadCombos = async (combos, nameCombosForLoad = [], url, title) => {
  let success = true
  nameCombosForLoad.forEach(combo => {
    combos.value[combo].loading = true
    combos.value[combo].disabled = true
  })
  const { data, error } = await useFetchApiSimsac(url)
  if (error) {
    messageToast('danger', title, 'Ocurrio un error al momento de cargar el combo (lista despegable)')
    success = false
  } else if (data) {
    nameCombosForLoad.forEach(combo => {
      combos.value[combo].data = data
    })
    success = true
  }
  nameCombosForLoad.forEach(combo => {
    combos.value[combo].loading = false
    combos.value[combo].disabled = false
  })
  return success
}

// Función para regresar al estado inicial el combo
export const resetCombos = (combos, nameCombos = []) => {
  nameCombos.forEach(name => {
    combos.value[name] = { ...initialStateCombo }
  })
}
