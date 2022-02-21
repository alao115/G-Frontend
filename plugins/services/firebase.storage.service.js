export default ({ http, serviceName }) => class storageService {
  upload (data) {
    return http.post(`/${serviceName}/upload`, data)
  }

  download () {
    return http.get(`/${serviceName}/download`)
  }

  delete (entityID) {
    return http.post(`/${serviceName}/delete`, entityID)
  }
}
