export default defineNuxtPlugin(() => {
  return {
    provide: {
      apiServices: useApiService()
    }
  }
})
