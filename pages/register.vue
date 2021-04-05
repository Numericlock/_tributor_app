<template>
    <div class="toppage-wrapper">
        <div class="container">
            <v-form @submit.prevent="submit">
                <v-text-field label="メールアドレス" v-model="email" filled/>
                <v-text-field label="ユーザーID" filled></v-text-field>
                <v-text-field type="password" label="パスワード" v-model="password" filled/>
                <v-btn type="submit" class="info">登録</v-btn>
            </v-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                email: '',
                password: ''
            }
        },
        components: {}
    }
</script>

<style lang="scss" scoped>
    .toppage-wrapper {
        background: #36393E;
        overflow: hidden;
        height: 100vh;
        width: 100vw;
        color: white;
        background: linear-gradient(-135deg, #E4A972, #39ACAC),
            linear-gradient(75deg, #E4A972, #9941D8, #79ffff)fixed;

        .container {
            position: fixed;
            color: #ddd;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            color:#383838;
            fill:#383838;
            background: rgba( 255, 255, 255, 0.25 );
            box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
            backdrop-filter: blur( 4px );
            -webkit-backdrop-filter: blur( 4px );
            border-radius: 10px;
            border: 1px solid rgba( 255, 255, 255, 0.18 );

            .title-wrapper {
                .app-title {
                    font-size: 100px;
                }
            }

            .control-buttons {
                display: flex;
                justify-content: space-around;
                width: 100%;

                button {
                    color: #333;
                    background: white;
                    border-radius: 10px;
                    padding: 10px;
                }
            }
        }
    }
</style>