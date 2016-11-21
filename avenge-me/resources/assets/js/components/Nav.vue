<template lang="jade">
<!-- Navigation -->
nav(class="navbar navbar-default")
	div(class="container")
		div(class="navbar-header")
			//-Collapsed Hamburger
			button(type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1")
				span(class="sr-only") Toggle Navigation
				span(class="icon-bar")
				span(class="icon-bar")
				span(class="icon-bar")

		div(class="collapse navbar-collapse", id="bs-example-navbar-collapse-1")
			ul(class="nav navbar-nav")
				li()
					router-link(:to="{ path: '/games' }") Home

			//-Right Side Of Navbar
			ul(class="nav navbar-nav navbar-right")
				//-<!-- Login / Registration Links for unauthenticated users -->
				li(v-if=" !authenticated")
					router-link(:to="{ path: '/auth/login' }") Login
				li(v-if=" !authenticated")
					router-link(:to="{ path: '/auth/register' }") Register
				//-<!-- Authenticated Right Dropdown -->
				li(class="dropdown" v-if="authenticated")
					a(href="#", class="dropdown-toggle", data-toggle="dropdown", role="button", aria-expanded="false") {{ user.name }}
						span(class="caret")

					ul(class="dropdown-menu" role="menu")
						//-Settings
						li(class="dropdown-header") Settings
						li()
							router-link(v-if="user.role == 'administrator'", :to="{ path: '/add-game' }")
								i(class="fa fa-btn fa-fw fa-user") Add game
						li()
							router-link(:to="{ path: '/auth/profile' }")
								i(class="fa fa-btn fa-fw fa-user") Your profile
						//- Logout
						li(class="divider")
						li()
							router-link(:to="{ path: '/auth/logout' }")
								i(class="fa fa-btn fa-fw fa-sign-out") Logout
</template>

<script>
import { mapState } from 'vuex'
module.exports = {
	created: function(){
		console.log("home was created thats super!")
	},
	computed: mapState({
		authenticated: (state) => state.auth.authenticated,
		user: (state) => {
			return state.auth.user
		}
	}),
	data: function () {
		return {
		  navTitle: 'Vue.js'
		}
	}
}
</script>

