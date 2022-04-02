// eslint-disable-next-line require-await
export default ({ redirect, store }) => {
  if (!store.getters['customAuth/passwordEmailSent']) { redirect({ name: 'auth-signin' }) }
}
