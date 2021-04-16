<template>
    <v-app id="inspire">


        <v-main class="grey lighten-3">
            <v-container>
                <v-row no-gutters>
                    <v-col xl=2 lg=2 md=2 sm=2 cols=1>
                        <v-sheet min-height="97vh" min-width="90px">
                            <v-list shaped>
                                <v-list-item v-for="link in links" link class="my-5">
                                    <v-list-item-content class="hidden-md-and-down">
                                        <v-list-item-title>{{ link.name }}</v-list-item-title>
                                    </v-list-item-content>
                                    <v-btn class="d-block text-center mx-auto" fab dark color="grey darken-1">
                                        <v-icon dark>
                                            {{ link.icon }}
                                        </v-icon>
                                    </v-btn>
                                </v-list-item>
                            </v-list>
                            <v-btn class="d-block text-center mx-auto" fab dark large color="cyan" @click.stop = "isPostModal = true">
                                <v-icon dark>
                                    mdi-pencil
                                </v-icon>
                            </v-btn>
                        </v-sheet>
                    </v-col>

                    <v-col xl=6 lg=6 md=9 sm=10 cols=11>
                        <v-sheet min-height="50px">
                            <!--  -->
                        </v-sheet>
                        <v-content>
                            <v-container class="py-0" fluid>
                                <nuxt />
                            </v-container>
                        </v-content>
                    </v-col>

                    <v-col xl=1 lg=1 md=1 sm=0 cols=0 class="hidden-sm-and-down">
                        <v-sheet min-height="97vh" max-height="97vh" min-width="90px" class="mr-1 pt-4 overflow-y-auto">
                            <v-btn class="d-block text-center mx-auto" color="grey darken-1" dark fab>
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                            <v-divider class="mx-3 my-5"></v-divider>

                            <v-avatar v-for="list in lists" class="d-block text-center mx-auto mb-9" color="grey lighten-1" size="55">
                                <img alt="Avatar" class="list-icon" :src="listIconUrl+list.id+'.png'" />
                                <!-- <v-icon
                            v-else
                            :color="message.color"
                            v-text="message.icon"
                          ></v-icon>
            -->

                            </v-avatar>
                        </v-sheet>
                    </v-col>
                    <v-col xl=3 lg=3 md=0 sm=0 cols=0 class="hidden-md-and-down">
                        <v-sheet rounded="lg" min-height="97vh" class="mx-1">
                            <v-select :items="links" item-text="name" item-value="link" label="Outlined style" solo class="mx-1 mt-1"></v-select>
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-container>
            <PostModal v-model="isPostModal"/>
            <ListPostModal v-model="isListPostModal"/>
        </v-main>
    </v-app>
</template>

<script>
    import PostModal from '~/components/PostModal.vue'
    import ListPostModal from '~/components/ListPostModal.vue'
    export default {
        theme: {
            dark: true
        },
        async fetch({
            store
        }) {
            const list = await store.dispatch('list/fetchList')
            //console.log("u?:"+list);
            store.commit('list/setList', list)
        },
        components: {
            PostModal,
            ListPostModal,
        },
        data: () => ({
            listIconUrl: 'http://localhost:8000/img/list_icon/',
            isPostModal:false,
            isListPostModal:true,
            links: [{
                    name: 'Home',
                    link: '/main',
                    icon: 'mdi-home',
                    current: false
                },
                {
                    name: 'Search',
                    link: '/main',
                    icon: 'mdi-magnify',
                    current: false
                },
                {
                    name: 'Notice',
                    link: '/main',
                    icon: 'mdi-bell',
                    current: false
                },
                {
                    name: 'Message',
                    link: '/main',
                    icon: 'mdi-email',
                    current: false
                },
                {
                    name: 'Lists',
                    link: '/main',
                    icon: 'mdi-text-box-outline',
                    current: false
                },
                {
                    name: 'Profile',
                    link: '/main',
                    icon: 'mdi-account',
                    current: false
                },
            ],
        }),
        computed: {
            lists() {
                //console.log("e?:"+this.$store.getters['list/list']);
                return this.$store.getters['list/list']
            }
        },
        methods: {

        },
        async created() {
            const list = await this.$store.dispatch('list/fetchList')
            // console.log("u?:"+list);
            this.$store.commit('list/setList', list)
        }
    }
