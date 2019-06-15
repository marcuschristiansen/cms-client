import axios from 'axios'

class UserHttp {
    constructor(accessToken) {
        this.accessToken = accessToken
        this.prefix = `${process.env.serverUrl}/api/auth`;
        axios.defaults.headers.common["Content-Type"] = 'application/json'
        axios.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest'
        axios.defaults.headers.common["Authorization"] = "Bearer " + this.accessToken;
    }

  user() {
    return axios.get(`${this.prefix}/user`)
  }
}

export default UserHttp;