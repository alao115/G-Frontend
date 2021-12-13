import serviceGenerator from './serviceGenerator'


export default ({ http, serviceName }) => class memberService extends serviceGenerator({ http, serviceName }) {

  getAll (limit, skip) {
    return http.$get(`/${serviceName}?limit=${limit}&skip=${skip}`)
  }

  search (data, limit, skip) {
    return http.post(`/${serviceName}/search?limit=${limit}&skip=${skip}`, data)
  }
}
