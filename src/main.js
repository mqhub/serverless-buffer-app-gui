import Vue from 'vue'
import Router from 'vue-router'
import { formatDate } from './filters'
import App from './components/App.vue'
import Home from './components/Home.vue'
import ScheduleTweet from './components/ScheduleTweet.vue'
import TweetView from './components/TweetView.vue'

Vue.config.debug = true

// install plugins
Vue.use(Router)

// Register filters globally
Vue.filter('formatDate', formatDate)

// routing
var router = new Router({
  linkActiveClass: 'active'
})

router.map({
  '/': {
    component: Home
  },
  '/tweet': {
    component: ScheduleTweet,
    auth: true
  },
  '/scheduled': {
    component: TweetView,
    auth: true
  }
})

// always scroll to the top when changing page
router.beforeEach(function () {
  window.scrollTo(0, 0)
})

// check if user is authenticated on specified pages
router.beforeEach(function (transition) {
  if (transition.to.auth) {
    if (router.app.store.user.authenticated) {
      transition.next()
    } else {
      router.app.$emit('error', 'Sign in required to see or schedule new tweets.')
      transition.abort()
    }
  } else {
    transition.next()
  }
})

router.redirect({
  '*': '/'
})

router.start(App, '#app')
