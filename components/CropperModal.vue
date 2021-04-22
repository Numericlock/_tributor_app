<template>
    <div>
        <transition name="first">
            <ModalBackground :zIndex="zIndex" v-if="value" @click.native="modalAttention()" />
        </transition>
        <transition name="first">
            <div class="cropper-modal" v-show="value" :style="{'z-index':zIndex}">
                <div class="cropper-modal__content">
                    <div class="cropper-modal__cropper-wrapper">
                        <!-- ref="CropperModal"は必須 -->
                        <Cropper ref="CropperModal" enable-orientation :boundary="{ width: 200, height: 200 }" :viewport="{ width: 200, height: 200, type: 'circle' }" />
                    </div>

                    <!-- この後ろはボタン類などの飾り・非本質 -->
                    <div class="cropper-modal__items">
                        <v-icon large @click="handleRotate(90)">mdi-rotate-left</v-icon>
                        <v-icon large @click="handleRotate(-90)">mdi-rotate-right</v-icon>
                    </div>
                    <v-btn class="mt-3" @click.prevent="modalSubmit">適応</v-btn>
                </div>
            </div>
        </transition>
        <AttentionModal :zIndex="zIndex" text="内容が削除されます" @submit="modalRemove()" v-model="isAttention" />
    </div>
</template>

<script>
    import Cropper from '~/components/Cropper.vue'
    import ModalBackground from '~/components/ModalBackground.vue'
    import AttentionModal from '~/components/AttentionModal.vue'
    export default {
        name: 'CropperModal',

        components: {
            Cropper,
            ModalBackground,
            AttentionModal,
        },
        props: {
            value: {
                type: Boolean,
                default: false,
            },
            url: {
                default: 'http://i.imgur.com/fHNtPXX.jpg',
            },
            zIndex: {
                type: Number,
                default: 1000,
            }
        },
        data() {
            return {
                croppedImage: null,
                allowedExtensions: ['image/jpeg', 'image/png'],
                initialZoomPoint: 0, // 初期状態でのスライダーの位置
                isAttention: false,
                //faRedo,
                //faUndo,
                submitting: false,
                defaultImage: 'http://i.imgur.com/fHNtPXX.jpg',
            }
        },

        mounted() {

        },

        methods: {
            initialize() {
                // 一番最初にセットする画像のURL / 本来ならばユーザーのサムネイルなど
                var url;
                if (this.url) url = this.url;
                else url = this.defaultImage;

                ;
                (this.$refs.CropperModal)
                .bind({
                        url,
                    })
                    .then(() => {
                        // ここでスライダーの初期値をセットする（bindのあとにセットするのがポイント）
                        ;
                        (this.$refs.CropperModal).setZoom(this.initialZoomPoint)
                    })
            },
            handle(bool) {
                this.$emit('input', bool)
            },
            handleChange(e) {
                const files = e.target.files
                if (!files || !files.length) return

                const reader = new FileReader()
                reader.onload = (ev) => {
                    ;
                    (this.$refs.CropperModal).bind({
                        url: ev.target.result,
                    })
                }
                reader.readAsDataURL(files[0])
            },
            handleCrop() {
                const options = {
                    type: 'base64',
                    size: {
                        width: 300,
                        height: 300
                    },
                    format: 'jpeg',
                }

                ;
                (this.$refs.CropperModal).result(options).then((output) => this.handleResult(output))
            },
            handleResult(output) {
                this.croppedImage = output

                // 親要素に result イベントを発火する（任意）
                this.$emit('result', this.croppedImage)
            },
            handleRotate(degree = 90) {
                // 画像の回転
                ;
                (this.$refs.CropperModal).rotate(degree)
            },
            handleRefresh() {
                // 初期状態に戻す
                ;
                (this.$refs.CropperModal).refresh()
                this.initialize()
            },
            handleClick() {
                // ここにaxiosなどのサーバーへの処理を書いたら良いでしょう！
            },
            modalAttention() {
                this.isAttention = true;
                //this.modalRemove();
            },
            modalRemove() {
                this.url = null;
                this.handle(false);
            },
            modalSubmit() {
                this.handleCrop();
                this.modalRemove();
            }

        },
        watch: {
            url: function(val, oldVal) {
                this.initialize();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .first-leave-active,
    .first-enter-active {
        opacity: 1 !important;
        transition: all 200ms;
    }

    /* 表示アニメーション */
    .first-enter,
    .first-leave-to {
        opacity: 0 !important;
    }
    .cropper-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: none !important;
        opacity: 1 !important;
        min-width: 200px;
        max-width: 400px;
        min-height: 150px;

        &__content {
            display: flex;
            flex-direction: column;
            text-align: center;
            width: auto;
            justify-content: space-around;
            max-height: 95vh;
            color: #ddd;
            padding: 20px 30px;
            background: rgba(62, 62, 62, 0.50);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            backdrop-filter: blur(5.0px);
            -webkit-backdrop-filter: blur(5.0px);
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.18);

            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
        }

        &__cropper-wrapper {}

        &__items {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
        }
    }
</style>