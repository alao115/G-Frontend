export default ({ http, serviceName }) => class storageService {
  upload (data) {
    return http.post(`/${serviceName}/upload`, data)
  }

  download (data) {
    return http.post(`/${serviceName}/download`, data)
  }

  delete (data) {
    return http.post(`/${serviceName}/delete`, data)
  }
}
