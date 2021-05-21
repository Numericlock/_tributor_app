<template>
    <div class="profile">
        <div class="profile__header overflow-y-auto">
            <v-responsive :aspect-ratio="16/9">
                <v-img src="https://picsum.photos/id/11/500/300">

                </v-img>
            </v-responsive>
        </div>
        <div class="profile__user">
            <div class="icon">
                <v-avatar class="d-block text-center" color="grey lighten-1" size=80>
                    <img alt="Avatar" class="user-icon" :src="userIconUrl+profile.user_id+'.png'" v-if="profile.user_id" />
                </v-avatar>
            </div>
            <div class="name-wrapper ml-5 py-5">
                <div class="text-xl-h6 text-lg-h6 text-md-h6 text-sm-h6 text-caption-body-1 font-weight-bold name">{{profile.name}}</div>
                <div class="text-caption-body-2 id">@{{profile.user_id}}</div>
            </div>
        </div>
        <v-divider class="my-2"></v-divider>
        <div class="profile__tab">
            <Tab :tabList="tabList" v-model="tab">
                <template  v-slot:tribute>
                    <section class="posts-wrapper overflow-y-auto" @scroll="getScrollParam" ref="postsWrapper">
                        <Posts :posts = "posts"/>
                    </section>
                </template>
                <template  v-slot:reply>
                    <section class="posts-wrapper overflow-y-auto">
                        <Posts :posts = "reply"/>
                    </section>
                </template>
                <template  v-slot:media>
                    <section class="posts-wrapper overflow-y-auto">
                        <Posts :posts = "media"/>
                    </section>
                </template>
                <template  v-slot:like>
                    <p>like</p>
                </template>
            </Tab>
        </div>
        <div class="profile__timeline">
        </div>
    </div>
</template>

<script>
    import Tab from '~/components/tab.vue'
    import Posts from '~/components/posts/Posts.vue'
    export default {
        middleware: 'not_logined_user',
        layout: 'main2',
        async fetch({
            store,
            route
        }) {
            //   console.log(route.params.id);
            //   const data = {
            //       id:route.params.id
            //   };
            //   console.log(data);
            //   const list = await store.dispatch('list/read', data);
        },
        data() {
            return {
                profile: [],
                posts:[],
                media:[],
                reply:[],
                tab: null,
                tabList:['tribute','reply','media','like'],
                userIconUrl: "http://localhost:8000/img/icon_img/",
                userErrorIcon: "default.png",
                listIconUrl: 'http://localhost:8000/img/list_icon/',
                scroll:0,//スクロール量
                BottomPosition:0,
                postsWrapper:null,
            }
        },
        components: {
            Tab,
            Posts,
        },
        computed: {
            id() {
                return this.$route.params.id;
            }
        },
        methods: {
            async getData() {
                const data = {
                    user_id: this.id
                };
                const profile = await this.$store.dispatch('profile/read', data);
                this.profile = profile;
                this.posts = await this.$axios.$get('/profile/posts/'+data.user_id)            .catch(err => {
                        console.log(err)
                    });
                console.log(this.posts);
                this.media = await this.$axios.$get('/profile/media/'+data.user_id)            .catch(err => {
                        console.log(err)
                    });                
                this.reply = await this.$axios.$get('/profile/reply/'+data.user_id)            .catch(err => {
                        console.log(err)
                    });
                console.log(this.reply);
                //this.listUsers = profile.list_users;
                //this.usersCount = profile.count;
                console.log(profile);
            },
            imgUrlAlt(event) {
                event.target.src = this.userIconUrl + this.userErrorIcon;
            },
            getScrollParam:function(e){
                this.scroll = e.target.scrollTop;
                console.log(this.scroll);
                console.log(this.getScrollBottom());
                this.BottomPosition=this.getScrollBottom();
                if( this.scroll > this.BottomPosition-(this.postsWrapper.offsetHeight*0.9)){
                    console.log("bottomPos");
                    this.getBeforePosts();
                }else if(this.scroll < this.postsWrapper.offsetHeight*0.9){
                    console.log("topPos");  
                }
            },
            getScrollBottom(){
                return this.postsWrapper.scrollHeight - this.postsWrapper.offsetHeight;
            },
            async getBeforePosts() {
                var data = {
                    num: this.last_post.post_at
                };
                await this.$store.dispatch('home/getBeforePosts', data)
            },
        },
        created() {
            this.getData();
        },
        mounted(){
            const dom = this.$refs.postsWrapper; 
            this.postsWrapper  = this.$refs.postsWrapper; 
        }
    }
</script>

<style lang="scss" scoped>
    .profile {
        display: flex;
        flex-direction: column;
        max-height:97vh !important;
        &__user {
            display: flex;
            width: 100%;
            padding: 10px 15px;

            .icon {}

            .name-wrapper {
                display: flex;
                flex-direction: column;

                .name {}

                .id {}
            }
        }
        &__tab {
            .posts-wrapper{
                overflow-x:hidden; 
            }
        }
    }
</style>