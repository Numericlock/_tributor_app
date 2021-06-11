//import $cookies from "cookie-universal-nuxt";
export const state = () => ({
    user: null
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
        if(response){
            return dispatch('authentication', response.success.token);
        }
        else return false;
    },
    async register({
        commit,dispatch
    }, data) {
        const response = await this.$axios.$post('http://localhost:8000/api/register', data)
            .catch(err => {
                console.log(err)
            })
        if(response){
            return dispatch('authentication', response.success.token);
        }
        else return false;
    },
    async authentication({
        commit
    }, token) {
        if(token){
            this.$axios.defaults.headers.common['Authorization'] = "Bearer " + token;
            const response = await
            this.$axios.$post('/details', {
                headers: {
                    "Content-Type": "application/json"
                }
            }).catch(err => {
                console.log(err)
            })
            console.log(response.success);
            if(response) this.$cookies.set('_tributor_api_token', token);
            commit('setUser', response.success)
            return response;
        }else return false;
    },

}