export const state = () => ({
  home: []
})

export const getters = {
  list (state) {
    return state.home
  }
}

export const mutations = {
  setList (state, data) {
    state.home = data
  },
  create (state, data) {
    state.home.push(data)
  },
  delete (state, data) {
    state.home.forEach((user, index) => {
      if (user.id === data.id) {
        state.home.splice(index, 1)
      }
    })
  },
  update (state, data) {
    state.home.forEach((user, index) => {
      if (user.id === data.id) {
        state.home.splice(index, 1, data)
      }
    })
  }
}

export const actions = {
  async fetchList () {
    return await this.$axios.$get('/home')
      .catch(err => {
        console.log(err)
      })
  },
  async create ({ commit }, user) {
    const response = await this.$axios.$post('/home', user)
      .catch(err => {
        console.log(err)
      })
    commit('create', response)
  },
  async delete ({ commit }, user) {
    const response = await this.$axios.$delete(`/home/${user.id}`)
      .catch(err => {
        console.log(err)
      })
    commit('delete', response)
  },
  async update ({ commit }, user) {
    const response = await this.$axios.$patch(`/home/${user.id}`, user)
      .catch(err => {
        console.log(err)
      })
    commit('update', response)
  }
}