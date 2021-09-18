/* eslint-disable new-cap */
import { jsPDF } from 'jspdf'

export default (
  action = 'print',
  orientation = 'p',
  imageData = '',
  nameDocument = '',
) => {
  // Crear la instancia de jsPDF y armar los datos que se mostrarán en la tabla
  const doc = new jsPDF(orientation, 'pt', [272.28, 260.89])

  // ==================================================================================
  // ================================ PRIMERA LINEA ===================================
  // ==================================================================================

  doc.addImage(imageData, 'JPEG', 15, 15)

  if (action === 'download') {
    doc.save(nameDocument)
  } else if (action === 'print') {
    doc.autoPrint()
    doc.output('dataurlnewwindow', { filename: nameDocument })
  }
}
