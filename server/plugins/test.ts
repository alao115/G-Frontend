export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html, { event }) => {
    // console.log('render:html')
    // html.bodyAppend.push('<hr>Appended by custom plugin')
    // console.log('Server::::: ', parseCookies(event))
  })

  nitroApp.hooks.hook('render:response', (response, { event }) => {
    // console.log('render:response')
    // console.log('Server::::: ', event.req)
  })
})
