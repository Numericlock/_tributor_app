<template>
    <div class="wrapper">
        <transition name="first">
            <ModalBackground :zIndex="zIndex" v-if="value" @click.native="handle(false)"/>
        </transition>
        <transition　name="first">
            <div class="attention-modal" v-if="value" :style="{'z-index':zIndex}">
                <div class="attention-modal-container">
                    <div class="attention-modal-text">{{text}}</div>
                    <div class="attention-modal-buttons">
                        <v-btn color="red" @click="handle(false)">NO</v-btn>
                        <v-btn @click="submit()">OK</v-btn>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import ModalBackground from '~/components/ModalBackground.vue'
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
            ModalBackground,
        },
        methods: {
            handle(bool) {
                this.$emit('input', bool)
            },
            submit() {
                this.handle(false);
                this.$emit('submit')
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

    .attention-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
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
            .attention-modal-buttons{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
        }
    }
</style>