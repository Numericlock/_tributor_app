<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size="32"
      ></v-avatar>

      <v-tabs
        centered
        class="ml-n9"
        color="grey darken-1"
      >
        <v-tab
          v-for="link in links"
          :key="link"
        >
          {{ link }}
        </v-tab>
      </v-tabs>

      <v-avatar
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="32"
      ></v-avatar>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row
        no-gutters
        >
          <v-col
            cols="12"
            sm="2"
          >
            <v-sheet
              rounded="lg"
              min-height="90vh"
              class="ml-1"
                     
            >
              <v-list
                shaped
              >
                <v-list-item
                  v-for="n in 5"
                  :key="n"
                  link
                >
                  <v-list-item-content>
                    <v-list-item-title>Item {{ n }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="6"
            
          >
            <v-sheet
              min-height="5vh"
            >
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="1"
          >
            <v-sheet
              min-height="90vh"
              class="mr-1 pt-4"
            >
                <v-avatar
                  class="d-block text-center mx-auto"
                  color="grey darken-1"
                  size="36"
                ></v-avatar>

                <v-divider class="mx-3 my-5"></v-divider>

                <v-avatar
                  v-for="n in 6"
                  :key="n"
                  class="d-block text-center mx-auto mb-9"
                  color="grey lighten-1"
                  size="28"
                ></v-avatar>
            </v-sheet>
          </v-col>
          <v-col
            cols="12"
            sm="3"
          >
            <v-sheet
              rounded="lg"
              min-height="90vh"
              class="mx-1"
            >
            <v-list
              
            >
              <v-list-item
                v-for="n in 5"
                :key="n"
                link
              >
                <v-list-item-content>
                  <v-list-item-title>Item {{ n }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
              <!-- aw -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    theme: { dark: true },
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