<template>
  <main class="main">
    <div class="login-form">
      <h2 class="heading-secondary ma-bt-lg">Forgot password</h2>
      <form class="form" @submit.prevent="handleSubmit">
        <div class="form__group"><label class="form__label" for="password-current">Enter account email</label>
          <input
              id="password-current" v-model.lazy="$v.ForgotForm.email.$model" class="form__input" minlength="8"
              placeholder="me@example.com"
              required="required"
              type="email"/>
        </div>
        <!--    form errors-->
        <div v-if="$v.ForgotForm.email.$invalid  && $v.ForgotForm.email.$dirty">
          <div v-if="!$v.ForgotForm.email.required" class="vuelidate-error e-margin">Please input your Account
            Email
          </div>
          <div v-if="!$v.ForgotForm.email.checkEmail" class="vuelidate-error e-margin">Please input a valid email
          </div>
        </div>

        <div class="form__group right">
          <button :disabled="ForgotForm.submitting" class="btn btn--small btn--green">
                <span v-if="ForgotForm.submitting === true" class="paddingLoad">
                  <half-circle-spinner
                      :animation-duration="1000"
                      :size="25"
                      color="#fff"/>
                </span>
            <span v-else>Send reset link</span>
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
import validator from "validator";

export default {
  name: "forgotPassword",
  components: {HalfCircleSpinner},
  computed: {
    ...mapGetters(['user', 'hostImgUsers'])
  },
  data() {
    return {
      ForgotForm: {
        email: null,
        submitting: false
      }
    }
  },
  validations: {
    ForgotForm: {
      email: {
        required,
        checkEmail(emailValue) {
          if (!emailValue) return true
          return validator.isEmail(emailValue)
        }
      }

    }
  },
  methods: {
    handleSubmit() {

      if (this.$v.ForgotForm.$anyDirty && !this.$v.ForgotForm.$invalid) {
        console.log('form submitted')
        this.ForgotForm.submitting = true

        this.$store
            .dispatch("getPasswordChangeLink", {
              email: this.ForgotForm.email
            }).then(async () => {
          this.ForgotForm.submitting = false
        })
      }

    }
  }
}
</script>

<style scoped>

</style>