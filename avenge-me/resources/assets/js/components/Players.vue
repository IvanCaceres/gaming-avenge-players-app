<template lang="jade">
div()
	div(class="filter-box")
		h3() Filter by game
		select(name="game_id", class="choose-game", v-model="game", required, v-on:change="changedGame")
			option(value="", disabled) Choose a game
			option(v-for="option in games", v-bind:value="option.id") {{ option.title }}

	div(class="players-table")
		div(class="results-header")
			div(class="username") name
			div(class="game") game
			div(class="added-user") added by
			div(class="players-date") date
			div(class="players-description") description
			div(class="players-avenged") avenged
		router-link(:to="{ name: 'player', params: { id: player.id } }", v-for="player in players", class="results-row")
			div(class="username") {{player.name}}
			div(class="game") {{player.game_title}}
			div(class="added-user") {{player.user_added}}
			div(class="players-date") {{ player.added }}
			div(class="players-description") {{ player.description }}
			div(class="players-avenged") {{ player.avenged }}
		p(class="no-players", v-if="players.length == 0") No players on the list for this game.
</template>

<script>
import { mapState } from 'vuex'

export default {
	data: function(){
		return {
			initialFetch: null,
			players: [],
			game: ""
		}
	},
	watch: {
		'$route': 'filterData'
	},
	computed: mapState({
		games: (state) => state.games
	}),
	created(){
		var that = this;
		this.initialFetch = this.$store.dispatch('getPlayers')
		this.initialFetch.then(() => {
			that.filterData();
		})
	},
	methods: {
		changedGame(){
			router.push({ name: 'players', params: { id: this.game }})
		},
		filterData(){
			var that = this;
			this.players = this.$store.state.players
			console.log("we set the store players", this.players)
			if(this.$route.params && this.$route.params.id){
				console.log("HAVE ROUTE ID", this.$route.params.id)
				//if we have a numerical game id in route then filter the player results
				//if not a number then return all
				if(!isNaN(that.$route.params.id)){
					that.players = that.players.filter(function(val){
						return val.game_id == that.$route.params.id;
					});
				}
			}
		}
	}
}

function belongsToGame(value, gameId) {
  return value >= 10;
}
</script>

