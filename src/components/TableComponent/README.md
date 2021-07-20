# **TableGoodComponent**


# Props (Propiedades)

En esta sección se explicaran todas las propiedades que manejara el componente para su reutilización.

## columns :

> Propiedad del tipo Array que contendra Objects en la cual se almacenaran las configuraciones de cada columna.

### Ejemplo :

    columns = [
      {
        label: 'Nombre a mostrar en la columna',
        field: 'nombre de la columna a relacionar',
      },
    ]

## server-query :

> Propiedad del tipo Object que debera contener todas las consultas del listado

### Ejemplo :

    serverQuery = {
      _id: 0,
      tabla: 'nombre de la tabla',
      pinicio: 'número de la página'
      pfin: 'número de filas por página',
      campofiltro: 'nombre del campo a filtrar',
      filtro: 'valor del filtro',
    }

## data-table :

> Propiedad del tipo Object que deberá contener datos especificos para el renderizado de la tabla

### Ejemplo :

    dataTable = {
      rows: [],
      loading: false,
      totalRows: 0,
    }

## load-items :

> Propiedad del tipo Function el cual deberá contener la lógica para actualizar los valores de la prop data-table. Esta función en ciertos casos tendrá como parámetros la página y el número de filas a listar en caso necesite utilizarlas, por lo cual la función deberá validar si existen esos parámetros:

### Ejemplo :

    loadItems = (page, perPage) => {
      if (page) ...
      if (perPage) ...
      // Lógica para traer los datos desde una API
    }

## manage-row :

> Propiedad del tipo Function el cual deberá contener la lógica para cambiar de estado y eliminar. Esta función tendrá como parametros el número de acción y el _id

### Ejemplo :

    manageRow = (accion, _id) => {
      // Lógica para actualizar o eliminar
    }
## pagination-enabled :

> Propiedad del tipo Boolean el cual servira para definir si se debe mostrar la páginación o no

### Ejemplo :

    paginationEnabled= true       // Se mostrará la paginación
    paginationEnabled= false      // No se mostrará la paginación
