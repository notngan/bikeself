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
      component: Home,
      meta: {
        title: 'BikeSelf - One-way Bike Rental'
      }
    },
    {
      path: '/rentals',
      name: 'rentals',
      component: () => import('./views/Rentals'),
      meta: {
        title: 'Rental Bikes'
      }
    },
    {
      path: '/rentals/:id',
      name: 'bikeDetail',
      component: () => import('./components/bike/BikeDetail'),
      meta: {
        title: 'Bike Details' 
      }
    },
    {
      path: '/services',
      name: 'services',
      component: () => import(/* webpackChunkName: "about" */ './views/Services'),
      meta: {
        title: 'Free Services'
      }
    },
    {
      path: '/tours',
      name: 'tours',
      component: () => import('./views/Tours'),
      meta: {
        title: 'Self-guided Tours'
      }
    },
    {
      path: '/tours/:id',
      name: 'tourDetail',
      component: () => import('./components/tour/TourDetail'),
      meta: {
        title: 'Tour Details'
      }
      //props: true
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About'),
      meta: {
        title: 'About BikeSelf'
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('./views/Contact'),
      meta: {
        title: 'Contact BikeSelf'
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('./views/admin/Index'),
      meta: {
        requiresAuth: true,
        title: 'Admin Panel'
      }
    },
    {
      path: '/admin/login',
      name: 'adminLogin',
      component: () => import('./views/admin/LogIn'),
      meta: {
        title: 'Admin Login'
      }
    },
    {
      path: '/admin/tours',
      name: 'adminTours',
      component: () => import('./views/admin/Tours'),
      meta: {
        requiresAuth: true,
        title: 'Create Articles'
      }
    },
    {
      path: '/booking/:id',
      name: 'bookingCreate',
      component: () => import('./views/booking/BookingCreate'),
      meta: {
        title: 'Book a Bike'
      }
      // props: true
    },
    {
      path: '/booking/edit/:id',
      name: 'bookingEdit',
      component: () => import('./views/booking/BookingEdit'),
      meta: {
        title: 'Edit The Bike'
      }
      // props: true
    },
    {
      path: '/bookings',
      name: 'bookingList',
      component: () => import('./views/booking/BookingList'),
      meta: {
        title: 'Your Bookings'
      }
      // props: true
    },
    {
      path: '/checkout',
      name: 'checkOut',
      component: () => import('./views/booking/CheckOut'),
      meta: {
        title: 'Checkout'
      }
      // props: true
    },
    {
      path: '/checkout/comfirm/:id',
      name: 'checkoutComfirm',
      component: () => import('./views/booking/CheckoutComfirm'),
      meta: {
        title: 'Checkout Comfirm'
      }
      // props: true
    },
    {
      path: '/user/:id',
      name: 'userProfile',
      component: () => import('./views/UserProfile'),
      meta: {
        title: 'Your Profile'
      }
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
  document.title = to.meta.title
  next()
})



export default router