<template>
  <div class="home">
    <vue-headful
        description="AirBnB Tours home page displaying tour offerings"
        title="Home | AirBnB Tours"
    />
    <section class="overview">
      <div v-if="toursLoading">Loading...</div>
      <div v-else>
        <div class="card-container">

          <div v-for="tour in tours" :key="tour._id">
            <tour-card :tour="tour"/>
          </div>


        </div>
      </div>

    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import tourCard from "@/components/tourCard";

export default {
  name: 'Home',
  components: {tourCard},
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['tours', 'toursLoading']),
  },
  created() {
    this.$store.dispatch('getTours').then(() => {
      this.loading = false
    })
  }

}
</script>
