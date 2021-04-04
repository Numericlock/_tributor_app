<template>
    <div class="toppage-wrapper">
        <div class="container">
            <div class="title-wrapper">
                <span class="app-title">-tributor</span>
            </div>
            <div class="control-buttons">
                <NuxtLink to="/resister">
                    <button type="button">新規作成</button>
                </NuxtLink>
                <NuxtLink to="/login">
                    <button type="button">ログイン</button>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        components: {}
    }
</script>

<style lang="scss" scoped>
    .toppage-wrapper{
        background:#36393E;
        overflow: hidden;
        height:100vh;
        width:100vw;
        color: white;
        background: linear-gradient(-135deg, #E4A972, #39ACAC),
            linear-gradient(75deg, #E4A972, #9941D8, #79ffff)fixed;
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
            background: rgba(62, 62, 62, 0.50);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            backdrop-filter: blur(5.0px);
            -webkit-backdrop-filter: blur(5.0px);
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.18);
            .title-wrapper{
                .app-title{
                    font-size:100px;
                }
            }
            .control-buttons{
                display:flex;
                justify-content: space-around;
                width:100%;
                button{
                    color:#333;
                    background:white;
                    border-radius:10px;
                    padding:10px;
                }
            }
        }
    }
</style>