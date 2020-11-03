<template>
  <div class="login-form">
    <h2 class="heading-secondary ma-bt-lg">Log into your account</h2>
    <form class="form" novalidate @submit.prevent="handleSubmit">
      <!--      email-->
      <div class="form__group">
        <label class="form__label" for="email">Email address</label>
        <input id="email" v-model.lazy="$v.loginForm.email.$model" class="form__input" placeholder="you@example.com"
               required="required"
               type="email"/>
      </div>
      <!--form errors-->
      <div v-if="$v.loginForm.email.$invalid  && $v.loginForm.email.$dirty">
        <div v-if="!$v.loginForm.email.required" class="vuelidate-error e-margin">Please input your email</div>
        <div v-if="!$v.loginForm.email.checkEmail" class="vuelidate-error e-margin">Please input a valid email</div>
      </div>
      <!--      password-->
      <div class="form__group ma-bt-md">
        <label class="form__label" for="password">Password</label>
        <input id="password" v-model.lazy="$v.loginForm.password.$model" autocomplete="current-password"
               class="form__input"
               minlength="8"
               placeholder="••••••••" required="required" type="password"/>
        <!--form errors-->
        <div v-if="$v.loginForm.password.$invalid  && $v.loginForm.password.$dirty">
          <div v-if="!$v.loginForm.password.required" class="vuelidate-error">Please input your password</div>
          <div v-if="!$v.loginForm.password.minLength" class="vuelidate-error">Your password should be at least 8
            characters
            long
          </div>
        </div>

      </div>
      <!--      submit button-->
      <div class="form__group">
        <button :disabled="loginForm.submitting" class="btn btn--green">
          <span v-if="loginForm.submitting === true" class="paddingLoad">
            <half-circle-spinner
                :animation-duration="1000"
                :size="25"
                color="#fff"/>
          </span>

          <span v-else>Login</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import {required, minLength} from 'vuelidate/lib/validators'
import validator from 'validator'
import {HalfCircleSpinner} from 'epic-spinners'
import {mapGetters} from 'vuex'
import router from "@/router";


export default {
  name: "baseForm",
  components: {HalfCircleSpinner},
  data() {
    return {
      loginForm: {
        email: null,
        password: null,
        submitting: false
      }
    }
  },
  computed: {
    ...mapGetters(['user', "loggedIn"])
  },
  validations: {
    loginForm: {
      email: {
        required,
        checkEmail(emailValue) {
          if (!emailValue) return true
          return validator.isEmail(emailValue)
        }
      },
      password: {
        required,
        minLength: minLength(8)
      }
    }
  },
  methods: {
    handleSubmit() {

      if (this.$v.loginForm.$anyDirty && !this.$v.loginForm.$invalid) {
        console.log('form submitted')
        this.loginForm.submitting = true

        this.$store
            .dispatch("login", {
              email: this.loginForm.email,
              password: this.loginForm.password
            }).then(async () => {
          if (this.user === 'success') {
            await this.$store.dispatch('getUser')
            if (this.loggedIn === true) {
              await router.push({name: 'Home'})
              await this.$toast.success('Login Successful')
            }
          }
          this.loginForm.submitting = false
        })
      }

    }
  }
}
</script>

<style scoped>

</style>