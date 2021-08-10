// Importar rutas por modulos
import routesHome from './home'
import routesProducts from './products'
import routesMaintenance from './maintenance'
import routeStorage from './storage'
import routesSecurity from './security'
import routesControl from './control'
import routesBox from './box'
import routesSunat from './sunat'

// Exportar arreglo de las rutas registradas para la Gestión del Sistema
export default [
  ...routesHome,
  ...routesProducts,
  ...routesMaintenance,
  ...routeStorage,
  ...routesSecurity,
  ...routesControl,
  ...routesBox,
  ...routesSunat,
]
