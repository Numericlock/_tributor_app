<template>
        <div class="container">
            <div class="title-wrapper">
                <span class="app-title">-tributor</span>
            </div>
            <div class="control-buttons">
                    <v-btn
                      elevation="2"
                    　to="/register" nuxt
                    >新規登録</v-btn>

                    <v-btn
                      elevation="2"
                    to="/login"
                    >ログイン</v-btn>
            </div>
        </div>
</template>

<script>
    export default {
        middleware: 'logined_user',
        layout: 'beforeAuthPage',
        data() {
            return {}
        },
        components: {
        }
    }
</script>

<style lang="scss" scoped>
        .container{
            position:fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            margin-top: 10px;
            padding: 20px 30px;
            color: #383838;
            fill: #383838;
            background: rgba(255, 255, 255, 0.25);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.18);
            /*background: rgba(62, 62, 62, 0.50);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            backdrop-filter: blur(5.0px);
            -webkit-backdrop-filter: blur(5.0px);
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.18);*/
            .title-wrapper{
                .app-title{
                    font-size:100px;
                    white-space: nowrap;
                }
            }
            .control-buttons{
                display:flex;
                justify-content: space-around;
                width:100%;

            }
        }

</style>