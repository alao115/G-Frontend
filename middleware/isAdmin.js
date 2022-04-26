/* eslint-disable no-empty */
export default ({ store, $auth, redirect }) => {
  if ($auth.loggedIn) {
    // if ($auth.user.userType === 2) { redirect({ name: 'index' }) }
  } else {
    redirect({ name: 'signin' })
  }
}
