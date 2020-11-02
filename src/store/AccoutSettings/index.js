import Vue from 'vue'

const state = {}
const mutations = {}
const actions = {
  async updateDetails({commit}, userDetails) {
    try {
      return await axios.patch('/users/update-me', userDetails)

    } catch (e) {
      console.log(e)
      return Vue.$toast.error(e.response.data.message)
    }
  }
}
const getters = {}

const accoutsettingsModule = {
  state,
  mutations,
  actions,
  getters
};

export default accoutsettingsModule