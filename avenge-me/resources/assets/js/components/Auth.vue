<template lang="jade">
div()
	nav-component()
	div(class="container app-screen")
		//- <!-- Tabs -->
		div(class="row")
			div(class="col-md-3")
				div(class="panel panel-default panel-flush")
					div(class="panel-heading") Auth Nav
					div(class="panel-body")
						div(class="app-tabs")
							ul(class="nav app-tabs-stacked")
								li(v-if="!authenticated")
									router-link(:to="{ path: '/auth/login' }")
										i(class="fa fa-btn fa-fw fa-sign-in")
										span() &nbsp;Sign in
								li(v-if="! $root.authenticated")
									router-link(:to="{ path: '/auth/register' }")
										i(class="fa fa-btn fa-fw fa-chevron-circle-up")
										span() &nbsp;Register
								li(v-if="$root.authenticated")
									router-link(:to="{ path: '/auth/profile' }")
										i(class="fa fa-btn fa-fw fa-user")
										span() &nbsp;My Profile
			//- <!-- Tab Panes -->
			div(class="col-md-9")
				div(class="tab-content")
					div(class="tab-pane active")
						div(class="panel panel-default")
							router-view()
</template>

<script>
import { mapState } from 'vuex'
export default {

  data: function () {
  	return {}
  },
  created() {
  	console.log("the auth component was created")
  },
  computed: mapState({
  	authenticated: (state) => {
		return state.authenticated
  	}
  }),
  methods: {
    attempt: function (e) {
      e.preventDefault()
      var that = this
      that.$store.dispatch('tryLogin', { user: this.user })
      that.loggingIn = true
    },

    getUserData: function () {
      var that = this
      client({ path: '/users/me' }).then(
        function (response) {
          that.$dispatch('userHasLoggedIn', response.entity.user)
          that.$route.router.go('/auth/profile')
        },
        function (response) {
          console.log(response)
        }
      )
    }
  },

  route: {
    activate: function (transition) {
      this.$dispatch('userHasLoggedOut')
      transition.next()
    }
  }
}
</script>
