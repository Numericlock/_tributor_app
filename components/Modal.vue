<template>
    <div v-show="display">
        <ModalBackground @click="close()" transparency="0.1" zIndex="10000"/>
        <transition name="fade">
            <div class="modal-content">
                
            </div>
        </transition>
    </div>
</template>
<script>
    import ModalBackground from './ModalBackground.vue'
    export default {
        name: "Modal",
        props: ['title', 'time', 'sound_path', 'sound_name'],
        data: function() {
            return {
                display: false,
                isAlarm: true,
            };
        },
        computed: {

        },
        methods: {
            open() {
                this.display=true;
            },
            close: function() {
                this.display=false;
            }
        },
        components: {
            ModalBackground
        }
    };

</script>
<style lang="scss" scoped>
    .modal-content {
        text-align: center;
        display: flex;
        flex-direction: column;
        opacity: 1;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 30px;
        height: 400px;
        width: 300px;
        z-index: 11200;
        canvas {
            background-size: cover;
            border-radius: 15px;
        }

        .title {}

        .time {
            font-size: 20px;
        }

        div {
            .close-button {
                background: none;
                border: none;
                vertical-align: middle;
                width: 150px;
                height: 50px;
                margin: 15px;
                font-size: 30px;
                font-weight: bold;
                color:white;
                background: rgba( 255, 0, 0, 0.90 );
                box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
                backdrop-filter: blur( 4.5px );
                -webkit-backdrop-filter: blur( 4.5px );
                border-radius: 10px;
            }
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        will-change: opacity;
        transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0
    }

</style>
