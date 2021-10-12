export const asciiToHex = str => {
  const arr1 = []
  for (let n = 0, l = str.length; n < l; n += 1) {
    const hex = Number(str.charCodeAt(n)).toString(16)
    arr1.push(hex)
  }
  return arr1.join('')
}

export const getRandomInt = (min, max) => (
  Math.floor(Math.random() * (max - min)) + min
)

export const generateBarCode = _id => {
  // let cod = _id
  // if (_id.toString().length < 11) {
  //   cod = (`0000000000${_id}`).slice(-9)
  // }
  // return `P${cod}`
  const numberRandom = getRandomInt(1000000000, 9999999999)
  return _id + asciiToHex((numberRandom + _id).toString()).slice(0, 9)
}
