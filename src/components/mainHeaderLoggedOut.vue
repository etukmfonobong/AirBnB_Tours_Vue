<template>
  <nav class="nav nav--user">
    <router-link :to="{name:'Login'}" class="nav__el">Log in</router-link>
    <button class="nav__el nav__el--cta">Sign up</button>
  </nav>
</template>

<script>
export default {
  name: "mainHeaderLoggedOut"
}
</script>

<style scoped>

</style>