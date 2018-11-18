import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import store from './store/store' 
//import { firebaseAuth } from './firebaseConfig'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/rentals',
      name: 'rentals',
      component: () => import('./views/Rentals')
    },
    {
      path: '/rentals/:id',
      name: 'bikeDetail',
      component: () => import('./components/bike/BikeDetail'),
      //props: true
    },
    {
      path: '/services',
      name: 'services',
      component: () => import(/* webpackChunkName: "about" */ './views/Services')
    },
    {
      path: '/tours',
      name: 'tours',
      component: () => import('./views/Tours')
    },
    {
      path: '/tours/:id',
      name: 'tourDetail',
      component: () => import('./components/tour/TourDetail'),
      //props: true
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('./views/Contact')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('./views/admin/Index'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/admin/login',
      name: 'adminLogin',
      component: () => import('./views/admin/LogIn')
    },
    {
      path: '/admin/tours',
      name: 'adminTours',
      component: () => import('./views/admin/Tours'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/booking/:id',
      name: 'bookingCreate',
      component: () => import('./views/booking/BookingCreate'),
      // props: true
    },
    {
      path: '/booking/edit/:id',
      name: 'bookingEdit',
      component: () => import('./views/booking/BookingEdit'),
      // props: true
    },
    {
      path: '/bookings',
      name: 'bookingList',
      component: () => import('./views/booking/BookingList'),
      // props: true
    },
    {
      path: '/checkout',
      name: 'checkOut',
      component: () => import('./views/booking/CheckOut'),
      // props: true
    },
    {
      path: '/checkout/comfirm/:id',
      name: 'checkoutComfirm',
      component: () => import('./views/booking/CheckoutComfirm'),
      // props: true
    },
    {
      path: '/user/:id',
      name: 'userProfile',
      component: () => import('./views/UserProfile'),
      // props: true
    },

  ],

  scrollBehavior () {
    return { x: 0, y: 0}
  }

})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isSignedIn == false) {
      next({
        path: '/admin/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next ()
    }
  } else { next() }
})

export default router