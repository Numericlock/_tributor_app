<template>
    <section class="lists-wrapper overflow-y-auto">
        <NuxtLink :to="{name: 'lists-id', params: {id: list.id}}" class="list-container" v-for="(list, index) in lists" :key="index">
            <div class="list-basic-container">
                <v-avatar size="55">
                    <img alt="Avatar" class="list-icon" :src="listIconUrl+list.id+'.png'" />
                </v-avatar>
                <div class="text-xl-h4 text-lg-h5 text-md-h6 text-sm-h6 text-caption font-weight-bold my-auto ml-4">{{ list.name }}</div>
                <v-btn class="d-block text-center mx-auto my-auto" fab  small color="gray">
                    <v-icon >
                        mdi-dots-horizontal
                    </v-icon>
                </v-btn>
            </div>
            <div class="user-icon-container">
                <v-avatar size="45">
                    <img alt="Avatar" class="list-icon" :src="listIconUrl+list.id+'.png'" />
                </v-avatar>
                <v-avatar size="45">
                    <img alt="Avatar" class="list-icon" :src="listIconUrl+list.id+'.png'" />
                </v-avatar>
                <v-avatar size="45">
                    <img alt="Avatar" class="list-icon" :src="listIconUrl+list.id+'.png'" />
                </v-avatar>
                <v-avatar size="45">
                    <img alt="Avatar" class="list-icon" :src="listIconUrl+list.id+'.png'" />
                </v-avatar>
    
            </div>
        </NuxtLink>
    </section>
</template>

<script>
    import modal from '~/components/Modal.vue'
    export default {
        //middleware: 'not_logined_user',
        //layout: 'home',

        layout: 'main2',
        components: {
            modal
        },
        data: () => ({
            userIconUrl: "http://localhost:8000/img/icon_img/",
            postImageUrl: "http://localhost:8000/img/post_img/",
            listIconUrl: "http://localhost:8000/img/list_icon/",
            selectedImage: null,
            scroll: 0, //スクロール量
            BottomPosition: 0,
            homeWrapper: null,

        }),
        computed: {
            lists() {
                //console.log("e?:"+this.$store.getters['list/list']);
                return this.$store.getters['list/list']
            },
        },
        methods: {
            imageZoom(url) {
                console.log(url);
                this.selectedImage = url;
            },
            async getBeforePosts() {
                var data = {
                    num: this.last_post.post_at
                };
                await this.$store.dispatch('home/getBeforePosts', data)
            },
        },
        mounted() {

        }
        //    created() {
        //        window.addEventListener('scroll', this.onScroll)
        //    },
        //    destroyed() {
        //        window.removeEventListener('scroll', this.onScroll)
        //    },
    }
</script>
<style lang="scss" scoped>
    .lists-wrapper {
        display: flex;
        flex-direction: column;
        max-height: calc(97vh - 50px);

    }

    .list-container {
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color:#ddd;
        padding: 20px 30px;
        background: rgba(62, 62, 62, 0.50);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(5.0px);
        -webkit-backdrop-filter: blur(5.0px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.18);

        div {
            display: flex;
            flex-direction: row;
            width:100%;
        }
        .list-basic-container{
            justify-content: space-between;
        }
        .user-icon-container{
            justify-content: flex-end;
        }
    }
</style>