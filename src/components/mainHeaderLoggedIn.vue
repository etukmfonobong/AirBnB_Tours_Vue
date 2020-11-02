<template>
  <nav class="nav nav--user">
    <a class="nav__el" href="#">My bookings</a>
    <button class="nav__el" @click="handleLogOut">Log Out</button>
    <router-link :to="{name:'Account Settings'}" class="nav__el">
      <img :src="'http://localhost:3000/img/users/' + user['photo']" alt="User photo" class="nav__user-img"/>
      <span>{{ user.name|extractFirstName }}</span>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "mainHeaderLoggedIn",
  props: ['user'],
  methods: {
    handleLogOut() {
      console.log('from handle log out')
      this.$store.dispatch('logout').then(() => {
        this.$router.push("/login")
      })
    }
  }
}
</script>
