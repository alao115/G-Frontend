export default ({ store, redirect }) => {
  const successSignup = store.getters['customAuth/successSignup']
  if (!successSignup) { redirect({ name: 'auth-signup' }) }
}
