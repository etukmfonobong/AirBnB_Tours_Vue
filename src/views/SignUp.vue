<template>
  <div class="login">
    <main class="main">
      <sign-up-form/>
    </main>
  </div>
</template>

<script>
import signUpForm from "@/components/signUpForm";

export default {
  name: "SignUp",
  components: {signUpForm}
}
</script>

<style scoped>

</style>