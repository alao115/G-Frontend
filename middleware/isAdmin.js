/* eslint-disable no-empty */
export default ({ store, $auth, redirect }) => {
  // console.log('Context: ', $auth)

  if ($auth.loggedIn) {
    if ($auth.user.userType === 2) { redirect({ name: 'index' }) }
  } else {
    redirect({ name: 'signin' })
  }
}
