// import https from 'https'

export default ({ app }) => {
  // process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
  app.apolloProvider.defaultClient.defaultOptions = {
    // httpLinkOptions: {
    //   credentials: 'same-origin',
    //   fetchOptions: { agent: new https.Agent({ rejectUnauthorized: false }) }
    // },
    query: {
      fetchPolicy: 'no-cache'
    }
  }
  // console.log(app.apolloProvider)
}
