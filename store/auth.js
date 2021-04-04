export const state = () => ({
  user: null
})

export const mutations = {
  setUser (state, user) {
    state.user = user
  }
}

export const actions = {
  async login ({ commit }, { email, password }) {
    const response = await this.$axios.$post('/login', { email, password })
      .catch(err => {
        console.log(err)
      })
    if (response.status !== 200) { /* TODO エラー処理 */ }
    commit('setUser', response)
  },
  async logout ({ commit }) {
    const response = await this.$axios.$post('/logout')
      .catch(err => err.response)

    if (response.status !== 200) { /* TODO エラー処理 */ }

    commit('setUser', null)
  }
}