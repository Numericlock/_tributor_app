export default async function ({
    store,
    redirect,
    $cookies
}) {
    const token = $cookies.get('_tributor_api_token')
    if (store.getters['authentication/user']) {
        redirect('/home')
    }else if(token){
        const response = await store.dispatch('authentication/authentication', token)
        if(response.success) redirect('/home')
    }
}