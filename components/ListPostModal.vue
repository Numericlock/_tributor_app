<template>
    <div class="wrapper">
        <transition name="first">
            <div class="modal-background" v-if="value">
            </div>
        </transition>
        <transition name="first">
            <div class="modal" v-if="modal && value">
                <div class="modal-container">
                    <div class="modal-header">
                        <div>リストを追加する</div>
                        <v-icon class="close-icon">mdi-close</v-icon>
                    </div>
                    <v-divider class="my-2"></v-divider>
                    <div class="modal-content">
                        <div class="basic-input my-auto py-auto">
                            <div class="list-icon-area">
                                <v-avatar class="my-auto" color="grey lighten-1" size="55">

                                </v-avatar>
                            </div>
                            <div class="list-name-area py-auto">
                                <v-text-field class="my-auto" label="List Name" solo></v-text-field>
                            </div>
                        </div>
                        <div class="member-input">
                            <div class="list-members-wrapper"></div>
                            <div class="member-search-area"></div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <v-btn >作成</v-btn>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                default: false,
            }
        },
        data() {
            return {
                modal: true
            }
        },
        components: {},
        methods: {
            handle(bool) {
                this.$emit('input', bool)
            },
        }
    }
</script>

<style lang="scss" scoped>
    /* スクロールの幅の設定 */
    *::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }

    /* スクロールの背景の設定 */
    *::-webkit-scrollbar-track {
        border-radius: 5px;
        box-shadow: 0 0 4px #aaa inset;
    }

    /* スクロールのつまみ部分の設定 */
    *::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: #666;
    }

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

    .modal-background {
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
    }

    .attention-modal-background {
        z-index: 10002;
    }

    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10001;

    }

    .attention-modal {
        z-index: 10002;
    }

    .modal-container {
        display: flex;
        flex-direction: column;
        text-align: center;
        width: 600px;
        min-width: 200px;
        max-height: 95vh;
        min-height: 300px;


        background-color: #36393E;
        border-radius: 6px;
        border-color: none;


        color: #ddd;
        padding: 20px 30px;
        background: rgba(62, 62, 62, 0.50);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(5.0px);
        -webkit-backdrop-filter: blur(5.0px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.18);

        .modal-header {
            position: relative;

            .close-icon {
                position: absolute;
                right: 0;
                top: 0;
            }
        }

        .modal-content {
            display: flex;
            flex-direction: column;

            .basic-input {
                display: flex;
                flex-direction: row;
                height: 100px;
            }
        }

        .modal-footer {
            display: flex;
            justify-content: space-between;

            #image_file_input {
                display: none;
            }
        }
    }
</style>