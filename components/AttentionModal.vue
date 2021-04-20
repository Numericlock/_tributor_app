<template>
    <div class="wrapper">
        <transition name="first">
            <div class="attention-modal-background" v-if="value" @click="handle(false)">
            </div>
        </transition>
        <transition　name="first">
            <div class="attention-modal" v-if="value">
                <div class="attention-modal-container">
                    <div class="attention-modal-text">{{text}}</div>
                    <div class="attention-modal-buttons">
                        <v-btn color="red" @click="isAttention = false">NO</v-btn>
                        <v-btn @click="modalRemove">OK</v-btn>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        props: {
            zIndex:{
                default:1000
            },
            text:{},
            value: {
                default: true,
            }
        },
        data() {
            return {
            }
        },
        components: {
        },
        methods: {
            handle(bool) {
                this.$emit('input', bool)
            },
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

    .attention-modal-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(255, 255, 255, 0.8);
        background-blend-mode: lighten;
        z-index: 10002;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        opacity: .9;
    }

    .attention-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10002;
        .attention-modal-container {
            display: flex;
            flex-direction: column;
            text-align: center;
            width: auto;
            min-width: 200px;
            min-height: 150px;
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
        }
    }
</style>