<template>
  <form class="form form-user-data" novalidate @submit.prevent="handleDetailsUpdate">
    <div class="form__group">
      <label class="form__label" for="name">Name</label>
      <input id="name"
             v-model.lazy="$v.DetailsForm.name.$model"
             class="form__input"
             required="required"
             type="text"/>
    </div>
    <!--    form errors-->
    <div v-if="$v.DetailsForm.name.$invalid  && $v.DetailsForm.name.$dirty">
      <div v-if="!$v.DetailsForm.name.required" class="vuelidate-error e-margin">Please input your name</div>
      <div v-if="!$v.DetailsForm.name.minLength" class="vuelidate-error e-margin">Your name should be at least 8
        characters
        long
      </div>
    </div>
    <div class="form__group ma-bt-md">
      <label class="form__label" for="email">Email address</label>
      <input id="email"
             v-model.lazy="$v.DetailsForm.email.$model"
             class="form__input"
             required="required"
             type="email"/>
    </div>
    <!--    form errors-->
    <div v-if="$v.DetailsForm.email.$invalid  && $v.DetailsForm.email.$dirty">
      <div v-if="!$v.DetailsForm.email.required" class="vuelidate-error e-margin">Please input your email</div>
      <div v-if="!$v.DetailsForm.email.checkEmail" class="vuelidate-error e-margin">Please input a valid email
      </div>
    </div>
    <div class="form__group form__photo-upload">
      <img :src="hostImgUsers + user['photo']" alt="User photo"
           class="form__user-photo"/>
      <input id="photo" ref="photo" accept="image/*" class="form__upload" name="photo" type="file" @change="setPhoto"/>
      <label for="photo">Choose new photo</label>
      <p class="px-3 pt-2">{{ displayFileName }}</p>

    </div>
    <div class="form__group right">
      <button :disabled="DetailsForm.submitting" class="btn btn--small btn--green" @click="handleDetailsUpdate">
                <span v-if="DetailsForm.submitting === true" class="paddingLoad">
                  <half-circle-spinner
                      :animation-duration="1000"
                      :size="25"
                      color="#fff"/>
                </span>
        <span v-else>Save settings</span>
      </button>
    </div>
  </form>
</template>

<script>
import {mapGetters} from 'vuex'
import {minLength, required} from 'vuelidate/lib/validators'
import validator from 'validator'
import {HalfCircleSpinner} from 'epic-spinners'

export default {
  name: "updateUserDetailsForm",
  components: {HalfCircleSpinner},
  computed: {
    ...mapGetters(['user', 'hostImgUsers'])
  },
  data() {
    return {
      displayFileName: null,
      DetailsForm: {
        name: null,
        email: null,
        photo: null,
        submitting: false
      }
    }
  },
  validations: {
    DetailsForm: {
      name: {
        required,
        minLength: minLength(8)
      },
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
    setPhoto() {
      this.DetailsForm.photo = this.$refs.photo.files[0]
      this.displayFileName = this.$refs.photo.files[0].name
    },
    setInitialState() {
      this.DetailsForm.name = this.user.name
      this.DetailsForm.email = this.user.email
      this.DetailsForm.photo = this.user.photo
      this.displayFileName = 'no file selected'
    },
    handleDetailsUpdate() {
      // if (this.$v.DetailsForm.$anyDirty && !this.$v.DetailsForm.$invalid) {
      if (!this.$v.DetailsForm.$invalid) {
        console.log('form submitted')
        this.DetailsForm.submitting = true

        console.log(this.DetailsForm.photo)
        const form = new FormData()
        form.append('name', this.DetailsForm.name)
        form.append('email', this.DetailsForm.email)
        form.append('photo', this.DetailsForm.photo)

        this.$store
            .dispatch("updateDetails", form).then(async () => {

          await this.$store.dispatch('getUser')
          await this.$toast.success('Details Successfully Updated')

          this.DetailsForm.submitting = false
        })
      }
    }
  },
  created() {
    this.setInitialState()
  }
}
</script>

<style scoped>

</style>