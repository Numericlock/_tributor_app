<template>
    <div class="wrapper">
        <transition name="first">
            <div class="modal-background" v-if="value">
            </div>
        </transition>
        <transition name="first">
            <div class="modal" v-if="modal && value">
                <div class="modal-container">
                    <div class="modal-header">
                        <div>リストを追加する</div>
                        <v-icon class="close-icon">mdi-close</v-icon>
                    </div>
                    <div class="basic-input">
                        <div class="list-icon-area">
                            <v-avatar color="grey lighten-1 my-5" size="55">

                            </v-avatar>
                        </div>
                        <div class="list-name-area ">
                            <v-text-field class="my-auto" label="List Name" solo></v-text-field>
                        </div>
                    </div>
                    <v-divider class="my-2"></v-divider>
                    <div class="member-input">
                        <div class="listed-members-wrapper pa-2 pl-0 overflow-y-auto">
                            <transition-group name="first">
                                <div class="listed-user-container dark" v-for="(user, index) in listedUsers" :key="user.id">
                                    <v-avatar color="grey lighten-1 my-3 mx-2" size="55">
                                         <img :src="userIconUrl+user.id+'.png'"/>
                                    </v-avatar>
                                    <v-divider vertical></v-divider>
                                    <div class="listed-user-basic">
                                        <div class="user-name">{{user.name}}</div>
                                        <div class="user-id">@{{user.id}}</div>
                                    </div>
                                    <v-btn  class="close-icon  my-auto mr-3" @click="removeListedUsers(user,index)" fab small icon >
                                        <v-icon color="red"  >mdi-close</v-icon>
                                    </v-btn>
                                </div>
                            </transition-group>
                            <!--
                            <span class="listed-user-container2 dark" v-for="n of 9" :key="n">
                                <v-avatar color="grey lighten-1 my-auto" size="30">

                                </v-avatar>
                                
                                <span class="user-id my-auto">@tessssssssssssssssssssssssssssstid</span>
                                <v-icon class="close-icon my-auto mr-1" color="white">mdi-close</v-icon>
                            </span>
-->
                        </div>
                        <v-divider vertical class="mx-1"></v-divider>
                        <div class="member-search-area overflow-y-auto">
                            <v-text-field class="ma-2 search-box" label="User Name or ID" v-model="search" solo></v-text-field>
                            <div class="search-result-container pa-2 pr-0">
                                <transition-group name="first">
                                    <div class="result-user-container dark" v-for="(user, index) in SearchUsers" :key="user.user_id">
                                        <v-avatar color="grey lighten-1 my-3 mx-2" size="55">
                                            <img :src="userIconUrl+user.user_id+'.png'"/>
                                        </v-avatar>
                                        <v-divider vertical></v-divider>
                                        <div class="result-user-basic">
                                            <div class="user-name">{{user.user_name}}</div>
                                            <div class="user-id">@{{user.user_id}}</div>
                                        </div>
                                        <v-btn  class="plus-icon  my-auto mr-3" @click="addListedUsers(user,index)" fab small icon >
                                            <v-icon color="green"  >mdi-plus</v-icon>
                                        </v-btn>

                                    </div>
                                </transition-group>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <v-btn>作成</v-btn>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                default: false,
            }
        },
        data() {
            return {
                modal: true,
                userIconUrl: "http://localhost:8000/img/icon_img/",
                searchStr: '',
                searchTimer: null,
                SearchUsers: [],
                listedUsers: [],
            }
        },
        components: {},
        computed: {
            search: {
                get() {
                    return this.searchStr;
                },
                async set(value) {
                    this.searchStr = value;
                    if(this.searchTimer) clearTimeout(this.searchTimer);
                    this.searchTimer = window.setTimeout(this.searchPost, 700);
                }
            },
            
        },
        methods: {
            handle(bool) {
                this.$emit('input', bool)
            },
            addListedUsers(user,index){
                this.SearchUsers.splice(index,1);
                this.listedUsers.push({id:user.user_id,name:user.user_name});
            },
            removeListedUsers(index){
                this.listedUsers.splice(index,1);
            },
            async searchPost(){
                const data = {
                    str: this.searchStr
                };
                const response = await this.$axios.$post('/search/user', data)
                    .catch(err => {
                        console.log(err)
                    })
                console.log(response);  
                if(this.listedUsers.length != 0){
                    for(let i=0;i<response.length;i++){
                        let flag = false;
                        for(let k=0;k<this.listedUsers.length;k++){
                            if(!flag)if(response[i].user_id == this.listedUsers[k].id) flag = true;
                        }
                        if(!flag) this.SearchUsers.push(response[i]);
                    }
                }else this.SearchUsers = response;
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

    .my-auto {
        margin-top: 20px
    }

    .modal-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(255, 255, 255, 0.8);
        background-blend-mode: lighten;
        z-index: 10000;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        opacity: .9;
    }

    .attention-modal-background {
        z-index: 10002;
    }

    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10001;
    }

    .attention-modal {
        z-index: 10002;
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
            
        }

        .member-input {
            display: flex;
            flex-direction: row;
            height:100%;
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
                    height:60px;
                    top: 8px;
                    z-index: 10002;
                }

                .search-result-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    height:100%;
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
        }
    }
</style>