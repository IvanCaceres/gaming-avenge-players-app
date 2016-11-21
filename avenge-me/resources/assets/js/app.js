import Home from './components/Home.vue'
import Games from './components/Games.vue'
import AddGame from './components/AddGame.vue'
import AddPlayer from './components/AddPlayer.vue'
import Players from './components/Players.vue'
import Player from './components/Player.vue'
import Nav from './components/Nav.vue'
import Auth from './components/Auth.vue'
import Login from './components/Auth/Login.vue'
import Logout from './components/Auth/Logout.vue'
import Register from './components/Auth/Register.vue'
import store from './store'

/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */
require('./bootstrap');

// Vue.use(VueRouter);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the body of the page. From here, you may begin adding components to
 * the application, or feel free to tweak this setup for your needs.
 */

window.VueRouter = require('vue-router');

// Create our router object and set options on it
// const router = new VueRouter();

// Import the actual routes, aliases, ...
// import { configRouter } from './routes'

// 1. Define route components.
// These can be imported from other files
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/', redirect: '/games' },
  {	path: '/games', component: Home,
  	children: [
		{ path: '', component: Games },
		{ path: ':id', name: 'players', component: Players },
  		{ path: '/add-game', component: AddGame },
		{ path: '/add', component: AddPlayer },
		{ path: '/player/:id', 'name': 'player', component: Player }
  	]
  },
  { path: '/bar', component: Bar },
  { path: '/auth', component: Auth,
  	children: [
  		{ path: 'login', component: Login },
  		{ path: 'register', component: Register },
  		{ path: 'logout',
  			beforeEnter (to, from, next){
  				console.log("trying to enter logout route", app)
  				app.$store.commit('USER_CLEAR_DATA')
  				next('/games')
  			}
  		}
  	]
  }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for routes: routes
})

Vue.component('nav-component', Nav)

// Bootstrap the app
const app = new Vue({
	router,
	store,
  	data: function () {
		return {
			user: null,
			token: null,
			authenticated: false
		}
	},
	created(){
		this.$store.dispatch('checkLocalToken')
		this.$store.dispatch('getGames')
	},
	methods: {
	    setLogin: function (user) {
	      // Save login info in our data and set header in case it's not set already
	      this.user = user
	      this.authenticated = true
	      this.token = localStorage.getItem('jwt-token')
	    },
	    destroyLogin: function (user) {
	      // Cleanup when token was invalid our user has logged out
	      this.user = null
	      this.token = null
	      this.authenticated = false
	      localStorage.removeItem('jwt-token')
	      if (this.$route.auth) this.$route.router.go('/auth/login')
	    }
  }
}).$mount('#app')

window.router = router