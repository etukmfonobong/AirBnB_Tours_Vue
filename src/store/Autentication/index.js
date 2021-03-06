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
      console.log(response)


    } catch (e) {
      return Vue.$toast.error(e.response.data.message)
      // commit('UPDATE_USER', e.response.data.message)
    }
  },
  async passwordChange({commit}, user) {
    try {
      const response = await axios.patch('/users/update-password', user)
      commit('UPDATE_USER', 'success')
      console.log(response)


    } catch (e) {
      console.log('from password change', e.response)
      return Vue.$toast.error(e.response.data.message)
      // commit('UPDATE_USER', e.response.data.message)
    }
  },
  async getPasswordChangeLink({commit}, user) {
    try {
      const response = await axios.post('/users/forgot-password', user)
      Vue.$toast.success('Reset link has been sent!')
      console.log(response)


    } catch (e) {
      return Vue.$toast.error(e.response.data.message)
      // commit('UPDATE_USER', e.response.data.message)
    }
  },
  async resetPassword({commit}, user) {
    const {password, passwordConfirm, resetToken} = user
    try {
      const response = await axios.patch(`/users/reset-password/${resetToken}`, {password, passwordConfirm})
      Vue.$toast.success('Password has been reset!')
      console.log(response)


    } catch (e) {
      console.log(e.response)
      return Vue.$toast.error(e.response.data.message)
      // commit('UPDATE_USER', e.response.data.message)
    }
  },
  async signUp({commit}, user) {
    try {
      const response = await axios.post('/users/signup', user)
      commit('UPDATE_USER', 'success')
      console.log(response)


    } catch (e) {
      return Vue.$toast.error(e.response.data.message)
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
      return await commit('UPDATE_LOGGED_IN', false)
      // return Vue.$toast.error('failed to get user')
    }
  },
  async logout({commit}) {
    try {
      await axios.get('/users/logout')
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