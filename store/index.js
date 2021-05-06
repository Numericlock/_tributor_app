export const state = () => ({
  isPostModal: {
      isOpen:false,
      post:null
  }
})

export const getters = {
  isPostModal (state) {
    return state.isPostModal
  }
}

export const mutations = {
  setIsPostModal (state, data) {
    state.isPostModal = data
  }
}

export const actions = {
  async nuxtServerInit ({ commit }, { app }) {
    await app.$axios.$get('/current_user')
      .then(user => commit('auth/setUser', user))
      .catch(() => commit('auth/setUser', null))
  },
  setIsPostModal ({ commit }, postData) {
    commit('setIsPostModal', postData)
  },
} 

