<template>
    <div class="container">
        <v-stepper v-model="page">
            <v-stepper-header>
                <v-stepper-step :complete="page > 1" step="1">
                    認証設定
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="page > 2" step="2">
                    ユーザー設定
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3">
                    アイコン設定
                </v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-form ref="step_first">
                        <div class="input-wrapper my-5">
                            <v-text-field label="メールアドレス" v-model="email" :rules="[rules.required, rules.email]" outlined />
                            <v-text-field type="password" label="パスワード" v-model="password" :rules="[rules.required, rules.counter, rules.minCounter]" counter maxlength="32" outlined />
                            <v-text-field type="password" label="確認用パスワード" v-model="cPassword" :rules="[rules.required, rules.counter, rules.minCounter, rules.samePassword]" counter maxlength="32" outlined />
                        </div>
                        <div class="d-flex justify-end">
                            <v-btn color="primary" @click="verify(1)" class="ml-auto">
                                次へ
                            </v-btn>
                        </div>
                    </v-form>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-form ref="step_second">
                        <div class="input-wrapper my-5">
                            <v-text-field label="表示名" v-model="name" :rules="[rules.required, rules.counter]" maxlength="14" counter outlined />
                            <v-text-field label="ユーザーID" v-model="userId" :rules="[rules.required, rules.counter]" counter maxlength="32" outlined />
                            <v-dialog ref="dialog" v-model="modal" :return-value.sync="birthOn" persistent width="290px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="birthOn" label="誕生日" append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" outlined></v-text-field>
                                </template>
                                <v-date-picker v-model="birthOn" locale="ja-JP" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="modal = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn text color="primary" @click="$refs.dialog.save(birthOn)">
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </div>
                    </v-form>
                    <div class="d-flex justify-space-between">
                        <v-btn @click="page = 1">
                            戻る
                        </v-btn>
                        <v-btn color="primary" @click="verify(2)">
                            次へ
                        </v-btn>
                    </div>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <div class="d-flex justify-center">
                    <v-avatar color="grey lighten-1 my-auto" size="250" @mouseover="isIconHover = true" @mouseleave="isIconHover = false">
                        <img :src="listIcon" v-if="listIcon" />
                        <v-icon color="white" v-else>mdi-image-plus</v-icon>
                        <transition name="first">
                            <label class="hover-pencil my-auto" for="icon_input" v-if="isIconHover">
                                <v-icon color="white">mdi-pencil</v-icon>
                                <input id="icon_input" class="icon-input" type="file" :accept="allowedExtensions.join(',')" @change="iconChange" />
                            </label>
                        </transition>
                    </v-avatar>
                    </div>
                    <div class="d-flex justify-space-between">
                        <v-btn @click="page = 2">
                            戻る
                        </v-btn>
                        <v-btn color="primary" @click="verify(3)">
                            登録
                        </v-btn>
                    </div>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
        <CropperModal @result="setListIcon" v-model="isIconInput" :url="iconUrl" :zIndex="10000" />
    </div>
</template>

<script>
    import CropperModal from '~/components/CropperModal.vue'
    export default {
        middleware: 'logined_user',
        layout: 'beforeAuthPage',
        data() {
            return {
                page: 1,
                email: '',
                name: '',
                userId: '',
                password: '',
                cPassword: '',
                isIconInput:false,
                isIconHover: false,
                iconUrl: null,
                listIcon:null,
                birthOn: new Date().toISOString().substr(0, 10),
                modal: false,
                allowedExtensions: ['image/jpeg', 'image/png'],
                rules: {
                    required: value => !!value || 'Required.',
                    counter: value => value.length <= 32 || 'Max 32 characters',
                    minCounter: value => value.length >= 8 || 'Min 8 characters',
                    email: value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(value) || 'Invalid e-mail.'
                    },
                    samePassword: value => this.password == value || 'Password is different',
                },
            }
        },
        components: {
            CropperModal,
        },
        methods: {
            async verify(page) {
                switch (page) {
                    case 1:
                        const email_count = await this.emailExists(this.email);
                        if (email_count == 0 && this.$refs.step_first.validate()) this.page = 2;
                        else console.log("failed");
                        break;
                    case 2:
                        const user_id_count = await this.userIdExists(this.userId);
                        if (user_id_count == 0 && this.$refs.step_second.validate()) this.page = 3;
                        else console.log("failed");
                        break;
                    case 3:
                        if(this.$refs.step_first.validate() && this.$refs.step_second.validate()) this.submit();
                        else console.log("failed");
                        break;
                }
            },
            setListIcon(icon) {
                this.listIcon = icon;
            },
            iconChange(e) {
                const files = e.target.files
                if (!files || !files.length) return

                const reader = new FileReader()
                reader.onload = (ev) => {
                    this.iconUrl = ev.target.result;
                    this.isIconInput = true;
                }
                reader.readAsDataURL(files[0])
            },
            async emailExists(email){
                const data = {
                    email:email
                };
                const response = await this.$axios.$post('http://localhost:8000/api/exists/email', data)
                    .catch(err => {
                        console.log(err)
                    })
                console.log(response);
                return Number(response);
            },            
            async userIdExists(user_id){
                const data = {
                    user_id:user_id
                };
                const response = await this.$axios.$post('http://localhost:8000/api/exists/user_id', data)
                    .catch(err => {
                        console.log(err)
                    })
                console.log(response);
                return Number(response);
            },
            async submit() {
                const response = await this.$store.dispatch('authentication/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    c_password: this.cPassword,
                    user_id: this.userId,
                    birth_on: this.birthOn,
                })
                console.log(response);
                if(response) this.$router.push('/home');
                else console.log("入力内容が不正です。");//this.$router.push('/login');
            }
        }
    }
</script>

<style lang="scss" scoped>
    v-stepper {
        width: 100%;
    }

    .container {
        position: fixed;
        color: #ddd;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .title-wrapper {
            .app-title {
                font-size: 100px;
            }
        }
        .hover-pencil {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 100%;
            background: rgba(62, 62, 62, 0.50);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            backdrop-filter: blur(5.0px);
            -webkit-backdrop-filter: blur(5.0px);
            border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .v-stepper{
            color: #383838;
            fill: #383838;
            background: rgba(255, 255, 255, 0.25);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .v-stepper__content, .v-stepper__items{
            background:none;
        }
        .icon-input {
            display: none;
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

        .input-first {
            justify-content: flex-end;
        }
    }

    .first-leave-active,
    .first-enter-active {
        opacity: 1 !important;

    }

    /* 表示アニメーション */
    .first-enter,
    .first-leave-to {
        opacity: 0 !important;
    }
</style>