<template>
    <v-app id="inspire">


        <v-main class="grey lighten-3">
            <v-container>
                <v-row no-gutters>
                    <v-col xl=2 lg=2 md=2 sm=2 cols=1>
                        <v-sheet min-height="97vh" min-width="90px">
                            <v-list shaped>
                                <v-list-item v-for="link in links"  link class="my-5">
                                    <v-list-item-content class="hidden-md-and-down">
                                        <v-list-item-title>{{ link.name }}</v-list-item-title>
                                    </v-list-item-content>
                                        <v-btn
                                          class="d-block text-center mx-auto"
                                          fab
                                          dark
                                          color="grey darken-1"
                                        >
                                          <v-icon dark>
                                            {{ link.icon }}
                                          </v-icon>
                                        </v-btn>
                                </v-list-item>
                            </v-list>
                            <v-btn
                              class="d-block text-center mx-auto"
                              fab
                              dark
                              large
                              color="cyan"
                            >
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
                            <v-container fluid>
                                <nuxt />
                            </v-container>
                        </v-content>
                    </v-col>

                    <v-col xl=1 lg=1 md=1 sm=0 cols=0 class="hidden-sm-and-down">
                        <v-sheet min-height="97vh" min-width="90px" class="mr-1 pt-4">
                            <v-btn
                            class="d-block text-center mx-auto" color="grey darken-1"
                            dark
                          
                            
                            fab
                            >
                            <v-icon>mdi-plus</v-icon>
                            </v-btn>
                            <v-divider class="mx-3 my-5"></v-divider>

                            <v-avatar v-for="n in 6" :key="n" class="d-block text-center mx-auto mb-9" color="grey lighten-1" size="28">
                         <!-- <img
                            v-if="message.avatar"
                            alt="Avatar"
                            src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                          >
                          <v-icon
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
                            <v-select
                              :items="links"
                              item-text="name"
                              item-value="link"
                              label="Outlined style"
                              solo
                              class="mx-1 mt-1"
                            ></v-select>
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    export default {
        theme: {
            dark: true
        },
        async fetch ({ store }) {
          const list = await store.dispatch('list/fetchList')
          //console.log("u?:"+list);
          store.commit('list/setList', list)
        },
        data: () => ({
            links: [
                {name: 'Home',link: '/main',icon: 'mdi-home',current:false},
                {name: 'Search',link: '/main',icon: 'mdi-magnify',current:false},
                {name: 'Notice',link: '/main',icon: 'mdi-bell',current:false},
                {name: 'Message',link: '/main',icon: 'mdi-email',current:false},
                {name: 'Lists',link: '/main',icon: 'mdi-text-box-outline',current:false},
                {name: 'Profile',link: '/main',icon: 'mdi-account',current:false},
            ],
        }),
        computed: {
        lists() {
               //console.log("e?:"+this.$store.getters['list/list']);
              return this.$store.getters['list/list']
          }
        },
        methods:{
            
        },
        async created(){
              const list = await this.$store.dispatch('list/fetchList')
             // console.log("u?:"+list);
              this.$store.commit('list/setList', list) 
        }
    }
</script>