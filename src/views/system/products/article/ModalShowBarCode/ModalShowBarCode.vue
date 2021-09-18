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
      required: true,
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
      const $barcodeImg = document.getElementById('barcode')
      this.imageData = $barcodeImg.src
      exportImage(mode, 'p', this.imageData, 'imagen.jpg')
    },
    showBarCode() {
      setTimeout(() => {
        JsBarcode('#barcode', 'AS8129HGFG')
      }, 1)
    },
  },
}
</script>
