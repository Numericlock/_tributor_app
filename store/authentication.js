//import $cookies from "cookie-universal-nuxt";
export const state = () => ({
    user: []
})

export const getters = {
    user(state) {
        return state.user
    }
}

export const mutations = {
    setUser(state, data) {
        state.user = data
    }
}

export const actions = {
    async login({
        commit,dispatch
    }, data) {
        console.log(data);
        const response = await this.$axios.$post('http://localhost:8000/api/login', data)
            .catch(err => {
                console.log(err)
            })
        console.log(response);
        const token = response.success.token;
        dispatch('authentication', token)
    },
    async register({
        commit
    }, data) {
        const response = await this.$axios.$post('http://localhost:8000/api/register', data)
            .catch(err => {
                console.log(err)
            })
        console.log(response);
        const token = response.success.token;
        dispatch('authentication', token)
    },
    async authentication({
        commit
    }, token) {
        console.log(token);
        this.$axios.defaults.headers.common['Authorization'] = "Bearer " + token;
        const response = await
        this.$axios.$post('/details', {
            headers: {
                "Content-Type": "application/json"
            }
        }).catch(err => {
            console.log(err)
        })
        console.log(response);
        if(response.success) this.$cookies.set('_tributor_api_token', token);
        console.log(this.$cookies.get('_tributor_api_token'));
        commit('setUser', response)
        
    },

}