</script>
<style lang="scss" scoped>
    /* スクロールの幅の設定 */
    *::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }

    /* スクロールの背景の設定 */
    *::-webkit-scrollbar-track {
        border-radius: 5px;
        box-shadow: 0 0 4px #aaa inset;
    }

    /* スクロールのつまみ部分の設定 */
    *::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: #666;
    }

    .v-avatar {
        transition: all 0.2s;
        box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
    }

    .v-avatar:hover {
        height: 65px !important;
        width: 65px !important;
        border-radius: 50%;
        background: #e0e0e0;
        box-shadow: 7px 7px 14px #969696,
            -7px -7px 14px #ffffff;
        transition: all 0.2s;
    }

    .modal-background {
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

    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10001;

    }

    .modal-container {
        display: flex;
        flex-direction: column;
        text-align: center;
        width: 600px;
        min-width: 200px;
        max-height: 95vh;
        min-height: 300px;


        background-color: #36393E;
        border-radius: 6px;
        border-color: none;


        color: #ddd;
        padding: 20px 30px;
        background: rgba(62, 62, 62, 0.50);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(5.0px);
        -webkit-backdrop-filter: blur(5.0px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.18);

        .modal-header {
            position: relative;

            .close-icon {
                position: absolute;
                right: 0;
                top: 0;
            }
        }

        .modal-content {
            display: flex;
            flex-direction: row;

            .user-icon-area {
                min-width: 80px;
                padding: 5px 10px;
            }
        }

        .modal-footer {
            display: flex;
            justify-content: space-between;
        }
    }

    .next-modal-container {
        .next-modal-content {
            flex-direction: column;
        }
    }

    .list-container {
        display: flex;
        flex-direction: column;
        padding: 20px 30px;
        background: rgba(62, 62, 62, 0.50);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(5.0px);
        -webkit-backdrop-filter: blur(5.0px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        
        .list-basic-container {
            display: flex;
            justify-content: space-between;
            width:100%;
            div{
                display: flex;
                flex-direction: row;
            }
        }

        .user-icon-container {
            justify-content: flex-end;
        }
    }

    .checkbox {
        display: table-cell;
        vertical-align: middle;
        text-align: center;

        div {
            label {
                display: inline-block;
                color: #212226;
                cursor: pointer;
                position: relative;

                span {
                    display: inline-block;
                    position: relative;
                    background-color: transparent;
                    width: 25px;
                    height: 25px;
                    transform-origin: center;
                    border: 2px solid #212226;
                    border-radius: 50%;
                    vertical-align: -6px;
                    margin-right: 10px;
                    transition: background-color 150ms 200ms, transform 350ms cubic-bezier(0.78, -1.22, 0.17, 1.89);

                    &:before {
                        content: "";
                        width: 0px;
                        height: 2px;
                        border-radius: 2px;
                        background: #212226;
                        position: absolute;
                        transform: rotate(45deg);
                        top: 11px;
                        left: 7px;
                        transition: width 50ms ease 50ms;
                        transform-origin: 0% 0%;
                    }

                    &:after {
                        content: "";
                        width: 0;
                        height: 2px;
                        border-radius: 2px;
                        background: #212226;
                        position: absolute;
                        transform: rotate(305deg);
                        top: 14px;
                        left: 8px;
                        transition: width 50ms ease;
                        transform-origin: 0% 0%;
                    }
                }
            

            &:hover {
                span{
                    &:before {
                        width: 5px;
                        transition: width 100ms ease;
                    }

                    &:after {
                        width: 10px;
                        transition: width 150ms ease 100ms;
                    }
                }
            }
            }

            input[type="checkbox"] {
                display: none; // hide the system checkbox

              // Let's add some effects after the checkbox is checked

              &:checked {
                + label {
                  span {
                    background-color: #212226;
                    transform: scale(1.25); // enlarge the box

                    &:after {
                      width: 10px;
                      background: #1790b5;
                      transition: width 150ms ease 100ms; // enlarge the tick
                    }

                    &:before {
                      width: 5px;
                      background: #1790b5;
                      transition: width 150ms ease 100ms; // enlarge the tick
                    }
                  }

                  &:hover { // copy the states for onMouseOver to avoid flickering
                    span {
                      background-color: #212226;
                      transform: scale(1.25); // enlarge the box

                      &:after {
                        width: 10px;
                        background: #1790b5;
                        transition: width 150ms ease 100ms; // enlarge the tick
                      }

                      &:before {
                        width: 5px;
                        background: #1790b5;
                        transition: width 150ms ease 100ms; // enlarge the tick
                      }
                    }  
                  }
                }
              }
            }
        }
    }
</style>