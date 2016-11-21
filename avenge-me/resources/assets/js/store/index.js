import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import auth from './modules/auth'
import * as types from './mutation-types'
// import products from './modules/products'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    auth
  },
  state: {
    'games': [],
    'players': []
  },
  mutations: {
    [types.RECEIVE_GAMES] (state, games) {
      state.games = games
    },
    [types.RECEIVE_PLAYERS] (state, players) {
      console.log("wot it says players not defined", players)
      state.players = players
    },
    [types.ADD_GAME] (state, game) {
      console.log("inside of add game mutation", game)
      var allGames = state.games
      allGames.push(game)
      console.log("show all games array", allGames)
      state.games = allGames
    }
  },
  strict: debug,
  // plugins: debug ? [createLogger()] : []
})