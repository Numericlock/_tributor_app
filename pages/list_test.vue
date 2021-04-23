<template>
  <v-layout
    column
    justify-center
  >
    <v-card>
      <v-card-title>
        管理者一覧
        <v-spacer />
        <v-text-field
          v-model="searchText"
          append-icon="mdi-magnify"
          label="検索"
          sigle-line
        />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="5"
        :search="searchText"
        sort-by="id"
        :sort-desc="true"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-dialog v-model="isShowDialog" max-width="500px">
            <template v-slot:activator>
              <v-btn fab dark color="pink" class="mb-2"
                @click="onClickAddBtn"
              >
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">管理者編集</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field v-model="dialogUser.email" label="メールアドレス" />
                    </v-col>
                    <v-col cols="6">
                      <v-text-field v-model="dialogUser.name" label="名前" />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field type="password" v-model="dialogUser.password" label="パスワード" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="closeDialog">閉じる</v-btn>
                <v-btn v-if="isPersistedUser" class="primary" @click="onClickUpdateBtn">更新する</v-btn>
                <v-btn v-else class="primary" @click="onClickCreateBtn">追加する</v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:item.edit-action="{ item }">
          <v-icon
            small
            @click="onClickEditIcon(item)"
          >
            mdi-pencil
          </v-icon>
        </template>
        <template v-slot:item.delete-action="{ item }">
          <v-icon
            small
            @click="onClickDeleteIcon(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  middleware: 'not_logined_user',
  layout: 'home',
  async fetch ({ store }) {
    const users = await store.dispatch('users/fetchList')
    store.commit('users/setList', users)
  },
  data () {
    return {
      dialogUser: {},
      isShowDialog: false,
      searchText: ''
    }
  },
  computed: {
    users () {
        console.log(this.$store.getters['users/list']);
        return this.$store.getters['users/list']
    },
    formTitle () {
      return this.isPersistedUser ? '管理者編集' : '管理者追加'
    },
    headers () {
     return [
        { text: 'ID', value: 'id' },
        { text: 'メールアドレス', value: 'email' },
        { text: '名前', value: 'name' },
        { text: '', value: 'edit-action' },
        { text: '', value: 'delete-action' },
      ]
    },
    isPersistedUser () {
      return !!this.dialogUser.id
    },
  },
  methods: {
    closeDialog () {
      this.dialogUser = {}
      this.isShowDialog = false
    },
    onClickAddBtn () {
      this.dialogUser = {}
      this.isShowDialog = true
    },
      onClickEditIcon (user) {
        this.dialogUser = Object.assign({}, user)
        this.isShowDialog = true
      },
    async onClickCreateBtn () {
      await this.$store.dispatch('users/create', this.dialogUser)
      this.closeDialog()
    },
    async onClickDeleteIcon (user) {
      await this.$store.dispatch('users/delete', user)
    },
    async onClickUpdateBtn () {
      await this.$store.dispatch('users/update', this.dialogUser)
      this.closeDialog()
    }
  }
}
</script>