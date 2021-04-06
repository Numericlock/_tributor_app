<template>
    
</template>

<script>
    export default {
        data () {
            return {
            }
        },
        components: {
        },
        methods:{
              async logout(){
                await this.$store.dispatch('auth/logout')
                this.$router.push('/login')
                
              }
            
        },
        mounted(){
            this.logout();
        },
    }
</script>

<style>
    
</style>