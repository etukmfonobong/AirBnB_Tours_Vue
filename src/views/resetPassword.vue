<template>
  <main class="main">
    <div class="login-form">
      <h2 class="heading-secondary ma-bt-lg">Forgot password</h2>
      <form class="form" @submit.prevent="handleSubmit">
        <div class="form__group"><label class="form__label" for="password">New password</label>
          <input
              id="password" v-model.lazy="$v.resetPassForm.newPassword.$model" class="form__input" minlength="10"
              placeholder="••••••••"
              required="required"
              type="password"/>
        </div>
        <!--    form errors-->
        <div v-if="$v.resetPassForm.newPassword.$invalid  && $v.resetPassForm.newPassword.$dirty">
          <div v-if="!$v.resetPassForm.newPassword.required" class="vuelidate-error e-margin">Please input your New
            Password
          </div>
          <div v-if="!$v.resetPassForm.newPassword.minLength" class="vuelidate-error e-margin">Your password should be
            at
            least 10 characters long
          </div>
        </div>
        <div class="form__group ma-bt-lg"><label class="form__label" for="password-confirm">Confirm
          password</label>
          <input
              id="password-confirm" v-model.lazy="$v.resetPassForm.confirmPassword.$model" class="form__input"
              minlength="10"
              placeholder="••••••••"
              required="required"
              type="password"/>
        </div>
        <!--    form errors-->
        <div v-if="$v.resetPassForm.confirmPassword.$invalid  && $v.resetPassForm.confirmPassword.$dirty">
          <div v-if="!$v.resetPassForm.confirmPassword.required" class="vuelidate-error e-margin">Please confirm your
            new
            Password
          </div>
          <div v-if="!$v.resetPassForm.confirmPassword.minLength" class="vuelidate-error e-margin">Your password should
            be
            at
            least 10 characters long
          </div>
          <div v-if="!$v.resetPassForm.confirmPassword.sameAsPassword" class="vuelidate-error e-margin">Your New
            password
            does
            not match this field
          </div>
        </div>

        <div class="form__group right">
          <button :disabled="resetPassForm.submitting" class="btn btn--small btn--green">
                <span v-if="resetPassForm.submitting === true" class="paddingLoad">
                  <half-circle-spinner
                      :animation-duration="1000"
                      :size="25"
                      color="#fff"/>
                </span>
            <span v-else>Update Password</span>
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import {mapGetters} from 'vuex'
import {minLength, required, sameAs} from 'vuelidate/lib/validators'
import {HalfCircleSpinner} from 'epic-spinners'
import router from "@/router";

export default {
  name: "resetPassword",
  components: {HalfCircleSpinner},
  props: ['resetToken'],
  computed: {
    ...mapGetters(['user', 'hostImgUsers'])
  },
  data() {
    return {
      resetPassForm: {
        newPassword: null,
        confirmPassword: null,
        submitting: false
      }
    }
  },
  validations: {
    resetPassForm: {
      newPassword: {
        required,
        minLength: minLength(10)
      },
      confirmPassword: {
        required,
        minLength: minLength(10),
        sameAsPassword: sameAs('newPassword')
      }

    }
  },
  methods: {
    handleSubmit() {

      if (this.$v.resetPassForm.$anyDirty && !this.$v.resetPassForm.$invalid) {
        console.log('form submitted')
        this.resetPassForm.submitting = true

        this.$store
            .dispatch("resetPassword", {
              password: this.resetPassForm.newPassword,
              passwordConfirm: this.resetPassForm.confirmPassword,
              resetToken: this.resetToken
            }).then(async () => {

          await this.$store.dispatch('logout')
          await router.push({name: 'Login'})
          await this.$toast.success('Password changed successfully. Please login again')
          this.resetPassForm.submitting = false
        })
      }

    }
  }
}
</script>

<style scoped>

</style>