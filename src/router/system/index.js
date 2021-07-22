// Importar rutas por modulos
import routesProducts from './products'
import routesMaintenance from './maintenance'
import routeStorage from './storage'
import routesSecurity from './security'
import routesControl from './control'

// Exportar arreglo de las rutas registradas para la Gestión del Sistema
export default [
  ...routesProducts,
  ...routesMaintenance,
  ...routeStorage,
  ...routesSecurity,
  ...routesControl,
]
