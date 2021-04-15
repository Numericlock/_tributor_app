<template>
    <section class="home-wrapper overflow-y-auto" @scroll="getScrollParam" ref="homeWrapper">
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
        </div>
        <div class="image-modal-background" v-if="selectedImage" @click.stop="selectedImage = null" :style="'backgroundImage:url('+ selectedImage +');'"></div>
        <div class="image-modal" v-if="selectedImage">
            <img :src="selectedImage" alt="" height="980vh" width="auto" />
        </div>
    </section>
</template>

<script>
    import modal from '~/components/Modal.vue'
    export default {
        //middleware: 'not_logined_user',
        //layout: 'home',
        
        layout: 'main2',
        async fetch({
            store
        }) {
            const home = await store.dispatch('home/fetchList')
            console.log(home);
            store.commit('home/setList', home)
        },
        components: {
            modal
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
                console.log(url);
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
    //    created() {
    //        window.addEventListener('scroll', this.onScroll)
    //    },
    //    destroyed() {
    //        window.removeEventListener('scroll', this.onScroll)
    //    },
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