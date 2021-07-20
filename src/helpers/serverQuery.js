/* eslint no-param-reassign: "error" */

// Constante para almacenar las consultas del servidor por defecto
export const serverQueryDefault = {
  _id: 0, // Identificador principal
  tabla: '', // Nombre de la tabla
  pinicio: 1, // Página actual
  pfin: 10, // Cantidad de registros por página
  campofiltro: '', // Nombre del campo a buscar (a.nombre)
  filtro: '', //  Valor a buscar
  campo: '', // Nombre del campo numerico
  indice: '', // Valor del campo numerico
  opcional: '', // Consulta manual tipo sql (a.id <> 20)
  filtrofecha: '', // Nombre del campo fecha (a.fecha)
  finicio: '', // Fecha inicial
  ffin: '', // Fecha final
}

// Función para limpiar filtros en la consulta del servidor
export const clearServerQueryDefaultFilter = serverQuery => {
  serverQuery.value.campofiltro = ''
  serverQuery.value.filtro = ''
}
