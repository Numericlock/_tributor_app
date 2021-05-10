<template>
    <div class="list px-8">
        <Post v-model="selectedImage" :post="post.post" v-if="post.length != 0" />
        <v-divider class="my-2"></v-divider>
        <Post v-model="selectedImage" v-for="(child, index) in post.child_posts" :key="index" :post="child" v-if="post.length != 0" />
        <ImageModal v-model="selectedImage"></ImageModal>
        <AttentionModal text="リストを削除しますか？" v-model="isAttention" />
    </div>
</template>
<script>
    import Post from '~/components/posts/Post.vue'
    import ImageModal from '~/components/posts/ImageModal.vue'
    import AttentionModal from '~/components/AttentionModal.vue'
    export default {
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
        props: {
            list: {
                default: -1,
            },
        },
        data() {
            return {
                post: [],
                isPostPage: true,
                userIconUrl: "http://localhost:8000/img/icon_img/",
                userErrorIcon: "default.png",
                listIconUrl: 'http://localhost:8000/img/list_icon/',
                isAttention: false,
                selectedImage: null,
            }
        },
        components: {
            Post,
            ImageModal,
            AttentionModal,
        },
        computed: {
            id() {
                return this.$route.params.id;
            }
        },
        methods: {
            async getData() {
                const data = {
                    id: this.id
                };
                this.post = await this.$store.dispatch('post/read', data);
            },
            imgUrlAlt(event) {
                event.target.src = this.userIconUrl + this.userErrorIcon;
            }
        },
        created() {
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

            .user-container {
                display: flex;
                flex-direction: row;

                .wrapper {
                    display: flex;
                    flex-direction: column;
                }
            }
        }
    }
</style>