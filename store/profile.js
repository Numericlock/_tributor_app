export const state = () => ({
    profile: []
})

export const getters = {
    profile(state) {
        return state.profile
    }
}

export const mutations = {
    setProfile(state, data) {
        state.profile = data
    },
    create(state, data) {
        var tmp = [];
        tmp.push(data);
        for(let i=0;i<state.profile.length;i++){
            tmp.push(state.profile[i]);
        }
        state.profile = tmp;
    },
    delete(state, data) {
        state.profile.forEach((user, index) => {
            if (user.id === data.id) {
                state.profile.splice(index, 1)
            }
        })
    },
    update(state, data) {
        state.profile.forEach((user, index) => {
            if (user.id === data.id) {
                state.profile.splice(index, 1, data)
            }
        })
    }
}

export const actions = {
    async fetchList() {
        return await this.$axios.$get('/profile')
            .catch(err => {
                console.log(err)
            })
    },
    async read({
        commit
    }, data)  {
        console.log(data);
        return await this.$axios.$get('/profile/'+data.user_id)
            .catch(err => {
                console.log(err)
            })
    },
    async create({
        commit
    }, data) {
        const response = await this.$axios.$post('/profile', data)
            .catch(err => {
                console.log(err)
            })
        commit('create', response)
    },
    async delete({
        commit
    }, user) {
        const response = await this.$axios.$delete(`/profile/${user.id}`)
            .catch(err => {
                console.log(err)
            })
        commit('delete', response)
    },
    async update({
        commit
    }, user) {
        const response = await this.$axios.$patch(`/profile/${user.id}`, user)
            .catch(err => {
                console.log(err)
            })
        commit('update', response)
    }
}