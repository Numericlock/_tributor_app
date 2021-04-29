<template>
    <div>
        <div v-for="post in posts">
            <Post v-model="selectedImage" :post="post"/>
        </div>
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
        watch: {
            selectedImage: function (val) {
                console.log(val);
            }
        }
    }
</script>

<style>
    
</style>