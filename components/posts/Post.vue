<template>
    <div class="post-container" v-for="post in posts">
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
        data() {
            return {}
        },
        components: {}
    }
</script>

<style>

</style>