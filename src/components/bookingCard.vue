<template>
  <div>
    <div class="card">
      <div class="card__header">
        <div class="card__picture">
          <div class="card__picture-overlay">&nbsp;</div>
          <img :src="require('@/assets/img/tours/'+booking.tour['imageCover'])" alt="Tour 1" class="card__picture-img"/>
        </div>
        <p class="heading-tertirary well"><span>{{ booking.tour.name }}</span></p>
      </div>
      <div class="card__details">
        <h4 class="card__sub-heading">{{ booking.tour['difficulty'] }} {{ booking.tour.duration }}-day tour</h4>
        <p class="card__text">{{ booking.tour['summary'] }}</p>
        <!--        <div class="card__data">-->
        <!--          <svg class="card__icon">-->
        <!--            <use xlink:href="@/assets/img/icons.svg#icon-map-pin"></use>-->
        <!--          </svg>-->
        <!--          <span>{{ booking.tour.startLocation.description }}</span></div>-->
        <!--        <div class="card__data">-->
        <!--          <svg class="card__icon">-->
        <!--            <use xlink:href="@/assets/img/icons.svg#icon-calendar"></use>-->
        <!--          </svg>-->
        <!--          <span>{{ booking.tour['startDates'][0]|dateStyle }}</span></div>-->
        <!--        <div class="card__data">-->
        <!--          <svg class="card__icon">-->
        <!--            <use xlink:href="@/assets/img/icons.svg#icon-flag"></use>-->
        <!--          </svg>-->
        <!--          <span>{{ booking.tour.locations.length }} stops</span></div>-->
        <!--        <div class="card__data">-->
        <!--          <svg class="card__icon">-->
        <!--            <use xlink:href="@/assets/img/icons.svg#icon-user"></use>-->
        <!--          </svg>-->
        <!--          <span>{{ booking.tour['maxGroupSize'] }} people</span></div>-->
      </div>
      <!--      <div class="card__footer">-->
      <!--        <p>-->
      <!--          <span class="card__footer-value">${{ booking.tour['price'] }}</span>-->
      <!--          <span class="card__footer-text">per person</span>-->
      <!--        </p>-->
      <!--        <p class="card__ratings">-->
      <!--          <span class="card__footer-value">{{ booking.tour['ratingsAverage'] }}</span>-->
      <!--          <span class="card__footer-text">rating ({{ booking.tour['ratingsQuantity'] }})</span>-->
      <!--        </p>-->
      <!--        <router-link :to="{name:'Tour',params:{tourId:booking.tour._id}}" class="btn btn&#45;&#45;green btn&#45;&#45;small">-->
      <!--          Details-->
      <!--        </router-link>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>

export default {
  name: "tourCard",
  props: ['tour', 'tourId', 'booking']
}
</script>

<style scoped>
.well {
  font-size: 1.7rem;
}
</style>