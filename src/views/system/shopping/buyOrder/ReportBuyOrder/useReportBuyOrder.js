/* eslint-disable import/prefer-default-export */
/* eslint-disable new-cap */
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

import store from '@/store'
import { formatDateBySeparator } from '@/helpers/date'
import { getRequest } from '@/helpers/requestRaw'
import { serverQueryDefault } from '@/helpers/serverQuery'

export const getRequestForReport = async row => {
  const serverQueryPartner = { ...serverQueryDefault }
  serverQueryPartner._id = row.idProveedor
  serverQueryPartner.tabla = 'socios'
  serverQueryPartner.pinicio = 0
  serverQueryPartner.pfin = 0

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
    responsePartner,
  ] = await Promise.all([
    getRequest('dordencompra', 'Detalle Orden Compra', serverQueryBuyOrderDetail),
    getRequest('rordencompratributo', 'Resumen Tributo Orden Compra', serverQueryBuyOrderTributeSummaryDetail),
    getRequest('formato', 'Formato', serverQueryFormat),
    getRequest('socio', 'Socio', serverQueryPartner),
  ])

  return {
    responseBuyOrderDetail,
    responseBuyOrderTributeSummaryDetail,
    responseFormat,
    responsePartner,
  }
}

export const generateReportBuyOrder = async row => {
  const {
    responseBuyOrderDetail,
    responseBuyOrderTributeSummaryDetail,
    responseFormat,
    responsePartner,
  } = await getRequestForReport(row)

  if (responseBuyOrderDetail.error || !responseBuyOrderDetail.data) return false
  if (responseBuyOrderTributeSummaryDetail.error || !responseBuyOrderTributeSummaryDetail.data) return false
  if (responseFormat.error || !responseFormat.data) return false
  if (responsePartner.error || !responsePartner.data) return false

  const { titulo, texto } = responseFormat.data[0]

  const doc = new jsPDF('p', 'pt', 'a4')

  const newDataTableBuyOrderDetail = [...responseBuyOrderDetail.data].map(buyOrderDetail => ({
    ...buyOrderDetail,
    precioCompra: buyOrderDetail.precioCompra.toFixed(2),
    descuento: buyOrderDetail.descuento.toFixed(2),
    subTotal: buyOrderDetail.subTotal.toFixed(2),
    total: buyOrderDetail.total.toFixed(2),
  }))

  let dataTableBuyOrderSummaryDetail = [...responseBuyOrderTributeSummaryDetail.data].map(tributeSummaryDetail => ({
    titulo: tributeSummaryDetail.nombre,
    monto: tributeSummaryDetail.monto.toFixed(2),
  }))

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

  // Calcular la tercera parte del ancho del documento
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
  doc.setFontSize(9)
  doc.setTextColor('#222')
  const titleDocument = titulo
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

  let startYFecha = 0
  // let endYFecha = 0

  // FECHA Y N° DE ORDEN
  autoTable(doc, {
    tableWidth: (doc.internal.pageSize.getWidth() - 200) / 2,
    headStyles: {
      font: 'helvetica',
      fontSize: 9,
      textColor: '#222',
      lineColor: '#777',
      lineWidth: 1,
      valign: 'middle',
    },
    bodyStyles: {
      font: 'helvetica',
      fontSize: 8,
      fillColor: '#FFF',
      lineWidth: 1,
      lineColor: '#777',
    },
    theme: 'plain',
    startY: topSecondLine + 20,
    margin: {
      bottom: 60,
      left: 360,
    },
    columnStyles: {
      title: {
        fontStyle: 'bold',
      },
      value: {
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
        title: 'FECHA:',
        value: formatDateBySeparator(row.fecha, '/'),
      },
      {
        title: 'N° ORDEN:',
        value: row._id.toString().length < 10 ? (`0000000000${row._id}`.substring(-10)) : row._id,
      },
    ],
    cellWidth: 'wrap',
    pageBreak: 'auto',
    didDrawPage(data) {
      startYFecha = data.settings.startY
      // endYFecha = data.cursor.y

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
      doc.setFontSize(7)
      doc.setTextColor('#444')
      doc.text(date, doc.internal.pageSize.getWidth() - 40 - doc.getTextWidth(date), topFirstLine, {
        maxWidth: partColumn,
      })

      // ==================================================================================
      // ================================ SEGUNDA LINEA ===================================
      // ==================================================================================

      // Izquierda
      doc.setFont('helvetica')
      doc.setFontSize(7)
      doc.setTextColor('#444')
      doc.text(userName, 40, topSecondLine, {
        maxWidth: partColumn,
      })

      // Derecha
      const paginador = `PÁGINA ${data.pageNumber}`
      doc.setFont('helvetica')
      doc.setFontSize(7)
      doc.setTextColor('#444')
      doc.text(paginador, doc.internal.pageSize.getWidth() - 40 - doc.getTextWidth(paginador), topSecondLine, {
        maxWidth: partColumn,
      })
    },
  })

  let endYEstado = 0

  // APROBADO | ATENDIDO | ANULADO
  autoTable(doc, {
    tableWidth: (doc.internal.pageSize.getWidth() - 80) / 2 - 100,
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
    // startY: endYFecha + 20,
    margin: {
      bottom: 60,
      left: 398,
    },
    columnStyles: {
      title: {
        fontStyle: 'bold',
      },
      value: {
        halign: 'center',
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
        title: 'APROBADO:',
        value: row.aprobado ? 'SI' : 'NO',
      },
      {
        title: 'ATENDIDO',
        value: row.atendido ? 'SI' : 'NO',
      },
      {
        title: 'ANULADO',
        value: row.anulado ? 'SI' : 'NO',
      },
    ],
    cellWidth: 'wrap',
    pageBreak: 'auto',
    didDrawPage(data) {
      endYEstado = data.cursor.y
    },
  })

  // DATOS DE LA EMPRESA
  autoTable(doc, {
    startY: startYFecha,
    tableWidth: (doc.internal.pageSize.getWidth() - 90) / 2,
    styles: {
      cellPadding: {
        left: 0,
        top: 4,
        bottom: 4,
      },
    },
    headStyles: {
      font: 'helvetica',
      fontSize: 8,
      textColor: '#222',
      lineColor: '#777',
      lineWidth: 0,
      valign: 'middle',
    },
    bodyStyles: {
      font: 'helvetica',
      fontSize: 7,
      fillColor: '#FFF',
      lineWidth: 0,
      lineColor: '#777',
    },
    theme: 'plain',
    margin: {
      bottom: 60,
    },
    columnStyles: {
      title: {
        fontStyle: 'bold',
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
        title: 'EMPRESA:',
        value: 'SISTEMAS INTEGRADOS Y MERCADO S.A.C.',
      },
      {
        title: 'DEPARTAMENTO:',
        value: 'LIMA, LIMA, LIMA',
      },
      {
        title: 'DIRECCIÓN:',
        value: 'SAN JUAN DE MIRAFLORES',
      },
      {
        title: 'TELÉFONO:',
        value: '5555555',
      },
      {
        title: 'CORREO:',
        value: 'SIMSAC.COMPANY@GMAIL.COM',
      },
    ],
    cellWidth: 'wrap',
    pageBreak: 'auto',
  })

  // let startYVendedor = 0
  let endYVendedor = 0

  // DATOS DEL PROVEEDOR
  autoTable(doc, {
    tableWidth: (doc.internal.pageSize.getWidth() - 90) / 2,
    startY: endYEstado + 20,
    headStyles: {
      font: 'helvetica',
      fontSize: 8,
      textColor: '#333',
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
    },
    columnStyles: {
      title: {
        textColor: '#111',
      },
    },
    head: [['PROVEEDOR:']],
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
        title: 'NOMBRE:',
        value: responsePartner.data[0].razonSocial,
      },
      {
        title: 'DEPARTAMENTO:',
        value: responsePartner.data[0].nombreUbigeo,
      },
      {
        title: 'DIRECCIÓN:',
        value: responsePartner.data[0].direccion,
      },
      {
        title: 'TELÉFONO:',
        value: responsePartner.data[0].telefonoContacto,
      },
      {
        title: 'CORREO:',
        value: responsePartner.data[0].correo,
      },
    ],
    cellWidth: 'wrap',
    pageBreak: 'auto',
    didDrawPage(data) {
      // startYVendedor = data.settings.startY
      endYVendedor = data.cursor.y
    },
  })

  // ENVIAR A
  // autoTable(doc, {
  //   tableWidth: (doc.internal.pageSize.getWidth() - 90) / 2,
  //   startY: startYVendedor,
  //   headStyles: {
  //     font: 'helvetica',
  //     fontSize: 8,
  //     textColor: '#333',
  //     lineColor: '#777',
  //     lineWidth: 1,
  //     valign: 'middle',
  //   },
  //   bodyStyles: {
  //     font: 'helvetica',
  //     fontSize: 7,
  //     fillColor: '#FFF',
  //     lineWidth: 1,
  //     lineColor: '#777',
  //   },
  //   theme: 'plain',
  //   margin: {
  //     bottom: 60,
  //     left: doc.internal.pageSize.getWidth() / 2 + 5,
  //   },
  //   columnStyles: {
  //     title: {
  //       textColor: '#111',
  //     },
  //   },
  //   head: [['ENVIAR A:']],
  //   columns: [
  //     {
  //       dataKey: 'title',
  //     },
  //     {
  //       dataKey: 'value',
  //     },
  //   ],
  //   body: [
  //     {
  //       title: 'NOMBRE:',
  //       value: responsePartner.data[0].razonSocial,
  //     },
  //     {
  //       title: 'DEPARTAMENTO:',
  //       value: responsePartner.data[0].nombreUbigeo,
  //     },
  //     {
  //       title: 'DIRECCIÓN:',
  //       value: responsePartner.data[0].direccion,
  //     },
  //     {
  //       title: 'TELÉFONO:',
  //       value: responsePartner.data[0].telefonoContacto,
  //     },
  //     {
  //       title: 'CORREO:',
  //       value: responsePartner.data[0].correo,
  //     },
  //   ],
  //   cellWidth: 'wrap',
  //   pageBreak: 'auto',
  // })

  let endYDetalle = 0

  // DATOS DEL DETALLE
  autoTable(doc, {
    startY: endYVendedor + 40,
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
      fillColor: '#FFF',
      lineWidth: 1,
      lineColor: '#777',
    },
    theme: 'plain',
    margin: {
      bottom: 60,
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
      endYDetalle = data.cursor.y
    },
  })

  // RESUMEN DE TOTALES
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

  // TEXTO FINAL
  doc.setFont('helvetica')
  doc.setFontSize(9)
  doc.setTextColor('#444')
  doc.text(texto, 40, endYDetalle + 40, {
    maxWidth: doc.internal.pageSize.getWidth() / 2 - 40,
  })

  doc.output('dataurlnewwindow')
  return true
}
