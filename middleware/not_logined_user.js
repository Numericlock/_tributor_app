export default async function ({
    store,
    redirect,
    $cookies
}) {
    if (!store.getters['authentication/user']) {
        const token = $cookies.get('_tributor_api_token')
        if(token){
            const response = await store.dispatch('authentication/authentication', token)
            console.log(response);
            if(!response.success) redirect('/login')
        }else redirect('/login')
    }
}