export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.auth.token.access_token) {
    return redirect({ name: 'login' })
  }
}