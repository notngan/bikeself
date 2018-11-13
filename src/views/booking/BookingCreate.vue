<template>
  <booking-form 
    :booking="booking"
    :dayNumber="dayNumber"
    :btnDisabled="btnDisabled"
    :today="today"
    :locations="locations"
    :tomorrow="tomorrow"
    @count-day="countDay"
    @checkout="checkout"
    @save="saveBooking"/>
</template>

<script>
import BookingForm from '../../components/booking/BookingForm'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: { BookingForm },
  data () {
    return {
      booking: {
        quantity: 1,
        bikeId: null,
        start: {
          date: new Date().toISOString().substr(0, 10),
          time: '6:30',
          location: null,
          address: ''
        },
        end: { 
          date: this.getTomorrow(new Date().toISOString().substr(0, 10)),
          time: '6:30',
          location: null,
          address: ''
        },
      },
      btnDisabled: false,
      locations: [
        { text: 'Huế', value: 'Huế'},
        { text: 'Đà Nẵng', value: 'Đà Nẵng'},
        { text: 'Hội An', value: 'Hội An'}
      ],
    }
  },

  computed: {
    ...mapGetters(['isSignedIn', 'signedInUser', 'bookingById']),
    deGetTime () {
      return (new Date(this.booking.start.date).getTime() + this.getDeHour * 3600000 + this.getDeMin * 60000) / 86400000
    },
    reGetTime () {
      return (new Date(this.booking.end.date).getTime() + this.getReHour * 3600000 + this.getReMin * 60000) / 86400000
    },
    dayNumber () {
      if (!this.deGetTime || !this.reGetTime) {
        return 1
      }
      return this.countDay(this.deGetTime, this.reGetTime)
    },
    getDeHour () {
      return new Date(this.booking.start.date + ',' + this.booking.start.time).getHours()
    },
    getDeMin () {
      return new Date(this.booking.start.date + ',' + this.booking.start.time).getMinutes()
    },
    getReHour () {
      return new Date(this.booking.end.date + ',' + this.booking.end.time).getHours()
    },
    getReMin () {
      return new Date(this.booking.end.date + ',' + this.booking.end.time).getMinutes()
    },
    today () {
      return new Date().toISOString().substring(0,10)
    },
    tomorrow () {
      return this.getTomorrow(this.booking.start.date)
    },
    bookingIsValid () {
      return this.booking.start.date!== null 
            && this.booking.start.location.value !== ''
            && this.booking.start.address !== ''
            && this.booking.start.time !== null
            && this.booking.end.date !== null 
            && this.booking.end.location.value !== ''
            && this.booking.end.address !== ''
            && this.booking.end.time !== null
            && this.booking.quantity > 0
            && this.dayNumber > 0
    }
    
  },
  created () {
    this.booking.bikeId = this.$route.params.id
  },
  watch: {
    isSignedIn (val) {
      if (!val) {
        this.addMessage({
          show: true,
          message: 'Please sign in to continue',
          class: 'error'
        })
      }
    },
    // bookingIsValid (val) {
    //   if (val) {
    //     return this.btnDisabled = false
    //   }
    // },
    // booking (val) {
    //   console.log(val)
    // }
  },
  methods: {
    ...mapActions(['addMessage', 'clearMessage', 'saveToBookings']),
    saveBooking () {
      if (!this.isSignedIn) {
        this.addMessage({
          message: 'Please sign in to continue!',
          class: 'error'
        })
      } else {
        const booking = this.booking
        booking.dayNumber = this.dayNumber
        const payload = {
          booking: booking,
          uid: this.signedInUser.id
        }
        this.saveToBookings(payload).then(() => {
          this.$router.push('/rentals')
        })
      }
    },

    checkout () {
      if (!this.isSignedIn) {
        this.addMessage({
          message: 'Please sign in to continue!',
          class: 'error'
        })
      } else {
        const booking = this.booking
        booking.dayNumber = this.dayNumber
        localStorage.setItem('booking', JSON.stringify(booking))
        // const booking = this.booking
        // booking.dayNumber = this.dayNumber
        // const payload = {
        //   booking: booking,
        //   uid: this.signedInUser.id
        // }
        // this.savecheckout(payload)
        this.$router.push('/checkout')
      }
    },
  
    getTomorrow (today) {
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      return tomorrow.toISOString().substring(0,10)
    },

    countDay (getTime1, getTime2) {
      let res = Math.round(getTime2 - getTime1)
      if (res < 0 ) {
        return 0
      } else if ((res + 0,5) < (getTime2 - getTime1) ){
        return res + 1
      } else {
        return res
      }
    },
  }
}
</script>

