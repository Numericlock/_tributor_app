<template>
    <v-app id="inspire">
        <div class="wrapper">
            <div class="main-wrapper">
                <div class="nav dark">
                </div>
                <div class="main dark">
                </div>
                <div class="lists dark">
                </div>
            </div>
            <div class="something dark">
            </div>
        </div>
    </v-app>
</template>

<script>
    export default {
        theme: {
            dark: true
        },
        data: () => ({
            links: [
                'Dashboard',
                'Messages',
                'Profile',
                'Updates',
            ],
        }),
    }
</script>

<style lang="scss" scoped>
    .wrapper{
        display: flex;
        justify-content: center;
        height:100vh;
        .main-wrapper{
            display: flex;
            justify-content: center;
            .nav{
                width:150px;
                border-top-right-radius:0px;
            }
            .main{
                width:500px;
                height:50px;
                border-radius:0px;
            }
            .lists{
                width:100px;
            }
        }
        .something{
            width:400px;
        }
    }
    .dark{
        padding: 20px 30px;
        background: rgba(62, 62, 62, 0.50);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(5.0px);
        -webkit-backdrop-filter: blur(5.0px);
        border-radius: 10px;
        color:'#ddd';
        border: 1px solid rgba(255, 255, 255, 0.18);
    }
</style>