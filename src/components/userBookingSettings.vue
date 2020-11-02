<template>
  <test/>
</template>

<script>
import {required, minLength} from 'vuelidate/lib/validators'
import validator from 'validator'
import {HalfCircleSpinner} from 'epic-spinners'
import {mapGetters} from 'vuex'
import router from "@/router";
import test from "@/components/test";


export default {
  name: "userBookingSettings",
  components: {HalfCircleSpinner, test},
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
    ...mapGetters(['user'])
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
            await router.push({name: 'Home'})
            await this.$toast.success('Login Successful')
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