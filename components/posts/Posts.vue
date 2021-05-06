<template>
    <div>
        <v-lazy v-for="(post, index) in posts" :key="index">
            <Post v-model="selectedImage" :post="post"/>
        </v-lazy>
        <ImageModal v-model="selectedImage"></ImageModal>
    </div>
</template>

<script>
    import Post from '~/components/posts/Post.vue'
    import ImageModal from '~/components/posts/ImageModal.vue'
    export default {
        props:{
            posts:{
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
        components: {
            Post,
            ImageModal
        },
        computed: {
            postsLength(){
                return Object.keys(this.posts).length;
            }
        },
        watch: {
            selectedImage: function (val) {
                console.log(val);
            },
            posts: function (val) {
                console.log(val);
            }
        }
    }
</script>

<style>
    
</style>