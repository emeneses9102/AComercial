/* eslint-disable import/prefer-default-export */

// Función para limpiar los espacios en blanco que ocupen mas de un caracter
const clearSpaceTheText = (text = '') => {
  const newText = text.trim()
  let newString = ''
  let existSpace = false
  // Recorrer texto
  for (let index = 0; index < newText.length; index += 1) {
    // Verificar que no haya espacio
    if (newText[index] === ' ' && !existSpace) {
      newString += ' '
      existSpace = true
    } else if (newText[index] !== ' ') {
      newString += newText[index]
      existSpace = false
    }
  }
  return newString
}

// Función para convertir text a Capitalize
export const textCapitalize = (text = '') => {
  const newText = clearSpaceTheText(text)
  const newStringToArray = [...newText.split(' ')].map(el => (
    `${el.substr(0, 1).toUpperCase()}${el.substr(1).toLowerCase()}`
  ))
  return newStringToArray.join(' ')
}
