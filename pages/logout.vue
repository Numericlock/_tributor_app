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
            async logOut(){
                await this.$store.dispatch('auth/logout');
               // this.$router.push('/');
            } 
        },
        mounted(){
            this.logOut();
        },
    }
</script>

<style>
    
</style>