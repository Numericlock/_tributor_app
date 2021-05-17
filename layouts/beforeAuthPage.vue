<template>
    <v-app>
        <div class="top-page">
            <Header></Header>
            <wave/>
            <v-main>
                <v-container>
                    <nuxt />
                </v-container>
            </v-main>
        </div>
    </v-app>
</template>

<script>
    import Header from '~/components/Header.vue'
    import wave from '~/components/wave.vue'
    export default {
        data() {
            return {
                clipped: false,
                fixed: false,
                title: 'Laravel Nuxt Admin'
            }
        },
        components: {
            Header,
            wave,
        }
    }
</script>
<style lang='scss' scoped>
    .top-page{
        background:#36393E;
        overflow: hidden;
        height:100vh;
        width:100vw;
        color: white;
        background: linear-gradient(-135deg, #E4A972, #39ACAC),
            linear-gradient(75deg, #E4A972, #9941D8, #79ffff)fixed;
    }
</style>