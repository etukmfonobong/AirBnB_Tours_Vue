import Vue from 'vue'

const state = {
  user: null,
  loggedIn: null
}
const mutations = {
  UPDATE_USER(state, payload) {
    state.user = payload;
  },
  UPDATE_LOGGED_IN(state, payload) {
    state.loggedIn = payload;
  }
}
const actions = {
  async login({commit}, user) {
    try {
      const response = await axios.post('/users/login', user)
      commit('UPDATE_USER', 'success')


    } catch (e) {
      Vue.$toast.error(e.response.data.message)
      // commit('UPDATE_USER', e.response.data.message)
    }
  },
  async getUser({commit}) {
    try {
      const response = await axios.get('/users/get-me')
      await commit('UPDATE_USER', response.data.data.user)
      console.log('got here')
      await commit('UPDATE_LOGGED_IN', true)

    } catch (e) {
      console.log(e)
      await commit('UPDATE_LOGGED_IN', false)
    }
  },
  async logout({commit}) {
    try {
      Vue.$cookies.remove('jwthandp')
      await commit('UPDATE_USER', null)
      await commit('UPDATE_LOGGED_IN', null)
      Vue.$toast.info('Logout Successful')
    } catch (e) {
      console.log(e)
    }
  }
}
const getters = {
  user: state => state.user,
  loggedIn: state => state.loggedIn
}

const autenticationModule = {
  state,
  mutations,
  actions,
  getters
};

export default autenticationModule