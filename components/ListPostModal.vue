<template>
    <div class="wrapper">
        <transition name="first">
            <ModalBackground :zIndex="zIndex" v-if="value" @click.native="modalAttention()" />
        </transition>
        <transition name="first">
            <div class="modal" v-if="modal && value" :style="{'z-index':zIndex}">
                <div class="modal-container">
                    <div class="modal-header">
                        <div>リストを追加する</div>
                        <v-icon class="close-icon" @click="modalAttention()">mdi-close</v-icon>
                    </div>
                    <div class="basic-input">
                        <v-avatar color="grey lighten-1 my-auto" size="55" @mouseover="isIconHover = true" @mouseleave="isIconHover = false">
                            <img :src="listIcon" v-if="listIcon" />
                            <v-icon color="white" v-else>mdi-image-plus</v-icon>
                            <transition name="first">
                                <label class="hover-pencil my-auto" for="icon_input" v-if="isIconHover">
                                    <v-icon color="white">mdi-pencil</v-icon>
                                    <input id="icon_input" class="icon-input" type="file" :accept="allowedExtensions.join(',')" @change="iconChange" />
                                </label>
                            </transition>
                        </v-avatar>
                        <v-text-field class="mt-7 ml-3" label="List Name" v-model="listName" solo></v-text-field>
                        <div class="checkbox-wrapper">
                            <v-simple-checkbox v-model="isPublish" color="green" class="pl-2 mt-7"></v-simple-checkbox>
                            <label>{{checkboxLabel}}</label>
                        </div>
                    </div>
                    <v-divider class="my-2"></v-divider>
                    <div class="member-input">
                        <div class="listed-members-wrapper pa-2 pl-0 overflow-y-auto">
                            <transition-group name="first">
                                <div class="listed-user-container dark" v-for="(user, index) in listedUsers" :key="user.id">
                                    <v-avatar color="grey lighten-1 my-3 mx-2" size="55">
                                        <img :src="userIconUrl+user.id+'.png'" />
                                    </v-avatar>
                                    <v-divider vertical></v-divider>
                                    <div class="listed-user-basic">
                                        <div class="user-name">{{user.name}}</div>
                                        <div class="user-id">@{{user.id}}</div>
                                    </div>
                                    <v-btn class="close-icon  my-auto mr-3" @click="removeListedUsers(user,index)" fab small icon>
                                        <v-icon color="red">mdi-close</v-icon>
                                    </v-btn>
                                </div>
                            </transition-group>
                        </div>
                        <v-divider vertical class="mx-1"></v-divider>
                        <div class="member-search-area overflow-y-auto">
                            <v-text-field class="ma-2 search-box" label="User Name or ID" v-model="search" solo></v-text-field>
                            <div class="search-result-container pa-2 pr-0">
                                <transition-group name="first">
                                    <div class="result-user-container dark" v-for="(user, index) in SearchUsers" :key="user.user_id">
                                        <v-avatar color="grey lighten-1 my-3 mx-2" size="55">
                                            <img :src="userIconUrl+user.user_id+'.png'" />
                                        </v-avatar>
                                        <v-divider vertical></v-divider>
                                        <div class="result-user-basic">
                                            <div class="user-name">{{user.user_name}}</div>
                                            <div class="user-id">@{{user.user_id}}</div>
                                        </div>
                                        <v-btn class="plus-icon  my-auto mr-3" @click="addListedUsers(user,index)" fab small icon>
                                            <v-icon color="green">mdi-plus</v-icon>
                                        </v-btn>

                                    </div>
                                </transition-group>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <v-btn @click="postRequest()">作成</v-btn>
                    </div>
                </div>
            </div>
        </transition>
        <AttentionModal :zIndex="zIndex" text="内容が削除されます" @submit="modalRemove()" v-model="isAttention" />
        <CropperModal @result="setListIcon" v-model="isIconInput" :url="iconUrl" :zIndex="zIndex" />
    </div>
</template>

