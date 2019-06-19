import UserHttp from "~/services/UserHttp";

export const state = () => ({
  user: false,
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
}

export const getters = {
  getUser(state) {
    return state.user
  },
}

export const actions = {

    async fetchUser({ commit, dispatch }, accessToken) {
        try {
            this.userHttp = new UserHttp(accessToken);
            const result = await this.userHttp.user()

            if (result.status == 200) {
              localStorage.setItem('user', JSON.stringify(result.data))
              dispatch('setUser', result.data)

              return result.data
            }
        } catch (error) {
            console.log(error)
        } finally {
          // Authentication status set
          commit('auth/setAuthStatus', true, { root: true })
        }
    },

    setUser({ commit }, values) {
      commit('setUser', values)
    }

}