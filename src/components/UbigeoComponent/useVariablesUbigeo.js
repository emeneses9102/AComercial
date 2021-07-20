import { ref } from '@vue/composition-api'

// Variable reactiva para almacenar el idUbigeo seleccionado
export const idUbigeo = ref(0)

// Variable inicializadora para almacenar el departamento, provincia y distrito
const initialUbigeo = {
  departament: 0,
  province: 0,
  district: 0,
}

// Variable reactiva para almacenar el departamento, provincia y distrito que se seleccione
export const ubigeo = ref({ ...initialUbigeo })

// Función para regresar al estado inicial la variable reactiva ubigeo
export const clearUbigeo = () => {
  ubigeo.value = { ...initialUbigeo }
}
