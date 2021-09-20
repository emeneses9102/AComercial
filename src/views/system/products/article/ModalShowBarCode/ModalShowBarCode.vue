<template>
  <b-modal
    :id="`${modalId}`"
    centered
    :title="`Mostrar Código de Barras`"
    no-close-on-backdrop
    size="sm"
    @show="showBarCode()"
  >
    <!-- Código de Barras -->

    <field-set-component
      class="mt-75"
      legend="Código de Barra"
    >
      <div class="text-center">
        <div
          v-if="!barCode"
          class="text-center mt-1 mb-1"
        >
          No hay un código de barra
        </div>
        <img
          id="barcode"
          jsbarcode-format="auto"
          :jsbarcode-value="barCode"
          jsbarcode-textmargin="0"
          jsbarcode-fontoptions="bold"
        >
      </div>
    </field-set-component>

    <template #modal-footer>
      <button-component
        text-default="Descargar"
        icon-button="DownloadIcon"
        :method-function="()=>exportImg('download')"
      />
      <button-component
        text-default="Imprimir"
        icon-button="PrinterIcon"
        :method-function="()=>exportImg('print')"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal,
} from 'bootstrap-vue'
import JsBarcode from 'jsbarcode'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import exportImage from '@/helpers/exportImage'
import { messageToast } from '@/helpers/messageExtensions'

export default {
  name: 'ModalShowBarCode',
  components: {
    BModal,
    FieldSetComponent,
    ButtonComponent,
  },
  props: {
    barCode: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      modalId: 'modal-article-bar-code',
      imageData: '',
    }
  },
  methods: {
    exportImg(mode) {
      if (this.barCode) {
        const $barcodeImg = document.getElementById('barcode')
        this.imageData = $barcodeImg.src
        if (mode === 'print') {
          this.createBarCodePrint()
        } else {
          exportImage(mode, this.imageData, 'imagen.pdf')
        }
      } else {
        messageToast('warning', 'Codigo de Barras', 'No hay un código de barras generado')
      }
    },
    showBarCode() {
      setTimeout(() => {
        if (this.barCode) {
          JsBarcode('#barcode', this.barCode)
        }
      }, 1)
    },
    createBarCodePrint() {
      const $body = document.querySelector('body')
      const $iframe = document.createElement('iframe')
      const $img = document.createElement('img')
      $iframe.name = 'myIframe'
      $iframe.classList.add('myIframe')
      $img.classList.add('img-print')
      $img.src = this.imageData
      $body.append($iframe)
      $iframe.contentWindow.document.documentElement.querySelector('body').append($img)
      window.frames.myIframe.focus()
      window.frames.myIframe.print()
      setTimeout(() => {
        $iframe.remove()
      }, 1000)
    },
  },
}
</script>
