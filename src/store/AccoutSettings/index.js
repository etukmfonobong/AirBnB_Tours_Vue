import Vue from 'vue'

const state = {
  hostImgTours: 'https://airbnb-tours-api.herokuapp.com/img/tours/',
  hostImgUsers: 'https://airbnb-tours-api.herokuapp.com/img/users/',
}
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
const getters = {
  hostImgTours: state => state.hostImgTours,
  hostImgUsers: state => state.hostImgUsers
}

const accoutsettingsModule = {
  state,
  mutations,
  actions,
  getters
};

export default accoutsettingsModule