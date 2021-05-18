<template>
    <div class="profile">
        <div class="profile__header">
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
            <Tab :tabList="tabList" v-model="tab"></Tab>
        </div>
        <div class="profile__timeline">
        </div>
    </div>
</template>

<script>
    import Tab from '~/components/tab.vue'
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
                tab: null,
                tabList:['tribute','repry','media','like'],
                userIconUrl: "http://localhost:8000/img/icon_img/",
                userErrorIcon: "default.png",
                listIconUrl: 'http://localhost:8000/img/list_icon/',
            }
        },
        components: {
            Tab,
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
                this.profile = profile.profile;
                //this.listUsers = profile.list_users;
                //this.usersCount = profile.count;
                console.log(profile);
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
    .profile {
        display: flex;
        flex-direction: column;

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
    }
</style>