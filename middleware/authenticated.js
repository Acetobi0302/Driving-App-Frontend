export default function ({ store, redirect, route }) {
  console.log('a1')
  if (!store.state.auth.loggedIn) {
    console.log('a2')
    return redirect('/login')
  }
}
