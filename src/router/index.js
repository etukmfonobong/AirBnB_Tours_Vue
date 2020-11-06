import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Tour from '@/views/Tour.vue'
import Login from "@/views/Login";
import SignUp from "@/views/SignUp";
import forgotPassword from "@/views/forgotPassword";
import store from "@/store"
import Error from "@/views/Error";
import Settings from "@/views/Settings";
import userAccountSettings from "@/components/userAccountSettings";
import userBookingSettings from "@/components/userBookingSettings";
import resetPassword from "@/views/resetPassword";

Vue.use(VueRouter)

const protectedRoute = async (to, from, next) => {

  if (!store.getters.loggedIn) await store.dispatch('getUser')


  if (!store.getters.loggedIn) next('/login');
  else next();
}

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/forgot-password',
    name: 'forgotPassword',
    component: forgotPassword,
    beforeEnter: async (to, from, next) => {
      if (store.getters.loggedIn) next('/home');
      else next();
    }
  },
  {
    path: '/reset-password/:resetToken',
    name: 'resetPassword',
    props: true,
    component: resetPassword,
    beforeEnter: async (to, from, next) => {
      if (store.getters.loggedIn) next('/home');
      else next();
    }
  },
  {
    path: '/tour/:tourId',
    name: 'Tour',
    props: true,
    component: Tour
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: async (to, from, next) => {

      if (store.getters.loggedIn) next('/home');
      else next();
    }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
    beforeEnter: async (to, from, next) => {
      if (store.getters.loggedIn) next('/home');
      else next();
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    children: [
      {
        path: 'account-settings',
        name: 'Account Settings',
        component: userAccountSettings
      },
      {
        path: 'booking-settings',
        name: 'Booking Settings',
        component: userBookingSettings
      }
    ]
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '*',
    name: 'Not Found',
    component: Error
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})

router.beforeEach(async (to, from, next) => {
  // const token = Vue.$cookies.get('jwthandp');

  if (!store.getters.loggedIn) await store.dispatch('getUser')

  next()


  // if (!store.getters.loggedIn) {
  //   if (to.path === '/home' || to.path === '/login' || to.path === '') {
  //     next();
  //   } else next('/login');
  // }
});

export default router
