<template>
  <div>
    <div class="rounded upload-file">
      <div
        class="container-actions"
        :class="{'hover': !modeShow}"
      >
        <template v-if="!modeShow">
          <div
            class="upload"
            @click="openInputFile"
          >
            <feather-icon
              icon="UploadIcon"
              size="38"
            />
          </div>
          <div
            v-if="!!image"
            class="remove"
            @click="removeImage"
          >
            <feather-icon
              icon="XCircleIcon"
              size="38"
            />
          </div>
        </template>
      </div>
      <img
        :src="image || require('@/assets/images/icons/no-photos.svg')"
        alt="Imagen"
        class="img"
      >
    </div>
    <input
      :id="id"
      type="file"
      class="input-file"
      accept=".jpeg,.jpg,.png"
      @change="uploadFile"
    >
  </div>
</template>

<script>
import { onMounted } from '@vue/composition-api'
import { messageToast } from '@/helpers/messageExtensions'

export default {
  name: 'UploadFile',
  props: {
    id: {
      type: String,
      required: false,
      default: 'inputFile',
    },
    image: {
      type: String,
      required: true,
      default: '',
    },
    maxSize: {
      type: Number,
      required: false,
      default: 1,
    },
    modeShow: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  setup(props, context) {
    // Crear mi variable fileReader
    const fileReader = new FileReader()

    // Crear mi variable para almacenar el elemento
    let inputFile

    // Logica que se ejecutara cuando el componente ya esta insertado en el DOM
    onMounted(() => {
      // Capturar el elemento inputFile
      inputFile = document.getElementById(props.id)
    })

    // Método para abrir el seleccionar de un archivo
    const openInputFile = () => {
      inputFile.click()
    }

    const checkSizeImage = sizeImage => {
      if ((sizeImage / 1024 / 1024) <= props.maxSize) {
        return true
      }
      return false
    }

    // Función para leer y validar el archivo que se ingreso
    const uploadFile = e => {
      if (e.target.files.length) {
        const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i
        if (!allowedExtensions.exec(e.target.value)) {
          messageToast('warning', 'Subir Imagen', 'Por favor ingrese una imagén con las siguientes extensiónes .jpeg|.jpg|.png')
        } else if (!checkSizeImage(e.target.files[0].size)) {
          messageToast('warning', 'Subir Imagen', `Por favor ingrese una imagén de ${props.maxSize}MB`)
          inputFile.value = null
        } else {
          fileReader.readAsDataURL(e.target.files[0])
        }
      }
    }

    // Agregar el evento load al fileReader
    fileReader.addEventListener('load', e => {
      context.emit('update:image', e.target.result)
    })

    // Agregar el evento error al fileReader
    fileReader.addEventListener('error', () => {
      context.emit('update:image', '')
      messageToast('danger', 'Subir Imagen', 'Ocurrio un error al momento de subir la imágen')
    })

    const removeImage = () => {
      context.emit('update:image', '')
      inputFile.value = null
    }

    return {
      openInputFile,
      removeImage,
      uploadFile,
    }
  },
}
</script>

<style lang="scss" scoped>
  .upload-file {
    border: 2px solid #1d8ad3;
    height: 220px;
    max-width: 220px;
    width: 100%;
    position: relative;
    overflow: hidden;
  }
  .container-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2em;
    position: absolute;
    width: 100%;
    height: 100%;
    transition: background-color .2s ease-out .15s;
    background-color: transparent;
  }
  .container-actions.hover:hover {
    transition: background-color .2s ease-out;
    background-color: #1115;
    cursor: pointer;
  }
  .upload,
  .remove {
    position: relative;
    background-color: #2098e9;
    border: 4px solid #1113;
    border-radius: 50%;
    color: white;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: -100%;
    transition: bottom .2s ease-out .15s;
  }
  .container-actions:hover .upload,
  .container-actions:hover .remove {
    transition: bottom .2s ease-out;
    bottom: 0;
  }
  .img {
    display: block;
    height: 100%;
    padding: .25em;
    width: 100%;
  }
  .input-file {
    display: none;
  }
</style>
