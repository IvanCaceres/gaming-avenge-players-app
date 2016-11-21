// import shop from '../../api/shop'
import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
  user: {
    email: null,
    password: null,
    role: null
  },
  token: null,
  authenticated: false
}

// getters
const getters = {
  authStatus: state => state.authenticated
}

// actions
const actions = {
  checkLocalToken ({ dispatch, commit, state}) {
    var token = localStorage.getItem('jwt-token')
    if (token !== null && token !== 'undefined') {
      var that = this
      commit(types.USER_TOKEN_FETCHED, token)
      return dispatch('fetchUserData').then(() => {
      })
    }
  },
  tryLogin({dispatch, commit, state}, payload) {
    return new Promise((resolve,reject) => {
      client({ path: 'api/login', entity: payload.user }).then(
        function (response) {
          commit(types.USER_TOKEN_FETCHED, response.entity.token)
          dispatch('fetchUserData')
          resolve()
        },
        function (response) {
          reject()
          // that.messages = []
          // if (response.status && response.status.code === 401) that.messages.push({type: 'danger', message: 'Sorry, you provided invalid credentials'})
          // that.loggingIn = false
        }
      )
    })
  },
  fetchUserData ({ commit, state }, payload){
    console.log("the fetch user data actionnnnnnnnn")
    return new Promise((resolve, reject) => {
      client({ path: 'api/users/me' }).then(
        function (response) {
          // User has successfully logged in using the token from storage
          commit(types.USER_DATA_SUCCESS, response.entity.user)
          // that.setLogin(response.entity.user)
          // broadcast an event telling our children that the data is ready and views can be rendered
          // that.$broadcast('data-loaded')
          resolve()
        },
        function (response) {
          // Login with our token failed, do some cleanup and redirect if we're on an authenticated route
          // that.destroyLogin()
          commit(types.USER_CLEAR_DATA)
          reject()
        }
      )
    })
  }
}

// mutations
const mutations = {
  // [types.ADD_TO_CART] (state, { id }) {
  //   state.lastCheckout = null
  //   const record = state.added.find(p => p.id === id)
  //   if (!record) {
  //     state.added.push({
  //       id,
  //       quantity: 1
  //     })
  //   } else {
  //     record.quantity++
  //   }
  // },

  // [types.CHECKOUT_REQUEST] (state) {
  //   // clear cart
  //   state.added = []
  //   state.checkoutStatus = null
  // },

  [types.USER_CLEAR_DATA](state){
    state.user = {email: null, password: null}
    state.token = null
    state.authenticated = false
    localStorage.removeItem('jwt-token')
  },

  [types.USER_TOKEN_FETCHED] (state, token) {
    console.log("handler from commit token fetched logic")
    console.log("saving the token in localstorage", token)
    localStorage.setItem('jwt-token', token)
    state.token = token
  },

  [types.USER_DATA_SUCCESS] (state, user) {
    console.log("in the user data success callback show payload", user)
    state.user = user
    state.authenticated = true
  },

  // [types.CHECKOUT_FAILURE] (state, { savedCartItems }) {
  //   // rollback to the cart saved before sending the request
  //   state.added = savedCartItems
  //   state.checkoutStatus = 'failed'
  // }
}

export default {
  state,
  getters,
  actions,
  mutations
}