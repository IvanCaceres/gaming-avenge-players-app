import * as types from './mutation-types'

// export const addToCart = ({ commit }, product) => {
//   if (product.inventory > 0) {
//     commit(types.ADD_TO_CART, {
//       id: product.id
//     })
//   }
// }

export const getGames = ({ commit }) => {
    return new Promise((resolve, reject) => {
      client({ path: 'api/games' }).then(
        function (response) {
          // User has successfully logged in using the token from storage
          console.log("show wat wat the getGames xssresponse", response)
          commit(types.RECEIVE_GAMES, response.entity.data)
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

export const getPlayers = ({ commit }) => {
	console.log('yoooooooo from getPlayers')
    return new Promise((resolve, reject) => {
      client({ path: 'api/players' }).then(
        function (response) {
          console.log("show the get players xssresponse", response)
          commit(types.RECEIVE_PLAYERS, response.entity.data)
          resolve()
        },
        function (response) {
          reject()
        }
      )
    })
}