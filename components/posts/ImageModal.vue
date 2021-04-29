<template>
    <div class="image-modal">
        <transition name="first">
            <div class="image-modal__background" v-if="value" @click.stop="handle(null)" :style="'backgroundImage:url('+ value +')'">
            </div>
        </transition>
        <transition name="first">
            <div class="image-modal__content" v-if="value">
                <img :src="value" alt="" height="980vh" width="auto" />
            </div>
        </transition>
        <transition name="first">
            <v-btn class="d-block image-modal__close-button" fab color="white" v-if="value" @click.stop="handle(null)">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </transition>
    </div>
</template>

<script>
    export default {
        props: {
            zIndex: {
                default: 1000
            },
            value: {
                default: null
            }
        },
        data() {
            return {}
        },
        components: {},
        methods: {
            handle(img) {
                this.$emit('input', img)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .image-modal {
        width: 100vw;
        height: 100vh;

        &__background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(255, 255, 255, 0.8);
            background-blend-mode: lighten;
            z-index: 10000;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
            opacity: .9;

            &:before {
                background: inherit;
                content: '';
                position: absolute;
                top: 0px;
                right: 0px;
                bottom: 0px;
                left: 0px;
                -webkit-filter: blur(20px);
                filter: blur(10px);
                margin: -10px;
                /* blurの値と同じ値だけマイナス */
                width: calc(100% + 20px);
                /* 左右の10ピクセル分加算 */
            }

            &:after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                background: rgba(0, 0, 0, 0.5);
            }
        }

        &__content {
            text-align: center;
            display: flex;
            flex-direction: column;
            opacity: 1;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 10px;

            z-index: 11200;

            img {
                object-fit: cover;
            }
        }

        &__close-button {
            z-index: 11400;
            position: fixed;
            top: 30px;
            right: 30px;
        }

    }
    .first-leave-active,
    .first-enter-active {
        opacity: 1 !important;
        transition: all 150ms;
    }

    /* 表示アニメーション */
    .first-enter,
    .first-leave-to {
        opacity: 0 !important;
    }
</style>