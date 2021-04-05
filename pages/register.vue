<template>
    <div class="container">
        <v-form @submit.prevent="submit">
            <v-text-field 
                label="メールアドレス" 
                v-model="email" 
                :rules="[rules.required, rules.email]"
                outlined 
            />
            <v-text-field 
                label="表示名" 
                v-model="name"
                :rules="[rules.required, rules.counter]"
                counter
                maxlength="32"
                outlined
            />
            <v-text-field 
                type="password" 
                label="パスワード" 
                v-model="password" 
                :rules="[rules.required, rules.counter, rules.minCounter]"
                counter
                maxlength="32"
                outlined 
            />
            <v-btn type="submit" class="info">登録</v-btn>
        </v-form>
    </div>
</template>

<script>
    export default {
        layout: 'beforeAuthPage',
        data() {
            return {
                email: '',
                name: '',
                password: '',
                rules: {
                  required: value => !!value || 'Required.',
                  counter: value => value.length <= 32 || 'Max 32 characters',
                  minCounter:  value => value.length >= 8 || 'Min 8 characters',
                  email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                  },
                },
            }
        },
        components: {},
        methods: {
//            /async submit () {
//            /  await this.$store.dispatch('users/create', {
//            /    email: this.email,
//            /    name: this.name,
//            /    password: this.password
//            /  })
//            /  this.$router.push('/login');
//            /}
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