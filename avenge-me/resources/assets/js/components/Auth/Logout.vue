<template lang="jade">
h1() Logging out!
</template>
<script>

export default {
  route: {
    activate: function (transition) {
    	console.log("the logout route was activated")
      this.$root.authenticated = false
      this.$root.user = null
      localStorage.removeItem('user')
      localStorage.removeItem('jwt-token')
      transition.redirect('/')
    }
  }
}
</script>