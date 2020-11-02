<template>
  <header class="header">
    <nav class="nav nav--tours">
      <router-link :to="{name:'Home'}" class="nav__el">All tours</router-link>
      <form class="nav__search">
        <button class="nav__search-btn">
          <svg>
            <use xlink:href="@/assets/img/icons.svg#icon-search"></use>
          </svg>
        </button>
        <input
            class="nav__search-input"
            placeholder="Search tours"
            type="text"
        />
      </form>
    </nav>
    <div class="header__logo">
      <img alt="Natours logo" src="@/assets/img/logo-white.png"/>
    </div>

    <div v-if="loggedIn">
      <main-header-logged-in :user='user'/>
    </div>
    <div v-else>
      <main-header-logged-out/>
    </div>
    <!--    <main-header-logged-in/>-->
    <!--    <main-header-logged-out/>-->

  </header>
</template>

<script>
import mainHeaderLoggedIn from "@/components/mainHeaderLoggedIn";
import mainHeaderLoggedOut from "@/components/mainHeaderLoggedOut";
import {mapGetters} from 'vuex'

export default {
  name: "mainHeader",
  components: {mainHeaderLoggedIn, mainHeaderLoggedOut},
  computed: {
    ...mapGetters(['user', 'loggedIn'])
  }
}
</script>

<style scoped>

</style>