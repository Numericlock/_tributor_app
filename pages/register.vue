<template>
    <div class="container">
        <!--          <transition name="first">
                <div　v-if="page == 1">
                    <div class="input-wrapper" >
                            <v-text-field 
                                label="メールアドレス" 
                                v-model="email" 
                                :rules="[rules.required, rules.email]"
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
                    </div>
                    <div class="control-buttons input-first">
                        <v-btn @click="page++">次へ</v-btn>
                    </div>
                </div>
            </transition>
            <transition name="first">
                <div　v-if="page == 2">
                    <div class="input-wrapper" >
                            <v-text-field 
                                label="メールアドレス" 
                                v-model="email" 
                                :rules="[rules.required, rules.email]"
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
                    </div>
                    <div class="control-buttons">
                        <v-btn @click="page--">戻る</v-btn>
                        <v-btn @click="page++">次へ</v-btn>
                    </div>
                </div>
            </transition>
            <transition name="first">
                <div　v-if="page == 3">
                    <div class="input-wrapper" v-if="page == 3">
                            <v-text-field 
                                label="メールアドレス" 
                                v-model="email" 
                                :rules="[rules.required, rules.email]"
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
                    </div>
                    <div class="control-buttons">
                        <v-btn @click="page--">戻る</v-btn>
                        <v-btn type="submit" class="register">登録</v-btn>
                    </div>
                </div>
            </transition> -->
        <v-stepper v-model="page">
            <v-stepper-header>
                <v-stepper-step :complete="page > 1" step="1">
                    Name of step 1
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="page > 2" step="2">
                    Name of step 2
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3">
                    Name of step 3
                </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-form ref="page_one">
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
                    <v-form ref="page_two">
                        <div class="input-wrapper my-5">
                            <v-text-field label="表示名" v-model="name" :rules="[rules.required, rules.counter]" maxlength="14" counter outlined />
                            <v-text-field label="ユーザーID" v-model="userId" :rules="[rules.required, rules.counter]" counter maxlength="32" outlined />
                            <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="date" label="誕生日" append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" outlined></v-text-field>
                                </template>
                                <v-date-picker v-model="date" locale="ja-JP" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="modal = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn text color="primary" @click="$refs.dialog.save(date)">
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
                    <v-avatar color="grey lighten-1 mb-5" size="250" @mouseover="isIconHover = true" @mouseleave="isIconHover = false">
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
                        <v-btn color="primary" type="verify(3)">
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
        layout: 'beforeAuthPage',
        data() {
            return {
                page: 3,
                email: '',
                name: '',
                userId: '',
                password: '',
                cPassword: '',
                isIconInput:false,
                isIconHover: false,
                iconUrl: null,
                listIcon:null,
                date: new Date().toISOString().substr(0, 10),
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
            verify(page) {
                switch (page) {
                    case 1:
                        if (this.$refs.page_one.validate()) this.page = 2;
                        break;
                    case 2:
                        if (this.$refs.page_two.validate()) this.page = 3;
                        break;
                    case 3:
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
            async submit() {
                await this.$store.dispatch('auth/register', {
                    email: this.email,
                    name: this.name,
                    password: this.password
                })
                this.$router.push('/login');
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