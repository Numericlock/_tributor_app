export const state = () => ({
  users: []
})

export const getters = {
  list (state) {
    return state.users
  }
}

export const mutations = {
  setList (state, data) {
    state.users = data
  },
  create (state, data) {
    state.users.push(data)
  },
  delete (state, data) {
    state.users.forEach((user, index) => {
      if (user.id === data.id) {
        state.users.splice(index, 1)
      }
    })
  },
  update (state, data) {
    state.users.forEach((user, index) => {
      if (user.id === data.id) {
        state.users.splice(index, 1, data)
      }
    })
  }
}

export const actions = {
  async fetchList () {
    return await this.$axios.$get('/users')
      .catch(err => {
        console.log(err)
      })
  },
  async create ({ commit }, user) {
    const response = await this.$axios.$post('/users', user)
      .catch(err => {
        console.log(err)
      })
    commit('create', response)
  },
  async delete ({ commit }, user) {
    const response = await this.$axios.$delete(`/users/${user.id}`)
      .catch(err => {
        console.log(err)
      })
    commit('delete', response)
  },
  async update ({ commit }, user) {
    const response = await this.$axios.$patch(`/users/${user.id}`, user)
      .catch(err => {
        console.log(err)
      })
    commit('update', response)
  }
}