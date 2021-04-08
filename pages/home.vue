<template>
  <section>
    <h1>管理画面へようこそ</h1>
  </section>
</template>

<script>
export default {
  //middleware: 'not_logined_user',
  //layout: 'home',
  layout: 'main2',
  async fetch ({ store }) {
    const home = await store.dispatch('home/fetchList')
    //console.log("u?:"+home);
    store.commit('home/setList', home)
  },
  computed: {
    home () {
        //console.log("e?:"+this.$store.getters['home/list']);
        return this.$store.getters['home/list']
    }
  },
}
</script>