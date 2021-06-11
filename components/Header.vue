<template>
    <div class="header">
        <span class="header__app-title" @click="$router.push('/');">
            <v-icon>mdi-gift-outline</v-icon>_tributor
        </span>        
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        components: {

        }
    }
</script>

<style lang="scss" scoped>
    .header {
        position: fixed;
        top: 0;
        width: 100%;
        height: 40px;
        padding: 0px 15px;
        color: #383838;
        fill: #383838;
        background: rgba(255, 255, 255, 0.25);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        border: 1px solid rgba(255, 255, 255, 0.18);

        &__app-title {
            line-height: 40px;
            vertical-align: middle;
            border-radius: 5px;
            padding: 5px 10px;
            height: 40px;
            transition: all 0.2s;
            white-space: nowrap;
            &:hover {
                background: rgba(255, 255, 255, 0.25);
                box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
                transition: all 0.3s;
            }
        }
    }
</style>