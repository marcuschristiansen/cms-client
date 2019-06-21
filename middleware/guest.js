export default function ({ store, redirect }) {
  // If the user is authenticated
  if (store.state.auth.token.access_token) {
    return redirect({ name: 'dashboard' })
  }
}