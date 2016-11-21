<template lang="jade">
div()
  div(class="panel-heading") Sign in to your account
  div(class="panel-body")
    form(class="form-horizontal", role="form", v-on:submit="attempt")
      div(id="alerts", v-if="messages.length > 0")
        div(v-for="message in messages", :class="['alert', 'alert-{{ message.type }}','alert-dismissible']", role="alert") {{ message.message }}

      div(class="form-group")
        label(class="col-md-4 control-label") E-Mail Address
        div(class="col-md-6")
          input(type="email", class="form-control", v-model="user.email")

      div(class="form-group")
        label(class="col-md-4 control-label") Password
        div(class="col-md-6")
          input(type="password", class="form-control", v-model="user.password")

      div(class="form-group")
        div(class="col-md-6 col-md-offset-4")
          button(type="submit", class="btn btn-primary", :disabled="loggingIn")
            i(class="fa fa-btn fa-sign-in") Login

          router-link(class="btn btn-link", :to="{ path: '/auth/forgot' }") Forgot Your Password?
</template>

<script>
module.exports = {

  data: function () {
    return {
      user: {
        email: null,
        password: null
      },
      messages: [],
      loggingIn: false
    }
  },

  methods: {
    attempt: function (e) {
      console.log("RUNNING ATTEMPT")
      e.preventDefault()
      var that = this
      that.$store.dispatch('tryLogin', { user: this.user }).then(() => {
        console.log("alright show that", that);
        console.log("try login was completed!");
        that.$router.push('/games')
      })
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

