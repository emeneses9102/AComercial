/* eslint-disable new-cap */
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import store from '@/store'
import axios from 'axios'
import { messageToast } from './messageExtensions'

export default (
  action = 'preview',
  orientation = 'p',
  exportMode = 'all',
  headerText = {
    title: 'LISTADO',
    subtitle: '',
  },
  dataTable = {
    columns: [],
    rows: [],
    serverQuery: {},
    optionsColumnsFilter: [],
  },
) => {
  // Desestructurar parametros
  const { title, subtitle } = headerText
  const {
    columns, rows, serverQuery, optionsColumnsFilter,
  } = dataTable

  // Crear la instancia de jsPDF y armar los datos que se mostrarán en la tabla
  const doc = new jsPDF(orientation, 'pt', 'a4')
  // const body = rows.map(row => ({ ...row, activo: row.activo ? 'ACTIVO' : 'DESACTIVO' }))

  const newBody = rows.map(row => {
    const newRow = { ...row, activo: row.activo ? 'ACTIVO' : 'DESACTIVO' }
    columns.forEach(column => {
      if (column.type === 'boolean') newRow[column.dataKey] = newRow[column.dataKey] ? 'SI' : 'NO'
      if (column.type === 'numberMoney') newRow[column.dataKey] = `${newRow[column.dataKey].toFixed(2)}`
    })
    return newRow
  })

  // Calcular la 1/4 parte del ancho del documento
  const partColumn = doc.internal.pageSize.getWidth() / 4 - 80
  const lineHeight = 12

  // ==================================================================================
  // ================================ PRIMERA LINEA ===================================
  // ==================================================================================

  const topFirstLine = 40

  let linesUsedInFirstRow = 1

  doc.setFont('times')
  doc.setFontSize(8)
  doc.setTextColor('#444')
  const nameCompany = 'SISTEMAS INTEGRADOS Y MERCADEO S.A.C.'
  const linesUsedInNameCompany = Math.ceil(doc.getTextWidth(nameCompany) / partColumn)
  if (linesUsedInNameCompany > linesUsedInFirstRow) linesUsedInFirstRow = linesUsedInNameCompany

  doc.setFont('times')
  doc.setFontSize(9)
  doc.setTextColor('#222')
  const titleDocument = title
  const linesUsedInTitleDocument = Math.ceil(doc.getTextWidth(titleDocument) / (partColumn * 2))
  if (linesUsedInTitleDocument > linesUsedInFirstRow) linesUsedInFirstRow = linesUsedInTitleDocument

  doc.setFont('times')
  doc.setFontSize(8)
  doc.setTextColor('#444')
  const date = `${(new Date()).toLocaleDateString()} ${(new Date()).toLocaleTimeString()}`
  const linesUsedInDate = Math.ceil(doc.getTextWidth(date) / partColumn)
  if (linesUsedInDate > linesUsedInFirstRow) linesUsedInFirstRow = linesUsedInDate

  // ==================================================================================
  // ================================ SEGUNDA LINEA ===================================
  // ==================================================================================

  let topSecondLine = topFirstLine

  if (linesUsedInFirstRow === 1) topSecondLine += 18
  else topSecondLine += (lineHeight * linesUsedInFirstRow)

  let linesUsedInSecondRow = 1

  doc.setFont('times')
  doc.setFontSize(8)
  doc.setTextColor('#444')
  const userName = `USUARIO: ${store.state.authentication.user.usuario.toString().toUpperCase()}`
  const linesUsedInUserName = Math.ceil(doc.getTextWidth(userName) / partColumn)
  if (linesUsedInUserName > linesUsedInSecondRow) linesUsedInSecondRow = linesUsedInUserName

  if (subtitle) {
    doc.setFont('times')
    doc.setFontSize(9)
    doc.setTextColor('#333')
    const linesUsedInSubTitle = Math.ceil(doc.getTextWidth(subtitle) / (partColumn * 2))
    if (linesUsedInSubTitle > linesUsedInSecondRow) linesUsedInSecondRow = linesUsedInSubTitle
  }

  // ==================================================================================
  // ================================ TERCERA LINEA ===================================
  // ==================================================================================

  let topThirdLine = topSecondLine

  if (linesUsedInSecondRow === 1) topThirdLine += 18
  else topThirdLine += lineHeight * linesUsedInSecondRow

  let linesUsedInThirdRow = 1

  let topFourLine = topThirdLine

  let descriptionFilters = ''
  if (exportMode === 'filter') {
    const columnSelected = optionsColumnsFilter.find(column => column.field === serverQuery.campofiltro)
    descriptionFilters = `FILTRADO POR: ${columnSelected.title.toUpperCase()} = ${serverQuery.filtro}`
    doc.setFont('times')
    doc.setFontSize(8)
    doc.setTextColor('#444')
    const lineUsedInDescriptionFilters = Math.ceil(doc.getTextWidth(descriptionFilters) / (partColumn * 4))
    if (lineUsedInDescriptionFilters > linesUsedInThirdRow) linesUsedInThirdRow = lineUsedInDescriptionFilters
    if (linesUsedInThirdRow === 1) topFourLine += 18
    else topFourLine += (lineHeight * linesUsedInThirdRow)
  }

  autoTable(doc, {
    headStyles: {
      font: 'times',
      fontSize: 7,
      textColor: '#444',
      lineColor: '#888',
      lineWidth: 1,
      valign: 'middle',
    },
    bodyStyles: {
      font: 'times',
      fontSize: 7,
      fillColor: '#FFF',
      lineWidth: 0,
    },
    theme: 'plain',
    margin: {
      bottom: 60,
      top: topFourLine,
    },
    columns,
    body: newBody,
    cellWidth: 'wrap',
    pageBreak: 'auto',
    didDrawPage(data) {
      // ==================================================================================
      // ================================ PRIMERA LINEA ===================================
      // ==================================================================================

      // Izquierda
      doc.setFont('times')
      doc.setFontSize(8)
      doc.setTextColor('#444')
      doc.text(nameCompany, 40, topFirstLine, {
        maxWidth: partColumn,
      })

      // Centro
      doc.setFont('times')
      doc.setFontSize(9)
      doc.setTextColor('#222')
      doc.text(title.toUpperCase(), doc.internal.pageSize.getWidth() / 2, topFirstLine, {
        maxWidth: partColumn * 2,
        align: 'center',
      })

      // Derecha
      doc.setFont('times')
      doc.setFontSize(8)
      doc.setTextColor('#444')
      doc.text(date, doc.internal.pageSize.getWidth() - 40 - doc.getTextWidth(date), topFirstLine, {
        maxWidth: partColumn,
      })

      // ==================================================================================
      // ================================ SEGUNDA LINEA ===================================
      // ==================================================================================

      // Izquierda
      doc.setFont('times')
      doc.setFontSize(8)
      doc.setTextColor('#444')
      doc.text(userName, 40, topSecondLine, {
        maxWidth: partColumn,
      })

      // Centro
      if (subtitle) {
        doc.setFont('times')
        doc.setFontSize(9)
        doc.setTextColor('#333')
        doc.text(subtitle.toUpperCase(), doc.internal.pageSize.getWidth() / 2, topSecondLine, {
          maxWidth: partColumn * 2,
          align: 'center',
        })
      }

      // Derecha
      const paginador = `PÁGINA ${data.pageNumber}`
      doc.setFont('times')
      doc.setFontSize(8)
      doc.setTextColor('#444')
      doc.text(paginador, doc.internal.pageSize.getWidth() - 40 - doc.getTextWidth(paginador), topSecondLine, {
        maxWidth: partColumn,
      })

      // ==================================================================================
      // ================================ TERCERA LINEA ===================================
      // ==================================================================================

      // Verificar si tiene filtro la exportacipon de datos
      if (exportMode === 'filter') {
        doc.setFont('times')
        doc.setFontSize(8)
        doc.setTextColor('#444')
        doc.text(descriptionFilters, 40, topThirdLine, {
          maxWidth: partColumn * 4,
        })
      }

      // ==================================================================================
      // ================================ PIE DE PÁGINA ===================================
      // ==================================================================================

      doc.line(40, doc.internal.pageSize.getHeight() - 52, doc.internal.pageSize.getWidth() - 40, doc.internal.pageSize.getHeight() - 52, 'DF')
      doc.setFont('times')
      doc.setFontSize(8)
      doc.setTextColor('#222')
      doc.text(`CÓDIGO: ${store.state.authentication.user.secret}`, 40, doc.internal.pageSize.getHeight() - 38)
    },
  })
  const nameDocument = `SISTEMAS-INTEGRADOS-Y-MERCADEO-S.A.C.-${title.split(' ').join('_').toString().toUpperCase()}-${date}.pdf`
  if (action === 'download') {
    // Descargar el documento
    doc.save(nameDocument)
  } else if (action === 'preview') {
    // Previsualizar el documento
    doc.output('dataurlnewwindow', { filename: nameDocument })
  } else if (action === 'print') {
    // Impresión directa  del documento
    const dataUriString = doc.output('datauristring')
    const positionBase64 = dataUriString.indexOf('base64,')
    const base64Pdf = dataUriString.substring(positionBase64 + 7)
    axios.post('http://192.168.1.2:3333/api/print', {
      pdfBase64: base64Pdf,
    })
      .then(({ data }) => {
        if (data.errors) throw Error(data.errors)
        messageToast('success', headerText.title, 'Se envio la impresión correctamente')
      })
      .catch(() => {
        messageToast('danger', headerText.title, 'Ocurrio un error al momento de imprimir')
      })
  }
}
