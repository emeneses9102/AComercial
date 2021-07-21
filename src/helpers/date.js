/* eslint-disable import/prefer-default-export */

export const formatDate = value => {
  const date = new Date(value)
  const day = `00${date.getDate()}`
  const month = `00${date.getMonth() + 1}`
  const year = `0000${date.getFullYear()}`
  const hour = `00${date.getHours()}`
  const minute = `00${date.getMinutes()}`
  const second = `00${date.getSeconds()}`
  return `${day.slice(-2)}/${month.slice(-2)}/${year.slice(-4)} ${hour.slice(-2)}:${minute.slice(-2)}:${second.slice(-2)}`
}
