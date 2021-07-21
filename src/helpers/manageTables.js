/* eslint no-param-reassign: "error" */

import useFetchApiSimsac from '@/hooks/useFetchApiSimsac'
import { messageToast } from './messageExtensions'
import { ACTION_STATUS, ACTION_DELETE, ACTION_REGISTER } from './actionsApi'

// Función para obtener Datos dese la API
export const getData = async (urlApi, serverQuery, titleNotification) => {
  const response = {
    status: false,
    rows: [],
    totalRows: 0,
  }
  const { data, error } = await useFetchApiSimsac(urlApi, serverQuery)
  if (error) {
    messageToast('danger', titleNotification, error)
    response.status = false
  } else if (data) {
    response.status = true
    response.rows = data
    response.totalRows = data[0]?.numberRow || 0
  }
  return response
}

// Función para obtener un recurso de la api por Id
export const getDataById = async (urlApi, _id, titleNotification) => {
  const response = {
    status: false,
    data: null,
  }
  const { data, error } = await useFetchApiSimsac(`${urlApi}/${_id}`)
  if (error) {
    messageToast('danger', titleNotification, error)
    response.status = false
    response.data = null
    return response
  }
  if (data) {
    delete data.idUsuario
    delete data.activo
    delete data.accion
    response.status = true
    response.data = data
    return response
  }
  response.status = false
  response.data = null
  return response
}

// Función para enviar datos a la API
export const sendData = async (urlApi, body, titleNotification) => {
  const response = {
    status: false,
    data: null,
  }
  let newBody
  if (body.accion === ACTION_DELETE || body.accion === ACTION_STATUS) {
    newBody = {
      _id: body._id,
      accion: body.accion,
    }
  } else {
    newBody = { ...body }
  }
  delete newBody.loading

  const { data, error } = await useFetchApiSimsac(urlApi, null, newBody)
  if (error) {
    messageToast('danger', titleNotification, error)
    response.status = false
    response.data = error
  } else if (data) {
    data.forEach(({ id, mensaje }) => {
      if (id === 0) {
        messageToast('warning', titleNotification, mensaje)
        response.status = false
        response.data = data
      } else {
        messageToast('success', titleNotification, mensaje)
        response.status = true
        response.data = { id, mensaje }
      }
    })
  }

  return response
}

// Funciones reutilizables

// Función para cargar las tablas
export const loadTable = async (serverQuery, dataTable, urlApi, titleNotification, page, perPage) => {
  if (page) serverQuery.value.pinicio = page
  if (perPage) serverQuery.value.pfin = perPage
  dataTable.value.loading = true
  const { status, rows, totalRows } = await getData(urlApi, serverQuery.value, titleNotification)
  if (status) {
    dataTable.value.rows = rows
    dataTable.value.totalRows = totalRows
  }
  dataTable.value.loading = false
  return status
}

// Función para enviar formularios
export const sendForm = async (state, urlApi, titleNotification, action, _id) => {
  let response
  state.value.accion = action
  if (action === ACTION_STATUS || action === ACTION_DELETE) {
    response = await sendData(urlApi, { ...state.value, _id }, titleNotification)
  } else {
    if (_id) state.value._id = _id
    response = await sendData(urlApi, state.value, titleNotification)
  }
  if (response.status && action === ACTION_REGISTER) state.value._id = response.data.id
  return response
}

export default {
  getData,
  getDataById,
  sendData,
}
