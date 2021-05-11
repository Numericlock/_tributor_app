import $cookies from "cookie-universal-nuxt";
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
        state.list.push(data)
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
        const token = this.$cookies.get('_tributor_api_token');
        console.log(token);
        this.$axios.defaults.headers.common['Authorization'] = "Bearer " + token;
        return await this.$axios.$get('/post')
            .catch(err => {
                console.log(err)
            })
    },
    async read({
        commit
    }, data) {
        console.log(data);
        return await this.$axios.$get('/post/' + data.id)
            .catch(err => {
                console.log(err)
            })
    },
    async create({
        commit
    }, postData) {
        const response = await this.$axios.$post('/post', postData)
            .catch(err => {
                console.log(err)
            })
        console.log(response);
        //commit('create', response)
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