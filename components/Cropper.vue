<template>
  <!-- ref="Cropper" は必須です. 名前はCropperである必要はありません -->
  <div id="Cropper" ref="Cropper" :class="['a--crop', customClass]" />
</template>

<script>
// デフォルトのCSS, croppieと型定義を読み込みます
import 'croppie/croppie.css'
import Croppie from 'croppie'
import Vue from 'vue'

export default {
  name: 'Cropper',

  // propsの型や初期値はcroppieの公式ドキュメントに準拠しています
  props: {
    boundary: {
      default: null,
    },
    customClass: {
      type: String,
      default: '',
    },
    enableExif: {
      type: Boolean,
      default: false,
    },
    enableOrientation: {
      type: Boolean,
      default: false,
    },
    enableResize: {
      type: Boolean,
      default: false,
    },
    enableZoom: {
      type: Boolean,
      default: true,
    },
    enforceBoundary: {
      type: Boolean,
      default: true,
    },
    mouseWheelZoom: {
      default: true,
    },
    showZoomer: {
      type: Boolean,
      default: true,
    },
    viewport: {
      default: () => ({ width: 100, height: 100, type: 'square' }),
    },
    minZoom: {
      type: Number,
      default: 0,
    },
    maxZoom: {
      type: Number,
      default: 1.5,
    },
  },

  data () {
    return{
        model: null,
    }
  },

  mounted(){
    // mounted()の中で、new Croppieを呼び出します
    this.initialize()
  },

  methods: {
    initialize() {
      // DOMを読み込みます
      const el = this.$refs.Cropper;

      const options = {
        enableExif: this.enableExif,
        enableOrientation: this.enableOrientation,
        enableZoom: this.enableZoom,
        enableResize: this.enableResize,
        enforceBoundary: this.enforceBoundary,
        mouseWheelZoom: this.mouseWheelZoom,
        viewport: this.viewport,
        showZoomer: this.showZoomer,
        minZoom: this.minZoom,
        maxZoom: this.maxZoom,
      }

      if (this.boundary !== null) {
        options.boundary = this.boundary
      }

      // Croppieモデルを作ります
      this.model = new Croppie(el, options)
    },

    // 以下の関数は親コンポーネント（OCrop.vue）から呼び出されます
    // croppieの公式ドキュメントに準拠しています

    bind(options) {
      return (this.model).bind(options)
    },
    setZoom(zoom) {
      ;(this.model).setZoom(zoom)
    },
    rotate(degrees) {
      ;(this.model).rotate(degrees)
    },
    get() {
      return (this.model).get()
    },
    result(options) {
      return (this.model).result(options).then(output => output)
    },
    destroy() {
      ;(this.model).destroy()
    },
    refresh(){
      this.destroy()
      this.initialize()
    },
  },
}
</script>

<style lang="scss" scoped>
.a--crop {
  // デフォルトのCSSを上書きすることができます
  // お好みに合わせてどうぞ
    .cr-boundary{
        
    }
  // スライダーの横幅
  .cr-slider-wrap {
    width: 100%;
  }
    .croppie-container{
        box-shadow: none !important;
    }
  // スライダーのデザイン
  .cr-slider[type='range'] {
    appearance: none;
    background-color: #fff;
    height: 5px;
    width: 100%;
    border-radius: 6px;

    &:focus,
    &:active {
      outline: none;
    }

    &::-webkit-slider-thumb {
      appearance: none;
      cursor: pointer;
      position: relative;
      margin-top: -8px;
      border: 2px solid #0c948d;
      width: 22px;
      height: 22px;
      display: block;
      background-color: #fff;
      border-radius: 50%;
    }

    &:active::-webkit-slider-thumb {
      box-shadow: 0 0 0 2px rgba(#4dbac4, 0.1);
      transition: 0.3s ease;
    }
  }
}
</style>
