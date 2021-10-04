import routesName from '@/helpers/routesName'

// Acciones de un mantenimiento comun
export const CAMBIAR_ESTADO = 'CAMBIAR_ESTADO'
export const EDITAR = 'EDITAR'
export const ELIMINAR = 'ELIMINAR'
export const FILTRAR = 'FILTER'
export const GUARDAR = 'GUARDAR'
export const EXP_EXCEL = 'EXPORTAR_EXCEL'
export const EXP_PDF = 'EXPORTAR_PDF'
export const VER_REGISTRO = 'VER_REGISTRO'

// CAMBIAR_CLAVE (USUARIO)
export const CAMBIAR_CLAVE = 'CAMBIAR_CLAVE'

// SESION CAJA
export const REPORTE_CAJA = 'REPORTE_CAJA'
export const APERTURAR_CAJA = 'APERTURAR_CAJA'
export const CERRAR_CAJA = 'CERRAR_CAJA'

const OPCIONES = [CAMBIAR_ESTADO, EDITAR, ELIMINAR, FILTRAR, GUARDAR, EXP_EXCEL, EXP_PDF, VER_REGISTRO]
// const OPCIONES_PRUEBA = [
//   CAMBIAR_ESTADO,
//   EDITAR,
//   ELIMINAR,
//   FILTRAR,
//   GUARDAR,
//   EXP_EXCEL,
//   EXP_PDF,
//   VER_REGISTRO,
// ]

export default {
  [routesName.inicio]: [],
  // SEGURIDAD
  [routesName.roles]: [...OPCIONES],
  [routesName.modulos]: [...OPCIONES],
  [routesName.programas]: [...OPCIONES],
  [routesName.eventosDelPrograma]: [...OPCIONES],
  [routesName.accesos]: [...OPCIONES],
  [routesName.usuarios]: [...OPCIONES, CAMBIAR_CLAVE],
  [routesName.mensajeSistema]: [...OPCIONES],
  [routesName.errorSistema]: [...OPCIONES],
  // CATALOGO
  [routesName.tipoProducto]: [...OPCIONES],
  [routesName.tipoServicio]: [...OPCIONES],
  [routesName.caracteristicas]: [...OPCIONES],
  [routesName.unidadNegocio]: [...OPCIONES],
  [routesName.grupoUnidad]: [...OPCIONES],
  [routesName.tipoDocumento]: [...OPCIONES],
  [routesName.comprobantes]: [...OPCIONES],
  [routesName.moneda]: [...OPCIONES],
  [routesName.medioPago]: [...OPCIONES],
  [routesName.formaPago]: [...OPCIONES],
  [routesName.tributos]: [...OPCIONES],
  // ADMINISTRACION
  [routesName.colaboradores]: [...OPCIONES],
  [routesName.clientes]: [...OPCIONES],
  [routesName.predios]: [...OPCIONES],
  [routesName.articulos]: [...OPCIONES],
  // ALMACÉN
  [routesName.tipoAlmacen]: [...OPCIONES],
  [routesName.almacen]: [...OPCIONES],
  // CAJA
  [routesName.sesionCaja]: [...OPCIONES, APERTURAR_CAJA, CERRAR_CAJA, REPORTE_CAJA],
  [routesName.puntoVenta]: [...OPCIONES],
  [routesName.tipoCambio]: [...OPCIONES],
  // SUNAT
  [routesName.segmentos]: [...OPCIONES],
  [routesName.familias]: [...OPCIONES],
  [routesName.clases]: [...OPCIONES],
  [routesName.codigoUnico]: [...OPCIONES],
}
