/* eslint-disable no-empty */
export default ({ store, $auth, redirect }) => {
  if ($auth.loggedIn) {
    // if ($auth.user.userType === userRole.REGULAR_USER) { redirect({ name: 'index' }) }
  } else {
    redirect({ name: 'signin' })
  }
}
