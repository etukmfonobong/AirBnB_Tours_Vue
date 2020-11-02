<template>
  <main class="main">
    <div class="user-view">
      <nav class="user-view__menu">
        <ul class="side-nav">
          <li :class="[this.$route.path.includes('account-settings')?'side-nav--active':'']">
            <router-link :to="{name:'Account Settings'}">
              <svg>
                <use xlink:href="@/assets/img/icons.svg#icon-settings"></use>
              </svg>
              Settings
            </router-link>
          </li>
          <li :class="[this.$route.path.includes('booking-settings')?'side-nav--active':'']">
            <router-link :to="{name:'Booking Settings'}">
              <svg>
                <use xlink:href="@/assets/img/icons.svg#icon-briefcase"></use>
              </svg>
              My bookings
            </router-link>
          </li>
          <li><a href="#">
            <svg>
              <use xlink:href="@/assets/img/icons.svg#icon-star"></use>
            </svg>
            My reviews</a></li>
          <li><a href="#">
            <svg>
              <use xlink:href="@/assets/img/icons.svg#icon-credit-card"></use>
            </svg>
            Billing</a></li>
        </ul>
        <div v-if="user.role === 'admin'" class="admin-nav">
          <h5 class="admin-nav__heading">Admin</h5>
          <ul class="side-nav">
            <li><a href="#">
              <svg>
                <use xlink:href="@/assets/img/icons.svg#icon-map"></use>
              </svg>
              Manage tours</a></li>
            <li><a href="#">
              <svg>
                <use xlink:href="@/assets/img/icons.svg#icon-users"></use>
              </svg>
              Manage users</a></li>
            <li><a href="#">
              <svg>
                <use xlink:href="@/assets/img/icons.svg#icon-star"></use>
              </svg>
              Manage reviews</a></li>
            <li><a href="#">
              <svg>
                <use xlink:href="@/assets/img/icons.svg#icon-briefcase"></use>
              </svg>
              Manage bookings</a></li>
          </ul>
        </div>
      </nav>
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Settings",
  validations: {},
  computed: {...mapGetters(['user'])}
}
</script>

<style scoped>

</style>