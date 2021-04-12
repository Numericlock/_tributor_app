const merge = require('deepmerge')
export const state = () => ({
    posts: [],
    start_post: null,
    last_post: null,
    userIds: [],
    getPostsFlag: true,

})

export const getters = {
    list(state) {
        return state.posts
    },
    start_post(state) {
        return state.start_post
    },
    last_post(state) {
        return state.last_post
    },
    getPostsFlag(state) {
        return state.getPostsFlag
    }

}

export const mutations = {
    setList(state, data) {
        state.posts = data.posts;
        console.log(data.posts);
        state.start_post = data.start_post;
        state.last_post = data.last_post;
        state.userIds = data.userIds;
    },
    create(state, data) {
        const last_post_key = Object.keys(state.posts).slice(-1)[0];
        Object.keys(data.posts).forEach(function (key) {
            state.posts[Number(last_post_key) + Number(key) + 1] = data.posts[key];
            console.log(key);
        });
        state.last_post = data.last_post;
        state.getPostsFlag = true;
    },
    delete(state, data) {
        state.home.forEach((user, index) => {
            if (user.id === data.id) {
                state.home.splice(index, 1)
            }
        })
    },
    update(state, data) {
        state.home.forEach((user, index) => {
            if (user.id === data.id) {
                state.home.splice(index, 1, data)
            }
        })
    },
    getPostsFlag(state, data) {
        state.getPostsFlag = data;
    }
}

export const actions = {
    async fetchList() {
        return await this.$axios.$get('/home')
            .catch(err => {
                console.log(err)
            })
    },
    async getBeforePosts({
        commit,
        state
    }, data) {
        console.log(state.getPostsFlag);
        if (state.getPostsFlag) {
            commit('getPostsFlag', false);
            const response = await this.$axios.$post('/home/before', data)
                .catch(err => {
                    console.log(err);
                    //  state.getPostsFlag = true;
                })
            console.log(response);
            commit('create', response)
        }
    },
    async create({
        commit
    }, user) {
        const response = await this.$axios.$post('/home', user)
            .catch(err => {
                console.log(err)
            })
        commit('create', response)
    },
    async delete({
        commit
    }, user) {
        const response = await this.$axios.$delete(`/home/${user.id}`)
            .catch(err => {
                console.log(err)
            })
        commit('delete', response)
    },
    async update({
        commit
    }, user) {
        const response = await this.$axios.$patch(`/home/${user.id}`, user)
            .catch(err => {
                console.log(err)
            })
        commit('update', response)
    }
}