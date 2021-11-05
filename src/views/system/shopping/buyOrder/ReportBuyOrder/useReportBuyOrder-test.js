/* eslint-disable import/prefer-default-export */
/* eslint-disable new-cap */
import { jsPDF } from 'jspdf'
import { getRequest } from '@/helpers/requestRaw'
import { serverQueryDefault } from '@/helpers/serverQuery'
import autoTable from 'jspdf-autotable'
import store from '@/store'
// import { messageToast } from './messageExtensions'

export const generateReportBuyOrder = async row => {
  const doc = new jsPDF('p', 'pt', 'a4')

  const serverQueryBuyOrderDetail = { ...serverQueryDefault }
  serverQueryBuyOrderDetail.tabla = 'dordencompra'
  serverQueryBuyOrderDetail.pinicio = 0
  serverQueryBuyOrderDetail.pfin = 0
  serverQueryBuyOrderDetail.campo = 'a.idordencompra'
  serverQueryBuyOrderDetail.indice = row._id

  const serverQueryBuyOrderTributeSummaryDetail = { ...serverQueryDefault }
  serverQueryBuyOrderTributeSummaryDetail._id = row._id
  serverQueryBuyOrderTributeSummaryDetail.tabla = 'rordencompratributo'
  serverQueryBuyOrderTributeSummaryDetail.pinicio = 0
  serverQueryBuyOrderTributeSummaryDetail.pfin = 0

  const serverQueryFormat = { ...serverQueryDefault }
  serverQueryFormat._id = row.idFormato
  serverQueryFormat.tabla = 'formato'
  serverQueryFormat.pinicio = 1
  serverQueryFormat.pfin = 1

  const [
    responseBuyOrderDetail,
    responseBuyOrderTributeSummaryDetail,
    responseFormat,
  ] = await Promise.all([
    getRequest('dordencompra', 'Detalle Orden Compra', serverQueryBuyOrderDetail),
    getRequest('rordencompratributo', 'Resumen Tributo Orden Compra', serverQueryBuyOrderTributeSummaryDetail),
    getRequest('formato', 'Formato', serverQueryFormat),
  ])

  if (responseBuyOrderDetail.error || !responseBuyOrderDetail.data) return false
  if (responseBuyOrderTributeSummaryDetail.error || !responseBuyOrderTributeSummaryDetail.data) return false
  if (responseFormat.error || !responseFormat.data) return false

  const dataTableBuyOrderDetail = [...responseBuyOrderDetail.data]
  let dataTableBuyOrderSummaryDetail = [...responseBuyOrderTributeSummaryDetail.data].map(tributeSummaryDetail => ({
    titulo: tributeSummaryDetail.nombre,
    monto: tributeSummaryDetail.monto.toFixed(2),
  }))

  const { titulo, texto } = responseFormat.data[0]
  console.log(titulo, texto)

  dataTableBuyOrderSummaryDetail = [
    {
      titulo: 'SUB TOTAL',
      monto: row.subTotal.toFixed(2),
    },
    ...dataTableBuyOrderSummaryDetail,
    {
      titulo: 'DESCUENTOS',
      monto: row.descuento.toFixed(2),
    },
    {
      titulo: 'TOTAL',
      monto: row.total.toFixed(2),
    },
  ]

  const newDataTableBuyOrderDetail = dataTableBuyOrderDetail.map(buyOrderDetail => ({
    ...buyOrderDetail,
    precioCompra: buyOrderDetail.precioCompra.toFixed(2),
    descuento: buyOrderDetail.descuento.toFixed(2),
    subTotal: buyOrderDetail.subTotal.toFixed(2),
    total: buyOrderDetail.total.toFixed(2),
  }))

  // Calcular la 1/4 parte del ancho del documento
  const partColumn = doc.internal.pageSize.getWidth() / 3 - 80
  const lineHeight = 12

  // ==================================================================================
  // ================================ PRIMERA LINEA ===================================
  // ==================================================================================

  const topFirstLine = 40

  let linesUsedInFirstRow = 1

  doc.setFont('helvetica')
  doc.setFontSize(7)
  doc.setTextColor('#444')
  const nameCompany = 'SISTEMAS INTEGRADOS Y MERCADEO S.A.C.'
  const linesUsedInNameCompany = Math.ceil(doc.getTextWidth(nameCompany) / partColumn)
  if (linesUsedInNameCompany > linesUsedInFirstRow) linesUsedInFirstRow = linesUsedInNameCompany

  doc.setFont('helvetica')
  doc.setFontSize(8)
  doc.setTextColor('#222')
  const titleDocument = `ORDEN DE COMPRA N° ${(`000000000${row._id}`).toString().substring(-10)}`
  const linesUsedInTitleDocument = Math.ceil(doc.getTextWidth(titleDocument) / partColumn)
  if (linesUsedInTitleDocument > linesUsedInFirstRow) linesUsedInFirstRow = linesUsedInTitleDocument

  doc.setFont('helvetica')
  doc.setFontSize(7)
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

  doc.setFont('helvetica')
  doc.setFontSize(7)
  doc.setTextColor('#444')
  const userName = `USUARIO: ${store.state.authentication.user.usuario.toString().toUpperCase()}`
  const linesUsedInUserName = Math.ceil(doc.getTextWidth(userName) / partColumn)
  if (linesUsedInUserName > linesUsedInSecondRow) linesUsedInSecondRow = linesUsedInUserName

  autoTable(doc, {
    tableWidth: 300,
    headStyles: {
      font: 'helvetica',
      fontSize: 8,
      textColor: '#222',
      lineColor: '#777',
      lineWidth: 1,
      valign: 'middle',
    },
    bodyStyles: {
      font: 'helvetica',
      fontSize: 7,
      fillColor: '#FFF',
      lineWidth: 1,
      lineColor: '#777',
    },
    theme: 'plain',
    margin: {
      bottom: 60,
      top: topSecondLine + 20,
    },
    columnStyles: {
      precioCompra: {
        halign: 'right',
      },
      descuento: {
        halign: 'right',
      },
      cantidad: {
        halign: 'center',
      },
      subTotal: {
        halign: 'right',
      },
      total: {
        halign: 'right',
      },
    },
    columns: [
      {
        dataKey: 'title',
      },
      {
        dataKey: 'value',
      },
    ],
    body: [
      {
        title: 'N° ORDEN DE COMPRA',
        value: (`000000000${row._id}`).toString().substring(-10),
      },
      {
        title: 'FECHA',
        value: row.fecha,
      },
      {
        title: 'PROVEEDOR',
        value: row.nombreProveedor,
      },
    ],
    cellWidth: 'wrap',
    pageBreak: 'auto',
  })

  autoTable(doc, {
    headStyles: {
      font: 'helvetica',
      fontSize: 8,
      textColor: '#222',
      lineColor: '#777',
      lineWidth: 1,
      valign: 'middle',
    },
    bodyStyles: {
      font: 'helvetica',
      fontSize: 7,
      fillColor: '#FFF',
      lineWidth: 1,
      lineColor: '#777',
    },
    theme: 'plain',
    margin: {
      bottom: 60,
      top: topSecondLine + 20,
    },
    columnStyles: {
      precioCompra: {
        halign: 'right',
      },
      descuento: {
        halign: 'right',
      },
      cantidad: {
        halign: 'center',
      },
      subTotal: {
        halign: 'right',
      },
      total: {
        halign: 'right',
      },
    },
    columns: [
      {
        dataKey: '_id',
        header: 'ID',
      },
      {
        dataKey: 'nombreTablaArticulo',
        header: 'ARTÍCULO',
      },
      {
        dataKey: 'nombreMotivoCompra',
        header: 'MOTIVO COMPRA',
      },
      {
        dataKey: 'precioCompra',
        header: 'PRECIO',
      },
      {
        dataKey: 'cantidad',
        header: 'CANTIDAD',
      },
      {
        dataKey: 'descuento',
        header: 'DESCUENTO',
      },
      {
        dataKey: 'subTotal',
        header: 'SUBTOTAL',
      },
      {
        dataKey: 'total',
        header: 'TOTAL',
      },
    ],
    body: newDataTableBuyOrderDetail,
    cellWidth: 'wrap',
    pageBreak: 'auto',
    didDrawPage(data) {
      // ==================================================================================
      // ================================ PRIMERA LINEA ===================================
      // ==================================================================================

      // Izquierda
      doc.setFont('helvetica')
      doc.setFontSize(7)
      doc.setTextColor('#444')
      doc.text(nameCompany, 40, topFirstLine, {
        maxWidth: partColumn,
      })

      // Centro
      doc.setFont('helvetica')
      doc.setFontSize(9)
      doc.setTextColor('#222')
      doc.text(titleDocument, doc.internal.pageSize.getWidth() / 2, topFirstLine, {
        maxWidth: partColumn * 2,
        align: 'center',
      })

      // Derecha
      doc.setFont('helvetica')
      doc.setFontSize(8)
      doc.setTextColor('#444')
      doc.text(date, doc.internal.pageSize.getWidth() - 40 - doc.getTextWidth(date), topFirstLine, {
        maxWidth: partColumn,
      })

      // ==================================================================================
      // ================================ SEGUNDA LINEA ===================================
      // ==================================================================================

      // Izquierda
      doc.setFont('helvetica')
      doc.setFontSize(8)
      doc.setTextColor('#444')
      doc.text(userName, 40, topSecondLine, {
        maxWidth: partColumn,
      })

      // Derecha
      const paginador = `PÁGINA ${data.pageNumber}`
      doc.setFont('helvetica')
      doc.setFontSize(8)
      doc.setTextColor('#444')
      doc.text(paginador, doc.internal.pageSize.getWidth() - 40 - doc.getTextWidth(paginador), topSecondLine, {
        maxWidth: partColumn,
      })
    },
  })

  autoTable(doc, {
    headStyles: {
      font: 'helvetica',
      fontSize: 8,
      textColor: '#222',
      lineColor: '#777',
      lineWidth: 1,
      valign: 'middle',
    },
    bodyStyles: {
      font: 'helvetica',
      fontSize: 8,
      textColor: '#222',
      fillColor: '#FFF',
      lineColor: '#777',
      lineWidth: 1,
      valign: 'middle',
      fontStyle: 'bold',
    },
    theme: 'plain',
    margin: {
      bottom: 60,
      left: 350,
    },
    columnStyles: {
      monto: {
        halign: 'right',
      },
    },
    columns: [
      {
        dataKey: 'titulo',
      },
      {
        dataKey: 'monto',
      },
    ],
    body: dataTableBuyOrderSummaryDetail,
    cellWidth: 'wrap',
    pageBreak: 'auto',
    didDrawPage() {
      // ==================================================================================
      // ================================ PIE DE PÁGINA ===================================
      // ==================================================================================

      doc.line(40, doc.internal.pageSize.getHeight() - 52, doc.internal.pageSize.getWidth() - 40, doc.internal.pageSize.getHeight() - 52, 'DF')
      doc.setFont('helvetica')
      doc.setFontSize(8)
      doc.setTextColor('#222')
      doc.text(`CÓDIGO: ${store.state.authentication.user.secret}`, 40, doc.internal.pageSize.getHeight() - 38)
    },
  })

  // const $body = document.querySelector('body')
  // const $iframesExisting = document.querySelectorAll('iframe')
  // $iframesExisting.forEach(node => {
  //   node.remove()
  // })
  // const $iframe = document.createElement('iframe')
  // const dataUriString = doc.output('datauristring')
  // $iframe.src = dataUriString
  // $iframe.name = 'myIframe'
  // $body.append($iframe)
  // setTimeout(() => {
  //   window.frames.myIframe.focus()
  //   window.frames.myIframe.print()
  // }, 2000)

  doc.output('dataurlnewwindow')

  return true
}
