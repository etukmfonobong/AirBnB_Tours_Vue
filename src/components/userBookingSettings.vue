<template>
  <div class="py-5 px-5">
    <vue-headful
        description="AirBnB Tours home page displaying tour offerings"
        title="Bookings | AirBnB Tours"
    />
    <section class="overview">
      <div v-if="bookingsLoading">Loading...</div>
      <div v-else>
        <div class="card-container">

          <div v-for="booking in bookings" :key="booking._id">
            <booking-card :booking="booking"/>
          </div>


        </div>
      </div>

    </section>
  </div>
</template>

<script>
import {HalfCircleSpinner} from 'epic-spinners'
import {mapGetters} from 'vuex'
// import bookingCard from "@/components/bookingCard";
import bookingCard from "@/components/bookingCard";

export default {
  name: "userBookingSettings",
  components: {HalfCircleSpinner, bookingCard},
  data() {
    return {
      loginForm: {}
    }
  },
  computed: {
    ...mapGetters(['user', 'bookings', 'bookingsLoading'])
  },
  created() {
    this.$store.dispatch('getBookings', this.user._id)
  }
}
</script>

<style scoped>

</style>