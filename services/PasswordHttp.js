import axios from 'axios'

class AuthHttp {
  constructor() {
    this.prefix = `${process.env.serverUrl}/api/password`
    axios.defaults.headers.common["Content-Type"] = 'application/json'
    axios.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest'
  }

  create(data) {
    return axios.post(`${this.prefix}/create`, data)
  }

  find(data) {
    return axios.get(`${this.prefix}/find/${data}`)
  }

  reset(data) {
    return axios.post(`${this.prefix}/reset`, data)
  }
}

export default AuthHttp;