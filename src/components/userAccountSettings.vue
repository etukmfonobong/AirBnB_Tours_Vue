<template>
  <div class="user-view__content">
    <div class="user-view__form-container">
      <h2 class="heading-secondary ma-bt-md">Your account settings</h2>
      <update-user-details-form/>
    </div>
    <div class="line">&nbsp;</div>
    <div class="user-view__form-container">
      <h2 class="heading-secondary ma-bt-md">Password change</h2>
      <form class="form form-user-settings">
        <div class="form__group"><label class="form__label" for="password-current">Current password</label><input
            id="password-current" class="form__input" minlength="8" placeholder="••••••••" required="required"
            type="password"/></div>
        <div class="form__group"><label class="form__label" for="password">New password</label><input
            id="password" class="form__input" minlength="8" placeholder="••••••••" required="required"
            type="password"/></div>
        <div class="form__group ma-bt-lg"><label class="form__label" for="password-confirm">Confirm
          password</label><input
            id="password-confirm" class="form__input" minlength="8" placeholder="••••••••" required="required"
            type="password"/></div>
        <div class="form__group right">
          <button class="btn btn--small btn--green">Save password</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import updateUserDetailsForm from "@/components/updateUserDetailsForm";

export default {
  name: "userAccountSettings",
  components: {updateUserDetailsForm},
  computed: {...mapGetters(['user'])}
}
</script>

<style scoped>

</style>