export default function ({ store, redirect }) {
  if (store.state.authentication.user) {
    redirect('/home')
  }
}