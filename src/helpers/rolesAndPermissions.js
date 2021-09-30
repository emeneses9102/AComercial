/* eslint-disable import/prefer-default-export */
import { textCapitalize } from './textTransform'

const getChildren = (paramData = [], paramItem) => {
  let children = []
  paramData.forEach(item => {
    // OBTENER LOS HIJOS DE UN PADRE SUPERIOR
    // Cuando el modulo tenga un idModulo y no tenga un idPadre y idMenu
    if (
      (paramItem.idModulo && !paramItem.idPadre && !paramItem.idMenu)
      && paramItem.idModulo === item.idPadre
      && !children.find(el => el.idModulo === item.idModulo)
    ) {
      // children = [ ...children, item ]
      const newDataChildren = {
        idPadre: item.idPadre,
        idModulo: item.idModulo,
        idMenu: item.idMenu,
        title: textCapitalize(item.nombreModulo),
      }
      children = [...children, { ...newDataChildren, children: getChildren(paramData, item) }]

      // OBTENER LOS MENUS DE UN MODULO (2 NIVELES)
      // Cuando el modulo tenga un idModulo y idMenu y no tenga un idPadre
    } else if (
      (paramItem.idModulo && paramItem.idMenu && !paramItem.idPadre)
      && paramItem.idModulo === item.idModulo
      && !children.find(el => el.idMenu === item.idMenu)
    ) {
      const newDataChildren = {
        idPadre: item.idPadre,
        idModulo: item.idModulo,
        idMenu: item.idMenu,
        title: textCapitalize(item.nombreMenu),
        route: item.ruta,
      }
      children = [...children, newDataChildren]

      // OBTENER LOS HIJOS INTERMEDIOS QUE NO ESTAN ASOCIADOS A UN MENU
      // Cuando el modulo tenga un idModulo y idPadre y no tenga un idMenu
    } else if (
      (paramItem.idModulo && paramItem.idPadre && !paramItem.idMenu)
      && paramItem.idModulo === item.idPadre
      && !children.find(el => el.idModulo === item.idModulo)
    ) {
      const newDataChildren = {
        idPadre: item.idPadre,
        idModulo: item.idModulo,
        idMenu: item.idMenu,
        title: textCapitalize(item.nombreModulo),
      }
      // children = [ ...children, item ]
      children = [...children, { ...newDataChildren, children: getChildren(paramData, item) }]

      // OBTENER LOS HIJOS DE UN MODULO DE MAS DE 2 NIVELES
      // Cuando el modulo tenga un idModulo, idPadre, idMenu
    } else if (
      (paramItem.idModulo && paramItem.idPadre && paramItem.idMenu)
      && (paramItem.idModulo === item.idModulo && paramItem.idPadre === item.idPadre)
      && !children.find(el => el.idMenu === item.idMenu)
    ) {
      const newDataChildren = {
        idPadre: item.idPadre,
        idModulo: item.idModulo,
        idMenu: item.idMenu,
        title: textCapitalize(item.nombreMenu),
        route: item.ruta,
      }
      children = [...children, newDataChildren]
    }
  })
  return children
}

const optionsMenu = data => data.sort((a, b) => a.idModulo - b.idModulo)

const menus = dataParam => {
  const data = optionsMenu(dataParam)
  let menuAll = []
  data.forEach(item => {
    // IDENTIFICAR LAS RAICES

    // Cuando el modulo tenga un idModulo y no tenga un idPadre y idMenu
    if (item.idModulo && !item.idPadre && !item.idMenu && !menuAll.find(el => el.idModulo === item.idModulo)) {
      const newData = {
        idPadre: item.idPadre,
        idModulo: item.idModulo,
        idMenu: item.idMenu,
        title: textCapitalize(item.nombreModulo),
        icon: item.icono || '',
      }
      const parent = { ...newData, children: getChildren(data, item) }
      menuAll = [...menuAll, parent]

    // Cuando el modulo tenga un idModulo, idMenu y no tenga un idPadre
    } else if (item.idModulo && !item.idPadre && item.idMenu && !menuAll.find(el => el.idModulo === item.idModulo)) {
      const newData = {
        idPadre: item.idPadre,
        idModulo: item.idModulo,
        idMenu: item.idMenu,
        title: textCapitalize(item.nombreModulo),
        icon: item.icono || '',
      }
      const parent = { ...newData, children: getChildren(data, item) }
      menuAll = [...menuAll, parent]
    }
  })
  return menuAll
}

export const generateNavigation = data => (
  menus(data)
)
