export default function ({ store, redirect }) {
    if (localStorage.getItem('token')) {
        const token =  JSON.parse(localStorage.getItem('token'))
        store.dispatch('auth/setToken', token)
        store.dispatch('user/fetchUser', token.access_token)
    } else {
        store.dispatch('auth/setAuthStatus', true)
    }
}