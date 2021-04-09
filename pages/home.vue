<template>
    <section class="home-wrapper">
        <div class="post-container" v-for="post in posts">
            <div class="user-wrapper" >
                <v-avatar class="d-block text-center" color="grey lighten-1" size=55>
                    <img alt="Avatar" class="user-icon" />
                </v-avatar>
                <div class="text-xl-h4 text-lg-h6 text-md-body-1 text-sm-body-2 text-caption font-weight-bold my-auto ml-4">{{ post.users_name }}</div>

            </div>
            <v-carousel class="post-carousel" hide-delimiters v-if="post.attached_count" height="none">
                <v-carousel-item v-for="images in post.images" :src="'data:image/png;base64,'+images"></v-carousel-item>
            </v-carousel>
        </div>
    </section>
</template>

<script>
    export default {
        //middleware: 'not_logined_user',
        //layout: 'home',
        layout: 'main2',
        async fetch({
            store
        }) {
            const home = await store.dispatch('home/fetchList')
            //console.log("u?:"+home);
            store.commit('home/setList', home)
        },
        computed: {
            posts() {
                //console.log("e?:"+this.$store.getters['home/list']);
                return this.$store.getters['home/list']
            }
        },
    }
</script>
<style lang="scss" scoped>
    .home-wrapper {}

    .post-container {
        display: flex;
        flex-direction: column;
        padding: 20px 30px;
        background: rgba(62, 62, 62, 0.50);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(5.0px);
        -webkit-backdrop-filter: blur(5.0px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.18);

        .user-wrapper {
            display: flex;
        }
    }
    .post-carousel{
        height:auto !important;
    }
</style>