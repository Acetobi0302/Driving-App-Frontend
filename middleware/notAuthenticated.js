export default function({ store, redirect, route }) {
  console.log('a12')
  if (store.state.auth.loggedIn) {
    console.log('a122')
    return redirect("/dashboard");
  }
}
