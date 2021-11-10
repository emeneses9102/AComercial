/* eslint no-param-reassign: "error" */

import useFetchApiSimsac from '@/hooks/useFetchApiSimsac'
import { messageToast } from './messageExtensions'

// EndPoints para consumir datos de listas despegables (combos)
export const endPointsCombo = {
  area: '/combo/area',
  almacen: '/combo/almacen',
  articuloGrupoUnidad: '/comboadv/articulogrupounidad',
  articuloUnidad: '/comboadv/tablaarticulounidad',
  caracteristica: '/combo/caracteristica',
  claseSunat: '/comboadv/sntclase',
  colaborador: '/combo/colaborador',
  comprobante: '/combo/comprobante',
  comprobanteSunat: '/combo/sntcomprobante',
  comprobantePuntoVenta: '/comboadv/comprobanteptovta',
  comprobanteSesionCaja: '/comboadv/comprobantesesion',
  correlativoPuntoVenta: '/comboadv/correlativoptovta',
  correlativoSesionCaja: '/comboadv/correlativosesion',
  departamento: '/comboubigeo/departamento',
  detalleCaracteristica: '/comboadv/dcaracteristica',
  distrito: '/comboubigeo/distrito',
  empaque: '/combo/empaque',
  familiaSunat: '/comboadv/sntfamilia',
  formaPago: '/combo/formapago',
  formato: '/combo/formato',
  grupo: '/combo/grupo',
  grupoUnidad: '/combo/grupounidad',
  medioPago: '/combo/mediopago',
  medioPagoSunat: '/combo/sntmediopago',
  menu: '/combo/menu',
  menuPorIdModulo: '/combo/programas',
  modulo: '/combo/modulos',
  moneda: '/combo/moneda',
  motivoCompra: '/combo/motivocompra',
  negocio: '/combo/negocio',
  opcion: '/combo/opciones',
  opcionesDisponiblesPorIdRolIdMenu: '/combo/copciones',
  operacionSunat: '/combo/sntoperacion',
  permisosPorIdRol: '/accesos/menuroles',
  predios: '/combo/predios',
  presentacion: '/combo/presentacion',
  provincia: '/comboubigeo/provincia',
  rol: '/combo/roles',
  segmentoSunat: '/combo/sntsegmento',
  tipoAlmacen: '/combo/tipoalmacen',
  tipoComprobanteSunat: '/combo/snttipocomprobante',
  tipoDocumento: '/combo/documento',
  tipoProducto: '/combo/tipoproducto',
  tipoServicio: '/combo/tiposervicio',
  tributoSunat: '/combo/snttributo',
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
