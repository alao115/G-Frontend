export default class storageService {

  constructor(private readonly apiBaseUrl: string, private readonly serviceName: string) {}

  upload (data: any) {
    return useFetch(`${this.apiBaseUrl}/${this.serviceName}/upload`, { method: 'post', body: data })
  }

  download (data: any) {
    return useFetch(`${this.apiBaseUrl}/${this.serviceName}/download`, { method: 'post', body: data })
  }

  delete (data: any) {
    return useFetch(`${this.apiBaseUrl}/${this.serviceName}/delete`, { method: 'post', body: data })
  }
}
