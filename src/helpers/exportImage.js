/* eslint-disable new-cap */
import { jsPDF } from 'jspdf'

export default (
  action = 'print',
  imageData = '',
  nameDocument = '',
) => {
  const orientation = 'l'
  // Crear la instancia de jsPDF y armar los datos que se mostrarán en la tabla
  const doc = new jsPDF(orientation, 'mm', [80, 60])

  // ==================================================================================
  // ================================ PRIMERA LINEA ===================================
  // ==================================================================================

  doc.addImage(imageData, 'JPEG', 7, 5)

  if (action === 'download') {
    doc.save(nameDocument)
  } else if (action === 'print') {
    doc.autoPrint()
    doc.output('dataurlnewwindow', { filename: nameDocument })
  }
}
