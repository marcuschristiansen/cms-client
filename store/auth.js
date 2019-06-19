import AuthHttp from "~/services/AuthHttp";

export const state = () => ({
  token: false,
  authStatusSet: false,
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setAuthStatus(state, value) {
    state.authStatusSet = value
  }
}

export const getters = {
  getToken(state) {
    return state.token
  },
  getAuthStatus(state) {
    return state.authStatusSet
  }
}

export const actions = {
    
  async fetchToken({ dispatch }, values) {
    try {
      this.authHttp = new AuthHttp();
      const result = await this.authHttp.login(values);

      if(result.status == 200) {
        localStorage.setItem('token', JSON.stringify(result.data))
        dispatch('setToken', result.data)

        return result.data
      }
    } catch (err) {
      dispatch('setToken', false)
      dispatch('user/setUser', false, { root: true })
      return err.message
    } 
  },

  setToken({ commit }, values) {
    commit('setToken', values)
  },

  setAuthStatus({ commit }, value) {
    commit('setAuthStatus', value)
  },

  createUser({ commit, dispatch }, values) {
    return new Promise((resolve, reject) => {
      this.authHttp = new AuthHttp()
      this.authHttp.signup(values)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error.response);
      })
    });
  },

  logout({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        this.authHttp = new AuthHttp()
        this.authHttp.logout()
        .then(result => {
          localStorage.removeItem('token')
          localStorage.removeItem('user')

          dispatch('setToken', false)
          dispatch('user/setUser', false, { root: true })

          resolve(result)
        })
        .catch(error => {
          reject(result.response)
        })
      })
  }
}