export const actions = {
  async nuxtServerInit ({ commit }, { app }) {
    await app.$axios.$get('/current_user')
      .then(user => commit('auth/setUser', user))
      .catch(() => commit('auth/setUser', null))
  }
} 