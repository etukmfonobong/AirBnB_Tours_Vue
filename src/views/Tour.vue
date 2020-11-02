<template>
  <div class="tour">
    <vue-headful
        :title="`${currentTour.name} | AirBnB Tours`"
        description="AirBnB Tours home page displaying tour offerings"
    />
    <div v-if="currentTourLoading">Loading...</div>
    <div v-else>
      <section class="section-header">
        <div class="header__hero">
          <div class="header__hero-overlay">&nbsp;</div>
          <img :src="require('@/assets/img/tours/' + currentTour['imageCover'])" alt="Tour 5" class="header__hero-img"/>
        </div>
        <div class="heading-box">
          <h1 class="heading-primary"><span>{{ currentTour.name }}</span></h1>
          <div class="heading-box__group">
            <div class="heading-box__detail">
              <svg class="heading-box__icon">
                <use xlink:href="@/assets/img/icons.svg#icon-clock"></use>
              </svg>
              <span class="heading-box__text">{{ currentTour.duration }} days</span></div>
            <div class="heading-box__detail">
              <svg class="heading-box__icon">
                <use xlink:href="@/assets/img/icons.svg#icon-map-pin"></use>
              </svg>
              <span class="heading-box__text">{{ currentTour.startLocation.description }}</span></div>
          </div>
        </div>
      </section>
      <section class="section-description">
        <div class="overview-box">
          <div>
            <div class="overview-box__group">
              <h2 class="heading-secondary ma-bt-lg">Quick facts</h2>
              <div class="overview-box__detail">
                <svg class="overview-box__icon">
                  <use xlink:href="@/assets/img/icons.svg#icon-calendar"></use>
                </svg>
                <span class="overview-box__label">Next date</span><span
                  class="overview-box__text">{{ currentTour['startDates'][0] | dateStyle }}</span>
              </div>
              <div class="overview-box__detail">
                <svg class="overview-box__icon">
                  <use xlink:href="@/assets/img/icons.svg#icon-trending-up"></use>
                </svg>
                <span class="overview-box__label">Difficulty</span><span
                  class="overview-box__text">{{ currentTour['difficulty'] }}</span>
              </div>
              <div class="overview-box__detail">
                <svg class="overview-box__icon">
                  <use xlink:href="@/assets/img/icons.svg#icon-user"></use>
                </svg>
                <span class="overview-box__label">Participants</span><span
                  class="overview-box__text">{{ currentTour['maxGroupSize'] }} people</span>
              </div>
              <div class="overview-box__detail">
                <svg class="overview-box__icon">
                  <use xlink:href="@/assets/img/icons.svg#icon-star"></use>
                </svg>
                <span class="overview-box__label">Rating</span><span
                  class="overview-box__text">{{ currentTour['ratingsAverage'] }} / 5</span></div>
            </div>
            <div class="overview-box__group">
              <h2 class="heading-secondary ma-bt-lg">Your tour guides</h2>
              <div v-for="guide in currentTour['guides']" :key="guide._id">
                <div class="overview-box__detail">
                  <img :src="require('@/assets/img/users/'+ guide['photo'])" alt="Lead guide"
                       class="overview-box__img">
                  <span class="overview-box__label">{{ guide.role | removeDash }}</span>
                  <span class="overview-box__text">{{ guide.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="description-box">
          <h2 class="heading-secondary ma-bt-lg">About {{ currentTour.name }}</h2>
          <p class="description__text">{{ currentTour['summary'] }}</p>
          <p class="description__text">{{ currentTour.description }}</p>
        </div>
      </section>
      <section class="section-pictures">
        <div v-for="(image,index) in currentTour.images" :key="index" class="picture-box">

          <img :alt="`${image}`"
               :class="`picture-box__img picture-box__img--${index+1}`"
               :src="require('@/assets/img/tours/'+image)"/>
        </div>

      </section>
      <section class="section-map">
        <tour-locations-map :locations='currentTour.locations'/>
      </section>
      <section class="section-reviews">
        <div class="reviews">
          <div v-for="review in currentTour['reviews']" :key="review.id" class="reviews__card">
            <div class="reviews__avatar">
              <img :alt="`${review.user.name}`" :src="require('@/assets/img/users/'+review.user['photo'])"
                   class="reviews__avatar-img"/>
              <h6 class="reviews__user">{{ review.user.name }}</h6>
            </div>
            <p class="reviews__text">
              {{ review['review'] }}
            </p>
            <div class="reviews__rating">
              <div v-for="(star,index) in [1,2,3,4,5]" :key="index">
                <svg :class="`reviews__star reviews__star--${review['rating'] >= star ? 'active' : 'inactive' }`">
                  <use xlink:href="@/assets/img/icons.svg#icon-star"></use>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section-cta">
        <div class="cta">
          <div class="cta__img cta__img--logo"><img alt="Natours logo" src="@/assets/img/logo-white.png"/></div>
          <img :src="require('@/assets/img/tours/'+currentTour.images[1])"
               alt=""
               class="cta__img cta__img--1"/>
          <img :src="require('@/assets/img/tours/'+currentTour.images[2])"
               alt=""
               class="cta__img cta__img--2"/>
          <div class="cta__content">
            <h2 class="heading-secondary">What are you waiting for?</h2>
            <p class="cta__text">{{ currentTour.duration }} days. 1 adventure. Infinite memories. Make it yours
              today!</p>
            <button v-if="loggedIn" class="btn btn--green span-all-rows" @click.prevent="stripeCheckout">
              <span v-if="paymentLoading">Processing...</span>
              <span v-else>Book tour now!</span>
            </button>
            <router-link v-else :to="{name:'Login'}" class="btn btn--green span-all-rows">
              Login to book tour
            </router-link>

          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import tourLocationsMap from "@/components/tourLocationsMap";

export default {
  name: 'Tour',
  components: {tourLocationsMap},
  props: ['tourId'],
  data() {
    return {
      paymentLoading: false
    }
  },
  computed: {
    ...mapGetters(['currentTour', 'currentTourLoading', 'loggedIn'])
  },
  methods: {
    async stripeCheckout() {
      this.paymentLoading = true
      await this.$store.dispatch('stripeCheckout', this.tourId)
      this.paymentLoading = false
    }
  },
  created() {
    this.$store.dispatch('getCurrentTour', this.tourId)
  },
  destroyed() {
    this.$store.dispatch('resetCurrentTour')
  }
}
</script>
