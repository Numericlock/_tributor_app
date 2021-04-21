<template>
    <div class="modal" :style="{'z-index':zIndex}"></div>
</template>

<script>
    export default {
        props:{
            transparency:{
                default:0.7
            },
            zIndex:{
                default:900
            }
        },
        data () {
            return {
            }
        },
        components: {
        }
    }
</script>

<style scoped>
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(255, 255, 255, 0.8);
        background-blend-mode: lighten;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        opacity: .9;
    }
</style>