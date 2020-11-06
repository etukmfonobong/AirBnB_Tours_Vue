const stripe = Stripe('pk_test_51Hif9CHAjx0zWyRxeUy0u4ZlOgm4YtlojjWVhiYonjj1NXbCI5wGZqkR8aKL1Zlg8HKj7Uot3EmMaxRrwhaqGZaa00vsGiVmc9');


const state = {
  tours: null,
  toursLoading: true,
  bookings: null,
  bookingsLoading: true,
  currentTour: null,
  currentTourLoading: null
}
const mutations = {
  UPDATE_TOURS(state, payload) {
    state.tours = payload;
  },
  UPDATE_TOURS_LOADING(state, payload) {
    state.toursLoading = payload;
  },
  UPDATE_BOOKINGS(state, payload) {
    state.bookings = payload;
  },
  UPDATE_BOOKINGS_LOADING(state, payload) {
    state.bookingsLoading = payload;
  },
  UPDATE_CURRENT_TOUR(state, payload) {
    state.currentTour = payload;
  },
  UPDATE_CURRENT_TOUR_LOADING(state, payload) {
    state.currentTourLoading = payload;
  },
}
const actions = {
  async getTours({commit}) {
    try {
      const response = await axios.get('/tours')
      commit('UPDATE_TOURS', response.data.data["documents"])
      commit('UPDATE_TOURS_LOADING', false)
    } catch (e) {
      console.log(e)
    }
  },
  async getBookings({commit}, userId) {
    try {
      const response = await axios.get(`/users/${userId}/bookings`)
      commit('UPDATE_BOOKINGS', response.data.data["documents"])
      commit('UPDATE_BOOKINGS_LOADING', false)
    } catch (e) {
      console.log(e)
    }
  },
  async stripeCheckout({commit}, tourId) {
    try {
      console.log('chechout start')
      const response = await axios.get(`/bookings/checkout-session/${tourId}`)
      console.log(response.data)
      await stripe.redirectToCheckout({
        sessionId: response.data.session.id
      })
    } catch (e) {
      console.log(e)
    }
  },
  async getCurrentTour({commit}, tourId) {
    try {
      commit('UPDATE_CURRENT_TOUR_LOADING', true)
      const response = await axios.get(`/tours/${tourId}`)
      commit('UPDATE_CURRENT_TOUR', response.data.data["document"])
      commit('UPDATE_CURRENT_TOUR_LOADING', false)
    } catch (e) {
      console.log(e)
    }
  },
  async resetCurrentTour({commit}) {
    try {
      commit('UPDATE_CURRENT_TOUR', {name: '...'})
    } catch (e) {
      console.log(e)
    }
  }

}
const getters = {
  tours: state => state.tours,
  toursLoading: state => state.toursLoading,
  bookings: state => state.bookings,
  bookingsLoading: state => state.bookingsLoading,
  currentTour: state => state.currentTour,
  currentTourLoading: state => state.currentTourLoading
}

const tourModule = {
  state,
  mutations,
  actions,
  getters
};

export default tourModule