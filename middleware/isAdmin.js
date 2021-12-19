/* eslint-disable no-empty */
export default ({ store, $auth, redirect }) => {
  // console.log('Context: ', $auth)

  if ($auth.loggedIn) {

  } else {
    redirect({ name: 'signin' })
  }
}
