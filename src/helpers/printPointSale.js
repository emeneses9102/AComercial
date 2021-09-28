/* eslint-disable import/prefer-default-export */

import store from '@/store'

// Función para generar un pdf con tamaño ticket con los datos de la venta

export const generateContentTicketHTMLPointSale = (pointSale, pointSaleDetail = [], cliente) => {
  const style = `
    <style>
      *,
      html,
      body {
        font-family: Courier, "Lucida Console", monospace !important;
        font-size: 10px;
      }
      *,
      *::after,
      *::before {
        box-sizing: border-box;
      }
      body {
        margin: 0;
      }
      .container-ticket {
        padding: 1.5em;
        width: 80mm;
      }
      .line {
        margin: 0;
      }
      .info-company {
        text-align: center;
        margin-bottom: 1em;
        padding-top: .5em;
      }
      .info-company p {
        margin: 0;
        text-align: center;
      }
      .header {
        margin-bottom: .5em;
      }
      .title-print {
        font-family: Courier, "Lucida Console", monospace !important;
        margin-top: .05em;
        margin-bottom: .05em;
        text-align: center;
      }
      .thead-left {
        min-width: 20mm;
        text-align: right;
        vertical-align: top;
      }
      .table-detail {
        width: 100%;
        margin-top: .25em;
      }
      .description {
        text-align: center;
        margin-top: .25em;
      }
    </style>
  `
  let container = `${style} <div class="container-ticket">`
  const header = `
  <div class="info-company">
    <p>SISTEMAS INTEGRADOS Y MERCADEO</p>
    <p>SISTEMAS INTEGRADOS Y MERCADEO S.A.C.</p>
    <p>RUC 20343110058</p>
    <p>LIMA - LIMA - LIMA</p>
  </div>
  <p class="line">=============================================</p>
  <div class="header">
    <h4 class="title-print">NOTA DE VENTA</h4>
    <h4 class="title-print">NV01-${pointSale._id}</h4>
  </div>
  <table>
    <tr>
      <td class="thead-left">CAJERO:</td>
      <td>${store.state.boxSession.boxSession.nombreCajero}</td>
    </tr>
    <tr>
      <td class="thead-left">VENDEDOR:</td>
      <td>${pointSale.nombreVendedor}</td>
    </tr>
    <tr>
      <td class="thead-left">CLIENTE:</td>
      <td>${cliente.nombres}</td>
    </tr>
    <tr>
      <td class="thead-left">N° DOC:</td>
      <td>${cliente.numeroDocumento}</td>
    </tr>
    <tr>
      <td class="thead-left">DIRECCIÓN:</td>
      <td>${cliente.direccion}</td>
    </tr>
    <tr>
      <td class="thead-left">MONEDA:</td>
      <td>${pointSale.nombreMoneda}</td>
    </tr>
    <tr>
      <td class="thead-left">FORMA PAGO:</td>
      <td>${pointSale.nombreFormaPago || ''}</td>
    </tr>
    <tr>
      <td class="thead-left">FECHA:</td>
      <td>${pointSale.fecha || ''}</td>
    </tr>
  </table>`

  let tbody = `
  <p class="line">=============================================</p>
  <table class="table-detail">
  <thead>
    <tr class="thead-detail-tr">
      <td>COD</td>
      <td>PRODUCTO</td>
      <td style="text-align: center;">CANT</td>
      <td style="text-align: right;">PREC UN</td>
    </tr>
  </thead>
  <tbody>`
  pointSaleDetail.forEach(detail => {
    tbody += `<tr>
    <td>${detail.idArticulo}</td>
    <td>${detail.nombreArticulo}</td>
    <td style="text-align: center;">${detail.cantidad}</td>
    <td style="text-align: right;">${detail.precio || '0.00'}</td>
  </tr>`
  })

  tbody += `
  </tbody>
  </table>
  `

  tbody += `
    <p class="line">=============================================</p>
    <table style="width: 100%">
      <colgroup>
        <col>
        <col>
        <col>
        <col>
      </colgroup>  
      <tr>
        <td colspan="3">PAGO CON</td>
        <td style="text-align: right;">${(pointSale.totalPagado).toFixed(2)}</td>
      </tr>
      <tr>
        <td colspan="3">VUELTO</td>
        <td style="text-align: right;">${(pointSale.vuelto).toFixed(2)}</td>
      </tr>
      <tr>
        <td colspan="3">IMPUESTOS</td>
        <td style="text-align: right;">${(pointSale.total - pointSale.subTotal).toFixed(2)}</td>
      </tr>
    </table>
    <p class="line">=============================================</p>
    <table style="width: 100%">
      <colgroup>
        <col>
        <col>
        <col>
        <col>
      </colgroup>
      <tr>
        <td colspan="3" style="font-size: 12px; font-weight: 700;">TOTAL</td>
        <td style="text-align: right; font-size: 12px; font-weight: 700;">S./ ${(pointSale.total).toFixed(2)}</td>
      </tr>
    </table>
    <p class="line">=============================================</p>
    <p class="description">GRACIAS POR SU PREFERENCIA!!</p>
    <p style="margin-top: 2em; margin-bottom: 0;">*</p>
  `

  container += header
  container += tbody
  container += '</div>'
  return container
}
