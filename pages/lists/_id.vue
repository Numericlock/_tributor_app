<template>
    <div class="list px-8">
        <div class="list__basic">
            <v-avatar color="grey lighten-1 my-auto" size="55">
                <img  :src="listIconUrl+id+'.png'"/>
            </v-avatar>
            <div class="text-xl-h4 text-lg-h5 text-md-h6 text-sm-h6 text-caption font-weight-bold my-auto ml-4">{{listBasic.name}}</div>
            <v-btn class="d-block text-center my-auto ml-auto" fab small color="gray">
                <v-icon>
                    mdi-dots-horizontal
                </v-icon>
            </v-btn>
        </div>
        <v-divider class="my-2"></v-divider>
        <div class="list__navigation">
            <v-btn icon fab class="mx-auto my-auto" @click.stop="isPostPage = true">
                <v-icon>mdi-message</v-icon>
            </v-btn>
            <v-divider vertical class="my-2"></v-divider>
            <v-btn icon fab class="mx-auto my-auto" @click.stop="isPostPage = false">
                <v-icon>mdi-account-multiple</v-icon>
            </v-btn>
        </div>
        <v-divider class="my-2"></v-divider>
        <div class="list__posts" v-show="isPostPage"></div>
        <div class="list__users" v-show="!isPostPage">
            <div class="user-container pa-3" v-for="user in listUsers">
                <v-avatar color="grey lighten-1 my-auto" size="55"><img :src="userIconUrl+user.users_id+'.png'" @error="imgUrlAlt"/></v-avatar>
                <div class="wrapper ml-3 py-2">
                    <div>{{user.users_name}}</div>
                    <div>@{{user.users_id}}</div>
                </div>
                <v-btn class="d-block text-center my-auto ml-auto" fab small color="gray">
                    <v-icon>
                        mdi-dots-horizontal
                    </v-icon>
                </v-btn>
            </div>
        </div>
        <AttentionModal text="リストを削除しますか？" v-model="isAttention" />
    </div>
</template>
<script>
    import AttentionModal from '~/components/AttentionModal.vue'
    export default {
        middleware: 'not_logined_user',
        layout: 'main2',
        async fetch({
            store,route
        }) {
         //   console.log(route.params.id);
         //   const data = {
         //       id:route.params.id
         //   };
         //   console.log(data);
         //   const list = await store.dispatch('list/read', data);
        },
        props: {
            list: {
                default:-1,
            },
        },
        data() {
            return {
                listBasic: [],
                listUsers: [],
                usersCount: 0,
                isPostPage:true,
                userIconUrl: "http://localhost:8000/img/icon_img/",
                userErrorIcon: "default.png",
                listIconUrl: 'http://localhost:8000/img/list_icon/',
                
                isAttention: false,
            }
        },
        components: {
            AttentionModal,
        },
        computed:{
            id() {
                return this.$route.params.id;
            }
        },
        methods: {
            async getData(){
                const data = {
                    id:this.id
                };
                console.log(data);
                const list = await this.$store.dispatch('list/read', data);  
                this.listBasic = list.current_list;
                this.listUsers = list.list_users;
                this.usersCount = list.count;
                console.log(list);
            },
            imgUrlAlt(event){
                event.target.src = this.userIconUrl+this.userErrorIcon;
            }
        },
        created(){
            this.getData();
        }
    }
</script>

<style lang="scss" scoped>
    .list {
        display: flex;
        flex-direction: column;

        &__basic {
            display: flex;
            flex-direction: row;

            div {
                vertical-align: middle;
            }
        }

        &__navigation {
            display: flex;
            flex-direction: row;
        }

        &__posts {
            display: flex;
            flex-direction: column;
        }
        
        &__users {
            display: flex;
            flex-direction: column;
            .user-container{
                display: flex;
                flex-direction: row; 
                .wrapper{
                    display: flex;
                    flex-direction: column;
                }
            }
        }
    }
</style>