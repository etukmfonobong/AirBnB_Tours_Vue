<template>
  <div class="user-view__content">
    <div class="user-view__form-container">
      <h2 class="heading-secondary ma-bt-md">Your account settings</h2>
      <update-user-details-form/>
    </div>
    <div class="line">&nbsp;</div>
    <div class="user-view__form-container">
      <h2 class="heading-secondary ma-bt-md">Password change</h2>
      <update-user-password-form/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import updateUserDetailsForm from "@/components/updateUserDetailsForm";
import updateUserPasswordForm from "@/components/updateUserPasswordForm";

export default {
  name: "userAccountSettings",
  components: {updateUserDetailsForm, updateUserPasswordForm},
  computed: {...mapGetters(['user'])}
}
</script>

<style scoped>

</style>