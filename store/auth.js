import $cookies from "cookie-universal-nuxt";
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
    //if (response.status !== 200) { /* TODO エラー処理 */ }
    commit('setUser', response)
  },
  async register ({ commit }, { email, name, password }) {
    await this.$axios.$post('/register', { email, name, password })
      .catch(err => {
        console.log(err)
      })
    //if (response.status !== 200) { /* TODO エラー処理 */ }
    //commit('setUser', response)
  },
//  async logout ({ commit }) {
//    //const response = await this.$axios.$post('/logout')
//    //  .catch(err => err.response)
////
////    if (response.status !== 200) { /* TODO エラー処理 */ }
//    await this.$cookies.remove("laravel_session"); 
//    commit('setUser', null)
//  },
  async logout({ commit, dispatch }) {
    await this.$axios
      .$post('/logout')
      .then(() => {
        commit('setUser', null)
      })
      .catch(err => {
        dispatch('status/errorHandler', err)
      })
  },
  errorHandler({ commit, dispatch }, err) {
    commit('setStatus', {
      status: err.response.status,
      messages: err.response.data.errors,
    })
  },
}