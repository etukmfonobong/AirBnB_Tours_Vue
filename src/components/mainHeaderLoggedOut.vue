<template>
  <nav class="nav nav--user">
    <router-link :to="{name:'Login'}" class="nav__el">Log in</router-link>
    <router-link :to="{name:'SignUp'}" class="nav__el nav__el--cta">Sign up</router-link>
  </nav>
</template>

<script>
export default {
  name: "mainHeaderLoggedOut"
}
</script>

<style scoped>

</style>