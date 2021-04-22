export const state = () => ({
    list: []
})

export const getters = {
    list(state) {
        return state.list
    }
}

export const mutations = {
    setList(state, data) {
        state.list = data
    },
    create(state, data) {
        var tmp = [];
        tmp.push(data);
        for(let i=0;i<state.list.length;i++){
            tmp.push(state.list[i]);
        }
        state.list = tmp;
    },
    delete(state, data) {
        state.list.forEach((user, index) => {
            if (user.id === data.id) {
                state.list.splice(index, 1)
            }
        })
    },
    update(state, data) {
        state.list.forEach((user, index) => {
            if (user.id === data.id) {
                state.list.splice(index, 1, data)
            }
        })
    }
}

export const actions = {
    async fetchList() {
        return await this.$axios.$get('/lists')
            .catch(err => {
                console.log(err)
            })
    },
    async create({
        commit
    }, data) {
        const response = await this.$axios.$post('/lists', data)
            .catch(err => {
                console.log(err)
            })
        commit('create', response)
    },
    async delete({
        commit
    }, user) {
        const response = await this.$axios.$delete(`/list/${user.id}`)
            .catch(err => {
                console.log(err)
            })
        commit('delete', response)
    },
    async update({
        commit
    }, user) {
        const response = await this.$axios.$patch(`/list/${user.id}`, user)
            .catch(err => {
                console.log(err)
            })
        commit('update', response)
    }
}