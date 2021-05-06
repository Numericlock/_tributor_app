<template>
    <section class="home-wrapper overflow-y-auto" @scroll="getScrollParam" ref="homeWrapper">
        <Posts :posts = "posts"/>
    </section>
</template>

<script>
    import Posts from '~/components/posts/Posts.vue'
    import modal from '~/components/Modal.vue'
    export default {
        layout: 'main2',
        async fetch({
            store
        }) {
            const length = Object.keys(store.getters['home/list']).length;
            console.log("length:"+length);
            if(length == 0){
                console.log("fetch");
                const home = await store.dispatch('home/fetchList')
                store.commit('home/setList', home)
            }
        },
        components: {
            modal,
            Posts
        },
        data: () => ({
            userIconUrl: "http://localhost:8000/img/icon_img/",
            postImageUrl: "http://localhost:8000/img/post_img/",
            selectedImage: null,
            scroll:0,//スクロール量
            BottomPosition:0,
            homeWrapper:null,

        }),
        computed: {
            posts() {
                //console.log("e?:"+this.$store.getters['home/list']);
                return this.$store.getters['home/list']
            },
            start_post() {
                return this.$store.getters['home/start_post']
            },
            last_post() {
                return this.$store.getters['home/last_post']
            }
        },
        methods: {
            imageZoom(url) {
                this.selectedImage = url;
            },
            getScrollParam:function(e){
                this.scroll = e.target.scrollTop;
                console.log(this.scroll);
                console.log(this.getScrollBottom());
                this.BottomPosition=this.getScrollBottom();
                if( this.scroll > this.BottomPosition-(this.homeWrapper.offsetHeight*0.9)){
                    console.log("bottomPos");
                    this.getBeforePosts();
                }else if(this.scroll < this.homeWrapper.offsetHeight*0.9){
                    console.log("topPos");  
                }
            },
            getScrollBottom(){
                return this.homeWrapper.scrollHeight - this.homeWrapper.offsetHeight;
            },
            async getBeforePosts() {
                var data = {
                    num: this.last_post.post_at
                };
                await this.$store.dispatch('home/getBeforePosts', data)
            },
        },
        mounted(){
            const dom = this.$refs.homeWrapper; 
            this.homeWrapper  = this.$refs.homeWrapper; 
            console.log(this.getScrollBottom());
        }
    }
</script>
<style lang="scss" scoped>
    .home-wrapper {
        display: flex;
        flex-direction: column;
        max-height: calc(97vh - 50px);
        overflow-x:hidden; 
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

    /////////modal/////////
    .image-modal-background {
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
    .image-modal-close-button{
        z-index: 11400;
        position: fixed;
        top:30px;
        right:30px;
    }
    .image-modal-background::before {
        background: inherit;
        content: '';
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        -webkit-filter: blur(20px);
        filter: blur(10px);
        margin: -10px;
        /* blurの値と同じ値だけマイナス */
        width: calc(100% + 20px);
        /* 左右の10ピクセル分加算 */
    }

    .image-modal-background::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.5);
    }

    .image-modal {
        text-align: center;
        display: flex;
        flex-direction: column;
        opacity: 1;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 10px;

        z-index: 11200;

        img {
            object-fit: cover;
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        will-change: opacity;
        transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0
    }

    /////////modal////////////////
</style>