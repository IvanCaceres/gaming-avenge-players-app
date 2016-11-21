module.exports = {
  configRouter: function (router) {
    console.log('show the router', router);
    router.map({
  // //     // '/auth': {
  // //     //   component: require('./components/auth.vue'),
  // //     //   subRoutes: {
  // //     //     '/login': {
  // //     //       component: require('./components/auth/login.vue'),
  // //     //       guest: true
  // //     //     },
  // //     //     '/register': {
  // //     //       component: require('./components/auth/register.vue'),
  // //     //       guest: true
  // //     //     },
  // //     //     '/profile': {
  // //     //       component: require('./components/auth/profile.vue'),
  // //     //       auth: true
  // //     //     },
  // //     //     '/logout': {
  // //     //       component: require('./components/auth/logout.vue'),
  // //     //       auth: true
  // //     //     }
  // //     //   }
  // //     // },
      '/home': {
        component: require('./components/Home.vue')
        // subRoutes: {
        //   '/': {
        //     component: require('./components/home/home.vue')
        //   },
        //   '/welcome': {
        //     component: require('./components/home/welcome.vue')
        //   },
        //   '/about': {
        //     component: require('./components/home/about.vue')
        //   }
        // }
      }
  // //     // '/dogs': {
  // //     //   component: require('./components/dogs.vue'),
  // //     //   auth: true,
  // //     //   subRoutes: {
  // //     //     '/': {
  // //     //       component: require('./components/dogs/index.vue')
  // //     //     },
  // //     //     '/:id': {
  // //     //       component: require('./components/dogs/show.vue')
  // //     //     },
  // //     //     '/create': {
  // //     //       component: require('./components/dogs/create.vue')
  // //     //     }
  // //     //   }
  // //     // },
  // //     // '/terms': {
  // //     //   component: require('./components/terms.vue')
  // //     // },
  // //     // '*': {
  // //     //   component: require('./components/404.vue')
  // //     // }
    })

  // //   router.alias({
  // //     '': '/home'
  // //     // '/auth': '/auth/login'
  // //   })

  // //   router.beforeEach(function (transition) {

  // //     var token = localStorage.getItem('jwt-token')
  // //     if (transition.to.auth) {
  // //       if (!token || token === null) {
  // //         transition.redirect('/auth/login')
  // //       }
  // //     }
  // //     if (transition.to.guest) {
  // //       if (token) {
  // //         transition.redirect('/')
  // //       }
  // //     }
  // //     transition.next()
  // //   })
  }
}