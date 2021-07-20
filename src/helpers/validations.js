// Importar validadores
import { extend, localize } from 'vee-validate'
import es from 'vee-validate/dist/locale/es.json'
import * as rules from 'vee-validate/dist/rules'

// Asignar la localizacion para los mensajes de validacion
localize('es', es)

// Registrar todas las validaciones permitidas
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

// Crear validacion para los combos requeridos
extend('requiredComboVueSelect', {
  validate(value) {
    if (value) return true
    return false
  },
  params: ['genero'],
  message(fieldName, placeholders) {
    return `Debe seleccionar ${placeholders.genero === 'm' ? 'un' : 'una'} ${fieldName}`
  },
})
