<template>
  <div class="footer">
    <div class="footer__logo">
      <router-link :to="{name:'Home'}"><img alt="Natours logo" src="@/assets/img/logo-green.png"/></router-link>
    </div>
    <ul class="footer__nav">
      <li><a href="#">About us</a></li>
      <li><a href="#">Download apps</a></li>
      <li><a href="#">Become a guide</a></li>
      <li><a href="#">Careers</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
    <p class="footer__copyright">
      &copy; by Jonas Schmedtmann. All rights reserved.
    </p>
  </div>
</template>

<script>
export default {
  name: "mainFooter"
}
</script>

<style scoped>

</style>