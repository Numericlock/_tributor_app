<template>
  <div class="o--crop">
    <div class="o--crop__wrapper">
      <div>
        <!-- ref="CropperModal"は必須 -->
        <Cropper
          ref="CropperModal"
          enable-orientation
          :boundary="{ width: 150, height: 150 }"
          :viewport="{ width: 100, height: 100, type: 'circle' }"
        />
      </div>

      <!-- この後ろはボタン類などの飾り・非本質 -->
      <div class="o--crop__items">
        <label for="o--crop__input" class="o--crop__label mb-16">
          画像をアップロード
          <input
            id="o--crop__input"
            class="o--crop__input"
            type="file"
            :accept="allowedExtensions.join(',')"
            @change="handleChange"
          />
        </label>

        <div class="flex align-center mb-16">
          <span class="mr-12">画像の回転:</span>
          <!--<fa class="o--crop__rotate undo mr-4" :icon="faUndo" @click="handleRotate(90)" />
          <fa class="o--crop__rotate redo" :icon="faRedo" @click="handleRotate(-90)" />-->
        </div>

        <div class="flex align-center">
          <span class="mr-12">リセット:</span>
          <div class="o--crop__reset" @click.prevent="handleRefresh">初めに戻す</div>
        </div>
      </div>
    </div>

    <button @click.prevent="handleCrop">切り取る</button>
    <button @click.prevent="handleClick">更新</button>
  </div>
</template>

<script lang="ts">
import Cropper from '~/components/Cropper.vue'

export default {
  name: 'CropperModal',

  components: {
    Cropper,
  },

  data(){
    return{
        croppedImage: null,
        allowedExtensions: ['image/jpeg', 'image/png'],
        initialZoomPoint: 0, // 初期状態でのスライダーの位置
        //faRedo,
        //faUndo,
        submitting: false,
    }
  },

  mounted() {
    this.initialize()
  },

  methods: {
    initialize() {
      // 一番最初にセットする画像のURL / 本来ならばユーザーのサムネイルなど
      const url = 'http://i.imgur.com/fHNtPXX.jpg'

      ;(this.$refs.CropperModal)
        .bind({
          url,
        })
        .then(() => {
          // ここでスライダーの初期値をセットする（bindのあとにセットするのがポイント）
          ;(this.$refs.CropperModal).setZoom(this.initialZoomPoint)
        })
    },
    handleChange(e) {
      const files = e.target.files
      if (!files || !files.length) return

      const reader = new FileReader()
      reader.onload = (ev) => {
          console.log(ev);
        ;(this.$refs.CropperModal).bind({
          url: ev.target.result,
        })
      }
      reader.readAsDataURL(files[0])
    },
    handleCrop(){
      const options = {
        type: 'base64',
        size: { width: 300, height: 300 },
        format: 'jpeg',
      }

      ;(this.$refs.CropperModal).result(options).then((output) => this.handleResult(output))
    },
    handleResult(output) {
      this.croppedImage = output

      // 親要素に result イベントを発火する（任意）
      this.$emit('result', this.croppedImage)
    },
    handleRotate(degree = 90) {
      // 画像の回転
      ;(this.$refs.CropperModal).rotate(degree)
    },
    handleRefresh() {
      // 初期状態に戻す
      ;(this.$refs.CropperModal).refresh()
      this.initialize()
    },
    handleClick() {
      // ここにaxiosなどのサーバーへの処理を書いたら良いでしょう！
    },
  },
}
</script>

<style lang="scss" scoped>
.o--crop {
  &__wrapper {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    margin-bottom: 48px;
  }

  &__label > &__input {
    display: none;
  }

  &__label {
    padding: 1rem 1.5rem;
    color: #fff;
    background: #0c948d;
    border-radius: 4px;
    cursor: pointer;
  }

  &__items {
    display: flex;
    flex-direction: column;
  }

  &__rotate {
    font-size: 2rem;
    color: #0c948d;
    padding: 4px;
    cursor: pointer;
  }

  &__reset {
    border: 1px solid #bbb;
    color: colors(black);
    background: #fafafa;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.9rem;
    cursor: pointer;
  }
}
</style>