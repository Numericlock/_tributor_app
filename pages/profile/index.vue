<script>
    import AttentionModal from '~/components/AttentionModal.vue'
    export default {
        middleware: 'not_logined_user',
        async fetch({
            store,redirect
        }) {
         //   console.log(route.params.id);
         //   const data = {
         //       id:route.params.id
         //   };
         //   console.log(data);
         //   const list = await store.dispatch('list/read', data);
            const user = store.getters['authentication/user'];
            redirect('/profile/'+user.user_id);
        },
        props: {
            list: {
                default:-1,
            },
        },
        data() {
            return {
                listBasic: [],
                listUsers: [],
                usersCount: 0,
                isPostPage:true,
                userIconUrl: "http://localhost:8000/img/icon_img/",
                userErrorIcon: "default.png",
                listIconUrl: 'http://localhost:8000/img/list_icon/',
                
                isAttention: false,
            }
        },
        components: {
            AttentionModal,
        },
        computed:{
            id() {
                return this.$route.params.id;
            }
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
            this.getData();
        }
    }
</script>