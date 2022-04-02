export default ({ route, redirect }) => {
  if (!route.params.success) { redirect({ name: 'auth-signin' }) }
}
