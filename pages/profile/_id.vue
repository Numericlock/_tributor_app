<template>
    <div class="profile">
        <div class="profile__header">
            <img />
        </div>
        <div class="profile__user">
            {{$route.params.id}}
        </div>
        <div class="profile__navigation">
        </div>
        <div class="profile__timeline">
        </div>
    </div>
</template>

<script>
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
        data () {
            return {
            }
        },
        components: {
        },
        computed:{

        },
        methods: {
            async getData(){
                const data = {
                    id:this.id
                };
                console.log(data);
                const list = await this.$store.dispatch('list/read', data);  
                this.listBasic = list.current_list;
                this.listUsers = list.list_users;
                this.usersCount = list.count;
                console.log(list);
            },
            imgUrlAlt(event){
                event.target.src = this.userIconUrl+this.userErrorIcon;
            }
        },
        created(){
            //this.getData();
        }
    }
</script>

<style>
    
</style>