import axios from 'axios'

class AuthHttp {
  constructor() {
    this.prefix = `${process.env.serverUrl}/api/auth`
    axios.defaults.headers.common["Content-Type"] = 'application/json'
    axios.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest'
  }

  login(data) {
    return axios.post(`${this.prefix}/login`, data)
  }

  logout() {
    return axios.post(`${this.prefix}/logout`)
  }

  signup() {
    return axios.post(`${this.prefix}/signup`)
  }
}

export default AuthHttp;