<script>
    import ModalBackground from '~/components/ModalBackground.vue'
    import AttentionModal from '~/components/AttentionModal.vue'
    import CropperModal from '~/components/CropperModal.vue'

    export default {
        props: {
            value: {
                default: false,
            },
            zIndex: {
                default: 1000
            },
        },
        data() {
            return {
                modal: true,
                isAttention: false,
                isIconInput: false,
                isIconHover: false,
                userIconUrl: "http://localhost:8000/img/icon_img/",
                searchStr: '',
                searchTimer: null,
                listName: '',
                SearchUsers: [],
                listedUsers: [],
                isPublish: true,
                iconUrl: null,
                listIcon: null,
                allowedExtensions: ['image/jpeg', 'image/png'],
            }
        },
        components: {
            ModalBackground,
            AttentionModal,
            CropperModal,
        },
        computed: {
            search: {
                get() {
                    return this.searchStr;
                },
                async set(value) {
                    this.searchStr = value;
                    if (this.searchTimer) clearTimeout(this.searchTimer);
                    this.searchTimer = window.setTimeout(this.searchPost, 700);
                }
            },
            checkboxLabel() {
                return (this.isPublish ? '公開' : '非公開');
            },
        },
        methods: {
            handle(bool) {
                this.$emit('input', bool)
            },
            addListedUsers(user, index) {
                this.SearchUsers.splice(index, 1);
                this.listedUsers.push({
                    id: user.user_id,
                    name: user.user_name
                });
            },
            removeListedUsers(index) {
                this.listedUsers.splice(index, 1);
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
            setListIcon(icon) {
                this.listIcon = icon;
            },
            postValidate() {
                if (this.listName.trim() && typeof(this.isPublish) == "boolean") return true;
                else return false;
            },
            async searchPost() {
                const data = {
                    str: this.searchStr
                };
                const response = await this.$axios.$post('/search/user', data)
                    .catch(err => {
                        console.log(err)
                    })
                if (this.listedUsers.length != 0) {
                    for (let i = 0; i < response.length; i++) {
                        let flag = false;
                        for (let k = 0; k < this.listedUsers.length; k++) {
                            if (!flag)
                                if (response[i].user_id == this.listedUsers[k].id) flag = true;
                        }
                        if (!flag) this.SearchUsers.push(response[i]);
                    }
                } else this.SearchUsers = response;
            },
            async postRequest() {
                if (this.postValidate()) {
                    let userIds = [];
                    if (this.listedUsers.length != 0) userIds = this.listedUsers.map(user => user.id);
                    var data = {
                        name: this.listName,
                        icon: this.listIcon,
                        publish: this.isPublish,
                        users: userIds,
                    };
                    await this.$store.dispatch('list/create', data)
                    this.modalRemove();
                }
            },
            modalAttention() {
                if (this.postValidate()) this.isAttention = true;
                else this.modalRemove();
            },
            modalRemove() {
                this.listIcon = null;
                this.listName = '';
                this.isPublish = true;
                this.listedUsers = [];
                this.searchStr = '';
                this.SearchUsers = [];
                this.handle(false);
            },
        }
    }
</script>

<style lang="scss" scoped>
    $card-color: #36393E;

    /* スクロールの幅の設定 */
    *::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }

    /* スクロールの背景の設定 */
    *::-webkit-scrollbar-track {
        border-radius: 5px;
        box-shadow: 0 0 4px #aaa inset;
    }

    /* スクロールのつまみ部分の設定 */
    *::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: #666;
    }

    .dark {
        background: rgba(62, 62, 62, 0.50);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(5.0px);
        -webkit-backdrop-filter: blur(5.0px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.18);
    }

    .first-leave-active,
    .first-enter-active {
        opacity: 1 !important;
        transition: all 200ms;
    }

    /* 表示アニメーション */
    .first-enter,
    .first-leave-to {
        opacity: 0 !important;
    }

    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .modal-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: center;
        width: 600px;
        min-width: 200px;
        height: 95vh;
        max-height: 95vh;
        min-height: 300px;


        background-color: #36393E;
        border-radius: 6px;
        border-color: none;

        color: #ddd;
        padding: 20px 30px;
        background: rgba(62, 62, 62, 0.50);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(5.0px);
        -webkit-backdrop-filter: blur(5.0px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.18);

        .modal-header {
            position: relative;

            .close-icon {
                position: absolute;
                right: 0;
                top: 0;
            }
        }

        .basic-input {
            display: flex;
            flex-direction: row;
            height: 100px;

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

            .checkbox-wrapper {
                width: 80px;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
        }

        .member-input {
            display: flex;
            flex-direction: row;
            height: 100%;
            max-height: calc(100% - 200px);

            .listed-members-wrapper {
                width: 50%;
                max-width: 50%;
                display: flex;
                flex-direction: column;

                .listed-user-container {
                    display: flex;
                    flex-direction: row;
                    border-radius: 10px;
                    padding: 2px;

                    .listed-user-basic {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        padding-left: 10px;
                        text-align: left;
                        position: relative;
                        width: 100%;

                        .user-name {}

                        .user-id {
                            word-wrap: break-word;
                        }

                        .close-icon {
                            position: absolute;
                            right: 0;
                        }
                    }
                }

                .listed-user-container2 {
                    display: flex;
                    flex-direction: row;
                    min-height: 30px;

                    border-radius: 15px !important;
                    max-width: 100%;
                    overflow-wrap: break-word;

                    .user-name {}

                    .user-id {
                        //max-width:calc(100% - 25px - 20px);
                        overflow-wrap: break-word;
                        word-break: break-all;
                        text-align: left;
                    }

                    .close-icon {}
                }
            }

            .member-search-area {
                width: 50%;
                display: flex;
                flex-direction: column;

                .search-box {
                    position: sticky;
                    height: 60px;
                    top: 8px;
                    z-index: 10002;
                }

                .search-result-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    height: 100%;

                    .result-user-container {
                        display: flex;
                        flex-direction: row;
                        border-radius: 10px;
                        padding: 2px;

                        .result-user-basic {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            padding-left: 10px;
                            text-align: left;
                            position: relative;
                            width: 100%;

                            .user-name {}

                            .user-id {}

                            .plus-icon {
                                position: absolute;
                                right: 0;
                            }
                        }
                    }
                }
            }
        }

        .modal-footer {
            display: flex;
            justify-content: space-between;
            justify-content: flex-end;
        }
    }
</style>