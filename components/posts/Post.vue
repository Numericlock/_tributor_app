<template>
    <div class="post-container">
        <div class="user-wrapper">
            <v-avatar class="d-block text-center" color="grey lighten-1" size=55>
                <img alt="Avatar" class="user-icon" :src="userIconUrl+post.post_user_id+'.png'" />
            </v-avatar>
            <div class="text-xl-h6 text-lg-h6 text-md-body-1 text-sm-body-2 text-caption font-weight-bold my-auto ml-4">{{ post.users_name }}</div>
        </div>
        <div class="text-wrapper">
            <p>{{post.content_text}}</p>
        </div>
        <v-carousel class="post-carousel" hide-delimiters v-if="post.attached_count > 1" height="500px">
            <v-carousel-item v-for="n of post.attached_count" :key="n" :src="postImageUrl+post.id+'_'+ (n-1) +'.png'" @click="imageZoom(postImageUrl+post.id+'_'+ (n-1) +'.png')"></v-carousel-item>
        </v-carousel>
        <v-carousel class="post-carousel" :show-arrows="false" hide-delimiters v-if="post.attached_count == 1" height="auto">
            <v-carousel-item :src="postImageUrl+post.id+'_0.png'" @click="imageZoom(postImageUrl+post.id+'_0.png')"></v-carousel-item>
        </v-carousel>
        <div class="post-icons">
            <v-btn class="post-icons__reply" icon fab>
                <v-icon>mdi-message-reply-text</v-icon>
                <span v-show="post.comment_count">{{post.comment_count}}</span>
            </v-btn>
            <v-btn class="post-icons__retribute" icon fab>
                <v-icon>mdi-bullhorn</v-icon>
                <span v-show="post.retribute_count">{{post.retribute_count}}</span>
            </v-btn>
            <v-btn class="post-icons__like" icon fab>
                <v-icon>mdi-heart</v-icon>
                <span v-show="post.favorite_count">{{post.favorite_count}}</span>
            </v-btn>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            post:{
                default:null
            }
        },
        data: () => ({
            userIconUrl: "http://localhost:8000/img/icon_img/",
            postImageUrl: "http://localhost:8000/img/post_img/",
            selectedImage: null,
            scroll:0,//スクロール量
            BottomPosition:0,
            homeWrapper:null,

        }),
        components: {},
        methods: {
            imageZoom(url) {
                this.$emit('input', url)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .home-wrapper {
        display: flex;
        flex-direction: column;
        max-height: calc(97vh - 50px);
    }

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

    .post-carousel {
        height: auto !important;
    }
    .post-icons{
        display:flex;
        flex-direction: row;
        justify-content: space-around;
        &__reply:hover .v-icon{
            color:#487AB9;
        }
        &__retribute:hover .v-icon{
            color:#F6EC5F;
        }
        &__like:hover .v-icon{
            color:#DD4F40;
        }
    }
</style>