<template>
    <div class="container">
        <h1 class="display-1 mt-5">ログイン</h1>
        <v-form @submit.prevent="submit">
            <v-text-field label="メールアドレス" v-model="email" outlined />
            <v-text-field type="password" label="パスワード" v-model="password" outlined />
            <v-btn type="submit" class="info">ログイン</v-btn>
        </v-form>
    </div>
</template>

<script>
    export default {
        middleware: 'logined_user',
        layout: 'beforeAuthPage',
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            async submit() {
                const response = await this.$store.dispatch('authentication/login', {
                    email: this.email,
                    password: this.password
                })
                if(response) this.$router.push('/home');
                else console.log("入力内容が不正です。");
            }
        }
    }
</script>

<style lang="scss" scoped>
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
        color: #383838;
        fill: #383838;
        background: rgba(255, 255, 255, 0.25);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.18);

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
</style>