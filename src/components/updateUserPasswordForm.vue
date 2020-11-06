<template>
  <form class="form form-user-settings" @submit.prevent="handleSubmit">
    <div class="form__group"><label class="form__label" for="password-current">Current password</label>
      <input
          id="password-current" v-model.lazy="$v.PassForm.currentPassword.$model" class="form__input" minlength="10"
          placeholder="••••••••"
          required="required"
          type="password"/>
    </div>
    <!--    form errors-->
    <div v-if="$v.PassForm.currentPassword.$invalid  && $v.PassForm.currentPassword.$dirty">
      <div v-if="!$v.PassForm.currentPassword.required" class="vuelidate-error e-margin">Please input your Current
        Password
      </div>
      <div v-if="!$v.PassForm.currentPassword.minLength" class="vuelidate-error e-margin">Your password should be at
        least 10 characters long
      </div>
    </div>
    <div class="form__group"><label class="form__label" for="password">New password</label>
      <input
          id="password" v-model.lazy="$v.PassForm.newPassword.$model" class="form__input" minlength="10"
          placeholder="••••••••"
          required="required"
          type="password"/>
    </div>
    <!--    form errors-->
    <div v-if="$v.PassForm.newPassword.$invalid  && $v.PassForm.newPassword.$dirty">
      <div v-if="!$v.PassForm.newPassword.required" class="vuelidate-error e-margin">Please input your New
        Password
      </div>
      <div v-if="!$v.PassForm.newPassword.minLength" class="vuelidate-error e-margin">Your password should be at
        least 10 characters long
      </div>
    </div>
    <div class="form__group ma-bt-lg"><label class="form__label" for="password-confirm">Confirm
      password</label>
      <input
          id="password-confirm" v-model.lazy="$v.PassForm.confirmPassword.$model" class="form__input" minlength="10"
          placeholder="••••••••"
          required="required"
          type="password"/>
    </div>
    <!--    form errors-->
    <div v-if="$v.PassForm.confirmPassword.$invalid  && $v.PassForm.confirmPassword.$dirty">
      <div v-if="!$v.PassForm.confirmPassword.required" class="vuelidate-error e-margin">Please confirm your new
        Password
      </div>
      <div v-if="!$v.PassForm.confirmPassword.minLength" class="vuelidate-error e-margin">Your password should be at
        least 10 characters long
      </div>
      <div v-if="!$v.PassForm.confirmPassword.sameAsPassword" class="vuelidate-error e-margin">Your New password does
        not match this field
      </div>
    </div>

    <div class="form__group right">
      <button :disabled="PassForm.submitting" class="btn btn--small btn--green">
                <span v-if="PassForm.submitting === true" class="paddingLoad">
                  <half-circle-spinner
                      :animation-duration="1000"
                      :size="25"
                      color="#fff"/>
                </span>
        <span v-else>Update Password</span>
      </button>
    </div>
  </form>
</template>

<script>
import {mapGetters} from 'vuex'
import {minLength, required, sameAs} from 'vuelidate/lib/validators'
import {HalfCircleSpinner} from 'epic-spinners'
import router from "@/router";

export default {
  name: "updateUserPasswordForm",
  components: {HalfCircleSpinner},
  computed: {
    ...mapGetters(['user', 'hostImgUsers'])
  },
  data() {
    return {
      PassForm: {
        currentPassword: null,
        newPassword: null,
        confirmPassword: null,
        submitting: false
      }
    }
  },
  validations: {
    PassForm: {
      currentPassword: {
        required,
        minLength: minLength(10)
      },
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

      if (this.$v.PassForm.$anyDirty && !this.$v.PassForm.$invalid) {
        console.log('form submitted')
        this.PassForm.submitting = true

        this.$store
            .dispatch("passwordChange", {
              password: this.PassForm.currentPassword,
              newPassword: this.PassForm.newPassword,
              passwordConfirm: this.PassForm.confirmPassword,
            }).then(async () => {
          if (this.user === 'success') {
            await this.$store.dispatch('logout')

            await router.push({name: 'Login'})
            await this.$toast.success('Password changed successfully. Please login again')

          }
          this.PassForm.submitting = false
        })
      }

    }
  }
}
</script>

<style scoped>

</style>