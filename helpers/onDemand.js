export default class onDemand {
  // src - the full url to load
  // waitForPageLoad - still wait for the page load event on first hit
  constructor (src, waitForPageLoad = true) {
    this.isLoaded = false
    this.isLoading = false
    this.callbacks = []
    this.src = src
    this.waitForPageLoad = waitForPageLoad
  }

  load (callback = () => {}) {
    if (this.isLoaded) {
      return callback()
    }

    this.callbacks.push(callback)

    if (!this.isLoading) {
      this.isLoading = true
      if (!this.waitForPageLoad || document.readyState === 'complete') {
        this.loadScript()
      } else {
        this.loadScript()
        // console.log(this.loadScript)
        // window.addEventListener('load', () => {
        //   console.log('Loading...')
        //   this.loadScript()
        // })
      }
    }
  }

  loadScript () {
    console.log('5')
    const script = document.createElement('script')
    script.src = this.src
    script.onload = () => this.invokeCallbacks()
    document.getElementsByTagName('head')[0].appendChild(script)
  }

  invokeCallbacks () {
    this.isLoaded = true
    this.callbacks.forEach(callback => callback())
  }
}
